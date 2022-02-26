<template>
  <header-footer>
    <b-container fluid>
      <p class="mt-2">A breakdown of the {{ id }} ruleset:</p>
      <div v-for="key in Object.keys(rs)" :key="key">
        <template v-if="showSection(key)">
          <h3 class="my-2">{{ insertSpaces(key) }}</h3>
          <template v-if="key === 'general'">
            
          </template>
          <template v-else-if="rs[key].pointInfoDetail">
            <div v-html="rs[key].pointInfoDetail"></div>
          </template>
          <template v-else>
            <p class="general-text">{{ rs[key].pointInfo }}</p>
          </template>
        </template>
      </div>
    </b-container>
  </header-footer>
</template>

<script>
import HeaderFooter from "@/components/shared/HeaderFooter.vue";
import rulesets from "@/scripts/rulesets/cardRules.js";

export default {
  components: { HeaderFooter },
  props: {
    id: String,
  },
  computed: {
    rs() {
      let rulesetDesc = rulesets.filter((x) => x.description === this.id)[0];
      return rulesetDesc.ruleset;
    },
  },
  methods: {
    insertSpaces(val) {
      return val.replace(/([A-Z])/g, " $&");
    },
    showSection(key) {
      return this.rs[key].pointInfoDetail || this.rs[key].pointInfo;
    }
  }
};
</script>

<style scoped>
h3 {
  text-transform: capitalize;
}

.general-text {
  white-space: pre-wrap;
}
</style>