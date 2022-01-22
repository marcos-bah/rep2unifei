<template>
  <div
    :class="{
      'column is-one-third is-full-mobile is-half-tablet is-one-third-desktop is-one-third-widescreen is-one-quarter-fullhd':
        classByDefault,
    }"
  >
    <div class="card">
      <div class="card-image">
        <figure class="image is-4by3">
          <img
            :src="
              locacao.foto ||
              'https://bulma.io/images/placeholders/1280x960.png'
            "
            alt="Placeholder image"
          />
        </figure>
      </div>
      <div class="card-content">
        <div class="content">
          <p class="title is-4">{{ locacao.nome || "Não informado" }}</p>
        </div>

        <div class="content">
          <div class="tipo--vaga">
            <strong>Tipo:</strong>
            {{ locacao.tipoImovel || "Não informado" }}
            <br />
          </div>

          <div class="tipo--informacoes">
            <strong>Descrição: </strong>
            <!-- limitar 20 caracteres -->

            {{ locacao.descricao.substring(0, 40) + "..." || "Não informado" }}

            <br />
          </div>

          <div class="tipo--endereco">
            <strong>Endereço:</strong>
            {{ locacao.endereco || "Não informado" }}
            <br />
          </div>

          <div class="tipo--contato">
            <strong>Contato:</strong>
            {{ locacao.contato || "Não informado" }}
            <br />
          </div>
        </div>
      </div>
      <footer class="card-footer">
        <div class="card-footer-item">R$ {{ locacao.preco }}</div>
        <a :href="locacao.site" target="_blank" class="card-footer-item"
          >Site</a
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
    classByDefault: {
      type: Boolean,
      default: true,
    },
  },
});
</script>

<style scoped>
.card {
  height: 100%;
}

.card:hover {
  transform: scale(1.1);
}
</style>
