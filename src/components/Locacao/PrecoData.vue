<template>
  <div class="field">
    <label class="label">Preço:</label>

    <div class="field-body">
      <div class="field">
        <div class="field has-addons">
          <p class="control">
            <a class="button is-static"> R$ </a>
          </p>
          <p class="control is-expanded mb-0 pb-0">
            <input
              :value="getPreco"
              @input="setPreco($event.target.value)"
              class="input"
              type="number"
              placeholder="Valor mensal"
            />
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "PrecoData",
  setup() {
    const store = useStore();
    const getPreco = computed(() => store.state.locacaoLocal.preco);
    const setPreco = (e: string) => {
      store.commit("setLocacaoLocalPreco", e);
    };
    return {
      store,
      setPreco,
      getPreco,
    };
  },
});
</script>

<style scoped></style>
