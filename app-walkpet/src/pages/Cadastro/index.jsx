import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SignUpForm from "../../components/SignUpForm";
import cadastroImg from '../../assets/cadastroImage.png'
import "../Cadastro/style.css";


const Cadastro = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      navigate("/perfil");
    }
  }, [navigate]);

  return (
    <div className="signup">
      <h1>CADASTRE-SE</h1>
      <div className="signup-container">
        <div className="signup-left">
          <img src={cadastroImg} alt="" />
        </div>
        <div className="signup-form">
          <SignUpForm />
        </div>

      </div>
    </div>
  );
};

export default Cadastro;