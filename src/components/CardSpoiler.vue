<template>
  <b-container class="spoiler-page">
    <b-row>
      <h1>The Spoiler</h1>
    </b-row>
    <div class="text-center">Need to find some information on Warlord cards? You've come to the right place:</div>
    <b-form-row>
      <b-col cols=12 md="10" class="my-1">
        <b-form-input v-model="search.text"
                      placeholder="Search text..."
                      class="text-center"
                      @keypress.enter="onSearch"/>
      </b-col>
      <b-col cols="12" md=2 class="my-1">
        <b-button variant="primary"
                  class="w-100 m-t-10"
                  :disabled="!canSearch"
                  @click.prevent="onSearch">Search</b-button>
      </b-col>
    </b-form-row>
    <b-form-row>
      <b-col>
        <b-form-group class="text-center" label="Search by:">
          <b-form-checkbox v-model="search.byName" inline>Name</b-form-checkbox>
          <b-form-checkbox v-model="search.byText" inline>Text</b-form-checkbox>
        </b-form-group>
      </b-col>
    </b-form-row>
    <template v-if="cards">
      <card-compact v-for="(card, i) in searchResults" :key="i" :card="card"/>
    </template>
    <template v-else>
      <div class="text-center m-5">
        <b-spinner />
      </div>
    </template>
  </b-container>
</template>

<script>
import CardCompact from './CardCompact.vue'
import axios from "axios";

export default {
  name: "CardSpoiler",
  components: {
    CardCompact
  },
  data() {
    return {
      cards: null,
      searchResults: [],
      search: {
        text: "",
        byName: true,
        byText: false,
      }
    };
  },
  computed: {
    canSearch() {
      return this.cards && (this.search.byName || this.search.byText)
    }
  },
  methods: {
    onSearch() {
      if (!this.canSearch) return
      this.searchResults = this.cards.filter(x => {
        let searchText = this.search.text.toLowerCase()
        if (this.search.byName && x.name.toLowerCase().includes(searchText)) return true
        if (this.search.byText && x.text && x.text.toLowerCase().includes(searchText)) return true
        return false
      }).sort((a, b) => {
        if (a.name < b.name) return -1
        else if (a.name > b.name) return 1
        else return 0
      })
    }
  },
  mounted() {
    axios({
      method: "get",
      url: "/resources/cards.json"
    }).then(response => {
      this.cards = response.data
    }).catch(error => {
      alert("An error occurred fetching the card data:\n" + error)
    });
  }
};
</script>

<style scoped>
.spoiler-page {
  min-height: 100%;
  display: flex;
  flex-flow: column;
  background-color: rgba(255, 255, 255, 0.8);
  font-family: "Vhatis Warlord Text";
}

.spoiler-page h1 {
  width: 100%;
  padding: 5px;
  text-align: center;
  background-color: #191919;
  color: white;
  font-family: "Vhatis Warlord Title";
}

.spoiler-page h3 {
  font-family: "Vhatis Warlord Title";
}
</style>
