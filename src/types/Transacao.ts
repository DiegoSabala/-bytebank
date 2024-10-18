import { TipoTransacao } from "./enums.js";

export type Transacao = {
    tipoTransacao: TipoTransacao;
    valor: number;
    data: Date;
}