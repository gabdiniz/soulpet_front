import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Form, Table, Modal } from "react-bootstrap";
import { Loader } from "../../components/Loader/Loader";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";

export function Pedidos() {
  const [pedidos, setPedidos] = useState(null);
  const [clienteFiltro, setClienteFiltro] = useState("");
  const [produtoFiltro, setProdutoFiltro] = useState("");
  const [clienteNome, setClienteNome] = useState({});
  const [produtoNome, setProdutoNome] = useState({});
  const [show, setShow] = useState(false);
  const [idPedido, setIdPedido] = useState(null);

  const handleClose = () => {
    setIdPedido(null);
    setShow(false)
};
const handleShow = (id) => {
    setIdPedido(id);
    setShow(true)
};

  useEffect(() => {
    initializeTable();
  }, []);

  function initializeTable() {
    axios
      .get("http://localhost:3001/pedidos")
      .then((response) => {
        setPedidos(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const filtrarPedidos = (pedido) => {
    const cliente = clienteNome[pedido.clienteId] ? clienteNome[pedido.clienteId].toLowerCase() : '';
    const produto = produtoNome[pedido.produtoId] ? produtoNome[pedido.produtoId].toLowerCase() : '';
    return cliente.includes(clienteFiltro.toLowerCase()) &&
           produto.includes(produtoFiltro.toLowerCase());
  };

  useEffect(() => {
    if (pedidos && Object.keys(clienteNome).length !== pedidos.length && Object.keys(produtoNome).length !== pedidos.length) {
      const promises = [];
      pedidos.forEach((pedido) => {
        const nomeCliente = axios.get(`http://localhost:3001/clientes/${pedido.clienteId}`)
          .then((response) => {
            const cliente = response.data;
            setClienteNome((nomeAnteriorCliente) => {
              return { ...nomeAnteriorCliente, [pedido.clienteId]: cliente.nome };
            });
          })
          .catch((error) => {
            console.log(error);
          });
        const nomeProduto = axios.get(`http://localhost:3001/produtos/${pedido.produtoId}`)
          .then((response) => {
            const produto = response.data;
            setProdutoNome((nomeAnteriorProduto) => {
              return { ...nomeAnteriorProduto, [pedido.produtoId]: produto.nome };
            });
          })
          .catch((error) => {
            console.log(error);
          });
        promises.push(nomeCliente);
        promises.push(nomeProduto);
      });
      Promise.all(promises).then(() => {
        console.log("Todos os clientes e produtos foram carregados com sucesso.");
      });
    }
  }, [pedidos, clienteNome, produtoNome]);

  function initializeTable() {
    axios.get("http://localhost:3001/pedidos")
        .then(response => {
            setPedidos(response.data);
        })
        .catch(error => {
            console.log(error);
        });
}

function onDelete() {
    axios.delete(`http://localhost:3001/pedidos/${idPedido}`)
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
    <div className="container">
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
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Cliente</th>
              <th>Produto</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {pedidos.filter(filtrarPedidos).map((pedido) => {
              return (
                <tr key={pedido.id}>
                <td>{clienteNome[pedido.clienteId]}</td>
                <td>{produtoNome[pedido.produtoId]}</td>
                  <td className="d-flex gap-2">
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
