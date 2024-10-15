import { TipoTransacao } from "./enums.js";

export type Transacao = {
    tipoTransação: TipoTransacao;
    valor: number;
    data: Date;
}