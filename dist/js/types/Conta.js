import { TipoTransacao } from "./enums.js";
let saldo = 3000;
let registroDeTransacoes = [];
function debitar(valor) {
    if (valor <= 0) {
        throw new Error('O valor a ser debitado deve ser maior que zero!', { cause: 'erro em debitar()if(valor<=0)' });
    }
    else if (valor > saldo) {
        throw new Error('Saldo insuficiente!', { cause: 'erro em debitar else if(valor>saldo)' });
    }
    saldo -= valor;
}
;
function depositar(valor) {
    if (valor <= 0) {
        throw new Error('O valor a ser debitado deve ser maior que zero!', { cause: 'erro em depositar()' });
    }
    saldo += valor;
}
;
const Conta = {
    getRegistroDeTransacoes() { return registroDeTransacoes; },
    getDataAcesso() { return new Date; },
    getSaldo() { return saldo; },
    novoRegistroDeTransacao(novaTransacao) {
        registroDeTransacoes.push(novaTransacao);
    },
    registrarTransacao(novaTransacao) {
        if (novaTransacao.tipoTransacao === TipoTransacao.DEPOSITO) {
            depositar(novaTransacao.valor);
        }
        else if (novaTransacao.tipoTransacao === TipoTransacao.TRANFERENCIA || novaTransacao.tipoTransacao === TipoTransacao.PAGAMENTO_BOLETO) {
            debitar(novaTransacao.valor);
        }
        else {
            throw new Error('Tipo de transação inválida', { cause: 'erro em registrarTransacao()' });
        }
    }
};
export default Conta;
