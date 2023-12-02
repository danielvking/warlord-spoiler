<template>
  <div class="super-site-container">
    <side-menu v-model="sideMenuOpen" :title="sideMenuTitle">
      <build-deck v-if="!isEditMode"/>
      <edit-cards v-else/>
    </side-menu>
    <header-footer class="flex-grow-1 mx-0">
      <template #fixedToolbar>
        <b-button ref="sideMenuButton" variant="outline-light" class="fixed-toolbar-btn h-100 border-0 px-2 bg-dark" @click="sideMenuOpen = !sideMenuOpen">
          <font-awesome-icon class="fa-flip-horizontal" icon="hammer" :title="sideMenuTitle" />
          <div v-show="sideMenuTotal > 0" class="total-pill">{{ sideMenuTotal }}</div>
        </b-button>
      </template>

      <router-link class="d-none" :to="{ name: 'cardList' }"/>

      <router-view />

      <b-container v-show="showSearch" class="mt-2" fluid>
        <div class="text-center">
          <span>Need to find some information on Warlord cards? You've come to the right place:</span>
        </div>

        <b-radio-group v-model="searchType" :options="['Simple', 'Advanced']" class="my-2 w-100" buttons />

        <search-simple
          v-show="searchType === 'Simple'"
          @search-started="searchStarted"
          @search-completed="searchCompleted"
        />

        <search-advanced
          v-show="searchType === 'Advanced'"
          @search-started="searchStarted"
          @search-completed="searchCompleted"
        />

        <hr/>

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
                  @row-clicked="handleRowClicked"
                >
                  <template v-slot:cell(buttons)="data">
                    <a href="#" @click.prevent="addCard(data.item.index)" :title="addCardText">
                      <font-awesome-icon icon="plus-square" />
                    </a>
                  </template>
                </b-table>
              </div>

              <template v-else-if="resultStyle === 'detailed'">
                <b-table
                  :items="searchResults"
                  :fields="[{ key: 'buttons', class: 'shrink', label: '' }, 'details']"
                  small
                  borderless
                  striped
                  hover
                  :per-page="perPage"
                  :current-page="currentPage"
                  @row-clicked="handleRowClicked"
                >
                  <template v-slot:cell(buttons)="data">
                    <a href="#" @click.prevent="addCard(data.item.index)" :title="addCardText">
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
import HeaderFooter from "../shared/HeaderFooter.vue";
import SideMenu from "../shared/SideMenu.vue";
import BuildDeck from "./BuildDeck.vue";
import EditCards from "../editor/EditCards.vue";
import SearchSimple from "./SearchSimple.vue";
import SearchAdvanced from "./SearchAdvanced.vue";
import CardCompact from "./CardCompact.vue";
import utility from "../../scripts/utility";
import addRemoveCardMixin from "../../mixins/addRemoveCardMixin";
import routeMixin from "../../mixins/routeMixin";

let toastIdCounter = 0;

export default {
  name: "CardSpoiler",
  components: {
    HeaderFooter,
    SideMenu,
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
      showSearch: false,
      resultStyle: "detailed",
      searchResults: [],
      perPage: 100,
      currentPage: 1,
      resultFields: [{ key: "buttons", class: "shrink", label: "" }, "name", "type", "class", "level"],
      lastScrollPostion: 0,
      sideMenuOpen: false
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
    showSideMenus() {
      return this.$store.getters.showSideMenus;
    },
    isEditMode() {
      return this.$store.state.settings.isEditMode;
    },
    sideMenuTitle() {
      return this.isEditMode ? "Edit Cards" : "Build Deck";
    },
    sideMenuTotal() {
      return this.isEditMode ? this.$store.getters.editedCardsTotal : this.$store.getters.deckTotal;
    },
  },
  methods: {
    computeShowSearch(route, oldRoute) {
      this.showSearch = route.name === "searchPage";

      if (this.showSearch) {
        this.$nextTick(() => {
          let scrollRegion = document.documentElement;
          scrollRegion.scrollTop = this.lastScrollPostion;
        });
      } else if (route.name === "cardDetailPage" && oldRoute && oldRoute.name === "searchPage") {
        let scrollRegion = document.documentElement;
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
        let scrollRegion = document.documentElement;
        let searchResults = document.getElementById("searchResults");

        utility.smoothScrollTo(scrollRegion, searchResults.offsetTop, 300);
      });
    },
    handleCardAdded(cardString) {
      if (this.showSideMenus) {
        this.sideMenuOpen = true;
      }
      if (!this.sideMenuOpen) {
        let toastIdPrefix = "cardSpoilerCardAddedToast_";
        this.$bvToast.hide(toastIdPrefix + toastIdCounter);
        let toastOptions = {
          appendToast: true,
          autoHideDelay: 1500,
          id: toastIdPrefix + ++toastIdCounter,
          noCloseButton: true,
          noHoverPause: true,
          toaster: "b-toaster-bottom-center"
        };
        this.$bvToast.toast("+1 " + cardString, toastOptions);
      }
    },
    handleSideMenuUpdate() {
      this.sideMenuOpen = true;
    },
    handleRowClicked(card, _, event) {
      if (event.target.cellIndex === 0) return;
      this.viewCardDetail(card);
    },
  },
  mounted() {
    this.computeShowSearch(this.$route);

    this.sideMenuOpen = (this.isEditMode || Object.keys(this.$store.state.deck).length > 0) && this.showSideMenus;

    this.$store.dispatch("loadCardData").then(() => {
      this.isBusy = false;
    });

    this.$store.state.events.cardAdded.addListener(this.handleCardAdded);
  },
  beforeDestroy() {
    this.$store.state.events.cardAdded.removeListener(this.handleCardAdded);
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
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  max-width: 1024px;
}

.fixed-toolbar-btn,
.fixed-toolbar-btn:focus {
  background: #19191980 !important;
}

.fixed-toolbar-btn:hover {
  background: #ffffff88 !important;
}

.overflow-x-auto {
  overflow-x: auto;
}

.btn .total-pill {
  position: absolute;
  top: 0;
  right: 0;
  margin: 4px;
  padding: 0px 4px;
  border-radius: 50rem;
  font-size: 13px;
  font-weight: bold;
  background-color: white;
  color: #191919;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out
}

.btn:hover .total-pill {
  background-color: #191919;
  color: white;
}
</style>
