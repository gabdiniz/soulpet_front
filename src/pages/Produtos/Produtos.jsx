import axios from "axios"
import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap"
import { Loader } from "../../components/Loader/Loader";


export function Produtos(){

    const [produtos, setProdutos] = useState(null);

    useEffect(() => {
        initializeTable()
    }, []);

    function initializeTable() {
        axios.get("http://localhost:3001/produtos")
        .then(response => {
            setProdutos(response.data);
        })
        .catch(error => {
            console.log(error)
        })
    
    }
    
    return (
        <div className="container mt-3">
            <h1>Produtos</h1>
            {
                produtos === null ?
                    <Loader />
                    :
            <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Preço</th>
                                <th>Descrição</th>
                                <th>Desconto</th>
                                <th>Data do desconto</th>
                                <th>Categoria</th>
                            </tr>
                        </thead>
                        <tbody>
                            {produtos.map(produto => {
                                return (
                                    <tr key={produto.id}>
                                        <td>{produto.nome}</td>
                                        <td>{produto.preco}</td>
                                        <td>{produto.descricao}</td>
                                        <td>{produto.desconto}</td>
                                        <td>{produto.dataDesconto}</td>
                                        <td>{produto.categoria}</td>
                                        <td className="d-flex gap-2">
                                            <Button>
                                                <i className="bi bi-trash-fill"></i>
                                            </Button>
                                            <Button>
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
    )
}