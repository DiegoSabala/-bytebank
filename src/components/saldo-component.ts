import { DateFormat, TipoTransacao } from "../types/enums.js";
import { dateFormatter, saldoFomatter } from "../utils/formatters.js";

let saldo: number = 1500;

//ADICIONA UM VALOR NO SALDO E RETORNA NA TELA
export const elementoSaldo = document.querySelector('.saldo-valor .valor') as HTMLElement;
const elementoDataAccess = document.querySelector('.block-saldo time') as HTMLElement;


if (elementoDataAccess != null){
    const data: Date = new Date();
    elementoDataAccess.textContent = dateFormatter(data, DateFormat.DIA_SEMANA_DIA_MES_ANO);
}

export const getSaldo = () => {return saldo};

export const saldoUpdate = (saldo: number) => {
    if (elementoSaldo != null){
        elementoSaldo.textContent = saldoFomatter(saldo);    
    }  
}
saldoUpdate(saldo);


