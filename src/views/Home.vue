<template>
  <div>
    <NavBar />
    <Breadcrumb :tipos="tipos" />
    <main class="container">
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
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NavBar from "../components/NavBar.vue";
import Breadcrumb from "../components/Breadcrumb.vue";
import SectionLocacao from "../components/SectionLocacao.vue";
import ILocacao from "@/interfaces/ILocacao";
import axios from "axios";

export default defineComponent({
  name: "App",
  components: {
    NavBar,
    SectionLocacao,
    Breadcrumb,
  },
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL || "http://localhost:8080/",
      locacoes: [] as ILocacao[],
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
    axios.get("http://localhost:3000/locacoes").then((response) => {
      this.locacoes = response.data as ILocacao[];

      this.republicas = response.data.filter((locacao: ILocacao) =>
        locacao.tipoLocacao.toLowerCase().includes("rep")
      );

      this.kitnets = response.data.filter((locacao: ILocacao) =>
        locacao.tipoLocacao.toLowerCase().includes("kit")
      );

      this.apartamentos = response.data.filter((locacao: ILocacao) =>
        locacao.tipoLocacao.toLowerCase().includes("ap")
      );

      this.tipos = [
        {
          titulo: "Repúblicas",
          descricao: "Lista de republicas disponíveis em nosso sistema.",
          lista: this.republicas,
        },
        {
          titulo: "Kitnets",
          descricao: "Lista de kitnets disponíveis em nosso sistema.",
          lista: this.kitnets,
        },
        {
          titulo: "Apartamentos",
          descricao: "Lista de apartamentos disponíveis em nosso sistema.",
          lista: this.apartamentos,
        },
      ];
    });
  },
});
</script>

<style></style>
