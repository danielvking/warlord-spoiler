import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";

Vue.use(Vuex)

function constructCardIndex(cards) {
    let cardIndex = {}
    cards.forEach(x => {
        let key = x.name;
        if (cardIndex[key]) {
            let count = 1;
            do {
                count++;
                key = x.name + "_" + count;
            } while (cardIndex[key]);
        }
        cardIndex[key] = x;
        x.index = key;
    });
    return cardIndex;
}

let cardPromise;

export default new Vuex.Store({
    state: {
        cards: [],
        cardIndex: {},
        referenceLists: {}
    },
    mutations: {
        setCards(state, cards) {
            state.cards = cards;
        },
        setCardIndex(state, cardIndex) {
            state.cardIndex = cardIndex;
        },
        setReferenceLists(state, referenceLists) {
            state.referenceLists = referenceLists;
        }
    },
    actions: {
        // Returns a promise that the card state has been set
        loadCardData(context) {
            if (cardPromise === undefined) {
                let cardsJson = axios({
                    method: "get",
                    url: "/resources/cards.json"
                }).then(response => {
                   context.commit("setCards", response.data);
                   context.commit("setCardIndex", constructCardIndex(response.data));
                });
    
                let referenceListsJson = axios({
                    method: "get",
                    url: "/resources/referenceLists.json"
                }).then(response => {
                    context.commit("setReferenceLists", response.data);
                });
    
                cardPromise = Promise.all([cardsJson, referenceListsJson])
                    .catch(error => {
                        alert("An error occurred fetching the card data:\n" + error);
                    });
            }
            return cardPromise;
        }
    }
});