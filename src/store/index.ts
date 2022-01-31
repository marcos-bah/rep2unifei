import { createStore } from "vuex";
import createPersistedState from 'vuex-persistedstate'
import * as Cookies from 'js-cookie'

import ILocacao from "@/interfaces/ILocacao";

import {
    signOut,
    getAuth,
    isSignInWithEmailLink,
    sendSignInLinkToEmail,
    signInWithEmailLink,
    User,
    browserLocalPersistence,
    setPersistence,
} from "firebase/auth";

import {
    collection,
    addDoc,
    getDocs,
    updateDoc,
    doc
} from "firebase/firestore";

import firebase from "@/firebase";

//TODO: Vuex auth, Persistence State Vuex
//TODO: MiddleWear

export type State = {
    locacoes: ILocacao[];
    search: string;
    type: string;
    // locacao
    locacaoLocal: ILocacao;
    //user firebase
    user: User | null;
    loading: boolean;
};

const state: State = {
    locacoes: [],
    search: "",
    type: "all",
    // locacao
    locacaoLocal: {
        visivel: true,
        id: "",
        nome: "",
        endereco: "",
        contato: "",
        descricao: "",
        preco: 0,
        data: new Date(),
        tipoAlocacao: [],
        tipoImovel: "República",
        pessoas: 0,
        foto: "",
        email: "",
        site: "",
        estilo: [],
        vagas: 0,
    } as ILocacao,
    //user firebase
    user: getAuth(firebase.firebaseApp).currentUser,
    loading: false,
};

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
            const index = state.locacoes.findIndex((l) => l.id === locacao.id);
            state.locacoes[index] = locacao;
        },
        removeLocacao(state: State, locacao: ILocacao) {
            const index = state.locacoes.findIndex((l) => l.id === locacao.id);
            state.locacoes.splice(index, 1);
        },
        getLocacaoById(state: State, id: string) {
            const locacao = state.locacoes.find((l) => l.id === id);
            state.locacaoLocal = locacao as ILocacao;
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
                visivel: true,
                id: "",
                nome: "",
                endereco: "",
                contato: "",
                descricao: "",
                preco: 0,
                data: new Date(),
                tipoAlocacao: [],
                tipoImovel: "República",
                pessoas: 0,
                foto: "",
                email: "",
                site: "",
                estilo: [],
                vagas: 0,
            } as ILocacao;
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
        setLocacaoLocalVagas(state: State, vagas: number) {
            state.locacaoLocal.vagas = vagas;
        },
        //user firebase
        setUser(state: State, user: User) {
            localStorage.user = JSON.stringify(user);
            state.user = user;
        },
        clearUser(state: State) {
            localStorage.removeItem("user");
            state.user = null;
        },
        setLoading(state: State, loading: boolean) {
            state.loading = loading;
        },
    },
    actions: {
        // get
        async getLocacoes() {
            try {
                this.commit("setLoading", true);
                this.commit("clearLocacoes");
                // pegar DATE_UPDATE do localStorage e ver se tem mais de 5 min, se tiver atualizar

                const querySnapshot = await getDocs(
                    collection(firebase.db, "locacoes")
                );
                localStorage.setItem("dateUpdate", new Date().toString());

                querySnapshot.forEach((doc) => {
                    const locacao = doc.data() as ILocacao;
                    locacao.id = doc.id;
                    // mudar de timestamp para data
                    locacao.data = new Date(doc.data().data.seconds * 1000);
                    this.commit("addLocacao", locacao);
                });
            } catch (error) {
                console.log(error);
            } finally {
                this.commit("setLoading", false);
            }
        },
        // set
        // eslint-disable-next-line
        async setLocacao({ commit }, locacao: ILocacao) {
            locacao.data = new Date();
            await addDoc(collection(firebase.db, "locacoes"), locacao);
        },
        // update
        // eslint-disable-next-line
        async updateLocacao({ commit }, locacao: ILocacao) {
            locacao.data = new Date();
            const docRef = doc(firebase.db, "locacoes/" + locacao.id);
            await updateDoc(docRef, JSON.parse(JSON.stringify(locacao)));
        },
        // remove
        // eslint-disable-next-line
        async removeLocacao({ commit }, locacao: ILocacao) {
            await addDoc(collection(firebase.db, "locacoes"), locacao);
        },
        // get by id
        // eslint-disable-next-line
        async getLocacaoById({ commit }, id: string) {
            try {
                this.commit("setLoading", true);
                const target = state.locacoes.find((l) => l.id === id);
                this.commit("setLocacaoLocal", target);

                // this.commit('clearLocacaoLocal');
                // const docRef = doc(firebase.db, `locacoes/${id}`);
                // const docSnap = await getDoc(docRef);
                // if(docSnap.exists()) {
                //     this.commit('setLocacaoLocal', docSnap.data() as ILocacao);
                // }else{
                //     console.log('Documento não encontrado');
                // }
            } catch (error) {
                console.log(error);
                this.commit("setLoading", false);
            } finally {
                this.commit("setLoading", false);
            }
        },
        // login localStorage
        // eslint-disable-next-line
        async loginLocalStorage({ commit }) {
            if (window.localStorage.getItem("user") !== null) {
                const user = JSON.parse(
                    window.localStorage.getItem("user") as string
                ) as User;
                this.commit("setUser", user);
            }
        },

        //login with email
        // eslint-disable-next-line
        async loginWithEmailLink({ commit }, url: string) {
            this.commit("setLoading", true);

            if (window.localStorage.getItem("user") !== null) {
                const user = JSON.parse(
                    window.localStorage.getItem("user") as string
                ) as User;
                this.commit("setUser", user);
            }

            if (state.user !== null) {
                this.commit("setLoading", false);
                console.log("Usuário já logado");
                return;
            }

            try {
                console.log("Tentando logar com email");

                const auth = getAuth(firebase.firebaseApp);

                if (!isSignInWithEmailLink(auth, url)) {
                    this.commit("setLoading", false);
                    console.log("Link inválido");
                    return;
                }

                const email = url.slice(url.indexOf("=") + 1, url.indexOf("&"));
                console.log(email);

                setPersistence(auth, browserLocalPersistence).then(async () => {
                    console.log("Persistência ativada");
                    const credential = await signInWithEmailLink(auth, email, url);
                    const user = credential.user;

                    if (user) {
                        console.log("Usuário logado com sucesso");
                        this.commit("setUser", user);
                    }
                });
            } catch (error) {
                console.log(error);
            } finally {
                this.commit("setLoading", false);
            }
        },
        //send link to email
        // eslint-disable-next-line
        async sendEmailLink({ commit }, email: string) {
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
        //logout
        // eslint-disable-next-line
        async logout({ commit }) {
            try {
                this.commit("setLoading", true);
                this.commit("clearUser");
                localStorage.clear();
                await signOut(getAuth(firebase.firebaseApp));
            } catch (error) {
                console.log(error);
            } finally {
                this.commit("setLoading", false);
            }
        },
    },
    getters: {
        getLocacoesData(state: State) {
            return state.locacoes;
        },
        getLocacoesById(state: State, id: string) {
            return state.locacoes.find((l) => l.id === id);
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
        getLocacaoLocalVagas(state: State) {
            return state.locacaoLocal.vagas;
        },

        //user firebase
        getUser(state: State) {
            return state.user;
        },
    },
    modules: {},
    plugins: [
        createPersistedState({
            storage: window.localStorage,
            getState: (key) => Cookies.get(key),
            setState: (key, state) => Cookies.set(key, state, { expires: 3, secure: true })
        })
    ],
});
