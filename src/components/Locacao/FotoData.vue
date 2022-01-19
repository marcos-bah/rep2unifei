<template>
  <div class="field">
    <label class="label">Foto de destaque:</label>
    <div class="file is-boxed pb-2">
      <label class="file-label">
        <input
          :value="getFoto"
          @input="sendFile"
          class="file-input"
          accept="image/*"
          type="file"
          name="resume"
          ref="file"
        />
        <span class="file-cta">
          <span class="file-icon">
            <i class="fas fa-upload"></i>
          </span>
          <span class="file-label"> Foto do imovel </span>
        </span>
      </label>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, computed, defineComponent, createApp } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "FotoData",
  setup() {
    const store = useStore();
    const getFoto = computed(() => store.state.locacaoLocal.foto);
    const setFoto = (e: string) => {
      store.commit("setLocacaoLocalFoto", e);
    };
    return {
      store,
      setFoto,
      getFoto,
    };
  },
  methods: {
    async sendFile() {
      console.log(process.env.VUE_APP_IMGUR_CLIENT_ID);

      let dataForm = new FormData();
      const fileElement = (this.$refs.file as HTMLInputElement).files;

      dataForm.append(`file`, fileElement![0], fileElement![0].name);

      console.log(fileElement);

      //pegar imagem e passar para api
      const response = await fetch(`https://api.imgur.com/3/`, {
        method: "POST",
        headers: {
          Authorization: `Client-ID ${process.env.VUE_APP_IMGUR_CLIENT_ID}`,
        },
        body: dataForm,
      });
      const json = await response.json();
      this.setFoto(json.data.link);
      console.log(json);
    },
  },
});
</script>

<style scoped></style>
