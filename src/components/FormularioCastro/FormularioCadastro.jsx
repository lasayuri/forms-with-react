import React, {useEffect, useState} from 'react';
import DadosPessoais from './DadosPessoais';
import DadosUsuario from './DadosUsuario';
import DadosEntrega from './DadosEntrega';
import { Typography, Stepper, Step, StepLabel } from '@material-ui/core';

function FormularioCadastro({aoEnviar}){ //funcao retorna a renderizacao dele, ao contrario da classe, margin normal para ter espacamento entre os containers. fullwidth pra cadad container ter uma linha 
    const [etapaAtual, setEtapaAtual] = useState(0);
    const [dadosColetados, setDados] = useState({});

    useEffect(()=>{
        if(etapaAtual === formularios.length-1){
            aoEnviar(dadosColetados); // useEffect: com o componente atualizado, dados assincronos
        }        
    })

    // function proximo() {
    //     setEtapaAtual(etapaAtual+1);
    // }

    // function formularioAtual(etapa){
    //     switch(etapa){
    //         case 0:
    //             return <DadosUsuario aoEnviar={proximo} />;
    //         case 1:
    //             return <DadosPessoais aoEnviar={proximo} validarCPF={validarCPF} />;
    //         case 2:
    //             return <DadosEntrega aoEnviar={aoEnviar} />;
    //         default:
    //             return <Typography>Erro ao selecionar formulário</Typography>
    //     }
    // }

    const formularios = [
        <DadosUsuario aoEnviar={coletarDados} />,
        <DadosPessoais aoEnviar={coletarDados} />,
        <DadosEntrega aoEnviar={coletarDados} />,
        <Typography variant="h5">Obrigado pelo Cadastro!</Typography>
    ];

    function coletarDados(dados){
        setDados({...dadosColetados, ...dados});
        proximo();
    }
    
    function proximo(dados){
        setEtapaAtual(etapaAtual + 1);
    }

    return(
        <>
        <Stepper activeStep={etapaAtual}>
            <Step><StepLabel>Login</StepLabel></Step>
            <Step><StepLabel>Pessoal</StepLabel></Step>
            <Step><StepLabel>Entrega</StepLabel></Step>
            <Step><StepLabel>Finalização</StepLabel></Step>
        </Stepper>
        { formularios[etapaAtual] }
        {/*<DadosPessoais aoEnviar={aoEnviar} validarCPF={validarCPF} /> é um componente
        <DadosUsuario />
        <DadosEntrega />*/}
        </>
    );
}

export default FormularioCadastro;