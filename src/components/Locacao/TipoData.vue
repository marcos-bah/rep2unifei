<template>
  <div class="field">
    <label class="label">Tipo de alocação:</label>
    <!-- criar checkbox que pode selecionar mais que um vue.js -->
    <div class="control">
      <label class="checkbox">
        <input
          @change="setTipo(listaTipo)"
          type="checkbox"
          v-model="listaTipo"
          value="Individual"
        />
        Individual
      </label>
      <label class="checkbox">
        <input
          class="ml-2"
          @change="setTipo(listaTipo)"
          type="checkbox"
          v-model="listaTipo"
          value="Dividir"
        />
        Dividir
      </label>
      <label class="checkbox">
        <input
          class="ml-2"
          @change="setTipo(listaTipo)"
          type="checkbox"
          v-model="listaTipo"
          value="Dividir, mas quarto individual"
        />
        Dividir, mas quarto individual
      </label>
    </div>

    <p class="help">Pode selecionar mais de um</p>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "TipoData",
  setup() {
    const store = useStore();
    const getTipo = computed(() => store.state.locacaoLocal.tipoAlocacao);
    const setTipo = (e: string) => {
      store.commit("setLocacaoLocalTipoAlocacao", e);
    };
    return {
      store,
      setTipo,
      getTipo,
    };
  },
  data() {
    return {
      listaTipo: this.getTipo,
    };
  },
});
</script>

<style scoped></style>
