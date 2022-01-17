<template>
  <nav
    class="breadcrumb has-bullet-separator is-centered my-5"
    aria-label="breadcrumbs"
  >
    <ul>
      <li v-for="(tipo, index) in tipos" :key="index">
        <a :href="'#' + tipo.titulo">{{ tipo.titulo }}</a>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import ILocacao from "@/interfaces/ILocacao";

export default defineComponent({
  name: "Breadcrumb",
  props: {
    tipos: {
      type: Array as PropType<
        {
          titulo: string;
          descricao: string;
          lista: ILocacao[];
        }[]
      >,
      required: true,
    },
  },
});
</script>

<style></style>
