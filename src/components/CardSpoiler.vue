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
        :page-settings="pageSettings"
        @search-started="searchStarted"
        @search-completed="searchCompleted"
      />

      <search-advanced
        v-show="searchType === 'Advanced'"
        :page-settings="pageSettings"
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
      pageSettings: {
        include4Ex: false,
        includeChallengeLords: false
      },
      showSearch: false,
      resultStyle: "detailed",
      searchResults: [],
      perPage: 100,
      currentPage: 1,
      resultFields: ["name", "type", "class", "level"],
      lastScrollPostion: 0
    };
  },
  computed: {
    cards() { return this.$store.state.cards; },
    cardIndex() { return this.$store.state.cardIndex; },
    referenceLists() { return this.$store.state.referenceLists; }
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

    this.$store.dispatch("loadCardData")
      .then(() => {
        this.isBusy = false;
      })
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
