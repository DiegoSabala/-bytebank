import { TipoTransacao } from "../types/enums.js";
import { Transacao } from "../types/Transacao.js";
import { getSaldo, saldoUpdate } from "./saldo-component.js";


//ACESSANDO O FORMULÁRIO E VERIFICANDO SE ESTÁ PREENCHIDO
const elementoFormulario = document.querySelector('.block-nova-transacao form') as HTMLFormElement;

//addEventListener --> PARA OUVIR O CLIQUE DO BOTÃO
elementoFormulario.addEventListener('submit', function(event) {
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
    let saldo: number = getSaldo();

    if (tipoTransacao === TipoTransacao.DEPOSITO){
        saldo += valor;
    } else if (tipoTransacao === TipoTransacao.TRANFERENCIA || tipoTransacao === TipoTransacao.PAGAMENTO_BOLETO){
        saldo -= valor;
    } else {
        alert('Tipo de transação inválida');
        return;
    }
    
    saldoUpdate(saldo);

//CRIANDO O OBJETO DA TRANSAÇÃO
    const novaTransacao: Transacao = {
        tipoTransação: tipoTransacao,
        valor: valor,
        data: data
    }
    console.log(novaTransacao);
    elementoFormulario.reset();
}); 