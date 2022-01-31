<template>
  <div class="field">
    <label class="label">Estilo da locação:</label>
    <!-- criar checkbox que pode selecionar mais que um vue.js -->
    <div class="control">
      <label class="checkbox" v-for="(e, index) in estilos" :key="index">
        <input
          :class="{ 'ml-2': index }"
          @change="setEstilo(listaEstilo)"
          type="checkbox"
          v-model="listaEstilo"
          :value="e"
        />
        {{ e }}
      </label>
    </div>

    <p class="help">Pode selecionar mais de um</p>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "EstiloData",
  setup() {
    const store = useStore();
    const getEstilo = computed(() => store.state.locacaoLocal.estilo);
    const setEstilo = (e: string) => {
      store.commit("setLocacaoLocalEstilo", e);
    };
    return {
      store,
      setEstilo,
      getEstilo,
    };
  },
  data() {
    return {
      listaEstilo: this.getEstilo,
      estilos: ["Festas", "Estudos", "Equilibrado"],
    };
  },
});
</script>

<style scoped>
.ml-2:first {
  margin-left: 0;
}
</style>
