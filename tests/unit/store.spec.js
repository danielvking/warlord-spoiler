import { describe, it, expect, beforeEach } from 'vitest'
import store from '../../src/store'

// The store is a singleton, so each test resets the slices it touches.
const reset = () => {
  localStorage.clear()
  store.state.deck = {}
  store.state.editedCards = {}
  store.state.cardIndex = {}
  store.state.cards = []
  store.state.cardsLoaded = false
  store.state.referenceLists = {}
}

beforeEach(reset)

describe('deck mutations', () => {
  it('adds a card at count 1', () => {
    store.commit('incrementCardToDeck', 'Orc')
    expect(store.state.deck.Orc).toBe(1)
  })

  it('increments an existing card', () => {
    store.commit('incrementCardToDeck', 'Orc')
    store.commit('incrementCardToDeck', 'Orc')
    expect(store.state.deck.Orc).toBe(2)
  })

  it('decrements above 1', () => {
    store.commit('incrementCardToDeck', 'Orc')
    store.commit('incrementCardToDeck', 'Orc')
    store.commit('decrementCardToDeck', 'Orc')
    expect(store.state.deck.Orc).toBe(1)
  })

  it('removes the key entirely at count 1', () => {
    store.commit('incrementCardToDeck', 'Orc')
    store.commit('decrementCardToDeck', 'Orc')
    expect('Orc' in store.state.deck).toBe(false)
  })

  it('ignores decrementing a card that is not in the deck', () => {
    store.commit('decrementCardToDeck', 'Ghost')
    expect(store.state.deck).toEqual({})
  })

  it('clears the whole deck', () => {
    store.commit('incrementCardToDeck', 'Orc')
    store.commit('clearDeck')
    expect(store.state.deck).toEqual({})
  })

  it('persists the deck to localStorage', () => {
    store.commit('incrementCardToDeck', 'Orc')
    expect(JSON.parse(localStorage.getItem('deck'))).toEqual({ Orc: 1 })
  })

  it('removes the deck from localStorage when cleared', () => {
    store.commit('incrementCardToDeck', 'Orc')
    store.commit('clearDeck')
    expect(localStorage.getItem('deck')).toBe(null)
  })
})

describe('deckTotal getter', () => {
  it('is zero for an empty deck', () => {
    expect(store.getters.deckTotal).toBe(0)
  })

  it('sums copies across cards', () => {
    store.commit('incrementCardToDeck', 'Orc')
    store.commit('incrementCardToDeck', 'Orc')
    store.commit('incrementCardToDeck', 'Elf')
    expect(store.getters.deckTotal).toBe(3)
  })
})

describe('edited cards', () => {
  it('clones an existing card from the index', () => {
    store.state.cardIndex = { Orc: { name: 'Orc', index: 'Orc', level: 3 } }
    store.commit('editCard', 'Orc')
    expect(store.state.editedCards.Orc).toEqual({ name: 'Orc', index: 'Orc', level: 3 })
  })

  it('clones deeply, so edits do not touch the source card', () => {
    const source = { name: 'Orc', index: 'Orc', printInfos: [{ set: 'Core' }] }
    store.state.cardIndex = { Orc: source }
    store.commit('editCard', 'Orc')
    store.state.editedCards.Orc.printInfos[0].set = 'Changed'
    expect(source.printInfos[0].set).toBe('Core')
  })

  it('creates a placeholder for an unknown card', () => {
    store.commit('editCard', 'Brand New')
    expect(store.state.editedCards['Brand New']).toEqual({ name: 'New Card', index: 'Brand New' })
  })

  it('does not overwrite an already-edited card', () => {
    store.state.cardIndex = { Orc: { name: 'Orc', index: 'Orc' } }
    store.commit('editCard', 'Orc')
    store.state.editedCards.Orc.name = 'Edited'
    store.commit('editCard', 'Orc')
    expect(store.state.editedCards.Orc.name).toBe('Edited')
  })

  it('cancels an edit by removing the key', () => {
    store.commit('editCard', 'Orc')
    store.commit('cancelEditCard', 'Orc')
    expect('Orc' in store.state.editedCards).toBe(false)
  })

  it('clears all edits', () => {
    store.commit('editCard', 'Orc')
    store.commit('clearEditedCards')
    expect(store.state.editedCards).toEqual({})
    expect(localStorage.getItem('editedCards')).toBe(null)
  })

  it('counts edited cards', () => {
    store.commit('editCard', 'A')
    store.commit('editCard', 'B')
    expect(store.getters.editedCardsTotal).toBe(2)
  })
})

describe('setEditedCards diffing', () => {
  // Only cards that actually differ from the loaded set are retained.
  it('keeps a card whose value changed', () => {
    store.state.cardIndex = { Orc: { name: 'Orc', index: 'Orc', level: 1 } }
    store.commit('setEditedCards', [{ name: 'Orc', level: 2 }])
    expect(store.state.editedCards.Orc.level).toBe(2)
  })

  it('drops a card identical to the loaded one', () => {
    store.state.cardIndex = { Orc: { name: 'Orc', index: 'Orc', level: 1 } }
    store.commit('setEditedCards', [{ name: 'Orc', index: 'Orc', level: 1 }])
    expect(store.state.editedCards).toEqual({})
  })

  it('keeps a card that does not exist in the index at all', () => {
    store.commit('setEditedCards', [{ name: 'Brand New', level: 1 }])
    expect(store.state.editedCards['Brand New']).toBeDefined()
  })
})

describe('settings', () => {
  it('merges partial settings without dropping others', () => {
    store.commit('saveSettings', { isEditMode: true })
    expect(store.state.settings.isEditMode).toBe(true)
    expect(store.state.settings.editViewOption).toBe('Art')
  })

  it('persists settings to localStorage', () => {
    store.commit('saveSettings', { isEditMode: true })
    expect(JSON.parse(localStorage.getItem('settings')).isEditMode).toBe(true)
  })
})

describe('showSideMenus getter', () => {
  it('is true at the Bootstrap lg breakpoint', () => {
    store.state.viewPortWidth = 992
    expect(store.getters.showSideMenus).toBe(true)
  })

  it('is false just below it', () => {
    store.state.viewPortWidth = 991
    expect(store.getters.showSideMenus).toBe(false)
  })
})

describe('keywordRegex getter', () => {
  const withLists = (lists) => {
    store.state.cardsLoaded = true
    store.state.referenceLists = { factionList: [], traitList: [], featList: [], ...lists }
  }

  it('matches nothing before cards load', () => {
    store.state.cardsLoaded = false
    expect('Order: do a thing'.match(store.getters.keywordRegex)).toBe(null)
  })

  it('matches order keywords once loaded', () => {
    withLists({})
    expect('Order: do a thing'.match(store.getters.keywordRegex)).not.toBe(null)
  })

  it('picks up factions from the reference lists', () => {
    withLists({ factionList: ['Nothrog Legions'] })
    expect('a Nothrog Legions card'.match(store.getters.keywordRegex)).not.toBe(null)
  })

  it('does not match a keyword embedded in a larger word', () => {
    withLists({ factionList: ['Elf'] })
    expect('Elfish'.match(store.getters.keywordRegex)).toBe(null)
  })

  it('escapes regex metacharacters in reference data', () => {
    withLists({ factionList: ['A+B'] })
    expect(() => store.getters.keywordRegex).not.toThrow()
    expect('an A+B card'.match(store.getters.keywordRegex)).not.toBe(null)
  })
})
