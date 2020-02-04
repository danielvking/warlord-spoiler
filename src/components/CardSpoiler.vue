<template>
  <header-footer>
    <router-view />
    <b-container v-show="showSearch" class="mt-2" fluid>
      <div
        class="text-center"
      >Need to find some information on Warlord cards? You've come to the right place:</div>

      <b-radio-group
        v-model="searchType"
        :options="[ 'Simple', 'Advanced' ]"
        class="my-2 w-100"
        buttons
      />

      <search-simple
        v-show="searchType === 'Simple'"
        :cards="cards"
        :page-settings="pageSettings"
        @search-started="searchStarted"
        @search-completed="searchCompleted"
      />

      <search-advanced
        v-show="searchType === 'Advanced'"
        :cards="cards"
        :page-settings="pageSettings"
        :referenceLists="referenceLists"
        @search-started="searchStarted"
        @search-completed="searchCompleted"
      />

      <div id="searchResults">
        <template v-if="!isBusy">
          <template v-if="searchResults[0]">
            <b-row>
              <b-col cols="12" md="6">
                <b-form-select v-model="resultStyle" class="my-2">
                  <b-form-select-option value="table">Table</b-form-select-option>
                  <b-form-select-option value="detailed">Detailed</b-form-select-option>
                </b-form-select>
              </b-col>
              <b-col>
                <b-pagination
                  v-model="currentPage"
                  class="font-default"
                  :total-rows="searchResults.length"
                  :per-page="perPage"
                  size="sm"
                  align="right"
                />
              </b-col>
            </b-row>

            <div v-if="resultStyle === 'table'" class="overflow-x-auto">
              <b-table
                :items="searchResults"
                :fields="resultFields"
                small
                borderless
                striped
                hover
                :per-page="perPage"
                :current-page="currentPage"
                @row-clicked="card => viewDetail(card)"
              />
            </div>

            <template v-else-if="resultStyle === 'detailed'">
              <b-table
                :items="searchResults"
                :fields="['details']"
                small
                borderless
                striped
                hover
                :per-page="perPage"
                :current-page="currentPage"
                @row-clicked="card => viewDetail(card)"
              >
                <template v-slot:cell(details)="data">
                  <card-compact :card="data.item" />
                </template>
              </b-table>
            </template>

            <b-pagination
              v-model="currentPage"
              class="font-default"
              :total-rows="searchResults.length"
              :per-page="perPage"
              size="sm"
              align="right"
            />
          </template>
          <template v-else>
            <div class="text-center m-5">No results</div>
          </template>
        </template>
        <template v-else>
          <div class="text-center m-5 vh-100">
            <b-spinner />
          </div>
        </template>
      </div>
    </b-container>
  </header-footer>
</template>

<script>
import HeaderFooter from "@/components/HeaderFooter.vue";
import SearchSimple from "@/components/SearchSimple.vue";
import SearchAdvanced from "@/components/SearchAdvanced.vue";
import CardCompact from "@/components/CardCompact.vue";
import axios from "axios";
import utility from "@/utility.js";

export default {
  name: "CardSpoiler",
  components: {
    HeaderFooter,
    CardCompact,
    SearchSimple,
    SearchAdvanced
  },
  data() {
    return {
      isBusy: true,
      searchType: "Simple",
      cardPromise: null,
      pageSettings: {
        include4Ex: false,
        includeChallengeLords: false
      },
      showSearch: false,
      cards: null,
      cardIndex: {},
      referenceLists: null,
      resultStyle: "detailed",
      searchResults: [],
      perPage: 100,
      currentPage: 1,
      resultFields: ["name", "type", "class", "level"],
      lastScrollPostion: 0
    };
  },
  methods: {
    computeShowSearch(route) {
      this.showSearch = route.name === "searchPage";

      if (this.showSearch) {
        this.$nextTick(() => {
          let scrollRegion = document.getElementById('scrollRegion');
          scrollRegion.scrollTop = this.lastScrollPostion;
        });
      }
    },
    buildCardIndex() {
      this.cards.forEach(x => {
        let key = x.name;
        if (this.cardIndex[key]) {
          let count = 1;
          do {
            count++;
            key = x.name + "_" + count;
          } while (this.cardIndex[key]);
        }
        this.cardIndex[key] = x;
        x.index = key;
      });
    },
    viewDetail(card) {
      let scrollRegion = document.getElementById('scrollRegion');
      this.lastScrollPostion = scrollRegion.scrollTop;
      this.$router.push({ path: "card-detail", query: { card: card.index } });
    },
    searchStarted() {
      this.isBusy = true;
    },
    searchCompleted(results) {
      this.searchResults = results;
      this.currentPage = 1;
      this.isBusy = false;
      
      this.$nextTick(() => {
        let scrollRegion = document.getElementById('scrollRegion');
        let searchResults = document.getElementById('searchResults');

        utility.smoothScrollTo(scrollRegion, searchResults.offsetTop, 300);
      })
    }
  },
  mounted() {
    this.computeShowSearch(this.$route);

    let cardsJson = axios({
      method: "get",
      url: "/resources/cards.json"
    }).then(response => {
      this.cards = response.data;
      this.buildCardIndex();
    });

    let referenceListsJson = axios({
      method: "get",
      url: "/resources/referenceLists.json"
    }).then(response => {
      this.referenceLists = response.data;
    });

    this.cardPromise = Promise.all([cardsJson, referenceListsJson])
      .then(() => {
        this.isBusy = false;
        return {
          cards: this.cards,
          cardIndex: this.cardIndex,
          referenceLists: this.referenceLists
        };
      })
      .catch(error => {
        alert("An error occurred fetching the card data:\n" + error);
      });
  },
  watch: {
    $route: function(newVal) {
      this.computeShowSearch(newVal);
    }
  }
};
</script>

<style scoped>
.overflow-x-auto {
  overflow-x: auto;
}
</style>
