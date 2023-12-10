<template>
  <div class="d-flex flex-column flex-grow-1 overflow-hidden">
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
        >
          <template #head(buttons)>
            <span>({{ typedCards[type].reduce((s) => s + 1, 0) }})</span>
          </template>

          <template v-slot:cell(buttons)="data">
            <a href="#" @click.prevent="removeCard(data.item.index)" title="Cancel changes">
              <font-awesome-icon icon="minus-square" />
            </a>
          </template>

          <template v-slot:cell(name)="{ item }">
            <card-link block decorate :card="item">{{ item.name }}</card-link>
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
import CardLink from "../shared/CardLink.vue";
import utility from "../../scripts/utility";
import routeMixin from "../../mixins/routeMixin";
import addRemoveCardMixin from "../../mixins/addRemoveCardMixin";

export default {
  name: "EditCards",
  components: {
    CardLink
  },
  mixins: [addRemoveCardMixin, routeMixin],
  computed: {
    cardIndex() {
      return this.$store.state.cardIndex;
    },
    editedCards() {
      return this.$store.state.editedCards;
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
    total() {
      return this.$store.getters.editedCardsTotal;
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