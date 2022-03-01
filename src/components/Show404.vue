<template>
  <div></div>
</template>

<script>
export default {
  mounted() {
    this.$store.commit("setShow404", true);
  }
}
</script>