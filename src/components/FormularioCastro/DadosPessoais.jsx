import React, {useState, useContext} from 'react';
import { TextField, Button, Switch, FormControlLabel } from "@material-ui/core";
import ValidacoesCadastro from "../../contexts/ValidacoesCadastro";
import useErros from '../../hooks/useErros';

function DadosPessoais({aoEnviar}){ //funcao retorna a renderizacao dele, ao contrario da classe, margin normal para ter espacamento entre os containers. fullwidth pra cadad container ter uma linha 
    //poderia ser function formulariocadastro(props), mas houve uma desconstrução
    const [nome, setNome] = useState(""); //useState devolve array
    const [sobrenome, setSobrenome] = useState("");
    const [cpf, setCpf] = useState("");
    const [promocoes, setPromocoes] = useState(true);
    const [novidades, setNovidades] = useState(true);

    const validacoes = useContext(ValidacoesCadastro)

    const [erros, validarCampos] = useErros(validacoes);

    function possoEnviar(){
        for(let campo in erros){
            if(!erros[campo].valido)
            {
                return false
            }
        }
        return true;
    }

    return(
        <form 
            onSubmit={(event) => {
                event.preventDefault();
                //props.aoEnviar({nome, sobrenome, cpf, novidades, promocoes}); porque nao tem mais props como parametro
                
                if(possoEnviar()){
                    aoEnviar({nome, sobrenome, cpf, novidades, promocoes});
                }
            }
        }>
            <TextField 
                value={nome}
                onChange={(event) => {
                    // setNome(event.target.value); //da erro na hora de apagar por setNome ser assincrona
                    // if(nome.length >= 3){
                    //     setNome(nome.substr(0,3)); //para definir quantos caracteres vai aceitar no forms
                    // }
                    //para fazer sem dar erro:
                    // let tmpNome = event.target.value;
                    // if(tmpNome.length >= 3){
                    //     tmpNome = tmpNome.substr(0,3);
                    // }
                    
                    // setNome(tmpNome);

                    setNome(event.target.value);
                }}
                onBlur={validarCampos}
                error={!erros.nome.valido}
                helperText={erros.nome.texto}
                id="nome" 
                label="Nome" 
                name="nome"
                variant="outlined" 
                margin="normal" 
                fullWidth 
            /> 
            <TextField
                value={sobrenome} 
                onChange={(event) => {
                    setSobrenome(event.target.value);
                }}
                id="sobrenome"
                name="sobrenome"
                label="Sobrenome" 
                variant="outlined" 
                margin="normal" 
                fullWidth 
            />

            <TextField 
                value={cpf}
                onChange={(event) => {
                    setCpf(event.target.value);
                }}
                
                onBlur={validarCampos}
                error={!erros.cpf.valido}
                helperText={erros.cpf.texto}
                id="CPF" 
                name="cpf"
                label="CPF"
                variant="outlined" 
                margin="normal" 
                fullWidth 
            />

            <FormControlLabel 
                label="Promoções" 
                control={<Switch checked={promocoes} onChange={(event)=>{
                    setPromocoes(event.target.checked) /*checked no lugar do value por ser checkbox*/
                }} name="promocoes" color="primary"/>}
            />{/*formcontrol pra poder manusear o switch*/}
            
            <FormControlLabel 
                label="Novidades" 
                control={<Switch checked={novidades} onChange={(event)=>{
                    setNovidades(event.target.checked)
                }} name="novidades" color="primary"/>}
            />
            
            <Button type="submit" variant="contained" color="primary">Próximo</Button> {/*usando o material ui pra criar um button mais bonito*/}
            
        </form>
    );
}

export default DadosPessoais;