<template>
  <header-footer>
    <router-view/>
    <b-container v-if="showSearch" class="mt-2" fluid>
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
                    class="w-100"
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
        <template v-if="searchResults[0]">
          <b-row>
            <b-col cols="12" md="6">
              <b-form-select v-model="resultStyle" class="my-2">
                <b-form-select-option value="table">Table</b-form-select-option>
                <b-form-select-option value="detailed">Detailed</b-form-select-option>
              </b-form-select>
            </b-col>
            <b-col>
              <b-pagination v-model="currentPage"
                            class="font-default"
                            :total-rows="searchResults.length"
                            :per-page="perPage"
                            size="sm"
                            align="right"/>
            </b-col>
          </b-row>

          <div v-if="resultStyle === 'table'" class="overflow-x-auto">
            <b-table :items="searchResults"
                     :fields="resultFields"
                     small
                     borderless
                     striped
                     hover
                     :per-page="perPage"
                     :current-page="currentPage"
                     @row-clicked="card => viewDetail(card)"/>
          </div>

          <template v-else-if="resultStyle === 'detailed'">
            <b-table :items="searchResults"
                     :fields="['details']"
                     small
                     borderless
                     striped
                     hover
                     :per-page="perPage"
                     :current-page="currentPage"
                     @row-clicked="card => viewDetail(card)">
              <template v-slot:cell(details)="data">
                <card-compact :card="data.item"/>
              </template>
            </b-table>
          </template>

          <b-pagination v-model="currentPage"
                        class="font-default"
                        :total-rows="searchResults.length"
                        :per-page="perPage"
                        size="sm"
                        align="right"/>

        </template>
        <template v-else>
          <div class="text-center m-5">No results</div>
        </template>
      </template>
      <template v-else>
        <div class="text-center m-5">
          <b-spinner />
        </div>
      </template>
    </b-container>
  </header-footer>
</template>

<script>
import HeaderFooter from '@/components/HeaderFooter.vue'
import CardCompact from '@/components/CardCompact.vue'
import axios from 'axios';

export default {
  name: 'CardSpoiler',
  components: {
    HeaderFooter,
    CardCompact
  },
  data() {
    return {
      cardPromise: null,
      showSearch: false,
      cards: null,
      cardIndex: {},
      resultStyle: 'table',
      searchResults: [],
      search: {
        text: '',
        byName: true,
        byText: false,
      },
      perPage: 100,
      currentPage: 1,
      resultFields: [ 'name', 'type', 'class', 'level' ]
    };
  },
  computed: {
    canSearch() {
      return this.cards && (this.search.byName || this.search.byText)
    }
  },
  methods: {
    computeShowSearch(route) {
      this.showSearch = route.name === 'searchPage'
    },
    buildCardIndex() {
      this.cards.forEach(x => {
        let key = x.name
        if (this.cardIndex[key]) {
          let count = 1
          do {
            count++
            key = x.name + '_' + count
          } while (this.cardIndex[key])
        }
        this.cardIndex[key] = x
        x.index = key;
      });
    },
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
    },
    viewDetail(card) {
      this.$router.push({ path: 'card-detail', query: { card: card.index } })
    }
  },
  mounted() {
    this.computeShowSearch(this.$route)
    this.cardPromise = axios({
      method: 'get',
      url: '/resources/cards.json'
    }).then(response => {
      this.cards = response.data
      this.buildCardIndex()
      return {
        cards: this.cards,
        cardIndex: this.cardIndex
      }
    }).catch(error => {
      alert('An error occurred fetching the card data:\n' + error)
    });
  },
  watch: {
    '$route': function (newVal) {
      this.computeShowSearch(newVal)
    }
  }
};
</script>

<style scoped>
.overflow-x-auto {
  overflow-x: auto;
}
</style>
