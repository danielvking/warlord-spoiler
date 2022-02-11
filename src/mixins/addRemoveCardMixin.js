// This mixin adds a computed property and a method for adding cards to either the current deck or changeset
export default {
  computed: {
    addCardText() {
      if (!this.$store.state.settings.isEditMode) {
        return "Add to build";
      } else {
        return "Add to changes";
      }
    }
  },
  methods: {
    addCard(cardString) {
      if (!this.$store.state.settings.isEditMode) {
        this.$store.commit('incrementCardToDeck', cardString);
      } else {
        this.$store.commit('editCard', cardString);
      }
    },
    removeCard(cardString) {
      if (!this.$store.state.settings.isEditMode) {
        this.$store.commit('decrementCardToDeck', cardString);
      } else {
        this.$store.commit('cancelEditCard', cardString);
      }
    }
  }
}