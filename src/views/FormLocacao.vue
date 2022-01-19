<template>
  <main class="container">
    <div class="content m-0 p-3">
      <h2>Adicionar uma Alocação</h2>
      {{ locacoesData }}
      <form id="app" @submit="checkForm" method="post">
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

            <!-- Tipo -->
            <TipoData />

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

            <!-- email -->
            <EmailData />

            <!-- termos -->
            <TermosData />

            <div class="field is-grouped">
              <div class="control">
                <button class="button is-primary" type="submit">Submit</button>
              </div>
              <div class="control">
                <button class="button is-primary is-light">Cancel</button>
              </div>
            </div>
          </div>
          <div class="column">
            <h2 class="mb-4">Preview</h2>
            <CardLocacao :locacao="locacoesData" :classByDefault="false" />
          </div>
        </div>
      </form>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "vuex";

import ILocacao from "@/interfaces/ILocacao";

import CardLocacao from "@/components/CardLocacao.vue";
import ContatoData from "@/components/Locacao/ContatoData.vue";
import DescricaoData from "@/components/Locacao/DescricaoData.vue";
import EmailData from "@/components/Locacao/EmailData.vue";
import EnderecoData from "@/components/Locacao/EnderecoData.vue";
import FotoData from "@/components/Locacao/FotoData.vue";
import NomeData from "@/components/Locacao/NomeData.vue";
import NumeroPessoasData from "@/components/Locacao/NumeroPessoasData.vue";
import PrecoData from "@/components/Locacao/PrecoData.vue";
import TipoData from "@/components/Locacao/TipoData.vue";
import TipoImovelData from "@/components/Locacao/TipoImovelData.vue";
import TermosData from "@/components/TermosData.vue";

export default defineComponent({
  name: "Form",
  setup() {
    const store = useStore();
    const locacoesData = store.state.locacaoLocal as ILocacao;
    const addLocacoes = (locacoes: ILocacao) => {
      store.commit("addLocacao", locacoes);
    };
    return {
      locacoesData,
      addLocacoes,
    };
  },
  components: {
    CardLocacao,
    ContatoData,
    DescricaoData,
    EmailData,
    EnderecoData,
    FotoData,
    NomeData,
    NumeroPessoasData,
    PrecoData,
    TipoData,
    TipoImovelData,
    TermosData,
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
      if(!this.locacoesData.nome) {
        this.errors.push("Por favor, preencha o nome.");
      }
      if(!this.locacoesData.endereco) {
        this.errors.push("Por favor, preencha o endereço.");
      }
      if(!this.locacoesData.descricao) {
        this.errors.push("Por favor, preencha a descrição.");
      }
      if(this.locacoesData.descricao.length < 10) {
        this.errors.push("A descrição deve ter no mínimo 20 caracteres.");
      }
      if(this.locacoesData.tipoAlocacao.length === 0) {
        this.errors.push("Por favor, preencha o tipo.");
      }
      if(this.locacoesData.pessoas ===0) {
        this.errors.push("Por favor, preencha o número de pessoas.");
      }
      if(this.locacoesData.preco === 0) {
        this.errors.push("Por favor, preencha o preço.");
      }
      if(!this.locacoesData.contato) {
        this.errors.push("Por favor, preencha o contato.");
      }
      if(!this.locacoesData.tipoImovel) {
        this.errors.push("Por favor, preencha o tipo de imóvel.");
      }
      if(!this.locacoesData.foto) {
        this.errors.push("Por favor, preencha a foto.");
      }
      if(!this.locacoesData.email) {
        this.errors.push("Por favor, preencha o email.");
      }

      if(this.errors.length) {
        event.preventDefault();

        return false;
      }

      // enviar pra a store

      this.addLocacoes(this.locacoesData);

      // mandar para a home

      this.$router.push("/");
      
    },
  },
});
</script>

<style></style>
