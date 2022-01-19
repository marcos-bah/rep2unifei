<template>
  <div>
    -{{ locacoes }}-
    <MainLocacao />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";

import MainLocacao from "@/components/MainLocacao.vue";

export default defineComponent({
  setup() {
    const store = useStore();
    store.dispatch("getLocacoes");
    const locacoes = computed(() => store.state.locacoes);
    return {
      locacoes,
    };
  },
  name: "Home",
  components: {
    MainLocacao,
  },
});
</script>

<style></style>
