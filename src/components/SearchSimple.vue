<template>
  <div>
    <b-form-row>
      <b-col cols="12" md="10" class="my-1">
        <b-form-input
          v-model="searchText"
          placeholder="Search text..."
          class="text-center"
          @keypress.enter="onSearch"
        />
      </b-col>
      <b-col cols="12" md="2" class="my-1">
        <b-button
          variant="primary"
          class="w-100"
          :disabled="!canSearch"
          @click.prevent="onSearch"
        >Search</b-button>
      </b-col>
    </b-form-row>
    <b-form-row>
      <b-col>
        <b-form-group class="text-center" label="Search by:">
          <b-form-checkbox v-model="byName" inline>Name</b-form-checkbox>
          <b-form-checkbox v-model="byText" inline>Text</b-form-checkbox>
        </b-form-group>
      </b-col>
    </b-form-row>
  </div>
</template>

<script>
import utility from "@/utility.js";

export default {
  name: "SearchSimple",
  props: {
    cards: Array
  },
  data() {
    return {
      searchText: null,
      byName: true,
      byText: false,
      isBusy: false
    };
  },
  computed: {
    canSearch() {
      return this.cards && !this.isBusy;
    }
  },
  methods: {
    onSearch() {
      if (this.isBusy) return;
      this.isBusy = true;
      this.$emit("search-started");

      let searchText = (this.searchText && this.searchText.toLowerCase()) || "";
      let searchResults = [];
      let filter = x => {
        if (
          this.byName &&
          x.name &&
          x.name.toLowerCase().includes(searchText)
        ) {
          return true;
        }
        if (
          this.byText &&
          x.text &&
          x.text.toLowerCase().includes(searchText)
        ) {
          return true;
        }
        return false;
      };

      utility
        .forEachAsync(this.cards, x => {
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
    }
  }
};
</script>