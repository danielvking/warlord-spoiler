<template>
  <div v-if="showSidebar" class="deck-container-outer">
    <div class="deck-container-middle">
      <div class="deck-container-inner content-region">
        <div class="site-subheader">
          <h6>Edit Cards</h6>
        </div>
        <div class="px-2 py-1">
          <div class="float-left">
            <a href="#" @click.prevent="clear"><span class="font-default">✘</span> Clear</a>
          </div>
          <div class="float-right">
            <a href="#" @click.prevent="newCard" title="New card" class="mr-1">
              <font-awesome-icon icon="plus-square" />
            </a>
            <a href="#" @click.prevent="exportCards" title="Save cards" class="mr-1">
              <font-awesome-icon icon="save" />
            </a>
            <a href="#" @click.prevent="exitEditing" title="Exit editing">
              <font-awesome-icon icon="sign-out-alt" />
            </a>
          </div>
        </div>
        <template v-if="$store.state.cardsLoaded">
          <div class="flex-grow-1 p-1 overflow-auto">
            <b-table
              v-for="type in Object.keys(typedCards)
                .map((x) => x) // Shallow copy
                .sort()"
              :key="type"
              :items="typedCards[type]"
              :fields="[
                { key: 'name', label: type },
                { key: 'count', label: '', class: 'text-right shrink' },
                { key: 'buttons', class: 'text-right shrink' },
              ]"
              small
              borderless
              striped
              hover
              @row-clicked="(card) => viewCardDetail(card)"
            >
              <template #head(buttons)>
                <span>({{ typedCards[type].reduce((s) => s + 1, 0) }})</span>
              </template>

              <template v-slot:cell(buttons)="data">
                <a href="#" @click.prevent="removeCard(data.item.index)" title="Cancel changes">
                  <font-awesome-icon icon="minus-square" />
                </a>
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
                <span>{{ cards.reduce((s) => s + 1, 0) }}</span>
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
import utility from "@/scripts/utility.js";
import routeMixin from "@/mixins/routeMixin.js";
import addRemoveCardMixin from "@/mixins/addRemoveCardMixin.js";

export default {
  name: "EditCards",
  mixins: [addRemoveCardMixin, routeMixin],
  computed: {
    cardIndex() {
      return this.$store.state.cardIndex;
    },
    editedCards() {
      return this.$store.state.editedCards;
    },
    showSidebar() {
      return this.$store.getters.showSidebar;
    },
    cards() {
      return Object.keys(this.editedCards)
        .map((x) => this.editedCards[x])
        .sort((x, y) => utility.stringCompare(x.name, y.name));
    },
    typedCards() {
      return this.cards.reduce((map, card) => {
        if (card) {
          let cardType = card.type || "[Unknown]";
          var existing = map[cardType];
          if (!existing) existing = map[cardType] = [];
          existing.push(card);
        }
        return map;
      }, {});
    },
  },
  methods: {
    clear() {
      this.$store.commit("clearEditedCards");
    },
    newCard() {
      let counter = 0;
      let index = `new_card_${counter}`;
      while (this.$store.state.editedCards[index]) {
        counter++;
        index = `new_card_${counter}`;
      }
      this.$store.commit("editCard", index);
      this.viewCardDetail({ index });
    },
    exportCards() {
      if (this.$store.state.cardsLoaded) {
        // Get existing card or its edited version
        let cardArray = this.$store.state.cards.map((x) => {
          // Might make some sense to have a sort of delete condition for existing cards
          let editedCard = this.editedCards[x.index];
          if (editedCard) {
            return editedCard;
          }
          return x;
        });
        // Append all new cards
        this.cards.forEach((x) => {
          if (!this.cardIndex[x.index]) {
            cardArray.push(x);
          }
        });
        var json = JSON.stringify(
          cardArray,
          (key, value) => {
            if (key !== "index") return value;
          },
          2
        );
        utility.saveText(json, "cards.json");
      }
    },
    exitEditing() {
      this.$store.commit("saveSettings", { isEditMode: false });
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