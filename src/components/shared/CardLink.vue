<template>
  <router-link class="unanchor" :class="{ 'd-block': block }" :to="link">
    <slot/>
  </router-link>
</template>
<script>
export default {
  props: {
    block: Boolean,
    card: Object
  },
  computed: {
    link() {
      return { name: "cardDetailPage", query: { card: this.card.index } };
    }
  }
}
</script>
<style scoped>
.unanchor {
  color: inherit;
  text-decoration: inherit;
}
</style>