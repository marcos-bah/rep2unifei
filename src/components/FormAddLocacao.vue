<template>
    <form id="app" @submit.prevent="checkForm" method="post">
        <h2>Adicionar uma Locação</h2>
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

            <!-- Sexo Preferencia -->
            <SexoPreferenciaData />

            <!-- Tipo -->
            <TipoData />

            <!-- Estilo -->
            <EstiloData />

            <!-- tipo locacao -->
            <TipoImovelData />
            
            <!-- Número Pessoas -->
            <NumeroPessoasData />

            <!-- Número Vagas -->
            <NumeroVagasData />

            <!-- preço -->
            <PrecoData />

            <!-- contato locacao -->
            <ContatoData />


            <!-- foto -->
            <FotoData />

            <div class="field is-grouped">
              <div class="control" >
                <SubmitButton @action="checkForm" :disabled="disabledButton"><template #text> {{id.length ? 'Atualizar' : 'Enviar'}} </template></SubmitButton>
              </div>
            </div>
          </div>
          <div class="column">
            <h2 class="mb-4">Preview</h2>
            <CardLocacao :locacao="locacaoLocal" :classByDefault="false" />
          </div>
        </div>
    </form>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";

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
import NumeroVagasData from "./Locacao/NumeroVagasData.vue";
import SexoPreferenciaData from "./Locacao/SexoPreferenciaData.vue";

export default defineComponent({
  name: "FormAddLocacaco",
  setup() {
    const store = useStore();
    const locacaoLocal = computed(() => store.state.locacaoLocal);
    const clearLocacao = () => store.commit("clearLocacaoLocal");
    const getUser = computed(() => store.state.user as User);
    const getLocacaoById = (id: string) => store.dispatch("getLocacaoById", id);

    return {
      store,
      clearLocacao,
      locacaoLocal,
      getUser,
      getLocacaoById,
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
    NumeroVagasData,
    SexoPreferenciaData,
  },
  data() {
    return {
      // erros tipo string array
      errors: [] as string[],
      disabledButton: false,
      id: (this.$route.params.id || "").toString(),
    };
  },
  unmounted() {
    this.clearLocacao();
  },
  mounted() {
    if (this.id.length) {
      this.getLocacaoById(this.id);
    }
  },
  methods: {
    async checkForm() {
      this.errors = [];
      if (!this.locacaoLocal.nome) {
        this.errors.push("Por favor, preencha o nome.");
      }
      if (!this.locacaoLocal.endereco) {
        this.errors.push("Por favor, preencha o endereço.");
      }
      if (!this.locacaoLocal.descricao) {
        this.errors.push("Por favor, preencha a descrição.");
      }
      if (this.locacaoLocal.descricao.length < 10) {
        this.errors.push("A descrição deve ter no mínimo 10 caracteres.");
      }
      if (this.locacaoLocal.tipoAlocacao.length === 0) {
        this.errors.push("Por favor, preencha o tipo.");
      }
      if (this.locacaoLocal.pessoas === 0) {
        this.errors.push("Por favor, preencha o número de pessoas.");
      }
      if (this.locacaoLocal.preco < 0) {
        this.errors.push("Por favor, preencha um preço válido.");
      }
      if (!this.locacaoLocal.contato) {
        this.errors.push("Por favor, preencha o contato.");
      }
      if (!this.locacaoLocal.tipoImovel) {
        this.errors.push("Por favor, preencha o tipo de imóvel.");
      }
      if (!this.locacaoLocal.foto) {
        this.errors.push("Por favor, preencha a foto.");
      }
      if (!this.locacaoLocal.site) {
        this.errors.push("Por favor, preencha o site.");
      }
      if (this.locacaoLocal.site.length < 5) {
        this.errors.push("O site deve ter no mínimo 5 caracteres.");
      }
      if (this.locacaoLocal.estilo.length === 0) {
        this.errors.push("Por favor, preencha o estilo.");
      }
      if (this.locacaoLocal.vagas === 0) {
        this.errors.push("Por favor, preencha o número de vagas.");
      }

      if (this.errors.length) {
        return false;
      }

      this.disabledButton = true;

      try {
        if (this.id.length) {
          this.store.commit("setLocacaoLocalEmail", this.getUser.email);
          await this.store.dispatch("updateLocacao", this.locacaoLocal);
          console.log("Atualizado com sucesso!");
        } else {
          this.store.commit("setLocacaoLocalEmail", this.getUser.email);
          await this.store.dispatch("setLocacao", this.locacaoLocal);
        }

        this.clearLocacao();
        this.$router.push("/");
      } catch (error) {
        console.log(error);
      } finally {
        this.disabledButton = false;
      }
    },
  },
});
</script>

<style>
</style>