import Conta from "../types/Conta.js";
import { DateFormat } from "../types/enums.js";
import { dateFormatter, currencyFormatter } from "../utils/formatters.js";

//ADICIONA UM VALOR NO SALDO E RETORNA NA TELA
const elementoSaldo = document.querySelector('.saldo-valor .valor') as HTMLElement;
const elementDateAccess = document.querySelector('.block-saldo time') as HTMLElement;

if (elementDateAccess != null){
    elementDateAccess.textContent = dateFormatter(Conta.getDataAcesso(), DateFormat.DIA_SEMANA_DIA_MES_ANO);
}

const saldoRender = () => {
    if (elementoSaldo != null){
        elementoSaldo.textContent = currencyFormatter(Conta.getSaldo());    
    }  
}

saldoRender();

const SaldoComponent = {
    
    update: function () { saldoRender()}

}

export default SaldoComponent;
