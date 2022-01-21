<template>
  <article class="message is-primary">
    <div class="message-body">
      <slot name="msg"> </slot>
    </div>
  </article>
</template>

<script>
export default {
  name: "PrimaryMessage",
};
</script>

<style>
</style>