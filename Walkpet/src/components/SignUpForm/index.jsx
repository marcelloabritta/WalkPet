import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FileUpload from "../FileUpload";
import "../SignUpForm/style.css";
import axios from "axios";
import { Passeador } from "../../models/passeador";


const SignUpForm = () => {
  const navigate = useNavigate();
  const [estados, setEstados] = useState([]);
  const [cidades, setCidades] = useState([]);
  const [buscaCidade, setBuscaCidade] = useState("");

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
      cidade,
      estado,
      preco,
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
      cidade,
      estado,
      preco
    });
    localStorage.setItem("users", JSON.stringify(storedUsers));

    alert("Usuário cadastrado com sucesso!");
    navigate("/");
  };

  return (
    <div className="signUp">
      <form className="signUp-form" onSubmit={handleSignup}>
        <div className="form">

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

        <select
          name="estado"
          value={estado}
          onChange={handleInputChange}
          required
        >
          <option value="">Selecione um estado</option>
          {estados.map((uf) => (
            <option key={uf.id} value={uf.sigla}>
              {uf.sigla}
            </option>
          ))}
        </select>


        <div className="autocomplete-container">
          <input
            type="text"
            name="cidade"
            placeholder="Digite sua cidade..."
            value={cidade}
            onChange={(e) => {
              setFormData({ ...formData, cidade: e.target.value });
              setBuscaCidade(e.target.value);
            }}
            autoComplete="off"
            disabled={!estado}
            required
          />
          {buscaCidade && cidade.length > 0 && (
            <ul className="sugestoes-cidade">
              {cidades
                .filter((c) =>
                  c.nome.toLowerCase().includes(buscaCidade.toLowerCase())
                )
                .slice(0, 5)
                .map((c) => (
                  <li
                    key={c.id}
                    onClick={() => {
                      setFormData({ ...formData, cidade: c.nome });
                      setBuscaCidade("");
                    }}
                  >
                    {c.nome}
                  </li>
                ))}
            </ul>
          )}
        </div>


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
        </div>
        <FileUpload
          setFoto={(file) => setFormData({ ...formData, foto: file })}
        />
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default SignUpForm;
