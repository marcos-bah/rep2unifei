<template>
  <nav class="container navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" href="/">
        <div class="title">rep2unifei</div>
      </a>
      <a
        :class="{ 'is-active': toggleBtn }"
        @click="toggle"
        role="button"
        class="navbar-burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div
      id="navbarBasicExample"
      class="navbar-menu"
      :class="{ 'is-active': toggleBtn }"
    >
      <div class="navbar-start">
        <router-link to="/" class="navbar-item"> Principal </router-link>
        <router-link to="/about" class="navbar-item"> Sobre </router-link>
      </div>

      <div class="navbar-end">
        <div class="navbar-item field has-addons my-0">
          <p class="control">
            <span class="select">
              <select v-model="typeField" @change="type($event.target.value)">
                <option value="all">Locações</option>
                <option value="Repúblicas">Republicas</option>
                <option value="Kitnets">Kitnets</option>
                <option value="Apartamentos">Apês</option>
              </select>
            </span>
          </p>
          <p class="control">
            <input
              id="searchField"
              v-model="searchField"
              @input="search($event.target.value)"
              class="input"
              type="text"
              placeholder="Nome da locação"
            />
          </p>
          <p class="control">
            <a @click="search(searchField)" class="button is-primary">
              Procurar
            </a>
          </p>
          <p v-if="searchField.length > 0" class="control">
            <button @click="clearSearch" class="button is-text">Limpar</button>
          </p>
        </div>
        <div class="navbar-item">
          <router-link to="/form" class="button is-primary">
            <strong>Cadastrar Locação</strong>
          </router-link>
        </div>

        <SairButton />
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "vuex";
import SairButton from "./SairButton.vue";
export default defineComponent({
  name: "NavBar",
  setup() {
    const store = useStore();
    const search = (e: string) => {
      store.commit("setSearch", e);
    };
    const type = (e: string) => {
      store.commit("setType", e);
    };
    return {
      search,
      type,
    };
  },
  data() {
    return {
      searchField: "",
      typeField: "all",
      toggleBtn: false,
    };
  },
  methods: {
    toggle() {
      this.toggleBtn = !this.toggleBtn;
    },
    clearSearch() {
      this.searchField = "";
      this.search(this.searchField);
      this.typeField = "all";
      this.type(this.typeField);
    },
  },
  components: { SairButton },
});
</script>

<style></style>
