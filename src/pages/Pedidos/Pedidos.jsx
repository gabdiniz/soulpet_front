import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Form, Table, Modal } from "react-bootstrap";
import { Loader } from "../../components/Loader/Loader";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";

export function Pedidos() {
  const [pedidos, setPedidos] = useState(null);
  const [clientes, setClientes] = useState(null);
  const [produtos, setProdutos] = useState(null);
  const [clienteFiltro, setClienteFiltro] = useState("");
  const [produtoFiltro, setProdutoFiltro] = useState("");
  const [show, setShow] = useState(false);
  const [idPedido, setIdPedido] = useState(null);

  const handleClose = () => {
    setIdPedido(null);
    setShow(false);
  };
  const handleShow = (id) => {
    setIdPedido(id);
    setShow(true);
  };

  useEffect(() => {
    initializeData();
  }, []);

  async function initializeData() {
    try {
      const pedidosRes = await axios.get("http://localhost:3001/pedidos");
      const clientesRes = await axios.get("http://localhost:3001/clientes");
      const produtosRes = await axios.get("http://localhost:3001/produtos");
  
      setPedidos(pedidosRes.data);
      setClientes(clientesRes.data.reduce(
        (obj, cliente) => ({ ...obj, [cliente.id]: cliente.nome }), {}
      ));
      setProdutos(produtosRes.data.reduce(
        (obj, produto) => ({ ...obj, [produto.id]: produto.nome }), {}
      ));
    } catch (error) {
      console.log(error);
    }
  }

  const filtrarPedidos = (pedido) => {
    const cliente = clientes[pedido.clienteId]
      ? clientes[pedido.clienteId].toLowerCase()
      : "";
    const produto = produtos[pedido.produtoId]
      ? produtos[pedido.produtoId].toLowerCase()
      : "";
    return (
      cliente.includes(clienteFiltro.toLowerCase()) &&
      produto.includes(produtoFiltro.toLowerCase())
    );
  };

  function onDelete() {
    axios
      .delete(`http://localhost:3001/pedidos/${idPedido}`)
      .then((response) => {
        toast.success(response.data.message, {
          position: "bottom-right",
          duration: 2000,
        });
        initializeData();
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.message, {
          position: "bottom-right",
          duration: 2000,
        });
      });
    handleClose();
  }

  return (
    <div className="container mt-3">
      <div className="d-flex justify-content-between align-items-center">
        <h1>Pedidos</h1>
        <Button as={Link} to="/pedido/novo">
          <i className="bi bi-plus-lg me-2"></i> Novo Pedido
        </Button>
      </div>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Filtrar por Cliente</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite o nome do cliente"
            value={clienteFiltro}
            onChange={(event) => setClienteFiltro(event.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Filtrar por Produto</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite o nome do produto"
            value={produtoFiltro}
            onChange={(event) => setProdutoFiltro(event.target.value)}
          />
        </Form.Group>
        <Button
          className="mb-3"
          variant="secondary"
          onClick={() => {
            setClienteFiltro("");
            setProdutoFiltro("");
          }}
        >
          Limpar filtros
        </Button>
      </Form>

      {pedidos === null ? (
        <Loader />
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Cliente</th>
              <th>Produto</th>
              <th>Quantidade</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {pedidos.filter(filtrarPedidos).map((pedido) => {
              return (
                <tr key={pedido.id}>
                <td>{clientes[pedido.clienteId]}</td>
                <td>{produtos[pedido.produtoId]}</td>
                <td>{pedido.quantidade}</td>
                  <td className="d-flex justify-content-center gap-2">
                    <Button
                      variant="danger"
                      onClick={() => handleShow(pedido.id)}
                    >
                      <i className="bi bi-trash-fill"></i>
                    </Button>
                    <Button
                      variant="primary"
                      as={Link}
                      to={`/pedidos/editar/${pedido.id}`}
                    >
                      <i className="bi bi-pencil-fill"></i>
                    </Button>
                    <Button
                      variant="info"
                      as={Link}
                      to={`/pedidos/detalhes/${pedido.id}`}
                    >
                      <i className="bi bi-info-circle-fill"></i>
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
      <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmação</Modal.Title>
                </Modal.Header>
                <Modal.Body>Tem certeza que deseja excluir o pedido?</Modal.Body>
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