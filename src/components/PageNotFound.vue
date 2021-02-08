<template>
  <div>
    <div class="text-center my-2"><span>Uh-oh!</span></div>
    <div class="text-center">
      <img v-if="imageUrl" :src="imageUrl"/>
    </div>
    <div class="text-center my-2"><span>Page not found.</span></div>
  </div>
</template>

<script>
export default {
  name: 'PageNotFound',
  computed: {
    imageUrl() {
      let card = this.$store.state.cardIndex['Wrong Target'];
      return card && card.printInfos[0] && card.printInfos[0].imageUrl;
    }
  }
}
</script>