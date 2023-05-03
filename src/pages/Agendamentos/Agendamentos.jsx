import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Loader } from "../../components/Loader/Loader";
import { toast } from "react-hot-toast";

export function Agendamentos() {

    const [agendamentos, setAgendamentos] = useState(null);
    const [show, setShow] = useState(false);
    const [idAgendamento, setIdAgendamento] = useState(null);

    const handleClose = () => {
        setIdAgendamento(null);
        setShow(false)
    };
    const handleShow = (id) => {
        setIdAgendamento(id);
        setShow(true)
    }

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

    function onDelete() {
        axios.delete(`http://localhost:3001/agendamentos/${idAgendamento}`)
            .then(response => {
                toast.success(response.data.message, { position: "bottom-right", duration: 2000 });
                initializeTable();
            })
            .catch(error => {
                console.log(error);
                toast.error(error.response.data.message, { position: "bottom-right", duration: 2000 });
            });
        handleClose();
    }

    return (
        <div className="agendamentos container mt-3">
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
                    <Table striped bordered hover responsive>
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
                                        <Button onClick={() => handleShow(agendamento.id)}>
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
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmação</Modal.Title>
                </Modal.Header>
                <Modal.Body>Tem certeza que deseja excluir este agendamento?</Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={onDelete}>
                        Excluir
                    </Button>
                </Modal.Footer>
            </Modal> 
        </div>
    );
}