import React from 'react'

const SignInButton = ({ className, onClick }) => {
    return (
        <button className={className} onClick={onClick}>
                Entrar
        </button>
    );
};

const SignUpButton = ({ className, onClick }) => {
    return (
        <button className={className} onClick={onClick}>
                Registrar-se
        </button>
    );
};

export default { SignInButton, SignUpButton };
