<template>
  <h2>Autentique-se</h2>
  <AlertMessage>
    <template #msg
      >Para cadastrar/editar uma locação você precisa pertencer ao dominio
      @unifei.edu.br</template
    >
  </AlertMessage>
  <p v-if="errors.length">
      <b>Por favor, corrija o(s) seguinte(s) erro(s):</b>
      <ul>
          <li class="has-text-danger" v-for="(error, index) in errors" :key="index">{{ error }}</li>
      </ul>
    </p>
  <form class="mb-5" id="app" @submit.prevent="sendLinkToEmail" method="post">
    <EmailData />
    <SubmitButton>
      <template #text>Enviar e-mail de autenticação</template>
    </SubmitButton>
  </form>
  <PrimaryMessage v-if="msgSucesso !== ''">
    <template #msg> {{msgSucesso}} </template>
  </PrimaryMessage>
  <AlertMessage v-if="msgErro !== ''">
    <template #msg>{{msgErro}}</template>
  </AlertMessage>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";

import { getAuth, sendSignInLinkToEmail } from "firebase/auth";
// import firebaseApp from "@/firebase";

import AlertMessage from "@/components/AlertMessage.vue";
import EmailData from "./Locacao/EmailData.vue";
import SubmitButton from "./SubmitButton.vue";
import PrimaryMessage from "./PrimaryMessage.vue";
export default defineComponent({
  name: "UserNotAuth",
  setup() {
    const store = useStore();
    const getEmail = computed(() => store.state.locacaoLocal.email);
    const setEmail = (e: string) => {
      store.commit("setLocacaoLocalEmail", e);
    };

    return {
      store,
      getEmail,
      setEmail,
    };
  },
  components: {
    AlertMessage,
    EmailData,
    SubmitButton,
    PrimaryMessage,
  },
  data() {
    return {
      msgSucesso: "",
      msgErro: "",
      errors: [] as string[],
    };
  },
  methods: {
    sendLinkToEmail: async function (event: Event) {
      this.errors = [];

      if (!this.getEmail) {
        this.errors.push("Por favor, informe o e-mail.");
        return;
      }

      if (this.getEmail.includes("@")) {
        this.errors.push(
          "Por favor, não adicione o dominio (@gmail, @hotmail, @unifei). Informe o e-mail sem o dominio."
        );
        return;
      }

      if (this.errors.length) {
        event.preventDefault();
        return false;
      }

      this.store
        .dispatch("sendEmailLink", `${this.getEmail}@unifei.edu.br`)
        .then(
          (res) => {
            this.msgSucesso =
              "E-mail enviado com sucesso! Feche essa aba e entre pelo link enviado.";
            this.msgErro = "";
          },
          (err) => {
            this.msgSucesso = "";
            this.msgErro = err.message;
          }
        );
    },
  },
});
</script>

<style>
</style>