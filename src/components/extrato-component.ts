import Conta from "../types/Conta";
import { Transacao } from "../types/Transacao";
import { currencyFormatter, dateFormatter } from "../utils/formatters";


function extratoUpdate(){
    let transacoes: Transacao[] = Conta.getRegistroDeTransacoes();
    let i: number = 0;

    while(i < transacoes.length){

        let tipoElement = document.querySelector(".transacoes-group .tipo") as HTMLElement;
        let valorElement =  document.querySelector(".transacoes-group .valor") as HTMLElement;
        let dataElement =  document.querySelector(".transacoes-group .data") as HTMLElement;

        tipoElement.textContent = transacoes[i].tipoTransacao;
        valorElement.textContent = currencyFormatter(transacoes[i].valor);
        dataElement.textContent = dateFormatter(transacoes[i].data);

        i++
    }
}