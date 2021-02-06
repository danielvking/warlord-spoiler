<template>
  <div>
    <div class="text-center my-2">Uh-oh!</div>
    <div class="text-center">
      <img v-if="imageUrl" :src="imageUrl"/>
    </div>
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