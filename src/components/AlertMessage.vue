<template>
  <article class="message is-danger">
    <div class="message-body">
      <slot name="msg"> </slot>
    </div>
  </article>
</template>

<script>
export default {
  name: "AlertMessage",
};
</script>

<style>
</style>