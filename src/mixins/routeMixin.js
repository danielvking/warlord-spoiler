// This mixin adds a method to view a cards detail page based on the string
export default {
    methods: {
        viewCardDetail(card) {
            this.$router.push({ name: "cardDetailPage", query: { card: card.index } })
                .catch(failure => {
                    if (failure.name === "NavigationDuplicated") {
                        // It is totally possible this is a page we're already on; we don't care
                    } else {
                        throw failure;
                    }
                });
        },
    }
}