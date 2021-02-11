<template>
  <div v-if="showDeck" class="deck-container-outer">
    <div class="deck-container-middle">
      <div class="deck-container-inner content-region">
        <div class="site-subheader">
          <h6>Build Deck</h6>
        </div>
        <div class="px-2 py-1">
          <div class="float-left">
            <a href="#" @click.prevent="clear"
              ><span class="font-default">✘</span> Clear</a
            >
          </div>
          <div class="float-right">
            <router-link :to="{ name: 'printDeck' }" target="_blank" aria-label="print" class="mr-1">
              <font-awesome-icon icon="print" />
            </router-link>
            <a href="#" @click.prevent="exportCards" aria-label="file export">
              <font-awesome-icon icon="file-export" />
            </a>
          </div>
        </div>
        <template v-if="$store.state.cardsLoaded">
          <div class="flex-grow-1 p-1 overflow-auto">
            <b-table
              v-for="type in Object.keys(typedCards)
                .map((x) => x)
                .sort()"
              :key="type"
              :items="typedCards[type]"
              :fields="[
                { key: 'card.name', label: type },
                { key: 'count', class: 'text-right shrink', label: '' },
                { key: 'buttons', class: 'shrink', label: '' },
              ]"
              small
              borderless
              striped
              hover
              @row-clicked="(cardCount) => viewDetail(cardCount.card)"
            >
              <template v-slot:cell(buttons)="data">
                <a
                  href="#"
                  @click.prevent="
                    $store.commit('decrementCardToDeck', data.item.card.index)
                  "
                  aria-label="minus"
                  class="mr-1"
                >
                  <font-awesome-icon icon="minus-square" />
                </a>
                <a
                  href="#"
                  @click.prevent="
                    $store.commit('incrementCardToDeck', data.item.card.index)
                  "
                  aria-label="plus"
                >
                  <font-awesome-icon icon="plus-square" />
                </a>
              </template>
            </b-table>
          </div>
        </template>
        <template v-else>
          <div class="text-center m-5">
            <b-spinner />
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import utility from "@/utility.js";

export default {
  name: "BuildDeck",
  computed: {
    cardIndex() {
      return this.$store.state.cardIndex;
    },
    showDeck() {
      return Object.keys(this.$store.state.deck).length && this.$store.getters.showDeck;
    },
    cards() {
      let deck = this.$store.state.deck;
      return Object.keys(deck)
        .filter((x) => this.cardIndex[x])
        .map((x) => {
          return {
            card: this.cardIndex[x],
            count: deck[x],
          };
        })
        .sort((x) => x.card);
    },
    typedCards() {
      return this.cards.reduce((map, cardCount) => {
        if (cardCount.card) {
          var existing = map[cardCount.card.type];
          if (!existing) existing = map[cardCount.card.type] = [];
          existing.push(cardCount);
        }
        return map;
      }, {});
    },
  },
  methods: {
    clear() {
      this.$store.commit("clearDeck");
    },
    exportCards() {
      if (this.$store.state.cardsLoaded) {
        let cardTxt = this.cards.map(x => `${x.count} ${x.card.name}`).join("\n");
        utility.saveText(cardTxt, "deck.txt");
      }
    },
    viewDetail(card) {
      this.$router.push({ path: "card-detail", query: { card: card.index } });
    },
  },
};
</script>

<style scoped>
.deck-container-outer {
  min-width: 256px;
}

.deck-container-middle {
  position: relative;
}

.deck-container-inner {
  position: fixed;
  display: flex;
  width: 250px;
  margin-right: 6px;
  flex-direction: column;
  max-height: 100vh;
}
</style>