import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Loader } from "../../components/Loader/Loader";

export function Agendamentos() {

    const [agendamentos, setAgendamentos] = useState(null);

    useEffect(() => {
        initializeTable();
    }, []);

    function initializeTable() {
        axios.get("http://localhost:3001/agendamentos")
            .then(response => {
                setAgendamentos(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }

    return (
        <div className="agendamentos container">
            <div className="d-flex justify-content-between align-items-center">
                <h1>Agendamentos</h1>
                <Button as={Link} to="/agendamentos/novo">
                    <i className="bi bi-plus-lg me-2"></i> Agendamento
                </Button>
            </div>
            {
                agendamentos === null ?
                    <Loader />
                    :
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Data Agendada</th>
                                <th>Id do Pet</th>
                                <th>Id do Serviço</th>
                                <th>Realizada</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {agendamentos.map(agendamento => {
                                return (
                                    <tr key={agendamento.id}>
                                        <td>{agendamento.id}</td>
                                        <td>{agendamento.dataAgendada}</td>
                                        <td>{agendamento.petId}</td>
                                        <td>{agendamento.servicoId}</td>
                                        <td>{agendamento.realizada === false ? "Não" : "Sim"}</td>
                                        <td className="d-flex gap-2">
                                            <Button >
                                                <i className="bi bi-trash-fill"></i>
                                            </Button>
                                            <Button >
                                                <i className="bi bi-pencil-fill"></i>
                                            </Button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
            }
           
        </div>
    );
}