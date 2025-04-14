import { useState } from 'react'

const FileUpload = ( {setFoto}) => {

    const [selectedFile, setSelectedFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file.name);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
                setFoto(reader.result); 
            };
            reader.readAsDataURL(file);
        }
    };

    const clearImage = () => {
        setSelectedFile(null);
        setImagePreview(null);
        setFoto(''); // Limpa o estado da foto no componente pai
    };

    return (
        <div>
            <input
                type="file"
                name=""
                id="file-upload"
                style={{ display: 'none' }}
                onChange={handleFileChange} />
            <label htmlFor="file-upload" className='file-upload-label'>
                {selectedFile ? 'Foto Escolhida' : 'Escolher Foto'}
            </label>
            {imagePreview && (
                <div>
                    <h3>Pré-visualização:</h3>
                    <img src={imagePreview} alt="Pré-visualização" style={{ maxWidth: '200px', marginTop: '10px' }} />
                    <button onClick={clearImage}>Limpar Imagem</button>
                </div>
            )}

        </div>
    )
}

export default FileUpload
