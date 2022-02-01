<template>
  <main class="container" id="main">
    <div class="content m-0 p-3" v-if="loading"><Carregando /></div>
    <div class="content m-0 p-3" v-else>
      <h2 id="title">{{ locacao.nome }}</h2>
      <span
        v-for="(estilo, index) in locacao.estilo"
        :key="index"
        class="tag is-primary mb-4 mr-2"
        >{{ estilo }}</span
      >
      <span
        v-for="(tipo, index) in locacao.tipoAlocacao"
        :key="index"
        class="tag is-info mb-4 mr-2 mt-0"
        >{{ tipo }}</span
      >
      <span class="tag is-info mb-4 mr-2"
        >Capacidade: {{ locacao.pessoas }} pessoa (s)</span
      >
      <AlertMessage>
        <template #msg
          >A plataforma não cobra nenhum valor e nem faz verificação da
          autenticidade dos anuncios.</template
        ></AlertMessage
      >
      <blockquote>
        Adicionado/Atualizado por: {{ protegerEmailLGPD(locacao.email) }}
      </blockquote>
      <div class="columns">
        <div
          class="
            column
            is-two-thirds-fullhd
            is-two-thirds-desktop
            is-three-quarters-widescreen
            is-two-thirds-tablet
          "
        >
          <h3>Imagem</h3>
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
        <div class="column">
          <h3>Vagas</h3>
          <p>{{ locacao.vagas }} vagas disponíveis</p>
          <h3>Endereço</h3>
          <p>
            {{ locacao.endereco }}
          </p>
          <h3>Preço</h3>
          <p>R$ {{ locacao.preco }} por mês (valor aproximado)</p>
          <h3>Contato</h3>
          <p>
            {{ locacao.contato }}
          </p>
        </div>
      </div>

      <h3>Sobre</h3>
      <a :href="locacao.site" target="_blank" rel="noopener noreferrer"
        ><span class="tag is-link mb-2">Visualizar site</span></a
      >
      <p>
        {{ locacao.descricao }}
      </p>

      <h4>Algum problema?</h4>
      <p>
        <router-link :to="'/form/' + $route.params.id.toString()"
          >edite</router-link
        >
        ou exclua a sua locação.
      </p>
    </div>
  </main>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import ILocacao from "@/interfaces/ILocacao";
import { useStore } from "vuex";
import Carregando from "@/components/Carregando.vue";
import AlertMessage from "@/components/AlertMessage.vue";

export default defineComponent({
  name: "ViewLocacao",
  setup() {
    const store = useStore();
    const loading = computed(() => store.state.loading);
    const getLocacaoById = (id: string) => store.dispatch("getLocacaoById", id);
    const clearLocacao = () => store.commit("clearLocacaoLocal");
    const locacao = computed(() => {
      return store.state.locacaoLocal as ILocacao;
    });
    return { locacao, getLocacaoById, loading, clearLocacao };
  },
  mounted() {
    this.getLocacaoById(this.$route.params.id.toString());
  },
  unmounted() {
    this.clearLocacao();
  },
  methods: {
    protegerEmailLGPD(email: string) {
      // proteger o email
      const emailParts = email.split("@");
      return email.replace(emailParts[0].substring(3), "***");
    },
  },
  components: { Carregando, AlertMessage },
});
</script>

<style scoped>
p {
  text-align: justify;
  white-space: pre-wrap;
}
img {
  width: max-content; /* or any custom size */
  max-height: 500px;
  object-fit: scale-down;
}
</style>