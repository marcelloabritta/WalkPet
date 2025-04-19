import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Header from "./components/Header";
import Passeadores from "./pages/Passeadores";
import WalkerDetails from "./pages/WalkersDetails";
import { UserProvider } from "./context/UserContext";
import Perfil from "./pages/Perfil";
import Sobre from "./pages/SobreNos";
import Avaliacoes from "./pages/Avaliacoes";
import Contato from "./pages/Contato";
import Cadastro from "./pages/Cadastro";

function App() {
  return (
    <>
      <UserProvider>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/passeadores" element={<Passeadores />} />
            <Route
              path="/passeadores/:nomeUsuario"
              element={<WalkerDetails />}
            />
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/sobre" element={<Sobre />} />
            <Route path="/avaliacoes/:nomeUsuario" element={<Avaliacoes />} />
            <Route path="/contato" element={<Contato />} />
            <Route path="/cadastro" element={<Cadastro />}/>
          </Routes>
        </Router>
      </UserProvider>
    </>
  );
}

export default App;
