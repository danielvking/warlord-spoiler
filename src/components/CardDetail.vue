<template>
  <b-container class="p-4" fluid>
    <b-row>
      <h3 class="m-2">{{ cardData.name }}</h3>
    </b-row>
    <b-row class="d-flex justify-content-center">
      <img :src="imageUrl" style="height:400px"/>
    </b-row>
    <pre>{{ cardData }}</pre>
  </b-container>
</template>

<script>
export default {
  name: 'CardDetail',
  props: {
    card: String
  },
  data() {
    return {
      cardIndex: {}
    }
  },
  computed: {
    cardData() {
      return this.cardIndex[this.card]
    },
    imageUrl() {
      if (!this.cardData) return null
      let printInfos = this.cardData.printInfos.filter(x => x.imageUrl)
      if (!printInfos[0]) return null
      return printInfos[0].imageUrl
    }
  },
  mounted() {
    // Get cards from main page
    this.$nextTick(() => {
      this.$parent.$parent.cardPromise.then(result => {
        this.cardIndex = result.cardIndex
      })
    })
  }
};
</script>