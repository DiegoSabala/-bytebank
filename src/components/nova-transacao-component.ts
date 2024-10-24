
import Conta from "../types/Conta.js";
import { TipoTransacao } from "../types/enums.js";
import { Transacao } from "../types/Transacao.js";
import { extratoRender } from "./extrato-component.js";
import SaldoComponent from "./saldo-component.js";

//ACESSANDO O FORMULÁRIO E VERIFICANDO SE ESTÁ PREENCHIDO
const elementoFormulario = document.querySelector('.block-nova-transacao form') as HTMLFormElement;

//addEventListener --> PARA OUVIR O CLIQUE DO BOTÃO
elementoFormulario.addEventListener('submit', function(event) {
    try {

        event.preventDefault();
        if (!elementoFormulario.checkValidity()){
            alert("Por favor preencha todos os campos da transação!");
            return;
        }
        
        //COLETANDO OS CAMPOS, QUERYSELECTOR PELO USO DA ID
        const inputTipoTransação = elementoFormulario.querySelector('#tipoTransacao') as HTMLSelectElement;
        const inputValor = elementoFormulario.querySelector('#valor') as HTMLInputElement;
        const inputData = elementoFormulario.querySelector('#data') as HTMLInputElement;
        
        let tipoTransacao: TipoTransacao = inputTipoTransação.value as TipoTransacao;
        let valor: number = inputValor.valueAsNumber;
        let data: Date = new Date(inputData.value);
        
        //CRIANDO O OBJETO DA TRANSAÇÃO
        const novaTransacao: Transacao = {
            tipoTransacao: tipoTransacao,
            valor: valor,
            data: data
        }
        
        Conta.registrarTransacao(novaTransacao);
        SaldoComponent.update();
        extratoRender();
        
        // Conta.novoRegistroDeTransacao(novaTransacao);
        
        elementoFormulario.reset();
    }
    catch (erro) {
        erro instanceof Error ? alert (erro.message) : alert('Ocorreu um erro inesperado!');
    };
}); 