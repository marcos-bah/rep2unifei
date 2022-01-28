<template>
  <div v-if="getUser !== null" class="navbar-item">
    <router-link to="/" @click="logout" class="button is-danger">
      <strong>Sair</strong>
    </router-link>
  </div>
</template>

<script lang="ts">
import { User } from "firebase/auth";
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";
export default defineComponent({
  name: "SairButton",
  setup() {
    const store = useStore();
    const getUser = computed(() => store.state.user as User);
    const logout = () => {
      store.dispatch("logout");
    };
    return {
      logout,
      getUser,
    };
  },
});
</script>

<style>
</style>