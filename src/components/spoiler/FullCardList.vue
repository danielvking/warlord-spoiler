<template>
  <header-footer>
    <div class="px-5">
      <div v-for="card in cards" :key="card.index">
        <router-link :to="{ name: 'cardDetailPage', query: { card: card.index } }">
          {{ card.name }}
        </router-link>
      </div>
    </div>
  </header-footer>
</template>

<script>
import HeaderFooter from "../shared/HeaderFooter.vue";

export default {
  components: { HeaderFooter },
  name: "FullCardList",
  computed: {
    cards() {
      let cards = this.$store.state.cards
      if (!cards) return cards;
      cards = cards.slice();
      return cards.sort((a, b) => a.name.localeCompare(b.name));
    }
  },
  mounted() {
    this.$store.dispatch("loadCardData");
  },
};
</script>