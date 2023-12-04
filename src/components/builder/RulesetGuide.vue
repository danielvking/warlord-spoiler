<template>
  <header-footer>
    <b-container fluid>
      <p class="mt-2">This is a breakdown of the {{ id }} ruleset. You can use the page navigation to jump to specific sections.</p>
      <div v-for="key in Object.keys(rs)" :key="key">
        <template v-if="showSection(key)">
          <h1 :id="key + 'Section'" class="my-0">{{ humanify(key) }}</h1>
          <template v-if="key === 'general'">
            <p v-if="rs[key].genInfo" class="general-text">{{ rs[key].genInfo }}</p>
            <p v-if="rs[key].pointMaximum" class="general-text">The maximum point value is {{ rs[key].pointMaximum }}.</p>
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
import HeaderFooter from "../shared/HeaderFooter.vue";
import rulesets from "../../scripts/rulesets/cardRules";

export default {
  components: { HeaderFooter },
  props: {
    id: String,
  },
  computed: {
    rulesetDesc() {
      return rulesets.filter((x) => x.description === this.id)[0];
    },
    rs() {
      return (this.rulesetDesc && this.rulesetDesc.ruleset) || {};
    },
    localRoutes() {
      return Object.keys(this.rs).filter(x => this.showSection(x)).map(x => {
        return {
          display: this.humanify(x),
          to: "#" + x + 'Section'
        }
      });
    }
  },
  mounted() {
    this.$store.commit("setLocalRoutes", this.localRoutes);
    if (!this.rulesetDesc) {
      this.$store.commit("setShow404", true);
    }
  },
  methods: {
    humanify(val) {
      val = val.replace(/([A-Z])/g, " $&");
      val = val.charAt(0).toUpperCase() + val.slice(1);
      return val;
    },
    showSection(key) {
      if (key === "general") {
        return this.rs[key].pointMaximum != null;
      }
      return this.rs[key].pointInfoDetail || this.rs[key].pointInfo;
    }
  }
};
</script>

<style scoped>
.general-text {
  white-space: pre-wrap;
}
</style>