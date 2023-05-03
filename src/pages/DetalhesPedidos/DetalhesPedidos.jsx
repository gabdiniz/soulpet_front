import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom"
import { Loader } from "../../components/Loader/Loader";
import { Form } from "react-bootstrap";


export function DetalhesPedidos() {

  const { id } = useParams();
  const [pedido, setPedido] = useState(null);
  const [produto, setProduto] = useState(null);
  const [cliente, setCliente] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3001/pedidos/${id}`).then((pedido) => {
      setPedido(pedido.data)
      axios.get(`http://localhost:3001/produtos/${pedido.data.produtoId}`).then((produto) => {
        setProduto(produto.data)
      })
      axios.get(`http://localhost:3001/clientes/${pedido.data.clienteId}`).then((cliente) => {
        setCliente(cliente.data)
      })
    }).catch((e) => {
      toast.error(e, { position: "bottom-right", duration: 2000 });
    })
  }, [id]);

  return (
    <>
      {
        (!cliente)
          ?
          <Loader />
          :
          <div className="container">
            <Form className="w-75 m-auto my-5">
              <fieldset disabled>
                <legend className="h3">Pedido</legend>
                <Form.Group className="mb-3">
                  <Form.Label>Codigo</Form.Label>
                  <Form.Control className="bg-white" defaultValue={pedido.codigo} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Quantidade</Form.Label>
                  <Form.Control className="bg-white" defaultValue={pedido.quantidade} />
                </Form.Group>
              </fieldset>
              <hr className="mt-4 color-black" />
              <fieldset disabled>
                <legend className="h3">Produto</legend>
                <Form.Group className="mb-3">
                  <Form.Label>Nome</Form.Label>
                  <Form.Control className="bg-white" defaultValue={produto.nome} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Preço</Form.Label>
                  <Form.Control className="bg-white" defaultValue={produto.preco} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Descrição</Form.Label>
                  <Form.Control as="textarea" className="bg-white" defaultValue={produto.descricao} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Desconto</Form.Label>
                  <Form.Control className="bg-white" defaultValue={`${produto.desconto}%`} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Data do desconto</Form.Label>
                  <Form.Control type="date" className="bg-white" defaultValue={produto.dataDesconto} />
                </Form.Group>
              </fieldset>
              <hr className="mt-4 color-black" />
              <fieldset disabled>
                <legend className="h3">Cliente</legend>
                <Form.Group className="mb-3">
                  <Form.Label>Nome</Form.Label>
                  <Form.Control className="bg-white" defaultValue={cliente.nome} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control className="bg-white" defaultValue={cliente.email} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Telefone</Form.Label>
                  <Form.Control className="bg-white" defaultValue={cliente.telefone} />
                </Form.Group>
              </fieldset>
            </Form>
          </div>
      }
    </>
  )
}