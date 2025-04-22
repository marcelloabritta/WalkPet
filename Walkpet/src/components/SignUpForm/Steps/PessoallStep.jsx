const PessoalStep = ({ formData, handleInputChange }) => (
    <>
      <input
        type="text"
        name="nome"
        placeholder="Nome"
        value={formData.nome}
        onChange={handleInputChange}
        required
      />
      <input
        type="text"
        name="nomeUsuario"
        placeholder="Nome de Usuário"
        value={formData.nomeUsuario}
        onChange={handleInputChange}
        required
      />
      <input
        type="text"
        name="cpf"
        placeholder="CPF"
        value={formData.cpf}
        onChange={handleInputChange}
        required
      />
    </>
  );
  
  export default PessoalStep;