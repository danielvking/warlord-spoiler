import Vue from 'vue'
import Vuex from 'vuex'
import utility from "@/utility.js";
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
        cardsLoaded: false,
        cards: [],
        cardIndex: {},
        referenceLists: {},
        viewPortWidth: window.innerWidth,
        deck: {}
    },
    getters: {
        showDeck(state) {
            return state.viewPortWidth >= 992 // Bootstrap "large" breakpoint;
        }
    },
    mutations: {
        initialize(state) {
            let deck = localStorage.getItem("deck");
            if (deck) {
                state.deck = JSON.parse(deck);
            }
            // I'm going to break the number one rule of vuex and have asynchronous changes, because I need the viewport reactive
            window.addEventListener("resize",
                utility.debounce(() => {
                    state.viewPortWidth = window.innerWidth;
                })
            );
        },
        setCardsLoaded(state) {
            state.cardsLoaded = true;
        },
        setCards(state, cards) {
            state.cards = cards;
        },
        setCardIndex(state, cardIndex) {
            state.cardIndex = cardIndex;
        },
        setReferenceLists(state, referenceLists) {
            state.referenceLists = referenceLists;
        },
        incrementCardToDeck(state, cardString) {
            if (typeof state.deck[cardString] !== 'number') {
                Vue.set(state.deck, cardString, 1);
            } else {
                state.deck[cardString]++;
            }
            localStorage.setItem("deck", JSON.stringify(state.deck));
        },
        decrementCardToDeck(state, cardString) {
            if (typeof state.deck[cardString] === 'number') {
                if (state.deck[cardString] === 1) {
                    Vue.delete(state.deck, cardString, 1);
                } else {
                    state.deck[cardString]--;
                }
                localStorage.setItem("deck", JSON.stringify(state.deck));
            }
        },
        clearDeck(state) {
            state.deck = {};
            localStorage.removeItem("deck");
        },
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
                    .then(() => {
                        context.commit("setCardsLoaded");
                    })
                    .catch(error => {
                        alert("An error occurred fetching the card data:\n" + error);
                    });
            }
            return cardPromise;
        }
    }
});