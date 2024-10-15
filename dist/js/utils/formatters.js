import { DateFormat } from "../types/enums.js";
export function saldoFomatter(saldo) {
    return saldo.toLocaleString("pt-br", {
        currency: "BRL",
        style: "currency"
    });
}
export function dateFormatter(data, formato = DateFormat.PADRAO) {
    if (formato === DateFormat.DIA_SEMANA_DIA_MES_ANO) {
        return data.toLocaleDateString('pt-br', {
            weekday: "long",
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        });
    }
    else if (formato === DateFormat.DIA_MES) {
        return data.toLocaleDateString('pt-br', {
            day: "2-digit",
            month: "2-digit"
        });
    }
    else {
        return data.toLocaleDateString('pt-br', {
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        });
    }
}
