const LoginStep = ({ formData, handleInputChange }) => (
    <>
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleInputChange}
        required
      />
      <input
        type="password"
        name="senha"
        placeholder="Senha"
        value={formData.senha}
        onChange={handleInputChange}
        required
      />
      <input
        type="password"
        name="confirmarSenha"
        placeholder="Confirmar Senha"
        value={formData.confirmarSenha}
        onChange={handleInputChange}
        required
      />
    </>
  );
  
  export default LoginStep;