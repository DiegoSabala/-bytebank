import { TipoTransacao } from "./enums.js";
import { Transacao } from "./Transacao.js";

let saldo: number =  3000;
let registroDeTransacoes : Transacao[] = [];

function debitar(valor: number): void{
    if(valor <= 0){
        throw new Error('O valor a ser debitado deve ser maior que zero!', {cause: 'erro em debitar()if(valor<=0)'});
    } else if (valor > saldo) {
        throw new Error('Saldo insuficiente!', {cause: 'erro em debitar else if(valor>saldo)'});
    }
    saldo -= valor;
};

function depositar(valor: number): void{
    if(valor <= 0){
        throw new Error('O valor a ser debitado deve ser maior que zero!', {cause: 'erro em depositar()'})
    }
    saldo += valor;
};

const Conta = {

    getRegistroDeTransacoes(): Transacao[] { return registroDeTransacoes },

    getDataAcesso(): Date { return new Date },

    getSaldo(): number { return saldo },
    
    novoRegistroDeTransacao(novaTransacao: Transacao): void{
        registroDeTransacoes.push(novaTransacao);
    },

    registrarTransacao(novaTransacao: Transacao):void {

        if (novaTransacao.tipoTransacao === TipoTransacao.DEPOSITO){
            depositar(novaTransacao.valor);
        }
        else if (novaTransacao.tipoTransacao === TipoTransacao.TRANFERENCIA || novaTransacao.tipoTransacao === TipoTransacao.PAGAMENTO_BOLETO){
            debitar(novaTransacao.valor);
        }
        else {
            throw new Error('Tipo de transação inválida', {cause: 'erro em registrarTransacao()'});
        }
    }
}

export default Conta;



