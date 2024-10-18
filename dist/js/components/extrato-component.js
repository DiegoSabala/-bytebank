import Conta from "../types/Conta";
import { currencyFormatter, dateFormatter } from "../utils/formatters";
function extratoUpdate() {
    let transacoes = Conta.getRegistroDeTransacoes();
    let i = 0;
    while (i < transacoes.length) {
        let tipoElement = document.querySelector(".transacoes-group .tipo");
        let valorElement = document.querySelector(".transacoes-group .valor");
        let dataElement = document.querySelector(".transacoes-group .data");
        tipoElement.textContent = transacoes[i].tipoTransacao;
        valorElement.textContent = currencyFormatter(transacoes[i].valor);
        dataElement.textContent = dateFormatter(transacoes[i].data);
        i++;
    }
}
