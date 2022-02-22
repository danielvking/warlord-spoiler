<template>
  <div>
    <b-form-row>
      <b-col cols="12" md="10" class="my-1">
        <b-form-input
          v-model="searchText"
          placeholder="Search text..."
          class="text-center"
          autofocus
          @keypress.enter="onSearch"
        />
      </b-col>
      <b-col cols="12" md="2" class="my-1">
        <b-button variant="primary" class="w-100" :disabled="!canSearch" @click.prevent="onSearch">Search</b-button>
      </b-col>
    </b-form-row>
    <b-form-row class="mb-4">
      <!-- Name/Text -->
      <b-col cols="12" md="6">
        <b-form-group class="text-center my-2" label="Search by:">
          <b-form-checkbox v-model="byName" inline>Name</b-form-checkbox>
          <b-form-checkbox v-model="byText" inline>Text</b-form-checkbox>
        </b-form-group>
      </b-col>

      <!-- Include Extended -->
      <b-col cols="12" md="6">
        <b-form-group class="text-center my-2" label="Include Extended:">
          <b-form-checkbox v-model="pageSettings.include4ex" inline>4Ex</b-form-checkbox>
          <b-form-checkbox v-model="pageSettings.includeChallengeLords" inline>Challenge Lords</b-form-checkbox>
        </b-form-group>
      </b-col>
    </b-form-row>
  </div>
</template>

<script>
import utility from "@/scripts/utility.js";

export default {
  name: "SearchSimple",
  props: {
    pageSettings: Object,
  },
  data() {
    return {
      searchText: null,
      byName: true,
      byText: false,
      isBusy: false,
    };
  },
  computed: {
    cards() {
      return this.$store.state.cards;
    },
    canSearch() {
      return this.cards && !this.isBusy;
    },
  },
  methods: {
    onSearch() {
      if (this.isBusy) return;
      this.isBusy = true;
      this.$emit("search-started");

      let searchText = this.searchText || "";
      let searchResults = [];
      let filter = (x) => {
        // Include 4Ex
        if (!this.pageSettings.include4ex) {
          let sets = x.printInfos.map((y) => y.set).filter((y) => y);
          let _4exSets = [
            "4EX",
            "AMH",
            "RttA",
            "4th Edition Expanded (4EX)",
            "Aftermath (AMH)",
            "Return to the Accordlands (RttA)",
          ];
          if (sets[0] && !sets.filter((s) => !_4exSets.includes(s))[0]) return false;
        }
        // Include Challenge Lords
        if (!this.pageSettings.includeChallengeLords) {
          if (x.challengeLord) return false;
        }
        if (this.byName && x.name && utility.includesTokens(x.name, searchText)) {
          return true;
        }
        if (this.byText && x.text && utility.includesTokens(x.text, searchText)) {
          return true;
        }
        return false;
      };

      utility
        .forEachAsync(this.cards, (x) => {
          if (filter(x)) searchResults.push(x);
        })
        .then(() => {
          searchResults.sort((a, b) => {
            if (a.name < b.name) return -1;
            else if (a.name > b.name) return 1;
            else return 0;
          });

          this.isBusy = false;
          this.$emit("search-completed", searchResults);
        });
    },
  },
};
</script>
