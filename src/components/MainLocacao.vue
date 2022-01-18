<template>
  <main class="container">
    <Breadcrumb :tipos="tipos" />
    <SectionLocacao
      :id="tipo.titulo"
      v-for="(tipo, index) in tipos"
      :v-if="tipo.lista.length > 0"
      :key="index"
      :titulo="tipo.titulo"
      :descricao="tipo.descricao"
      :locacoes="tipo.lista"
    />
  </main>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";
import ILocacao from "@/interfaces/ILocacao";
import SectionLocacao from "@/components/SectionLocacao.vue";
import Breadcrumb from "../components/Breadcrumb.vue";

export default defineComponent({
  name: "MainLocacao",
  setup() {
    const store = useStore();
    const locacoes = computed(() => store.state.locacoes);
    return { locacoes };
  },
  components: {
    Breadcrumb,
    SectionLocacao,
  },
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL || "http://localhost:8080/",
      republicas: [] as ILocacao[],
      kitnets: [] as ILocacao[],
      apartamentos: [] as ILocacao[],
      tipos: [] as Array<{
        titulo: string;
        descricao: string;
        lista: ILocacao[];
      }>,
    };
  },

  mounted() {
    this.republicas = this.locacoes.filter((locacao: ILocacao) =>
      locacao.tipoLocacao.toLowerCase().includes("rep")
    );

    this.kitnets = this.locacoes.filter((locacao: ILocacao) =>
      locacao.tipoLocacao.toLowerCase().includes("kit")
    );

    this.apartamentos = this.locacoes.filter((locacao: ILocacao) =>
      locacao.tipoLocacao.toLowerCase().includes("ap")
    );

    this.tipos = [
      {
        titulo: "Republicas",
        descricao: "Republicas com vaga para crianças",
        lista: this.republicas,
      },
      {
        titulo: "Kitnets",
        descricao: "Kitnets com vaga para crianças",
        lista: this.kitnets,
      },
      {
        titulo: "Apartamentos",
        descricao: "Apartamentos com vaga para crianças",
        lista: this.apartamentos,
      },
    ];
  },
});
</script>

<style></style>
