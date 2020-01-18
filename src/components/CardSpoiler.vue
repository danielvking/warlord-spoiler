<template>
  <div class="hello">
    <h1>Prepare to have cards spoiled!</h1>
    <p>
      There is not much here yet, and it certainly doesn't do much, but you are loading a web page with locally stored card data.
    </p>
    <b-form-input v-model="filter" placeholder="Filter text" style="margin:5px 20%;width:60%;text-align:center"/>
    <template v-if="cards">
      <ul>
        <li v-for="card in cardsFiltered" :key="card.name">{{ card.name }}</li>
      </ul>
    </template>
    <template v-else>
      <span>Loading...</span>
    </template>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'CardSpoiler',
  data() {
    return {
      cards: null,
      filter: ""
    }
  },
  computed: {
    cardsFiltered() {
      let filter = this.filter.toLowerCase()
      return this.cards.filter(x => x.name.toLowerCase().includes(filter))
    }
  },
  mounted() {
    axios({
      method: 'get',
      url: '/cards.json'
    }).then(response => {
      this.cards = response.data
    }).catch(error => {
      alert("An error occurred fetching the card data:\n" + error)
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
