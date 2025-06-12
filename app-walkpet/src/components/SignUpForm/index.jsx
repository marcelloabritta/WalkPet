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
      setErrorMessage("");
    }
  };

  useEffect(() => {
    setErrorMessage("");
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

  const handleSignup = async (e) => {
    e.preventDefault();

    if (senha !== confirmarSenha) {
      alert("As senhas não coincidem!");
      return;
    }

    try {
      const response = await fetch("http://localhost:8081/api/passeadores", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome,
          cpf,
          username: nomeUsuario,
          email,
          senha,
          descricao: descricao || "Descrição padrão", 
          curiosidades: curiosidades || "Sem curiosidades", 
          cidade,
          estado,
          distancia: "0 km", 
          preco: parseFloat(preco) || 0, 
          foto: foto || defaultProfile,
        }),
      });

      if (response.ok) {
        alert("Usuário cadastrado com sucesso!");
        navigate("/login");
      } else if (response.status === 409) {
        alert("CPF ou email já cadastrado!");
      } else {
        const errorText = await response.text();
        console.error("Erro detalhado:", errorText);
        alert("Erro no cadastro! Verifique os dados.");
      }
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro de conexão!");
    }
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
