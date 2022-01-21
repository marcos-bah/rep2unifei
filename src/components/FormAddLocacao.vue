<template>
    <form id="app" @submit.prevent="checkForm" method="post">
        <h2>Adicionar uma Alocação</h2>
        {{locacoesData}}
        <p v-if="errors.length">
            <b>Por favor, corrija o(s) seguinte(s) erro(s):</b>
            <ul>
                <li class="has-text-danger" v-for="(error, index) in errors" :key="index">{{ error }}</li>
            </ul>
        </p>
        <div class="columns is-multiline is-vcentered">
          <div class="column is-two-thirds-desktop">
            <!-- nome locacao -->
            <NomeData />

            <!-- endereco locacao -->
            <EnderecoData />

            <!-- descrição -->
            <DescricaoData />

            <!-- Site -->
            <SiteData />

            <!-- Tipo -->
            <TipoData />

            <!-- Estilo -->
            <EstiloData />

            <!-- Número Pessoas -->
            <NumeroPessoasData />

            <!-- preço -->
            <PrecoData />

            <!-- contato locacao -->
            <ContatoData />

            <!-- tipo locacao -->
            <TipoImovelData />

            <!-- foto -->
            <FotoData />

            <div class="field is-grouped">
              <div class="control" >
                <SubmitButton @action="()=>{}"><template #text>Enviar</template></SubmitButton>
              </div>
            </div>
          </div>
          <div class="column">
            <h2 class="mb-4">Preview</h2>
            <CardLocacao :locacao="locacoesData" :classByDefault="false" />
          </div>
        </div>
    </form>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";

import ILocacao from "@/interfaces/ILocacao";

import CardLocacao from "@/components/CardLocacao.vue";
import ContatoData from "@/components/Locacao/ContatoData.vue";
import DescricaoData from "@/components/Locacao/DescricaoData.vue";
import EnderecoData from "@/components/Locacao/EnderecoData.vue";
import FotoData from "@/components/Locacao/FotoData.vue";
import NomeData from "@/components/Locacao/NomeData.vue";
import NumeroPessoasData from "@/components/Locacao/NumeroPessoasData.vue";
import PrecoData from "@/components/Locacao/PrecoData.vue";
import TipoData from "@/components/Locacao/TipoData.vue";
import TipoImovelData from "@/components/Locacao/TipoImovelData.vue";
import SubmitButton from "@/components/SubmitButton.vue";
import EstiloData from "./Locacao/EstiloData.vue";
import SiteData from "./Locacao/SiteData.vue";
import { User } from "firebase/auth";

export default defineComponent({
  name: "FormAddLocacaco",
  setup() {
    const store = useStore();
    let locacoesData = store.state.locacaoLocal as ILocacao;
    const clearLocacao = () => store.commit("clearLocacaoLocal");

    const getUser = computed(() => store.state.user as User);

    return {
      store,
      clearLocacao,
      locacoesData,
      getUser,
    };
  },
  components: {
    CardLocacao,
    ContatoData,
    DescricaoData,
    EnderecoData,
    FotoData,
    NomeData,
    NumeroPessoasData,
    PrecoData,
    TipoData,
    TipoImovelData,
    SubmitButton,
    EstiloData,
    SiteData,
  },
  data() {
    return {
      // erros tipo string array
      errors: [] as string[],
    };
  },
  methods: {
    checkForm(event: Event) {
      this.errors = [];
      if (!this.locacoesData.nome) {
        this.errors.push("Por favor, preencha o nome.");
      }
      if (!this.locacoesData.endereco) {
        this.errors.push("Por favor, preencha o endereço.");
      }
      if (!this.locacoesData.descricao) {
        this.errors.push("Por favor, preencha a descrição.");
      }
      if (this.locacoesData.descricao.length < 10) {
        this.errors.push("A descrição deve ter no mínimo 20 caracteres.");
      }
      if (this.locacoesData.tipoAlocacao.length === 0) {
        this.errors.push("Por favor, preencha o tipo.");
      }
      if (this.locacoesData.pessoas === 0) {
        this.errors.push("Por favor, preencha o número de pessoas.");
      }
      if (this.locacoesData.preco === 0) {
        this.errors.push("Por favor, preencha o preço.");
      }
      if (!this.locacoesData.contato) {
        this.errors.push("Por favor, preencha o contato.");
      }
      if (!this.locacoesData.tipoImovel) {
        this.errors.push("Por favor, preencha o tipo de imóvel.");
      }
      if (!this.locacoesData.foto) {
        this.errors.push("Por favor, preencha a foto.");
      }
      if (!this.locacoesData.email) {
        this.errors.push("Por favor, preencha o email.");
      }
      if (!this.locacoesData.site) {
        this.errors.push("Por favor, preencha o site.");
      }
      if (this.locacoesData.site.length < 5) {
        this.errors.push("O site deve ter no mínimo 5 caracteres.");
      }
      if (this.locacoesData.estilo.length === 0) {
        this.errors.push("Por favor, preencha o estilo.");
      }

      if (this.errors.length) {
        event.preventDefault();
        return false;
      }

      this.store.commit("setLocacaoLocalEmail", this.getUser.email);

      this.store.dispatch("setLocacao", this.locacoesData).then(() => {
        this.clearLocacao();
        this.$router.push("/");
      });
    },
  },
});
</script>

<style>
</style>