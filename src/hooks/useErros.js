import React, {useState} from 'react';

function useErros(validacoes){
    const estadoInicial = criarEstadoInicial(validacoes);
    const [erros, setErros] = useState(estadoInicial);
    
    function validarCampos(event){
        const {name, value} = event.target;        
        const novoEstado = {...erros}
        novoEstado[name] = validacoes[name](value);
        setErros(novoEstado);
    }
    
    return [erros, validarCampos];
}

function criarEstadoInicial(validacoes){
    const estadoInicial = {};

    for(let campo in validacoes){
        estadoInicial[campo] = {valido: true, texto:""};
    }

    return estadoInicial;
}

export default useErros;