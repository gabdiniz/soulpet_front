import axios from "axios";
import { useEffect, useState } from "react";

function App() {
    const [ufs, setUfs] = useState([]);
    const [cidades, setCidades] = useState([]);
    const [selecionarUf, setSelecionarUf] = useState("0");
    const [selecionarCidade, setSelecionarCidade] = useState("0");

    useEffect(() => {
        if (selecionarUf === "0") {
            return;
        }
        axios
            .get(
                `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selecionarUf}/municipios`
            )
            .then((response) => {
                setCidades(response.data);
            });
    }, [selecionarUf]);

    useEffect(() => {
        axios
            .get("https://servicodados.ibge.gov.br/api/v1/localidades/estados/")
            .then((response) => {
                setUfs(response.data);
            });
    }, []);

    function handleSelecionarUf(event) {
        const uf = event.target.value;
        setSelecionarUf(uf);
    }

    function handleSelecionarCidade(event) {
        const cidade = event.target.value;
        setSelecionarCidade(cidade);
    }

    return (
        <>
            <h1>Seletor de UF e Cidade</h1>
            <div className="container">
                <select name="uf" id="uf" onChange={handleSelecionarUf}>
                    <option value="0">Selecione uma UF</option>
                    {ufs.map((uf) => (
                        <option key={uf.sigla} value={uf.sigla}>
                            {uf.nome}
                        </option>
                    ))}
                </select>

                <select
                    name="cidade"
                    id="cidade"
                    value={selecionarCidade}
                    onChange={handleSelecionarCidade}
                >
                    <option value="0">Selecione uma cidade</option>
                    {cidades.map((cidade) => (
                        <option key={cidade.id} value={cidade.nome}>
                            {cidade.nome}
                        </option>
                    ))}
                </select>
            </div>
        </>
    );
}

export default App;