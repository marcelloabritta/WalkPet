import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import "./style.css";

const LoginForm = () => {
  const { login } = useContext(UserContext);
  const navigate = useNavigate();
  const [nomeUsuario, setNomeUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8081/api/passeadores");

      if (!response.ok) {
        throw new Error("Erro ao conectar com o servidor");
      }

      const data = await response.json();
      const passeadores = data.$values || data;

      const user = passeadores.find(
        (p) => p.username === nomeUsuario && p.senha === senha
      );

      if (user) {
        const userForContext = {
          nomeUsuario: user.username,
          nome: user.nome,
          email: user.email,
          senha: user.senha,
          descricao: user.descricao,
          curiosidades: user.curiosidades,
          cidade: user.cidade,
          estado: user.estado,
          preco: user.preco,
          foto: user.foto,
          cpf: user.cpf,
          distancia: user.distancia,
          avaliacoes: user.avaliacoes || [],
        };

        localStorage.setItem("loggedInUser", JSON.stringify(userForContext));
        login(userForContext);
        navigate("/");
      } else {
        setError("Nome de usuário ou senha incorretos.");
      }
    } catch (error) {
      console.error("Erro no login:", error);
      setError("Erro de conexão. Tente novamente.");
    }
  };

  return (
    <div className="signIn-container">
      <form className="signIn-form" onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Nome de Usuário"
          value={nomeUsuario}
          onChange={(e) => setNomeUsuario(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
        <Link to="/cadastro" className="cadastro-link">
          Cadastre-se
        </Link>
        <button type="submit" className="signin-btn">
          Entrar
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
};

export default LoginForm;
