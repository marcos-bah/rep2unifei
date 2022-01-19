<template>
  <main class="container">
    <div class="content m-0 p-3">
      <h2>Adicionar uma Alocação</h2>
      {{ locacoesData }}
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
              <button class="button is-primary">Submit</button>
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
    return {
      locacoesData,
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
    return {};
  },
});
</script>

<style></style>
