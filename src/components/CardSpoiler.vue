<template>
  <header-footer>
    <router-view />
    <b-container v-if="showSearch" class="mt-2" fluid>
      <div
        class="text-center"
      >Need to find some information on Warlord cards? You've come to the right place:</div>

      <b-radio-group
        v-model="searchType"
        :options="[ 'Simple', 'Advanced' ]"
        class="my-2 w-100"
        buttons
      />

      <template v-if="searchType === 'Simple'">
        <search-simple :cards="cards" @search-started="searchStarted" @search-completed="searchCompleted"/>
      </template>

      <template v-else-if="searchType === 'Advanced'">
        <b-form-group label-cols="6" label="Name:">
          <b-form-input />
        </b-form-group>
        <b-form-group label-cols="6" label="Text:">
          <b-form-input />
        </b-form-group>
        <b-form-group label-cols="6" label="Flavor Text:">
          <b-form-input />
        </b-form-group>
        <b-form-group label-cols="6" label="Artist:">
          <b-form-input />
        </b-form-group>
        <b-form-group label-cols="6" label="Number of Attacks:" label-for="txtNoAtks">
          <b-input-group>
            <b-input-group-prepend>
              <b-form-select class="font-default radius-right-0" :options="[ '≥', '=', '≤' ]" />
            </b-input-group-prepend>
            <b-form-input id="txtNoAtks" type="number" />
          </b-input-group>
        </b-form-group>
        <b-form-group label-cols="6" label="ATK:" label-for="txtAtk">
          <b-input-group>
            <b-input-group-prepend>
              <b-form-select class="font-default radius-right-0" :options="[ '≥', '=', '≤' ]" />
            </b-input-group-prepend>
            <b-form-input id="txtAtk" />
          </b-input-group>
        </b-form-group>
        <b-form-group label-cols="6" label="AC:" label-for="txtAc">
          <b-input-group>
            <b-input-group-prepend>
              <b-form-select class="font-default radius-right-0" :options="[ '≥', '=', '≤' ]" />
            </b-input-group-prepend>
            <b-form-input id="txtAc" />
          </b-input-group>
        </b-form-group>
        <b-form-group label-cols="6" label="SK:" label-for="txtSk">
          <b-input-group>
            <b-input-group-prepend>
              <b-form-select class="font-default radius-right-0" :options="[ '≥', '=', '≤' ]" />
            </b-input-group-prepend>
            <b-form-input id="txtSk" />
          </b-input-group>
        </b-form-group>
        <b-form-group label-cols="6" label="HP:" label-for="txtHp">
          <b-input-group>
            <b-input-group-prepend>
              <b-form-select class="font-default radius-right-0" :options="[ '≥', '=', '≤' ]" />
            </b-input-group-prepend>
            <b-form-input id="txtHp" />
          </b-input-group>
        </b-form-group>
        <b-form-group label-cols="6" label="LVL:" label-for="txtLvl">
          <b-input-group>
            <b-input-group-prepend>
              <b-form-select class="font-default radius-right-0" :options="[ '≥', '=', '≤' ]" />
            </b-input-group-prepend>
            <b-form-input id="txtLvl" />
          </b-input-group>
        </b-form-group>
      </template>

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
        <div class="text-center m-5">
          <b-spinner />
        </div>
      </template>
    </b-container>
  </header-footer>
</template>

<script>
import HeaderFooter from "@/components/HeaderFooter.vue";
import SearchSimple from "@/components/SearchSimple.vue";
import CardCompact from "@/components/CardCompact.vue";
import axios from "axios";

export default {
  name: "CardSpoiler",
  components: {
    HeaderFooter,
    CardCompact,
    SearchSimple
  },
  data() {
    return {
      isBusy: true,
      searchType: "Simple",
      cardPromise: null,
      showSearch: false,
      cards: null,
      cardIndex: {},
      resultStyle: "table",
      searchResults: [],
      search: {
        text: "",
        byName: true,
        byText: false
      },
      perPage: 100,
      currentPage: 1,
      resultFields: ["name", "type", "class", "level"]
    };
  },
  methods: {
    computeShowSearch(route) {
      this.showSearch = route.name === "searchPage";
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
      this.$router.push({ path: "card-detail", query: { card: card.index } });
    },
    searchStarted() {
      this.isBusy = true;
    },
    searchCompleted(results) {
      this.searchResults = results;
      this.isBusy = false;
    }
  },
  mounted() {
    this.computeShowSearch(this.$route);
    this.cardPromise = axios({
      method: "get",
      url: "/resources/cards.json"
    })
      .then(response => {
        this.cards = response.data;
        this.buildCardIndex();
        this.isBusy = false;
        return {
          cards: this.cards,
          cardIndex: this.cardIndex
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

.radius-right-0 {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
</style>
