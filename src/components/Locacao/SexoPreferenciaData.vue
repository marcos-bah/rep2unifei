<template>
  <div class="field">
    <label class="label">Preferencia para a locação: </label>
    <div class="field is-grouped">
      <p
        class="control"
        v-for="(tipo, index) in tiposSexosPreferencia"
        :key="index"
      >
        <a
          class="button"
          :class="{ 'is-info': getSexo === tiposSexosPreferencia[index] }"
          @click="setSexo(tiposSexosPreferencia[index])"
        >
          {{ tipo }}
        </a>
      </p>
    </div>
    <p class="help">Misto*: Recebe ambos os sexos</p>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "SexoPreferenciaData",
  setup() {
    const store = useStore();
    const getSexo = computed(() => store.state.locacaoLocal.sexo);
    const setSexo = (e: string) => {
      store.commit("setLocacaoLocalSexo", e);
    };
    return {
      store,
      setSexo,
      getSexo,
    };
  },
  data() {
    return {
      tiposSexosPreferencia: [
        "Sem preferencia",
        "Masculino",
        "Feminino",
        "Misto",
      ],
    };
  },
});
</script>

<style scoped></style>
