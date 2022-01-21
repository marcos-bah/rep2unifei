<template>
  <div class="field">
    <label class="label">Descrição do imovel:</label>
    <div class="control">
      <textarea
        v-text="getDescricao"
        @input="setDescricao($event.target.value)"
        class="textarea"
        placeholder="Amplo apartamento, permite cachorros ..."
      ></textarea>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "DescricaoData",
  setup() {
    const store = useStore();
    const getDescricao = computed(() => store.state.locacaoLocal.descricao);
    const setDescricao = (e: string) => {
      store.commit("setLocacaoLocalDescricao", e);
    };
    return {
      store,
      setDescricao,
      getDescricao,
    };
  },
});
</script>

<style scoped></style>
