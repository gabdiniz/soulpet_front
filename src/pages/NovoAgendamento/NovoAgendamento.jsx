import axios from "axios";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function NovoAgendamento() {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    function onSubmit(data) {
        axios.post("http://localhost:3001/agendamentos", data)
        .then(response => {
            toast.success("Agendamento adicionado!", { position: "bottom-left", duration: 2000 });
            navigate("/agendamentos");
        })
        .catch(error => {
            toast.error("Algo deu errado!", { position: "bottom-left", duartion: 2000 })
            console.log(error);
        });
    }

    
    return (
        <div className="container">
        <h1>Novo Agendamento</h1>
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3">
                <Form.Label>Data do Agendamento</Form.Label>
                <Form.Control type="date" className={errors.dataAgendada && "is-invalid"} {...register("dataAgendada", { required: "A data do agendamento é obrigatória." })} />
                {errors.dataAgendada && <Form.Text className="invalid-feedback">{errors.dataAgendada.message}</Form.Text>}
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Id do Pet</Form.Label>
                <Form.Control type="number" className={errors.petId && "is-invalid"} {...register("petId", { required: "O Id do pet é obrigatório.", maxLength: { value: 100, message: "Limite de 100 caracteres."} })} />
                {errors.petId && <Form.Text className="invalid-feedback">{errors.petId.message}</Form.Text>}
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Id do Serviço</Form.Label>
                <Form.Control type="number" className={errors.servicoId && "is-invalid"} {...register("servicoId", { required: "O Id do serviço é obrigatório.", maxLength: { value: 100, message: "Limite de 100 caracteres."} })} />
                {errors.servicoId && <Form.Text className="invalid-feedback">{errors.servicoId.message}</Form.Text>}
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Realizada</Form.Label>
                <Form.Select className={errors.realizada && "is-invalid"} {...register("realizada", { required: "O status é obrigatório." })}>
                    <option value={false}>Não</option>
                    <option value={true}>Sim</option>
                </Form.Select>
                {errors.realizada && <Form.Text className="invalid-feedback">{errors.realizada.message}</Form.Text>}
            </Form.Group>

            <Button variant="primary" type="submit">
                Agendar
            </Button>
        </Form>
    </div>
    );
}