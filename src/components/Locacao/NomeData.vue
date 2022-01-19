<template>
  <div class="field">
    <label class="label">Nome da locação:</label>
    <div class="control">
      <input
        :value="getNome"
        @input="setNome($event.target.value)"
        class="input"
        type="text"
        placeholder="República X, Kitnet Amarela, Apartamento ..."
      />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "NomeData",
  setup() {
    const store = useStore();
    const getNome = computed(() => store.state.locacaoLocal.nome);
    const setNome = (e: string) => {
      store.commit("setLocacaoLocalNome", e);
    };
    return {
      store,
      setNome,
      getNome,
    };
  },
});
</script>

<style scoped></style>
