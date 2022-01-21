<template>
  <button class="button is-primary" @click="$emit('action')">
    <slot name="text"></slot>
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "Form",
});
</script>

<style></style>
