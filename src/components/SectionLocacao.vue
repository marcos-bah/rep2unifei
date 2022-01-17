<template>
  <div>
    <section class="section m-0 p-3">
      <h2 class="title">{{ titulo }}</h2>
      <h3 class="subtitle">{{ descricao }}</h3>

      <div id="locacao" class="columns is-multiline">
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
#locacao .column .card {
  height: 100%;
  display: flex;
  flex-direction: column;
}

#locacao .column .card-footer {
  margin-top: auto;
}
</style>
