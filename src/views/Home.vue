<template>
  <div>
    <MainLocacao />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "vuex";

import MainLocacao from "@/components/MainLocacao.vue";

export default defineComponent({
  setup() {
    const store = useStore();
    store.dispatch("getLocacoes");
  },
  name: "App",
  components: {
    MainLocacao,
  },
});
</script>

<style></style>
