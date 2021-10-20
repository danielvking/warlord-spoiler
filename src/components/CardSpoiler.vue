<template>
  <div
    class="super-site-container d-flex flex-row justify-content-center mx-auto"
  >
    <build-deck v-if="!isEditMode" class="align-self-start" />
    <edit-cards v-else class="align-self-start"/>
    <header-footer class="flex-grow-1 mx-0">
      <router-view />
      <b-container v-show="showSearch" class="mt-2" fluid>
        <div class="text-center">
          <span
            >Need to find some information on Warlord cards? You've come to the
            right place:</span
          >
        </div>

        <b-radio-group
          v-model="searchType"
          :options="['Simple', 'Advanced']"
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
                    <b-form-select-option value="table"
                      >Table</b-form-select-option
                    >
                    <b-form-select-option value="detailed"
                      >Detailed</b-form-select-option
                    >
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
                  @row-clicked="(card) => viewCardDetail(card)"
                >
                  <template v-slot:cell(buttons)="data">
                    <a
                      v-if="showSidebar"
                      href="#"
                      @click.prevent="addCard(data.item.index)"
                      :title="addCardText"
                    >
                      <font-awesome-icon icon="plus-square" />
                    </a>
                  </template>
                </b-table>
              </div>

              <template v-else-if="resultStyle === 'detailed'">
                <b-table
                  :items="searchResults"
                  :fields="[
                    { key: 'buttons', class: 'shrink', label: '' },
                    'details',
                  ]"
                  small
                  borderless
                  striped
                  hover
                  :per-page="perPage"
                  :current-page="currentPage"
                  @row-clicked="(card) => viewCardDetail(card)"
                >
                  <template v-slot:cell(buttons)="data">
                    <a
                      v-if="showSidebar"
                      href="#"
                      @click.prevent="addCard(data.item.index)"
                      :title="addCardText"
                    >
                      <font-awesome-icon icon="plus-square" />
                    </a>
                  </template>
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
  </div>
</template>

<script>
import HeaderFooter from "@/components/HeaderFooter.vue";
import BuildDeck from "@/components/BuildDeck.vue";
import EditCards from "@/components/EditCards.vue";
import SearchSimple from "@/components/SearchSimple.vue";
import SearchAdvanced from "@/components/SearchAdvanced.vue";
import CardCompact from "@/components/CardCompact.vue";
import utility from "@/utility.js";
import addRemoveCardMixin from "@/mixins/addRemoveCardMixin.js";
import routeMixin from "@/mixins/routeMixin.js";

export default {
  name: "CardSpoiler",
  components: {
    HeaderFooter,
    BuildDeck,
    EditCards,
    CardCompact,
    SearchSimple,
    SearchAdvanced,
  },
  mixins: [addRemoveCardMixin, routeMixin],
  data() {
    return {
      isBusy: true,
      searchType: "Simple",
      pageSettings: {
        include4Ex: false,
        includeChallengeLords: false,
      },
      showSearch: false,
      resultStyle: "detailed",
      searchResults: [],
      perPage: 100,
      currentPage: 1,
      resultFields: [
        { key: "buttons", class: "shrink", label: "" },
        "name",
        "type",
        "class",
        "level",
      ],
      lastScrollPostion: 0,
    };
  },
  computed: {
    cards() {
      return this.$store.state.cards;
    },
    cardIndex() {
      return this.$store.state.cardIndex;
    },
    referenceLists() {
      return this.$store.state.referenceLists;
    },
    showSidebar() {
      return this.$store.getters.showSidebar;
    },
    isEditMode() {
      return this.$store.state.settings.isEditMode;
    }
  },
  methods: {
    computeShowSearch(route, oldRoute) {
      this.showSearch = route.name === "searchPage";

      if (this.showSearch) {
        this.$nextTick(() => {
          let scrollRegion = document.getElementById("scrollRegion");
          scrollRegion.scrollTop = this.lastScrollPostion;
        });
      } else if (
        route.name === "cardDetailPage" &&
        oldRoute &&
        oldRoute.name === "searchPage"
      ) {
        let scrollRegion = document.getElementById("scrollRegion");
        this.lastScrollPostion = scrollRegion.scrollTop;
      }
    },
    searchStarted() {
      this.isBusy = true;
    },
    searchCompleted(results) {
      this.searchResults = results;
      this.currentPage = 1;
      this.isBusy = false;

      this.$nextTick(() => {
        let scrollRegion = document.getElementById("scrollRegion");
        let searchResults = document.getElementById("searchResults");

        utility.smoothScrollTo(scrollRegion, searchResults.offsetTop, 300);
      });
    },
  },
  mounted() {
    this.computeShowSearch(this.$route);

    this.$store.dispatch("loadCardData").then(() => {
      this.isBusy = false;
    });
  },
  watch: {
    $route: function (newVal, oldVal) {
      this.computeShowSearch(newVal, oldVal);
    },
  },
};
</script>

<style scoped>
.super-site-container {
  max-width: 1024px;
}

.overflow-x-auto {
  overflow-x: auto;
}
</style>
