import Vue from 'vue';
import Vuex from 'vuex';
import CustomEvent from "./scripts/customEvent";
import utility from "./scripts/utility";
import axios from "axios";

import cardsUrl from './resources/cards.json?url';
import referenceListsUrl from './resources/referenceLists.json?url';

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

function createKeywordRegex(additionalKeywords) {
  return function (state) {
    if (!state.cardsLoaded) return /(?!)/; // Nothing

    // Basic keywords
    let keywords = (additionalKeywords || []).concat(["Limited Spend Order:", "Limited Roll Order:", "Roll Order:", "Limited Order:", "Spend Order:", "Destroy Order:", "Order:", "Limited Spend React:", "Spend React:", "Limited React:", "Enter React:", "Death React:", "React:"]);

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
    return new RegExp(`(^|\\W)(${keywords.join("|")})(?!\\w)`, "gm");
  }
}

export default new Vuex.Store({
  state: {
    show404: false,
    hasHover: false,
    cardsLoaded: false,
    cards: [],
    cardIndex: {},
    referenceLists: {},
    viewPortWidth: window.innerWidth,
    screenHeight: window.screen.height,
    deck: {},
    editedCards: {},
    localRoutes: [],
    settings: {
      searchEdition: null,
      isEditMode: false,
      isEditTextWrapped: false,
      editViewOption: "Art"
    },
    events: {
      cardAdded: new CustomEvent()
    },
  },
  getters: {
    showSideMenus(state) {
      return state.viewPortWidth >= 992; // Bootstrap "large" breakpoint;
    },
    deckTotal(state) {
      return Object.values(state.deck).reduce((a, x) => a + (x || 0), 0);
    },
    editedCardsTotal(state) {
      return Object.values(state.editedCards).length;
    },
    keywordRegex: createKeywordRegex(),
    keywordRegexExtended(state) {
      return additionalKeywords => createKeywordRegex(additionalKeywords)(state);
    }
  },
  mutations: {
    setShow404(state, val) {
      state.show404 = val;
    },
    setHasHover(state, val) {
      state.hasHover = val;
    },
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
          state.screenHeight = window.screen.height;
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
      state.events.cardAdded.raiseEvent(cardString);
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
        state.events.cardAdded.raiseEvent(cardString);
        localStorage.setItem("editedCards", JSON.stringify(state.editedCards));
      }
    },
    cancelEditCard(state, cardString) {
      Vue.delete(state.editedCards, cardString);
    },
    saveEditedCards(state) {
      localStorage.setItem("editedCards", JSON.stringify(state.editedCards))
    },
    setEditedCards(state, cards) {
      let newCardIndex = constructCardIndex(cards);
      let editedCards = {};
      Object.keys(newCardIndex).forEach(cardString => {
        // We'll not handle deletes for now
        let existing = state.cardIndex[cardString];
        let card = newCardIndex[cardString];

        function matchValue(from, to) {
          if (from == null) return to == null;
          else if (Array.isArray(from) && Array.isArray(to)) {
            if (from.length !== to.length) return false;
            for (let i = 0; i < from.length; i++) {
              if (!matchValue(from[i], to[i])) return false;
            }
            return true;
          } else if (typeof(from) === 'object' && typeof(to) === 'object') {
            let keys = Object.keys(from);
            for (let i = 0; i < keys.length; i++) {
              if (!matchValue(from[keys[i]], to[keys[i]])) return false;
            }
            return true;
          }
          return from === to;
        }

        function copyProperties(from, to) {
          Object.keys(from).forEach(key => {
            if (from[key] == null) {
              delete to[key];
            } else if (typeof(from[key]) === 'object' && typeof(to[key]) === 'object') {
              copyProperties(from[key], to[key]);
            } else {
              to[key] = from[key];
            }
          });
        }

        if (!matchValue(card, existing)) {
          if (existing != null) {
            let lazyCopy = JSON.parse(JSON.stringify(existing));
            copyProperties(card, lazyCopy);
            editedCards[cardString] = lazyCopy;
          } else {
            editedCards[cardString] = JSON.parse(JSON.stringify(card));
          }
        }
      });
      state.editedCards = editedCards;
      localStorage.setItem("editedCards", JSON.stringify(state.editedCards));
    },
    clearEditedCards(state) {
      state.editedCards = {};
      localStorage.removeItem("editedCards", JSON.stringify(state.editedCards));
    },
    setLocalRoutes(state, localRoutes) {
      state.localRoutes = localRoutes;
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
          url: cardsUrl
        }).then(response => {
          context.commit("setCards", response.data);
          context.commit("setCardIndex", constructCardIndex(response.data));
        });

        let referenceListsJson = axios({
          method: "get",
          url: referenceListsUrl
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