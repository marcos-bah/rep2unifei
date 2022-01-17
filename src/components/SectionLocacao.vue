<template>
  <div>
    <section class="section m-0 p-3">
      <h1 class="title">{{ titulo }}</h1>
      <h2 class="subtitle">{{ descricao }}</h2>

      <div id="team" class="columns is-multiline">
        <CardLocacao
          v-for="(locacao, index) in locacoes"
          :key="index"
          :locacao="locacao"
        />
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import ILocacao from "@/interfaces/ILocacao";

import CardLocacao from "./CardLocacao.vue";
export default defineComponent({
  name: "App",
  components: {
    CardLocacao,
  },
  props: {
    titulo: {
      type: String,
      required: true,
    },
    descricao: {
      type: String,
      required: true,
    },
    locacoes: {
      type: Array as PropType<ILocacao[]>,
      required: true,
    },
  },
});
</script>

<style>
#team .column .card {
  height: 100%;
  display: flex;
  flex-direction: column;
}

#team .column .card-footer {
  margin-top: auto;
}
</style>
