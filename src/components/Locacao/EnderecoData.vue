<template>
  <div class="field">
    <label class="label">Endereço locação:</label>
    <div class="control">
      <input
        :value="getEndereco"
        @input="setEndereco($event.target.value)"
        class="input"
        type="text"
        placeholder="Rua, número, bairro ..."
      />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "EnderecoData",
  setup() {
    const store = useStore();
    const getEndereco = computed(() => store.state.locacaoLocal.endereco);
    const setEndereco = (e: string) => {
      store.commit("setLocacaoLocalEndereco", e);
    };
    return {
      store,
      setEndereco,
      getEndereco,
    };
  },
});
</script>

<style scoped></style>
