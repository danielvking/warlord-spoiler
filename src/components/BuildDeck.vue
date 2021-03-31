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
            <a
              href="#"
              @click.prevent="importCards"
              title="Load deck"
              class="mr-1"
            >
              <font-awesome-icon icon="folder-open" />
            </a>
            <a
              href="#"
              @click.prevent="exportCards"
              title="Save deck"
              class="mr-1"
            >
              <font-awesome-icon icon="save" />
            </a>

            <a
              href="#"
              title="Format Validator"
              class="mr-1"
              v-on:click="showFormatValidator = !showFormatValidator"
            >
              <font-awesome-icon icon="check" />
            </a>

            <router-link
              :to="{ name: 'printDeck' }"
              target="_blank"
              title="Print"
            >
              <font-awesome-icon icon="print" />
            </router-link>
          </div>
        </div>
        <template v-if="showFormatValidator">
          <div class="flex-grow-1 p-1">
            <v-select placeholder="Format validator"
              v-model="edition"
              :options="editionList" />
          </div>
        </template>
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
                { key: 'editionCheck', label:'' },
                { key: 'count', label: '', class: 'text-right shrink' },
                { key: 'buttons', class: 'text-right shrink' },
              ]"
              small
              borderless
              striped
              hover
              @row-clicked="(cardCount) => viewDetail(cardCount.card)"
            >
              <template v-if="showFormatValidator" #head(editionCheck)>
                <span>Legal</span>
              </template>

              <template v-if="showFormatValidator && edition" #cell(editionCheck)="data">
                  <span>
                    {{ data.item.card.editions.some(cardEdition => cardEdition===edition) ? "yes":"no" }}
                  </span>
              </template>

              <template #head(buttons)>
                <span>({{ typedCards[type].reduce((s, x) => s + x.count, 0) }})</span>
              </template>

              <template v-slot:cell(buttons)="data">
                <a
                  href="#"
                  @click.prevent="decrementCardToDeck(data.item.card.index)"
                  title="Minus one"
                  class="mr-1"
                >
                  <font-awesome-icon icon="minus-square" />
                </a>
                <a
                  href="#"
                  @click.prevent="incrementCardToDeck(data.item.card.index)"
                  title="Plus one"
                >
                  <font-awesome-icon icon="plus-square" />
                </a>
              </template>
            </b-table>
            <b-table
              class="mb-0"
              :fields="[
                { label: 'Total' },
                { key: 'buttons', class: 'text-right shrink' },
              ]"
              small
              borderless
              striped
              hover
            >
              <template #head(buttons)>
                <span>{{ cards.reduce((s, x) => s + x.count, 0) }}</span>
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
      return (
        Object.keys(this.$store.state.deck).length &&
        this.$store.getters.showDeck
      );
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
    editionList() {
      return (this.referenceLists && this.referenceLists.editionList) || [];
    },
    referenceLists() {
      return this.$store.state.referenceLists;
    },
  },
  methods: {
    clear() {
      this.$store.commit("clearDeck");
    },
    importCards() {
      if (this.$store.state.cardsLoaded) {
        utility.readText().then((x) => {
          let cards = this.$store.state.cards;
          let deck = [];

          // Parse
          let lines = x.split(/[\r\n]+/);
          for (let i = 0; i < lines.length; i++) {
            let line = lines[i];

            // normalize from untap.in
            let lineIsUntapSpecific = (line.indexOf('//') == 0)
            if( lineIsUntapSpecific ) {
              continue
            }

            if (line !== "") {
              let spaceIndex = line.indexOf(" ");
              if (spaceIndex < 0) {
                alert(
                  `Error line ${
                    i + 1
                  }: each line must be a number, space, and card name`
                );
                return;
              }
              let count = +line.substring(0, spaceIndex);
              if (isNaN(count)) {
                alert(
                  `Error line ${
                    i + 1
                  }: each line must be a number, space, and card name`
                );
                return;
              }
              let cardName = line.substring(spaceIndex + 1);

              let matchingCards = cards.filter((x) => x.name === cardName);
              if (matchingCards.length === 0) {
                alert(`Error line ${i + 1}: unrecognized card ${cardName}`);
                return;
              } else if (matchingCards.length > 1) {
                alert(`Warning line ${i + 1}: ${cardName} is ambiguous`);
              }
              deck.push({ cardString: matchingCards[0].index, count: count });
            }

            // Set deck
            this.clear();
            deck.forEach((cardStringCount) => {
              for (let i = 0; i < cardStringCount.count; i++) {
                this.incrementCardToDeck(cardStringCount.cardString);
              }
            });
          }
        });
      }
    },
    exportCards() {
      if (this.$store.state.cardsLoaded) {
        let cardTxt = this.cards
          .map((x) => `${x.count} ${x.card.name}`)
          .join("\n");
        utility.saveText(cardTxt, "deck.txt");
      }
    },
    decrementCardToDeck(cardString) {
      this.$store.commit("decrementCardToDeck", cardString);
    },
    incrementCardToDeck(cardString) {
      this.$store.commit("incrementCardToDeck", cardString);
    },
    viewDetail(card) {
      this.$router.push({ path: "card-detail", query: { card: card.index } });
    },
  },
  data() {
    return{
      edition: undefined,
      showFormatValidator: false
    }
  }
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