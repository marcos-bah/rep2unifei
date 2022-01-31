<template>
  <div class="field">
    <label class="label">Número de Vagas:</label>
    <div class="control">
      <input
        :value="getNumeroVagas"
        @input="setNumeroVagas($event.target.value)"
        class="input"
        type="number"
        placeholder="1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ..."
      />
    </div>
    <p class="help">
      Número de vagas disponibilizadas para novos locadores/membros
    </p>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "NumeroVagasData",
  setup() {
    const store = useStore();
    const getNumeroVagas = computed(() => store.state.locacaoLocal.vagas);
    const setNumeroVagas = (e: string) => {
      store.commit("setLocacaoLocalVagas", e);
    };
    return {
      store,
      setNumeroVagas,
      getNumeroVagas,
    };
  },
});
</script>

<style scoped></style>
