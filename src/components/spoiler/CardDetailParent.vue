<template>
  <component :is="selectedComponent" :card="card" />
</template>

<script>
import CardDetail from "./CardDetail.vue";
import CardDetailEdit from "../editor/CardDetailEdit.vue";

export default {
  components: { CardDetail, CardDetailEdit },
  name: "CardDetailParent",
  props: {
    card: String,
  },
  computed: {
    selectedComponent() {
      if (this.$store.state.settings.isEditMode && this.$store.state.editedCards[this.card]) {
        return CardDetailEdit;
      }
      return CardDetail;
    },
  },
};
</script>