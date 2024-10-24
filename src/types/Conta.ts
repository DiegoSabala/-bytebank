import { TipoTransacao } from "./enums.js";
import { GrupoTransacao } from "./GrupoTransacao.js";
import { Transacao } from "./Transacao.js";

//O localSotorage.getItem RETORNA O VALOR SOB A KEY SALDO NO ARMAZENAMENTO LOCAL
let saldo: number = JSON.parse(localStorage.getItem('saldo')) || 0;

//O JSON.parse TRANSFORMA UMA STRING JSON NUM FORMATO JS CORRESPONDENTE
//O SEGUNDO PARÂMETRO EXISTE PARA FORMATAÇÕES MAIS ESPECÍFICAS
const transacoes : Transacao[] = JSON.parse(localStorage.getItem('transacoes'), 
(key: string, value: string) => {
    if (key === 'data') return new Date(value);
    return value;
}) || [];

function debitar(valor: number): void{
    if(valor <= 0){
        throw new Error('O valor a ser debitado deve ser maior que zero!', {cause: 'erro em debitar()if(valor<=0)'});
    } else if (valor > saldo) {
        throw new Error('Saldo insuficiente!', {cause: 'erro em debitar else if(valor>saldo)'});
    }
    saldo -= valor;  

//O localSotorage.SetItem SALVA O VALOR SOB A KEY SALDO NO ARMAZENAMENTO LOCAL, NESTE CASO ATUALIZA COM O NOVO VALOR.
//O toString() É USADO AQUI PORQUE O STORAGE SALVARÁ COMO STRING -> {"saldo": "1400"}
    localStorage.setItem("saldo",  saldo.toString());
};

function depositar(valor: number): void{
    if(valor <= 0){
        throw new Error('O valor a ser depositado deve ser maior que zero!!', {cause: 'erro em depositar()'})
    }
    saldo += valor;
    localStorage.setItem("saldo", saldo.toString());
};

const Conta = {

    getDataAcesso(): Date { return new Date },
    
    getSaldo(): number { return saldo },

    getGruposTransacoes(): GrupoTransacao[] { 
        const gruposTransacoes: GrupoTransacao[] = [];

        //CLONANDO O ARRAY COM O window.structuredClone()
        const listaTransacoes: Transacao[] = structuredClone(transacoes);

        //ORDENANDO COM O SORT DO MAIS NOVO PARA O MAIS ANTIGO
        const transacoesOrdenadas: Transacao[] = listaTransacoes.sort((t1, t2) => t2.data.getTime() - t1.data.getTime());
        let labelAtualGrupoTransacao : string = "";

        for(let transacao of transacoesOrdenadas) {
            let labelGrupoTransacao: string = transacao.data.toLocaleDateString("pt-br", {month: "long", year: "numeric"});

            if (labelAtualGrupoTransacao != labelGrupoTransacao){
                labelAtualGrupoTransacao = labelGrupoTransacao;
                gruposTransacoes.push({
                    label: labelGrupoTransacao,
                    transacoes: [],
                });
            }
            gruposTransacoes.at(-1).transacoes.push(transacao);
        }
        return gruposTransacoes;
    },

    registrarTransacao(novaTransacao: Transacao): void {

        if (novaTransacao.tipoTransacao === TipoTransacao.DEPOSITO){
            depositar(novaTransacao.valor);
        }
        else if (novaTransacao.tipoTransacao === TipoTransacao.TRANFERENCIA || novaTransacao.tipoTransacao === TipoTransacao.PAGAMENTO_BOLETO){
            debitar(novaTransacao.valor);
        }
        else {
            throw new Error('Tipo de transação inválida', {cause: 'erro em registrarTransacao()'});
        }

        transacoes.push(novaTransacao);
        console.log(this.getGruposTransacoes());
        localStorage.setItem('transacoes', JSON.stringify(transacoes));
    },
}

export default Conta;



