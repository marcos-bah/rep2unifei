<template>
  <div id="app">
    <NavBar />
    <router-view></router-view>
    <Footer />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "vuex";
import NavBar from "./components/NavBar.vue";
import Footer from "./components/Footer.vue";

export default defineComponent({
  name: "app",
  components: {
    NavBar,
    Footer,
  },
  setup() {
    const store = useStore();
    store.dispatch("loginLocalStorage");
    console.log("atualizando...");
  },
});
</script>

<style></style>
