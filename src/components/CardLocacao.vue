<template>
  <div
    class="column is-one-third is-full-mobile is-half-tablet is-one-third-desktop is-one-third-widescreen is-one-quarter-fullhd"
  >
    <div class="card">
      <div class="card-image">
        <figure class="image is-4by3">
          <img
            src="https://bulma.io/images/placeholders/1280x960.png"
            alt="Placeholder image"
          />
        </figure>
      </div>
      <div class="card-content">
        <div class="content">
          <p class="title is-4">{{ locacao.tipoLocacao }}</p>
        </div>

        <div class="content">
          <strong>Tipo: </strong>
          {{ locacao.tipoVaga || "Não informado" }}
          <br />
          <strong>Informações: </strong>
          {{ locacao.informacoes || "Não informado" }}
          <br />
          <strong>Endereço: </strong>
          {{ locacao.endereco || "Não informado" }}
          <br />
          <strong>Contato: </strong>
          {{ locacao.contato || "Não informado" }}
          <br />
        </div>
      </div>
      <footer class="card-footer">
        <a
          v-if="locacao.instagram"
          :href="locacao.instagram"
          target="_blank"
          class="card-footer-item"
          >site</a
        >
      </footer>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import ILocacao from "@/interfaces/ILocacao";

export default defineComponent({
  name: "CardLocacao",
  props: {
    locacao: {
      type: Object as PropType<ILocacao>,
      required: true,
    },
  },
});
</script>

<style scoped>
.card {
  height: 100%;
}
</style>
