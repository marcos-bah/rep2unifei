<template>
  <main class="container">
    <div class="content m-0 p-3">
      <Carregando v-if="isLoading" />
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
import Carregando from "@/components/Carregando.vue";
import { getAuth } from "firebase/auth";

export default defineComponent({
  name: "Form",
  components: {
    FormAddLocacao,
    UserNotAuth,
    Carregando,
  },
  setup() {
    const store = useStore();
    const user = computed(() => store.state.user);
    const isLogged = computed(() => user.value !== null);
    const isLoading = computed(() => store.state.loading);

    const clearLocacao = () => store.commit("clearLocacaoLocal");

    const url = window.location.href;

    store.dispatch("loginWithEmailLink", url);

    getAuth().onAuthStateChanged((user) => {
      if (!user) {
        console.log("User is not logged in");
      }
    });

    return {
      isLogged,
      isLoading,
      clearLocacao,
    };
  },
  unmounted() {
    this.clearLocacao();
  },
});
</script>

<style></style>
