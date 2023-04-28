import axios from "axios";
import { useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

export function EditaPet() {

  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const navigate = useNavigate();
  const { id } = useParams();

  function onSubmit(data) {
    axios.put(`http://localhost:3001/pets/${id}`, data)
      .then(response => {
        toast.success(response.data.message, { position: "bottom-right", duration: 2000 });
        navigate("/pets");
      })
      .catch(error => {
        toast.error(error.response.data.message, { position: "bottom-right", duration: 2000 });
        console.log(error);
      });
  }

  useEffect(() => {
    axios.get(`http://localhost:3001/pets/${id}`)
      .then(response => {
        const { nome, tipo, porte, dataNasc, clienteId } = response.data;
        reset({ nome, tipo, porte, dataNasc, clienteId });
      })
  }, [id, reset])

  return (
    <div className="container mt-3">
      <h1>Editar Pet</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3">
          <Form.Label>Nome</Form.Label>
          <Form.Control type="text" className={errors.nome && "is-invalid"} {...register("nome", { required: "O nome é obrigatório.", maxLength: { value: 130, message: "Limite de 130 caracteres." } })} />
          {errors.nome && <Form.Text className="invalid-feedback">{errors.nome.message}</Form.Text>}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Tipo</Form.Label>
          <Form.Control type="text" className={errors.tipo && "is-invalid"} {...register("tipo", { required: "O tipo é obrigatório.", maxLength: { value: 100, message: "Limite de 100 caracteres." } })} />
          {errors.tipo && <Form.Text className="invalid-feedback">{errors.tipo.message}</Form.Text>}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Porte</Form.Label>
          <Form.Control type="text" className={errors.porte && "is-invalid"} {...register("porte", { required: "O porte é obrigatório.", maxLength: { value: 100, message: "Limite de 100 caracteres." } })} />
          {errors.porte && <Form.Text className="invalid-feedback">{errors.porte.message}</Form.Text>}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Data de nascimento</Form.Label>
          <Form.Control type="date" className={errors.porte && "is-invalid"} {...register("dataNasc")} />
          {errors.dataNasc && <Form.Text className="invalid-feedback">{errors.dataNasc.message}</Form.Text>}
        </Form.Group>

        <Button variant="primary" type="submit">
          Editar
        </Button>
      </Form>
    </div>
  );
}