import { createStore } from "vuex";
import axios from 'axios'
import ILocacao from '@/interfaces/ILocacao';

export type State = {
    locacoes: ILocacao[];
    search: string;
    type: string;
    // locacao
    locacaoLocal: ILocacao;

}

const state: State = {
    locacoes: [],
    search: '',
    type: 'all',
    // locacao
    locacaoLocal: {
        id: 0,
        nome: '',
        endereco: '',
        contato: '',
        descricao: '',
        preco: 0,
        data: new Date(),
        tipoAlocacao: [],
        tipoImovel: 'República',
        pessoas: 0,
        foto: '',
        email: '',
    } as ILocacao
}

export const store = createStore({
    state,
    mutations: {
        setLocacoes(state: State, locacoes: ILocacao[]) {
            state.locacoes = locacoes;
        },
        addLocacao(state: State, locacao: ILocacao) {
            state.locacoes.push(locacao);
        },
        updateLocacao(state: State, locacao: ILocacao) {
            const index = state.locacoes.findIndex(l => l.id === locacao.id);
            state.locacoes[index] = locacao;
        },
        removeLocacao(state: State, locacao: ILocacao) {
            const index = state.locacoes.findIndex(l => l.id === locacao.id);
            state.locacoes.splice(index, 1);
        },
        setSearch(state: State, search: string) {
            state.search = search;
        },
        setType(state: State, type: string) {
            state.type = type;
        },
        // locacao
        setLocacaoLocal(state: State, locacao: ILocacao) {
            state.locacaoLocal = locacao;
        },
        clearLocacaoLocal(state: State) {
            state.locacaoLocal = {
                id: 0,
                nome: '',
                endereco: '',
                contato: '',
                descricao: '',
                preco: 0,
                data: new Date(),
                tipoAlocacao: [],
                tipoImovel: 'República',
                pessoas: 0,
                foto: ''
            } as ILocacao
        },
        setLocacaoLocalNome(state: State, nome: string) {
            state.locacaoLocal.nome = nome;
        },
        setLocacaoLocalEndereco(state: State, endereco: string) {
            state.locacaoLocal.endereco = endereco;
        },
        setLocacaoLocalContato(state: State, contato: string) {
            state.locacaoLocal.contato = contato;
        },
        setLocacaoLocalDescricao(state: State, descricao: string) {
            state.locacaoLocal.descricao = descricao;
        },
        setLocacaoLocalPreco(state: State, precos: number) {
            state.locacaoLocal.preco = precos;
        },
        setLocacaoLocalData(state: State, data: Date) {
            state.locacaoLocal.data = data;
        },
        setLocacaoLocalTipoAlocacao(state: State, tipo: []) {
            state.locacaoLocal.tipoAlocacao = tipo;
        },
        setLocacaoLocalTipoImovel(state: State, tipo: string) {
            state.locacaoLocal.tipoImovel = tipo;
        },
        setLocacaoLocalPessoas(state: State, pessoas: number) {
            state.locacaoLocal.pessoas = pessoas;
        },
        setLocacaoLocalFoto(state: State, foto: string) {
            state.locacaoLocal.foto = foto;
        },
        setLocacaoLocalEmail(state: State, email: string) {
            state.locacaoLocal.email = email;
        }


    },
    actions: {
        async getLocacoes({ commit }) {
            const response = await axios.get('http://localhost:3000/locacoesV2');            
            commit('setLocacoes', response.data);
        },
    },
    getters: {
        getLocacoesData(state: State) {
            return state.locacoes;
        },
        getLocacaoById(state: State, id: number) {
            return state.locacoes.find(l => l.id === id);
        },
        getSearchData(state: State) {
            return state.search;
        },
        getTypeData(state: State) {
            return state.type;
        },
        // locacao
        getLocacaoLocal(state: State) {
            return state.locacaoLocal;
        },
        getLocacaoLocalNome(state: State) {
            return state.locacaoLocal.nome;
        },
        getLocacaoLocalEndereco(state: State) {
            return state.locacaoLocal.endereco;
        },
        getLocacaoLocalContato(state: State) {
            return state.locacaoLocal.contato;
        },
        getLocacaoLocalDescricao(state: State) {
            return state.locacaoLocal.descricao;
        },
        getLocacaoLocalPreco(state: State) {
            return state.locacaoLocal.preco;
        },
        getLocacaoLocalData(state: State) {
            return state.locacaoLocal.data;
        },
        getLocacaoLocalTipoAlocacao(state: State) {
            return state.locacaoLocal.tipoAlocacao;
        },
        getLocacaoLocalTipoImovel(state: State) {
            return state.locacaoLocal.tipoImovel;
        },
        getLocacaoLocalPessoas(state: State) {
            return state.locacaoLocal.pessoas;
        },
        getLocacaoLocalFoto(state: State) {
            return state.locacaoLocal.foto;
        },
        getLocacaoLocalEmail(state: State) {
            return state.locacaoLocal.email;
        }



    },
    modules: {
    }
});
