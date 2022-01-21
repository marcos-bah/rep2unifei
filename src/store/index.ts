import { createStore } from "vuex";

import ILocacao from '@/interfaces/ILocacao';

import {
    getAuth,
    isSignInWithEmailLink,
    sendSignInLinkToEmail,
    signInWithEmailLink,
    User,
  } from "firebase/auth";

import { collection, addDoc, getDocs } from "firebase/firestore";
import firebase from '@/firebase';

export type State = {
    locacoes: ILocacao[];
    search: string;
    type: string;
    // locacao
    locacaoLocal: ILocacao;
    //user firebase
    user?: User;
    loading: boolean;

}

const state: State = {
    locacoes: [],
    search: '',
    type: 'all',
    // locacao
    locacaoLocal: {
        id: '',
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
        site: '',
        estilo: [],
    } as ILocacao,
    //user firebase
    user: undefined,
    loading: false,
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
        clearLocacoes(state: State) {
            state.locacoes = [];
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
                id: '',
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
                site: '',
                estilo: [],
            } as ILocacao

            console.log(state.locacaoLocal);
            
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
        },
        setLocacaoLocalSite(state: State, site: string) {
            state.locacaoLocal.site = site;
        },
        setLocacaoLocalEstilo(state: State, estilo: []) {
            state.locacaoLocal.estilo = estilo;
        },
        //user firebase
        setUser(state: State, user: User) {
            state.user = user;
        },
        clearUser(state: State) {
            state.user = undefined;
        },
        setLoading(state: State, loading: boolean) {
            state.loading = loading;
        }
    },
    actions: {
        // get
        async getLocacoes() {  
            this.commit('clearLocacoes');
            const querySnapshot = await getDocs(collection(firebase.db, "locacoes"));
            querySnapshot.forEach(doc => {
                const locacao = doc.data() as ILocacao;
                locacao.id = doc.id;
                this.commit('addLocacao', locacao);
                }
            );
        },
        // set
        // eslint-disable-next-line
        async setLocacao({commit}, locacao: ILocacao) {
            await addDoc(collection(firebase.db, "locacoes"), locacao);
        },
        // update
        // eslint-disable-next-line
        async updateLocacao({commit}, locacao: ILocacao) {
            await addDoc(collection(firebase.db, "locacoes"), locacao);
        },
        // remove
        // eslint-disable-next-line
        async removeLocacao({commit}, locacao: ILocacao) {
            await addDoc(collection(firebase.db, "locacoes"), locacao);
        },
        //login with email
        // eslint-disable-next-line
        async loginWithEmailLink({commit}, url: string) {
            this.commit('setLoading', true);

            try {
                const auth = getAuth(firebase.firebaseApp);

                if(!isSignInWithEmailLink(auth, url)) {
                    this.commit('setLoading', false);
                    return;
                }

                const email = url.slice(url.indexOf("=") + 1, url.indexOf("&"));

                const credential = await signInWithEmailLink(auth, email, url);
                const user = credential.user;

                if (user) {
                    this.commit('setUser', user);
                }
            } catch (error) {
                console.log(error);
                this.commit('setLoading', false);
            }
            this.commit('setLoading', false);
        },
        //send link to email
        // eslint-disable-next-line
        async sendEmailLink({commit}, email: string) {
            const auth = getAuth(firebase.firebaseApp);
            const url = location.href + "?email=" + email;

            try {
                await sendSignInLinkToEmail(auth, email, {
                    url,
                    handleCodeInApp: true,
                });
            } catch (error) {
                console.log(error);
                throw error;
            }
        },
    },
    getters: {
        getLocacoesData(state: State) {
            return state.locacoes;
        },
        getLocacoesById(state: State, id: string) {
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
        },
        getLocacaoLocalSite(state: State) {
            return state.locacaoLocal.site;
        },
        getLocacaoLocalEstilo(state: State) {
            return state.locacaoLocal.estilo;
        },
        //user firebase
        getUser(state: State) {
            return state.user;
        },
    },
    modules: {
    }
});
