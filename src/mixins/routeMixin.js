// This mixin adds a method to view a cards detail page based on the string
export default {
    methods: {
        viewCardDetail(card) {
            this.$router.push({ name: "cardDetailPage", query: { card: card.index } });
        },
    }
}