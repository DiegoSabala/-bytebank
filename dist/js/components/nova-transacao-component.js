import Conta from "../types/Conta.js";
import ExtratoComponent from "./extrato-component.js";
import SaldoComponent from "./saldo-component.js";
//ACESSANDO O FORMULÁRIO E VERIFICANDO SE ESTÁ PREENCHIDO
const elementoFormulario = document.querySelector('.block-nova-transacao form');
//addEventListener --> PARA OUVIR O CLIQUE DO BOTÃO
elementoFormulario.addEventListener('submit', function (event) {
    try {
        event.preventDefault();
        if (!elementoFormulario.checkValidity()) {
            alert("Por favor preencha todos os campos da transação!");
            return;
        }
        //COLETANDO OS CAMPOS, QUERYSELECTOR PELO USO DA ID
        const inputTipoTransação = elementoFormulario.querySelector('#tipoTransacao');
        const inputValor = elementoFormulario.querySelector('#valor');
        const inputData = elementoFormulario.querySelector('#data');
        let tipoTransacao = inputTipoTransação.value;
        let valor = inputValor.valueAsNumber;
        let data = new Date(inputData.value + " 00:00:00");
        //CRIANDO O OBJETO DA TRANSAÇÃO
        const novaTransacao = {
            tipoTransacao: tipoTransacao,
            valor: valor,
            data: data
        };
        Conta.registrarTransacao(novaTransacao);
        SaldoComponent.update();
        ExtratoComponent.update();
        // Conta.novoRegistroDeTransacao(novaTransacao);
        elementoFormulario.reset();
        ;
    }
    catch (erro) {
        erro instanceof Error ? alert(erro.message) : alert('Ocorreu um erro inesperado!');
    }
    ;
});
