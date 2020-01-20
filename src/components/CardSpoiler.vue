<template>
  <b-container class="spoiler-page">
    <div class="spoiler-header">
      <h1>The Spoiler</h1>
      <p>
        There is not much here yet, and it certainly doesn't do much, but you are loading a web page with locally stored card data.
      </p>
      <b-form-input v-model="filter" placeholder="Filter text" style="margin:5px 20%;width:60%;text-align:center"/>
    </div>
    <div class="spoiler-container">
      <template v-if="cards">
        <div class="set-sidebar">
          <ul>
            <li :style="{ fontWeight: selectedSet == null ? 'bold' : 'normal' }"
                @click="selectedSet = null">All</li>
            <li v-for="set in setList"
                :key="set"
                :style="{ fontWeight: set === selectedSet ? 'bold' : 'normal' }"
                @click="selectedSet = set">
              {{ set }}
            </li>
          </ul>
        </div>
        <div class="card-sidebar">
          <ul>
            <li v-for="card in cardsFiltered"
                :key="card.name"
                :style="{ fontWeight: card === selectedCard ? 'bold' : 'normal' }"
                @click="selectedCard = card">
              {{ card.name }}
            </li>
          </ul>
        </div>
        <div class="card-region">
          <img :src="selectedImage" :key="selectedImage" height="400"/>
          <pre>{{ JSON.stringify(selectedCard, null, 2) }}</pre>
        </div>
      </template>
      <template v-else>
        <span>Loading...</span>
      </template>
    </div>
  </b-container>
</template>

<script>
import axios from 'axios'

export default {
  name: 'CardSpoiler',
  data() {
    return {
      cards: null,
      filter: "",
      selectedSet: null,
      selectedCard: null
    }
  },
  computed: {
    setList() {
      let sets = {};
      this.cards.forEach(x => {
        x.printInfos.forEach(y => {
          sets[y.set] = true;
        });
      });
      return Object.keys(sets).sort()
    },
    cardsFiltered() {
      let filter = this.filter.toLowerCase()
      return this.cards.filter(x => {
        if (this.selectedSet && !x.printInfos.filter(y => y.set === this.selectedSet)[0]) return false;
        return x.name.toLowerCase().includes(filter)
      }).sort((a, b) => {
        if (a.name < b.name) return -1
        else if (a.name > b.name) return 1
        else return 0
      })
    },
    selectedImage() {
      if (this.selectedCard == null) return null
      let printInfos = this.selectedCard.printInfos.filter(x => x.imageUrl)
      let latestPrint = printInfos.slice(-1)[0]
      if (latestPrint == null) return null
      return latestPrint.imageUrl
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
.spoiler-page {
  min-height: 100%;
  display: flex;
  flex-flow: column;
  background-color: rgba(255, 255, 255, 0.8);
  font-family: "Vhatis Warlord Text";
}

.spoiler-page h1 {
  font-family: "Vhatis Warlord Title";
}

.spoiler-container {
  display: flex;
  flex: 1;
  overflow-y: hidden;
}

.set-sidebar {
  flex-basis: 100px;
  margin-left: 5px;
  overflow-y: scroll;
}
  .set-sidebar ul {
    list-style-type: none;
    padding: 0;
    text-align: left;
  }
  .set-sidebar li {
    cursor: pointer;
  }

.card-sidebar {
  flex-basis: 250px;
  margin-left: 5px;
  overflow-y: scroll;
}
  .card-sidebar ul {
    list-style-type: none;
    padding: 0;
    text-align: left;
  }
  .card-sidebar li {
    cursor: pointer;
  }

.card-region {
  flex: 1;
  text-align: left;
  font-family: 'Courier New', Courier, monospace;
  overflow: auto;
  height: 100%;
}
</style>
