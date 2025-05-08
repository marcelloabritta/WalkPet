import { NumericFormat } from "react-number-format";

const ExtraStep = ({ formData, handleInputChange, setFormData }) => (
    <>
        <NumericFormat
            name="preco"
            value={formData.preco}
            thousandSeparator="."
            decimalSeparator=","
            prefix="R$ "
            decimalScale={2}
            fixedDecimalScale
            allowNegative={false}
            placeholder="Preço por hora"
            onValueChange={(values) => {
                const { floatValue } = values; 
                setFormData((prevState) => ({
                    ...prevState,
                    preco: floatValue || 0, 
                }));
            }}
        />
        <input
            type="text"
            name="descricao"
            placeholder="Descrição"
            value={formData.descricao}
            onChange={handleInputChange}
            required
        />
        <input
            type="text"
            name="curiosidades"
            placeholder="Curiosidades"
            value={formData.curiosidades}
            onChange={handleInputChange}
            required
        />
    </>
);

export default ExtraStep;
