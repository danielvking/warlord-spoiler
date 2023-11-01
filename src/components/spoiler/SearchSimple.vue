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

      <!-- Edition -->
      <b-col cols="12" md="6">
        <b-form-group class="text-center my-2" label="Format:">
          <b-form-select v-model="edition" inline :options="editionList">
            <template v-slot:first>
              <b-form-select-option :value="null">Open</b-form-select-option>
            </template>
          </b-form-select>
        </b-form-group>
      </b-col>
    </b-form-row>
  </div>
</template>

<script>
import utility from "../../scripts/utility";

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
      edition: null,
      isBusy: false,
    };
  },
  computed: {
    cards() {
      return this.$store.state.cards;
    },
    referenceLists() {
      return this.$store.state.referenceLists;
    },
    canSearch() {
      return this.cards && !this.isBusy;
    },
    editionList() {
      return (this.referenceLists && this.referenceLists.editionList) || [];
    },
  },
  watch: {
    edition(newValue) {
      this.$store.commit("saveSettings", { searchEdition: newValue });
    },
    "$store.state.settings.searchEdition"(newValue) {
      this.edition = newValue;
    },
  },
  mounted() {
    this.edition = this.$store.state.settings.searchEdition || null;
  },
  methods: {
    onSearch() {
      if (this.isBusy) return;
      this.isBusy = true;
      this.$emit("search-started");

      let searchText = this.searchText || "";
      let searchResults = [];
      let filter = (x) => {
        // Edition
        if (this.edition) {
          if (!x.editions.includes(this.edition)) return false;
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
