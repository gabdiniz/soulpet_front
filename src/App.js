import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Root } from "./pages/Root/Root";
import { Home } from "./pages/Home/Home";
import { NovoCliente } from "./pages/NovoCliente/NovoCliente";
import { Clientes } from "./pages/Clientes/Clientes";
import { EditaCliente } from "./pages/EditaCliente/EditaCliente";
import { NovoProduto } from "./pages/NovoProduto/NovoProduto";
import { NovoServico } from "./pages/NovoServico/NovoServico";
import { NovoPet } from "./pages/NovoPet/NovoPet";
import { Produtos } from "./pages/Produtos/Produtos";
import { Servicos } from "./pages/Servicos/Servicos";
import { Pets } from "./pages/Pets/Pets";
import { EditaPet } from "./pages/EditaPet/EditaPet";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Root />}>
          <Route path="/" element={<Home />} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/produtos" element={<Produtos />} />
          <Route path="/servicos" element={<Servicos />} />
          <Route path="/clientes/novo" element={<NovoCliente />} />
          <Route path="/produto/novo" element={<NovoProduto />} />
          <Route path="/servicos/novo" element={<NovoServico />} />
          <Route path="/clientes/editar/:id" element={<EditaCliente />} />
          <Route path="/pets/novo" element={<NovoPet />} />
          <Route path="/pets" element={<Pets />} />
          <Route path="/pets/editar/:id" element={<EditaPet />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
