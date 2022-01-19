<template>
  <div class="field">
    <label class="label">Número de Pessoas:</label>
    <div class="control">
      <input
        :value="getNumeroPessoas"
        @input="setNumeroPessoas($event.target.value)"
        class="input"
        type="number"
        placeholder="1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ..."
      />
    </div>
    <p class="help">Adicione apenas números</p>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "NumeroPessoasData",
  setup() {
    const store = useStore();
    const getNumeroPessoas = computed(() => store.state.locacaoLocal.pessoas);
    const setNumeroPessoas = (e: string) => {
      store.commit("setLocacaoLocalPessoas", e);
    };
    return {
      store,
      setNumeroPessoas,
      getNumeroPessoas,
    };
  },
});
</script>

<style scoped></style>
