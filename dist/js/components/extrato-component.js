import Conta from "../types/Conta.js";
import { DateFormat } from "../types/enums.js";
import { currencyFormatter, dateFormatter } from "../utils/formatters.js";
const elementoRegistroTransacoesExtrato = document.querySelector(".extrato .registro-transacoes");
extratoRender();
function extratoRender() {
    const gruposTransacoes = Conta.getGruposTransacoes();
    //CASO NÃO HÁ TRANSAÇÕES ARMAZENADAS
    if (!gruposTransacoes.length) {
        elementoRegistroTransacoesExtrato.innerHTML = "<div>Não há transações registradas.</div>";
        return;
    }
    elementoRegistroTransacoesExtrato.innerHTML = "";
    let htmlRegistroTransacoes = "";
    for (let grupoTransacoes of gruposTransacoes) {
        let htmlTransacaoItem = "";
        for (let transacao of grupoTransacoes.transacoes) {
            htmlTransacaoItem += `
            <div class="transacao-item">
                <div class="transacao-info"> 
                    <span class="tipo">${transacao.tipoTransacao}</span>
                    <strong class="valor">${currencyFormatter(transacao.valor)}</strong>
                </div>
                <time class="data">${dateFormatter(transacao.data, DateFormat.DIA_MES)}</time>
            </div>
            `;
        }
        htmlRegistroTransacoes += `
        <div class="registro-transacoes">
            <div class="transacoes-group">
                <strong class="mes-group">${grupoTransacoes.label}</strong>
                ${htmlTransacaoItem}
        </div>
        `;
    }
    elementoRegistroTransacoesExtrato.innerHTML = htmlRegistroTransacoes;
}
const ExtratoComponent = {
    update() {
        extratoRender();
    }
};
export default ExtratoComponent;
