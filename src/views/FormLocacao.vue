<template>
  <main class="container">
    <div class="content m-0 p-3">
      <h2 v-if="isLoading">Carregando</h2>
      <UserNotAuth v-else-if="!isLogged" />
      <FormAddLocacao v-else />
    </div>
  </main>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";

import FormAddLocacao from "@/components/FormAddLocacao.vue";
import UserNotAuth from "@/components/UserNotAuth.vue";

export default defineComponent({
  name: "Form",
  components: {
    FormAddLocacao,
    UserNotAuth,
  },
  setup() {
    const store = useStore();
    const user = computed(() => store.state.user);
    const isLogged = computed(() => typeof user.value !== "undefined");
    const isLoading = computed(() => store.state.loading);

    const url = window.location.href;

    store.dispatch("loginWithEmailLink", url);

    return {
      isLogged,
      isLoading,
    };
  },
});
</script>

<style></style>
