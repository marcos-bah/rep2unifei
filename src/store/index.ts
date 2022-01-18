import { createStore } from "vuex";
import axios from 'axios'
import ILocacao from '@/interfaces/ILocacao';

export type State = {
    locacoes: ILocacao[];
}

const state: State = {
    locacoes: []
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
        }
    },
    actions: {
        async getLocacoes({ commit }) {
            const response = await axios.get('http://localhost:3000/locacoes');
            commit('setLocacoes', response.data);
        },
    },
    getters: {
        locacoesData(state: State) {
            return state.locacoes;
        }
    },
    modules: {
    }
});
