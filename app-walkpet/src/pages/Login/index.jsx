import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import loginImg from '../../assets/LoginIMG.png';
import "../Login/style.css";
import desenhoLogin from '../../assets/DesenhoLogin.png';
import patas from "../../assets/patas.png";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/perfil");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erro ao fazer login");
      }

      localStorage.setItem("token", data.token);
      navigate("/perfil");
    } catch (err) {
      setError(err.message || "Credenciais inválidas");
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-left">
        <img src={desenhoLogin} alt="Desenho de cachorro" />
      </div>

      <div className="login">
        <img src={loginImg} alt="Logo WalkPet" className="logo" />
        
        <div className="container-cadastro">
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="password">Senha</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && <div className="error-message">{error}</div>}

            <button type="submit" disabled={isLoading}>
              {isLoading ? "Carregando..." : "Entrar"}
            </button>
          </form>
        </div>
      </div>

      <div className="signin-right">
        <img src={patas} alt="Patas de cachorro" />
      </div>
    </div>
  );
};

export default Login;