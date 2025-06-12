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
      const response = await fetch(
        "http://localhost:8081/api/passeadores/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: nomeUsuario,
            senha: senha,
          }),
        }
      );

      if (!response.ok) {
        setError("Nome de usuário ou senha incorretos.");
        return;
      }

      const loginResponse = await response.json();

      // Salvar token no localStorage
      localStorage.setItem("authToken", loginResponse.token);
      localStorage.setItem("tokenExpiry", loginResponse.expiresAt);

      const userForContext = {
        nomeUsuario: loginResponse.passeador.username,
        nome: loginResponse.passeador.nome,
        email: loginResponse.passeador.email,
        descricao: loginResponse.passeador.descricao,
        curiosidades: loginResponse.passeador.curiosidades,
        cidade: loginResponse.passeador.cidade,
        estado: loginResponse.passeador.estado,
        preco: loginResponse.passeador.preco,
        foto: loginResponse.passeador.foto,
        avaliacoes: loginResponse.passeador.avaliacoes || [],
      };

      localStorage.setItem("loggedInUser", JSON.stringify(userForContext));
      login(userForContext);
      navigate("/");
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
