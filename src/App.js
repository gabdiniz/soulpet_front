import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Root } from "./pages/Root/Root";
import { Home } from "./pages/Home/Home";
import { NovoCliente } from "./pages/NovoCliente/NovoCliente";
import { Clientes } from "./pages/Clientes/Clientes";
import { EditaCliente } from "./pages/EditaCliente/EditaCliente";
import { NovoProduto } from "./pages/NovoProduto/NovoProduto";
import { NovoPedido } from "./pages/NovoPedido/NovoPedido";
import { NovoServico } from "./pages/NovoServico/NovoServico";
import { NovoPet } from "./pages/NovoPet/NovoPet";
import { Produtos } from "./pages/Produtos/Produtos";
import { Servicos } from "./pages/Servicos/Servicos";
import { Pets } from "./pages/Pets/Pets";
import { EditaPet } from "./pages/EditaPet/EditaPet";
import { EditaProduto } from "./pages/EditaProduto/EditaProduto";
import { Pedidos } from "./pages/Pedidos/Pedidos";
import { DetalhesCliente } from "./pages/DetalhesCliente/DetalheCliente";
import { EditaServico } from "./pages/EditaServico/EditaServico";
import { NovoAgendamento } from "./pages/NovoAgendamento/NovoAgendamento";
import { EditarPedido } from "./pages/EditarPedido/EditarPedido";
import { Agendamentos } from "./pages/Agendamentos/Agendamentos";
import { DetalhesPedidos } from "./pages/DetalhesPedidos/DetalhesPedidos";

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
          <Route path="/pedidos" element={<Pedidos />} />
          <Route path="/pedido/novo" element={<NovoPedido />} />
          <Route path="/pedidos/editar/:id" element={<EditarPedido />} />
          <Route path="/servicos/novo" element={<NovoServico />} />
          <Route path="/clientes/editar/:id" element={<EditaCliente />} />
          <Route path="/clientes/detalhes/:id" element={<DetalhesCliente />} />
          <Route path="/pedidos/detalhes/:id" element={<DetalhesPedidos />} />
          <Route path="/produto/editar/:id" element={<EditaProduto />} />
          <Route path="/servicos/editar/:id" element={<EditaServico />} />
          <Route path="/pets/novo" element={<NovoPet />} />
          <Route path="/pets" element={<Pets />} />
          <Route path="/pets/editar/:id" element={<EditaPet />} />
          <Route path="/agendamentos/novo" element={<NovoAgendamento />} />
          <Route path="/agendamentos" element={<Agendamentos />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
