import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Root } from "./pages/Root/Root";
import { Home } from "./pages/Home/Home";
import { NovoCliente } from "./pages/NovoCliente/NovoCliente";
import { Clientes } from "./pages/Clientes/Clientes";
import { EditaCliente } from "./pages/EditaCliente/EditaCliente";
import { NovoProduto } from "./pages/NovoProduto/NovoProduto";
import { NovoServico } from "./pages/NovoServico/NovoServico";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Root />}>
          <Route path="/" element={<Home />} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/clientes/novo" element={<NovoCliente />} />
          <Route path="/produto/novo" element={<NovoProduto />} />
          <Route path="/servicos/novo" element={<NovoServico />} />
          <Route path="/clientes/editar/:id" element={<EditaCliente />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
