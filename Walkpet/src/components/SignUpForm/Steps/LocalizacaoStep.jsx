const LocalizacaoStep = ({
    formData,
    handleInputChange,
    estados,
    cidades,
    buscaCidade,
    setBuscaCidade,
  }) => {
  

   
    return (
      <>
        <select
          name="estado"
          value={formData.estado}
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
            value={formData.cidade}
            onChange={(e) => {
              handleInputChange(e);
              setBuscaCidade(e.target.value);
            }}
            autoComplete="off"
            disabled={!formData.estado}
            required
          />
          {buscaCidade && formData.cidade.length > 0 && (
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
                      handleInputChange({ target: { name: "cidade", value: c.nome } });
                      setBuscaCidade("");
                    }}
                  >
                    {c.nome}
                  </li>
                ))}
            </ul>
          )}
        </div>
  
      
      </>
    );
  };
  
  export default LocalizacaoStep;