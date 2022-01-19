<template>
  <div class="field">
    <label class="label">Seu contato:</label>
    <div class="control">
      <input
        :value="getContato"
        @input="setContato($event.target.value)"
        class="input"
        type="tel"
        placeholder="Telefone, Whatsapp..."
      />
      <p class="help">Número de telefone</p>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "ContatoData",
  setup() {
    const store = useStore();
    const getContato = computed(() => store.state.locacaoLocal.contato);
    const setContato = (e: string) => {
      store.commit("setLocacaoLocalContato", e);
    };
    return {
      store,
      setContato,
      getContato,
    };
  },
});
</script>

<style scoped></style>
