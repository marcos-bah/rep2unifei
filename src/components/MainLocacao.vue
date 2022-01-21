<template>
  <main class="container">
    <Breadcrumb :tipos="tipos" />
    <SectionLocacao
      :id="tipo.titulo"
      v-for="(tipo, index) in tipos"
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
    const search = computed(() => store.state.search);

    const tipos = computed(() => [
      {
        titulo: "Repúblicas",
        descricao:
          "Estas são nossas locações de repúblicas disponiveis em nosso sistema",
        lista: locacoes.value
          .filter((locacao: ILocacao) =>
            locacao.tipoImovel.toLowerCase().includes("rep")
          )
          .filter((locacao: ILocacao) =>
            locacao.nome.toLowerCase().includes(search.value)
          ),
      },
      {
        titulo: "Kitnets",
        descricao:
          "Estas são nossas locações de kitnets disponiveis em nosso sistema",
        lista: locacoes.value
          .filter((locacao: ILocacao) =>
            locacao.tipoImovel.toLowerCase().includes("kit")
          )
          .filter((locacao: ILocacao) =>
            locacao.nome.toLowerCase().includes(search.value)
          ),
      },
      {
        titulo: "Apartamentos",
        descricao:
          "Estas são nossas locações de apartamentos disponiveis em nosso sistema",
        lista: locacoes.value
          .filter((locacao: ILocacao) =>
            locacao.tipoImovel.toLowerCase().includes("apart")
          )
          .filter((locacao: ILocacao) =>
            locacao.nome.toLowerCase().includes(search.value)
          ),
      },
    ]);

    return { locacoes, search, store, tipos };
  },
  components: {
    Breadcrumb,
    SectionLocacao,
  },
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL || "http://localhost:8080/",
      // republicas: [] as ILocacao[],
      // kitnets: [] as ILocacao[],
      // apartamentos: [] as ILocacao[],
      // tipos: [] as Array<{
      //   titulo: string;
      //   descricao: string;
      //   lista: ILocacao[];
      // }>,
    };
  },
  computed: {},

  mounted() {
    // this.republicas = this.locacoes.filter((locacao: ILocacao) =>
    //   locacao.tipoLocacao.toLowerCase().includes("rep")
    // );
    // this.kitnets = this.locacoes.filter((locacao: ILocacao) =>
    //   locacao.tipoLocacao.toLowerCase().includes("kit")
    // );
    // this.apartamentos = this.locacoes.filter((locacao: ILocacao) =>
    //   locacao.tipoLocacao.toLowerCase().includes("ap")
    // );
    // this.tipos = [
    //   {
    //     titulo: "Republicas",
    //     descricao: "Republicas com vaga para crianças",
    //     lista: this.republicas,
    //   },
    //   {
    //     titulo: "Kitnets",
    //     descricao: "Kitnets com vaga para crianças",
    //     lista: this.kitnets,
    //   },
    //   {
    //     titulo: "Apartamentos",
    //     descricao: "Apartamentos com vaga para crianças",
    //     lista: this.apartamentos,
    //   },
    // ];
  },
});
</script>

<style></style>
