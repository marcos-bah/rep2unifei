<template>
  <div v-if="type === titulo || type === 'all'">
    <section class="section m-0 p-3">
      <h2 class="title">{{ titulo }}</h2>
      <h3 class="subtitle">{{ descricao }}</h3>

      <div v-if="locacoes.length" id="locacao" class="columns is-multiline">
        <CardLocacao
          v-for="(locacao, index) in locacoes"
          :key="index"
          :locacao="locacao"
        />
      </div>
      <AlertMessage v-else>
        <template #msg> Não existe nenhum resultado! </template>
      </AlertMessage>
    </section>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import { useStore } from "vuex";
import ILocacao from "@/interfaces/ILocacao";

import CardLocacao from "@/components/CardLocacao.vue";
import AlertMessage from "@/components/AlertMessage.vue";
export default defineComponent({
  name: "SectionLocacao",
  setup() {
    const store = useStore();
    const type = computed(() => store.state.type);
    return { type };
  },
  components: {
    CardLocacao,
    AlertMessage,
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
