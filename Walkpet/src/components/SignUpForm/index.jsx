import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FileUpload from "../FileUpload";
import "../SignUpForm/style.css";
import axios from "axios";
import { Passeador } from "../../models/passeador";
import defaultProfile from "../../assets/profilePic.png"
import PessoalStep from "./Steps/PessoallStep";
import LoginStep from "./Steps/LoginStep";
import LocalizacaoStep from "./Steps/LocalizacaoStep";
import ExtraStep from "./Steps/ExtraStep";


const SignUpForm = () => {
  const navigate = useNavigate();
  const [estados, setEstados] = useState([]);
  const [cidades, setCidades] = useState([]);
  const [buscaCidade, setBuscaCidade] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    nome: "",
    nomeUsuario: "",
    cpf: "",
    email: "",
    senha: "",
    confirmarSenha: "",
    descricao: "",
    curiosidades: "",
    cidade: "",
    estado: "",
    preco: "",
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
    cidade,
    estado,
    preco,
    foto,
  } = formData;

  useEffect(() => {
    axios.get("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
      .then(response => {
        const estadosOrdenados = response.data.sort((a, b) => a.nome.localeCompare(b.nome));
        setEstados(estadosOrdenados);
      })
  }, []);

  useEffect(() => {
    if (estado) {
      axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estado}/municipios`)
        .then(response => {
          const cidadesOrdenadas = response.data.sort((a, b) => a.nome.localeCompare(b.nome));
          setCidades(cidadesOrdenadas);
        });
    } else {
      setCidades([]);
    }
  }, [estado]);


    

  const steps = ["Pessoal", "Login", "Localização", "Extras"];
  const [stepAtual, setStepAtual] = useState(0);

  const isStepValid = () => {
    switch (stepAtual) {
      case 0:
        if (!nome || !nomeUsuario || !cpf) {
          setErrorMessage("Por favor, preencha todos os campos obrigatórios.");
          return false;
        }
        setErrorMessage(""); // Limpa a mensagem de erro
        return true;
      case 1:
        if (!email || !senha || !confirmarSenha) {
          setErrorMessage("Por favor, preencha todos os campos obrigatórios.");
          return false;
        }
        if (senha !== confirmarSenha) {
          setErrorMessage("As senhas não coincidem!");
          return false;
        }
        setErrorMessage(""); // Limpa a mensagem de erro
        return true;
      case 2:
        if (!estado || !cidade.trim()) {
          setErrorMessage("Por favor, selecione um estado e uma cidade.");
          return false;
        }
        setErrorMessage(""); // Limpa a mensagem de erro
        return true;
      case 3:
        if (!preco) {
          setErrorMessage("Por favor, preencha o campo de preço.");
          return false;
        }
        setErrorMessage(""); // Limpa a mensagem de erro
        return true;
      default:
        return false;
    }
  };

  const nextStep = () => {
    const valid = isStepValid();
    if (valid) {
      setStepAtual(stepAtual + 1);
      setErrorMessage(""); // Limpa a mensagem de erro ao avançar para o próximo passo
    }
  };

  useEffect(() => {
    setErrorMessage(""); // Limpa a mensagem de erro toda vez que a etapa muda
  }, [stepAtual]);

  const prevStep = () => {
    if (stepAtual > 0) setStepAtual(stepAtual - 1);
  };

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

    if (!isStepValid()) {
      alert("Por favor, preencha todos os campos obrigatórios.");
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
      cidade,
      estado,
      null,
      preco,
      foto || defaultProfile,
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
      curiosidades,
      cidade,
      estado,
      preco,
      foto: foto || defaultProfile,
    });
    localStorage.setItem("users", JSON.stringify(storedUsers));

    alert("Usuário cadastrado com sucesso!");
    navigate("/");
  };

  return (
    <div className="signUp">
      <div className="progress-container">
          <p className="progress-text">Etapa {stepAtual + 1} de {steps.length}</p>
          <div className="progress">
          <div className="progress-bar" style={{ width: `${((stepAtual + 1) / steps.length) * 100}%` }}></div>
          </div>
        </div>

      <form className="signUp-form" onSubmit={handleSignup} onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}>
        <div className="form">
          {stepAtual === 0 && (
            <>
              <PessoalStep formData={formData} handleInputChange={handleInputChange}/>
            </>
          )}

          {stepAtual === 1 && (
            <>
              <LoginStep formData={formData} handleInputChange={handleInputChange}/>
            </>
          )}

          {stepAtual === 2 && (
            <>
              <LocalizacaoStep 
              formData={formData}
              handleInputChange={handleInputChange}
              estados={estados}
              cidades={cidades}
              buscaCidade={buscaCidade}
              setBuscaCidade={setBuscaCidade}/>
            </>
          )}

          {stepAtual === 3 && (
            <>
              <ExtraStep formData={formData} handleInputChange={handleInputChange} setFormData={setFormData} />
            </>
          )}
        </div>

      
      <div className="navegacao">
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        {stepAtual > 0 && (
          <button type="button" onClick={prevStep} className="voltar">
            Voltar
          </button>
        )}

        {stepAtual < steps.length - 1 ? (
          <button type="button" onClick={nextStep} className="avancar">
            Avançar
          </button>
        ) : (
          <div className="signUp-form">
            <FileUpload
              setFoto={(file) => setFormData({ ...formData, foto: file })}
            />
            <button type="submit" className="form-btn">Cadastrar</button>
          </div>
        )}
      </div>
      </form>
    </div>
  );
};

export default SignUpForm;
