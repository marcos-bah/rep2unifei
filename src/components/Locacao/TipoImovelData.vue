<template>
  <div class="field">
    <label class="label">Tipo: </label>
    <div class="field is-grouped">
      <p class="control" v-for="(tipo, index) in tiposImoveis" :key="index">
        <a
          class="button"
          :class="{ 'is-info': getTipoImovel === tiposImoveis[index] }"
          @click="setTipoImovel(tiposImoveis[index])"
        >
          {{ tipo }}
        </a>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "TipoImovelData",
  setup() {
    const store = useStore();
    const getTipoImovel = computed(() => store.state.locacaoLocal.tipoImovel);
    const setTipoImovel = (e: string) => {
      store.commit("setLocacaoLocalTipoImovel", e);
      return false;
    };
    return {
      store,
      setTipoImovel,
      getTipoImovel,
    };
  },
  data() {
    return {
      tiposImoveis: ["República", "Kitnet", "Apartamento", "Casa"],
    };
  },
});
</script>

<style scoped></style>
