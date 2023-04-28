import axios from "axios"
import { useEffect, useState } from "react";
import { Button, Modal, Table } from "react-bootstrap"
import { Loader } from "../../components/Loader/Loader";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";


export function Produtos(){

    const [produtos, setProdutos] = useState(null);
    const [show, setShow] = useState(false);
    const [idProduto, setIdProduto] = useState(null);

    const handleClose = () => {
        setIdProduto(null);
        setShow(false);
    };
    const handleShow = (id) => {
        setIdProduto(id);
        setShow(true)
    };

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

    function onDelete(){
        axios.delete(`http://localhost:3001/produtos/${idProduto}`)
        .then(response => {
            toast.success(response.data.message, {position: "bottom-right", duration:2000})
            initializeTable();
        })
        .catch(error => {
            console.log(error);
            toast.error(error.response.data.message, {position: "bottom-right", duration:2000})
        })
        handleClose()
    }
    
    return (
        <div className="container mt-3">
            <div className="d-flex justify-content-between align-items-center">
            <h1>Produtos</h1>
            <Button as={Link} to="/produto/novo">
                    <i className="bi bi-plus-lg me-2"></i> Produto
                </Button>
                </div>
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
                                            <Button onClick={() => handleShow(produto.id)}>
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
<Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
        <Modal.Title>Confirmação</Modal.Title>
    </Modal.Header>
    <Modal.Body>Tem certeza que deseja excluir este produto?</Modal.Body>
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