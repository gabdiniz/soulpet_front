import axios from "axios";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useParams } from "react-router-dom";


export function DetalhesCliente() {
    const { id } = useParams();

  const [cliente, setCliente] = useState(null);
  const [endereco, setEndereco] = useState(null);
  const [pets, setPets] = useState([]);

  useEffect(() => {
    Promise.all([
      axios.get(`http://localhost:3001/clientes/${id}`),
    ])
      .then((responses) => {
        const cliente = responses[0].data;
        const endereco = cliente.endereco;
  
        setCliente(cliente);
        setEndereco(endereco);
      })
      .catch((error) => {
        console.log(error);
      });
  
    axios.get(`http://localhost:3001/clientes/${id}/pets`)
      .then((response) => {
        const pets = response.data;
        setPets(pets);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);
  
  
  return (
    <>
      {cliente !== null && (

  <div class="card border border-primary mt-4">

<div class="card-header bg-white py-3">
  <p class="text-center small mb-2"><h3>Detalhes do cliente</h3></p>
  
</div>

<div class="card-body">
  <ul class="list-group list-group-flush">
    <li class="list-group-item">Nome: <strong>{cliente.nome}</strong></li>
    <li class="list-group-item">Email: <strong>{cliente.email}</strong></li>
    <li class="list-group-item">Telefone: <strong>{cliente.telefone}</strong></li>
    <li class="list-group-item">Endereço: <strong>{cliente.email}</strong></li>

    <li class="list-group-item">Rua: <strong>{endereco.rua}</strong></li>
    <li class="list-group-item">Número: <strong>{endereco.numero}</strong></li>
    <li class="list-group-item">Cidade: <strong>{endereco.cidade}</strong></li>
    <li class="list-group-item">UF: <strong>{endereco.uf}</strong></li>
    <li class="list-group-item">CEP: <strong>{endereco.cep}</strong></li>
  </ul>
</div>

<div class="card-footer bg-white py-3">
<h3 className="text-center mb-2">Pets:</h3>
      {pets.length > 0 ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Porte</th>
              <th>Tipo</th>
              <th>Data de Nascimento</th>
            </tr>
          </thead>
          <tbody>
            {pets.map((pet) => {
              return (
                <tr key={pet.id}>
                  <td>{pet.nome}</td>
                  <td>{pet.porte}</td>
                  <td>{pet.tipo}</td>
                  <td>{new Date(pet.dataNasc).toLocaleDateString()}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      ) : (
        <p>O cliente não possui pets cadastrados.</p>
      )}</div>
</div>
  )}
    </>
  );
}
