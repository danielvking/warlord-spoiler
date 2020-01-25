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
  data() {
    return {
      imageUrl: null
    }
  },
  mounted() {
    // Get cards from main page
    this.$nextTick(() => {
      this.$parent.$parent.cardPromise.then(result => {
        let card = result.cardIndex['Wrong Target']
        this.imageUrl = card && card.printInfos[0] && card.printInfos[0].imageUrl
      })
    })
  }
}
</script>