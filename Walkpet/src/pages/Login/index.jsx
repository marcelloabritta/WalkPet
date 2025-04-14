import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SignInForm from "../../components/SignInForm";
import SignUpForm from "../../components/SignUpForm";
import Buttons from "../../components/SignInButton";
import dogPaw from "../../assets/pet.png";
import "../Login/style.css";

const { SignInButton, SignUpButton } = Buttons;

const Login = () => {
  const [activeButton, setActiveButton] = useState("signIn");
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      navigate("/perfil"); 
    }
  }, [navigate]);

  const renderForm = () => {
    return activeButton === "signIn" ? <SignInForm /> : <SignUpForm />;
  };

  return (
    <div className="signup-container">
      <div className="cadastro">
        <img src={dogPaw} alt="Dog Paw" />
        <div className="container-cadastro">
          <div className="top-cadastro">
            <div className="btncolor-sign">
              <SignInButton
                className={activeButton === "signIn" ? "active" : ""}
                onClick={() => setActiveButton("signIn")}
              />
              <SignUpButton
                className={activeButton === "signUp" ? "active" : ""}
                onClick={() => setActiveButton("signUp")}
              />
              <span className={`slider ${activeButton}`} />
            </div>
          </div>
          {renderForm()}
        </div>
      </div>
    </div>
  );
};

export default Login;
