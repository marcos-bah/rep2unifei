<template>
  <div class="field">
    <label class="label">E-mail:</label>

    <div class="field-body">
      <div class="field">
        <div class="field has-addons">
          <p class="control is-expanded mb-0 pb-0">
            <input
              :value="getEmail"
              @input="setEmail($event.target.value)"
              class="input"
              type="text"
              placeholder="nome.sobrenome"
            />
          </p>
          <p class="control">
            <a class="button is-static">@unifei.edu.br </a>
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
  name: "EmailData",
  setup() {
    const store = useStore();
    const getEmail = computed(() => store.state.locacaoLocal.email);
    const setEmail = (e: string) => {
      store.commit("setLocacaoLocalEmail", e);
    };
    return {
      store,
      setEmail,
      getEmail,
    };
  },
});
</script>

<style scoped></style>
