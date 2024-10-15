import { DateFormat } from "../types/enums.js";
import { dateFormatter, saldoFomatter } from "../utils/formatters.js";
let saldo = 1500;
//ADICIONA UM VALOR NO SALDO E RETORNA NA TELA
export const elementoSaldo = document.querySelector('.saldo-valor .valor');
const elementoDataAccess = document.querySelector('.block-saldo time');
if (elementoDataAccess != null) {
    const data = new Date();
    elementoDataAccess.textContent = dateFormatter(data, DateFormat.DIA_SEMANA_DIA_MES_ANO);
}
export const getSaldo = () => { return saldo; };
export const saldoUpdate = (saldo) => {
    if (elementoSaldo != null) {
        elementoSaldo.textContent = saldoFomatter(saldo);
    }
};
saldoUpdate(saldo);
