<template>
  <div class="field">
    <label class="label">Site:</label>
    <div class="control">
      <input
        :value="getSite"
        @input="setSite($event.target.value)"
        class="input"
        type="text"
        placeholder="https://www.site.com.br"
      />
    </div>
    <p class="help">Instagram, Facebook, Site (apenas um link)</p>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "SiteData",
  setup() {
    const store = useStore();
    const getSite = computed(() => store.state.locacaoLocal.site);
    const setSite = (e: string) => {
      store.commit("setLocacaoLocalSite", e);
    };
    return {
      store,
      setSite,
      getSite,
    };
  },
});
</script>

<style scoped></style>
