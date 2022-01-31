<template>
  <div class="container" v-if="isLoading">
    <main class="content section m-0 p-3">
      <Carregando />
    </main>
  </div>
  <main v-else class="container">
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
import SectionLocacao from "@/components/Home/SectionLocacao.vue";
import Breadcrumb from "@/components/Home/Breadcrumb.vue";
import Carregando from "@/components/Carregando.vue";

export default defineComponent({
  name: "MainLocacao",
  setup() {
    const store = useStore();
    const locacoes = computed(() => store.state.locacoes);
    const search = computed(() => store.state.search);
    const isLoading = computed(() => store.state.loading);

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
      {
        titulo: "Casas",
        descricao:
          "Estas são nossas locações de casas disponiveis em nosso sistema",
        lista: locacoes.value
          .filter((locacao: ILocacao) =>
            locacao.tipoImovel.toLowerCase().includes("casa")
          )
          .filter((locacao: ILocacao) =>
            locacao.nome.toLowerCase().includes(search.value)
          ),
      },
    ]);

    return { locacoes, search, store, tipos, isLoading };
  },
  components: {
    Breadcrumb,
    SectionLocacao,
    Carregando,
  },
});
</script>

<style></style>
