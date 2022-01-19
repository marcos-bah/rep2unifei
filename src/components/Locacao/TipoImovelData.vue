<template>
  <div class="field">
    <label class="label">Tipo: </label>
    <div class="control">
      <div class="select">
        <select @change="setTipoImovel($event.target.value)">
          <option value="República">Republica</option>
          <option value="Kitnet">Kitnet</option>
          <option value="Apartamento">Apartamento</option>
          <option value="Casa">Casa</option>
        </select>
      </div>
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
    };
    return {
      store,
      setTipoImovel,
      getTipoImovel,
    };
  },
});
</script>

<style scoped></style>
