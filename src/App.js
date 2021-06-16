import React, { Component } from 'react';
import './App.css';
import FormularioCadastro from './components/FormularioCastro/FormularioCadastro';
import { Container, Typography } from '@material-ui/core';
import 'fontsource-roboto';
import {validarCPF, validarSenha} from "./models/cadastro";
import ValidacoesCadastro from "./contexts/ValidacoesCadastro";

class App extends Component { //maswidth sm pro container nao tomar realmente a linha toda
  render(){
    return (
      <Container component="article" maxWidth="sm">
        <Typography variant="h3" component="h1" align="center">Formulario de Cadastro</Typography>
        <ValidacoesCadastro.Provider value={{cpf:validarCPF, senha:validarSenha, nome:validarSenha}}>
          <FormularioCadastro aoEnviar={aoEnviarForm}/>
        </ValidacoesCadastro.Provider>        
      </Container>      
    );
  }  
}

function aoEnviarForm(dados){
  console.log(dados);
}

export default App;
