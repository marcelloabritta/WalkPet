import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FileUpload from "../FileUpload";
import "../SignUpForm/style.css";
import { Passeador } from "../../models/passeador";

const SignUpForm = () => {
  const navigate = useNavigate();
 const [formData, setFormData] = useState({
   nome: "",
   nomeUsuario: "",
   cpf: "",
   email: "",
   senha: "",
   confirmarSenha: "",
   descricao: "",
   curiosidades: "",
   foto: "",
 });

 const {
   nome,
   nomeUsuario,
   cpf,
   email,
   senha,
   confirmarSenha,
   descricao,
   curiosidades,
   foto,
 } = formData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (senha !== confirmarSenha) {
      alert("As senhas não coincidem!");
      return;
    }

    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const storedWalkers = JSON.parse(localStorage.getItem("passeadores")) || [];

    if (
      storedUsers.some(
        (user) => user.nomeUsuario === nomeUsuario || user.email === email
      ) ||
      storedWalkers.some(
        (walker) => walker.username === nomeUsuario || walker.email === email
      )
    ) {
      alert("Nome de usuário ou email já cadastrado!");
      return;
    }

     const newWalker = new Passeador(
       storedWalkers.length + 1,
       nome,
       cpf,
       nomeUsuario,
       email,
       senha,
       descricao,
       curiosidades,
       foto,
       [], // Avaliações inicialmente vazias
     );

    storedWalkers.push(newWalker);
    localStorage.setItem("passeadores", JSON.stringify(storedWalkers));

    storedUsers.push({
      nome,
      nomeUsuario,
      cpf,
      email,
      senha,
      descricao,
      foto,
      curiosidades,
    });
    localStorage.setItem("users", JSON.stringify(storedUsers));

    alert("Usuário cadastrado com sucesso!");
    navigate("/");
  };

  return (
    <div>
      <form className="signUp-form" onSubmit={handleSignup}>
        <input
          type="text"
          name="nome"
          placeholder="Nome"
          value={nome}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="nomeUsuario"
          placeholder="Nome de Usuário"
          value={nomeUsuario}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="cpf"
          placeholder="CPF"
          value={cpf}
          onChange={handleInputChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={handleInputChange}
          required
        />
        <input
          type="password"
          name="senha"
          placeholder="Senha"
          value={senha}
          onChange={handleInputChange}
          required
        />
        <input
          type="password"
          name="confirmarSenha"
          placeholder="Confirmar Senha"
          value={confirmarSenha}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="descricao"
          placeholder="Descrição"
          value={descricao}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="curiosidades"
          placeholder="Curiosidades"
          value={curiosidades}
          onChange={handleInputChange}
          required
        />
        <FileUpload
          setFoto={(file) => setFormData({ ...formData, foto: file })}
        />
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default SignUpForm;
