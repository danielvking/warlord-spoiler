<template>
  <router-link class="unanchor" :class="{ 'd-block': block, 'undecorate': !decorate }" :to="link">
    <slot/>
  </router-link>
</template>
<script>
export default {
  props: {
    block: Boolean,
    decorate: Boolean,
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
}

.undecorate {
  text-decoration: inherit;
}
</style>