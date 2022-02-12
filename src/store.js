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
    deck: {},
    editedCards: {},
    settings: {
      isEditMode: false,
      isEditTextWrapped: false,
      editViewOption: "Art"
    }
  },
  getters: {
    showSidebar(state) {
      return state.viewPortWidth >= 992; // Bootstrap "large" breakpoint;
    },
    keywordRegex(state) {
      if (!state.cardsLoaded) return /(?!)/; // Nothing

      // Basic keywords
      let keywords = ["Spend Order:", "Order:", "Spend React:", "React:"];

      function addConjecturedPlurals(word) {
        keywords.push(word + "s");
        keywords.push(word + "es");
        if (word.endsWith("y")) {
          keywords.push(word.replace(/y$/, "ies"));
        } else if (word.endsWith("f")) {
          keywords.push(word.replace(/f$/, "ves"));
        }
      }

      // Dynamically aquire keywords from reference lists
      state.referenceLists.factionList.forEach(x => {
        keywords.push(x);
        addConjecturedPlurals(x);
      });
      state.referenceLists.traitList.forEach(x => {
        keywords.push(x);
        addConjecturedPlurals(x);
      });
      state.referenceLists.featList.forEach(x => {
        keywords.push(x);
      });

      // This is probably excessive, but lets escape them to avoid regex injection
      keywords = keywords.map(x => x.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));

      // Matches any keyword not embedded inside another word
      return new RegExp(`(?<!\\w)(${keywords.join("|")})(?!\\w)`, "gm");
    }
  },
  mutations: {
    initialize(state) {
      let deck = localStorage.getItem("deck");
      if (deck) {
        state.deck = JSON.parse(deck);
      }
      let editedCards = localStorage.getItem("editedCards");
      if (editedCards) {
        state.editedCards = JSON.parse(editedCards);
      }
      let settings = localStorage.getItem("settings");
      if (settings) {
        state.settings = JSON.parse(settings);
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
    editCard(state, cardString) {
      if (!state.editedCards[cardString]) {
        let existing = state.cardIndex[cardString];
        if (existing) {
          Vue.set(state.editedCards, cardString, JSON.parse(JSON.stringify(existing)));
        } else {
          Vue.set(state.editedCards, cardString, { name: "New Card", index: cardString });
        }
        localStorage.setItem("editedCards", JSON.stringify(state.editedCards));
      }
    },
    cancelEditCard(state, cardString) {
      Vue.delete(state.editedCards, cardString);
    },
    saveEditedCards(state) {
      localStorage.setItem("editedCards", JSON.stringify(state.editedCards))
    },
    clearEditedCards(state) {
      state.editedCards = {};
      localStorage.removeItem("editedCards", JSON.stringify(state.editedCards))
    },
    saveSettings(state, settings) {
      Object.keys(settings).forEach(key => {
        Vue.set(state.settings, key, settings[key]);
      });
      localStorage.setItem("settings", JSON.stringify(state.settings));
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