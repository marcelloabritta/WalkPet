import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SignInForm from "../../components/SignInForm";
import loginImg from '../../assets/LoginIMG.png'
import "../Login/style.css";
import desenhoLogin from '../../assets/DesenhoLogin.png'
import patas from "../../assets/patas.png"


const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      navigate("/perfil");
    }
  }, [navigate]);

  return (
    <div className="signin-container">
      <div className="signin-left">
        <img src={desenhoLogin} alt="" />
      </div>
      <div className="login">
        <img src={loginImg} alt="Dog Paw" />
        <div className="container-cadastro">
          <SignInForm />
        </div>
      </div>
        <div className="signin-right">
          <img src={patas} alt="" />
        </div>
    </div>
  );
};

export default Login;

import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const login = async (credentials) => {
   
  };

  return (
    <AuthContext.Provider value={{ user, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);