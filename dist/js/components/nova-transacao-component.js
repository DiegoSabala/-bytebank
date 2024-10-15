import { TipoTransacao } from "../types/enums.js";
import { getSaldo, saldoUpdate } from "./saldo-component.js";
//ACESSANDO O FORMULÁRIO E VERIFICANDO SE ESTÁ PREENCHIDO
const elementoFormulario = document.querySelector('.block-nova-transacao form');
//addEventListener --> PARA OUVIR O CLIQUE DO BOTÃO
elementoFormulario.addEventListener('submit', function (event) {
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
    let data = new Date(inputData.value);
    let saldo = getSaldo();
    if (tipoTransacao === TipoTransacao.DEPOSITO) {
        saldo += valor;
    }
    else if (tipoTransacao === TipoTransacao.TRANFERENCIA || tipoTransacao === TipoTransacao.PAGAMENTO_BOLETO) {
        saldo -= valor;
    }
    else {
        alert('Tipo de transação inválida');
        return;
    }
    saldoUpdate(saldo);
    //CRIANDO O OBJETO DA TRANSAÇÃO
    const novaTransacao = {
        tipoTransação: tipoTransacao,
        valor: valor,
        data: data
    };
    console.log(novaTransacao);
    elementoFormulario.reset();
});
