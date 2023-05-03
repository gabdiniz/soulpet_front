import axios from "axios";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";

export function EditarPedido() {
  const [produtos, setProdutos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm();

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios.get("http://localhost:3001/produtos").then((response) => {
      setProdutos(response.data);
    });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:3001/clientes").then((response) => {
      setClientes(response.data);
    });
  }, []);

  useEffect(() => {
    axios.get(`http://localhost:3001/pedidos/${id}`).then((response) => {
      const { codigo, quantidade, produtoId, clienteId } = response.data;
      reset({ codigo, quantidade, produtoId, clienteId });
    });
  }, [id, reset]);

  function onSubmit(data) {
    axios
      .put(`http://localhost:3001/pedidos/${id}`, data)
      .then((response) => {
        toast.success("Pedido editado", {
          position: "bottom-right",
          duration: 2000,
        });
        navigate("/pedidos");
      })
      .catch((error) => {
        toast.error("Um erro aconteceu!", {
          position: "bottom-right",
          duration: 2000,
        });
      });
  }

  return (
    <div className="container">
      <h1>Editar Pedido</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <h4>Pedido</h4>
          <Form.Group className="mb-3">
            <Form.Label>Código</Form.Label>
            <Form.Control
              type="text"
              className={errors?.pedidos?.codigo && "is-invalid"}
              {...register(`codigo`, {
                required: {
                  message: "Este campo é obrigatório.",
                },
                min: {
                  value: 1,
                  message: "O código deve ser maior que zero.",
                },
              })}
            />
            {errors.pedidos?.codigo?.type === "required" && (
              <Form.Text className="invalid-feedback">
                {errors.pedidos.codigo.message}
              </Form.Text>
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Quantidade</Form.Label>
            <Form.Control
              type="number"
              className={errors?.pedidos?.quantidade && "is-invalid"}
              {...register(`quantidade`, {
                required: {
                  message: "Este campo é obrigatório.",
                },
                min: {
                  value: 1,
                  message: "A quantidade deve ser maior que zero.",
                },
              })}
            />
            {errors.pedidos?.quantidade?.type === "required" && (
              <Form.Text className="invalid-feedback">
                {errors.pedidos.quantidade.message}
              </Form.Text>
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Produto</Form.Label>
            <Form.Control
              as="select"
              className={errors?.pedidos?.produto && "is-invalid"}
              {...register(`produtoId`, {
                required: {
                  value: true,
                  message: "Este campo é obrigatório.",
                },
              })}
              defaultValue={produtos}
            >
              <option value="">Selecione um produto</option>
              {produtos.map((produto) => (
                <option key={produto.id} value={produto.id}>
                  {produto.nome} - {produto.descricao}
                </option>
              ))}
            </Form.Control>
            {errors.pedidos?.produto?.type === "required" && (
              <Form.Text className="invalid-feedback">
                {errors.pedidos.produto.message}
              </Form.Text>
            )}
          </Form.Group>
        </div>
        <Button variant="primary" type="submit">
          Salvar
        </Button>
      </Form>
    </div>
  );
}
