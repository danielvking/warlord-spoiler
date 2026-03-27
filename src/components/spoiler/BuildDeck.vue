<template>
  <div class="d-flex flex-column flex-grow-1 overflow-hidden">
    <div class="px-2 py-1">
      <div class="float-left">
        <a href="#" @click.prevent="clear"><span class="font-default">✘</span> Clear</a>
      </div>
      <div class="float-right">

        <a href="#" title="Share deck" class="mr-1" @click.prevent="shareDeck">
          <font-awesome-icon icon="share" />
        </a>

        <a href="#" @click.prevent="importCards" title="Load deck" class="mr-1">
          <font-awesome-icon icon="folder-open" />
        </a>
        <a href="#" @click.prevent="exportCards" title="Save deck" class="mr-1">
          <font-awesome-icon icon="save" />
        </a>

        <a href="#" title="Format Validator" class="mr-1" v-on:click="showFormatValidator = !showFormatValidator">
          <font-awesome-icon icon="check" />
        </a>

        <router-link :to="{ name: 'printDeck' }" target="_blank" title="Print">
          <font-awesome-icon icon="print" />
        </router-link>
      </div>
    </div>
    <template v-if="showFormatValidator">
      <div class="p-1">
        <b-form-select v-model="edition" :options="editionList">
          <template #first>
            <b-form-select-option :value="null" disabled selected>Format Validator</b-form-select-option>
          </template>
        </b-form-select>
      </div>
    </template>
    <template v-if="$store.state.cardsLoaded">
      <card-hover :show="cardHover.show" :target="cardHover.target" :card="cardHover.card" placement="right"/>
      <div class="flex-grow-1 p-1 overflow-auto">
        <b-table
          v-for="type in Object.keys(typedCards)
            .map((x) => x) // Shallow copy
            .sort()"
          :key="type"
          :items="typedCards[type]"
          :fields="[
            { key: 'card', label: type },
            { key: 'editionCheck', label: '' },
            { key: 'count', label: '', class: 'text-right shrink' },
            { key: 'buttons', class: 'text-right shrink' },
          ]"
          small
          borderless
          striped
          hover
          @row-hovered="handleRowHovered"
        >
          <template v-if="showFormatValidator" #head(editionCheck)>
            <span>Legal</span>
          </template>

          <template v-if="showFormatValidator && edition" #cell(editionCheck)="{ item }">
            <span>
              {{ item.card.editions.some((cardEdition) => cardEdition === edition) ? "Yes" : "No" }}
            </span>
          </template>

          <template #head(buttons)>
            <span>({{ typedCards[type].reduce((s, x) => s + x.count, 0) }})</span>
          </template>

          <template v-slot:cell(buttons)="data">
            <div class="d-flex">
              <a href="#" @click.prevent="decrementCardToDeck(data.item.card.index)" title="Minus one" class="mr-1">
                <font-awesome-icon icon="minus-square" />
              </a>
              <a href="#" @click.prevent="incrementCardToDeck(data.item.card.index)" title="Plus one">
                <font-awesome-icon icon="plus-square" />
              </a>

              <div class="card-hover-anchor">
                <div :ref="'card_' + type + '_' + data.index" :class="'card_'+ type + '_' + data.index">
                </div>
              </div>
            </div>
          </template>

          <template v-slot:cell(card)="{ value }">
            <card-link block decorate :card="value">{{ value.name }}</card-link>
          </template>
        </b-table>
        <b-table
          class="mb-0"
          :fields="[{ label: 'Total' }, { key: 'buttons', class: 'text-right shrink' }]"
          small
          borderless
          striped
          hover
        >
          <template #head(buttons)>
            <span>{{ total }}</span>
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
</template>

<script>
import CardHover from "../shared/CardHover.vue";
import CardLink from "../shared/CardLink.vue";
import utility from "../../scripts/utility";
import lzString from "lz-string";

export default {
  name: "BuildDeck",
  components: {
    CardHover,
    CardLink
  },
  data() {
    return {
      edition: null,
      showFormatValidator: false,
      cardHover: {
        show: false,
        target: null,
        card: null
      },
    };
  },
  computed: {
    cardIndex() {
      return this.$store.state.cardIndex;
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
        .sort((x, y) => utility.stringCompare(x.card.name, y.card.name));
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
    total() {
      return this.$store.getters.deckTotal;
    },
    editionList() {
      return (this.referenceLists && this.referenceLists.editionList) || [];
    },
    referenceLists() {
      return this.$store.state.referenceLists;
    },
  },
  methods: {
    async shareDeck() {
      let deck = this.$store.state.deck;
      let encodedDeck = lzString.compressToEncodedURIComponent(JSON.stringify(deck));
      let searchParams = new URLSearchParams({ deck: encodedDeck });
      let newUrl = new URL(`${document.location.origin}?${searchParams}`);
      await navigator.clipboard.writeText(newUrl);
    },
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
            let lineIsUntapSpecific = line.indexOf("//") == 0;
            if (lineIsUntapSpecific) {
              continue;
            }

            if (line !== "") {
              let spaceIndex = line.indexOf(" ");
              if (spaceIndex < 0) {
                alert(`Error line ${i + 1}: each line must be a number, space, and card name`);
                return;
              }
              let count = +line.substring(0, spaceIndex);
              if (isNaN(count)) {
                alert(`Error line ${i + 1}: each line must be a number, space, and card name`);
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
        let cardTxt = this.cards.map((x) => `${x.count} ${x.card.name}`).join("\n");
        utility.saveText(cardTxt, "deck.txt");
      }
    },
    decrementCardToDeck(cardString) {
      this.$store.commit("decrementCardToDeck", cardString);
      if ((this.$store.state.deck[cardString] || 0) <= 0) {
        this.$nextTick(() => {
          // The card hover has a mutation observer to remove it from the document when its parent disappears
          // If we don't wait for a tick, we beat the observer, and then the visual disabling takes priority
          this.cardHover.show = false;
        });
      }
    },
    incrementCardToDeck(cardString) {
      this.$store.commit("incrementCardToDeck", cardString);
    },
    handleRowHovered: utility.debounce(function (item, index, e) {
      if (!this.$store.state.hasHover) return;
      if (e.target.matches(':hover')) {
        this.cardHover.show = true;
        this.cardHover.target = this.$refs['card_' + item.card.type + '_' + index][0];
        this.cardHover.card = item.card;

        let handleRowUnhovered = () => {
          e.target.removeEventListener('mouseleave', handleRowUnhovered);
          this.cardHover.show = false;
          this.cardHover.target = null;
          this.cardHover.card = null;
        }
        e.target.addEventListener('mouseleave', handleRowUnhovered);
      }
    }, 500),
  },
};
</script>

<style scoped>
.card-hover-anchor {
  position: relative;
  width: 1px;
  min-height: 1px;
  margin-left: -1px;
}

.card-hover-anchor > * {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>