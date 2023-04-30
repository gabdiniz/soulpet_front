import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
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
    <><Container>
      {cliente !== null && (
        <>
          <h2>{cliente.nome}</h2>
          <h3>Informações de contato:</h3>
          <p>E-mail: {cliente.email}</p>
          <p>Telefone: {cliente.telefone}</p>
          <h3>Endereço:</h3>
          <p>UF: {endereco.uf}</p>
          <p>Cidade: {endereco.cidade}</p>
          <p>CEP: {endereco.cep}</p>
          <p>Rua: {endereco.rua}</p>
          <p>Número: {endereco.numero}</p>
          <h3>Pets:</h3>
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
          )}
        </>
      )}</Container>
    </>
  );
}
