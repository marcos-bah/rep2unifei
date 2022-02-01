<template>
  <div
    :class="{
      'column is-one-third is-full-mobile is-half-tablet is-one-third-desktop is-one-third-widescreen is-one-quarter-fullhd':
        classByDefault,
    }"
  >
    <div
      @click="
        locacao.id.length
          ? $router.push('/view/' + locacao.id + '#title')
          : null
      "
      class="card"
    >
      <div class="card-image">
        <figure class="image">
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

        <span
          v-for="(estilo, index) in locacao.estilo"
          :key="index"
          class="tag is-primary mb-1 mr-2"
          >{{ estilo }}</span
        >
        <span
          v-for="(tipo, index) in locacao.tipoAlocacao"
          :key="index"
          class="tag is-info mb-1 mr-2 mt-0"
          >{{ tipo }}</span
        >

        <div class="content">
          <div class="tipo--vaga">
            <strong>Tipo:</strong>
            {{ locacao.tipoImovel || "Não informado" }}
            <br />
          </div>

          <div class="tipo--vaga">
            <strong>Sexo:</strong>
            {{ locacao.sexo || "Não informado" }}
            <br />
          </div>

          <div class="tipo--informacoes">
            <strong>Descrição: </strong>
            <!-- limitar 20 caracteres -->

            {{
              (locacao.descricao || "Não informado").substring(0, 40) + "..." ||
              "Não informado"
            }}

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
        <div class="card-footer-item">
          {{ locacao.preco == 0 ? "A Combinar" : "R$ " + locacao.preco }}
        </div>
        <div class="card-footer-item">
          {{ locacao.vagas === 1 ? "Individual" : locacao.vagas + " vagas" }}
        </div>
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
img {
  width: 100%;
  height: 250px;
  object-fit: cover;
}
.card {
  height: 100%;
}
.card:hover {
  transform: scale(1.05);
  /* mudar pointer */
  cursor: pointer;
}
</style>
