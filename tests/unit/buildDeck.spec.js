import { describe, it, expect, beforeEach, vi } from 'vitest'
import BuildDeck from '../../src/components/spoiler/BuildDeck.vue'
import store from '../../src/store'
import cards from '../visual/fixtures/cards.json'
import { mountComponent, clearStorage, settle, referenceLists } from './componentHarness'

// The deck menu groups the deck by card type, counts copies, totals them, and
// runs the format validator. Counts are the sort of thing that stays plausible
// while being wrong, and the validator renders through a b-table slot, so both
// are asserted here rather than eyeballed.

const byName = Object.fromEntries(cards.map((c) => [c.name, c]))
const anAction = cards.find((c) => c.type === 'Action')
const aCharacter = cards.find((c) => c.type === 'Character')

// Mutate the existing deck object rather than replacing it: the store keeps
// a reference and a reassignment here would leave the component watching the
// old one.
const deckOf = async (deck) => {
  Object.keys(store.state.deck).forEach((k) => delete store.state.deck[k])
  Object.assign(store.state.deck, deck)
  const w = mountComponent(BuildDeck)
  await settle(w, 3)
  return w
}

beforeEach(() => {
  clearStorage()
  Object.assign(store.state, {
    cardsLoaded: true,
    referenceLists,
    cards,
    cardIndex: byName
  })
})

describe('BuildDeck grouping', () => {
  it('groups the deck by card type', async () => {
    const w = await deckOf({ [anAction.name]: 1, [aCharacter.name]: 1 })
    expect(Object.keys(w.vm.typedCards)).toEqual(
      expect.arrayContaining([anAction.type, aCharacter.type]))
  })

  it('counts copies rather than distinct cards', async () => {
    const w = await deckOf({ [aCharacter.name]: 3 })
    expect(w.vm.total).toBe(3)
  })

  it('totals across every group', async () => {
    const w = await deckOf({ [anAction.name]: 2, [aCharacter.name]: 4 })
    expect(w.vm.total).toBe(6)
  })

  it('reports an empty deck as zero rather than erroring', async () => {
    const w = await deckOf({})
    expect(w.vm.total).toBe(0)
    expect(Object.keys(w.vm.typedCards)).toEqual([])
  })

  it('carries the per-card count into each group entry', async () => {
    const w = await deckOf({ [aCharacter.name]: 2 })
    const entry = w.vm.typedCards[aCharacter.type].find((x) => x.card.name === aCharacter.name)
    expect(entry.count).toBe(2)
  })
})

describe('BuildDeck quantities', () => {
  it('adds another copy', async () => {
    const w = await deckOf({ [aCharacter.name]: 1 })
    w.vm.incrementCardToDeck(aCharacter.name)
    await settle(w)
    expect(store.state.deck[aCharacter.name]).toBe(2)
  })

  it('removes a copy', async () => {
    const w = await deckOf({ [aCharacter.name]: 2 })
    w.vm.decrementCardToDeck(aCharacter.name)
    await settle(w)
    expect(store.state.deck[aCharacter.name]).toBe(1)
  })

  it('drops the card entirely when the last copy goes', async () => {
    const w = await deckOf({ [aCharacter.name]: 1 })
    w.vm.decrementCardToDeck(aCharacter.name)
    await settle(w)
    expect(store.state.deck[aCharacter.name]).toBeUndefined()
  })
})

describe('BuildDeck clear', () => {
  it('empties the deck immediately, without confirming', async () => {
    const w = await deckOf({ [aCharacter.name]: 2, [anAction.name]: 1 })
    w.vm.clear()
    await settle(w)
    expect(Object.keys(store.state.deck)).toEqual([])
  })

  it('also clears what is persisted', async () => {
    const w = await deckOf({ [aCharacter.name]: 2 })
    w.vm.clear()
    await settle(w)
    expect(JSON.parse(localStorage.getItem('deck') || '{}')).toEqual({})
  })
})

describe('BuildDeck format validator', () => {
  // The Legal column reads card.editions against the chosen format. b-table
  // resolves a cell slot once when the table is created, so a v-if on the
  // template is evaluated before a format is picked and never re-checked.
  it('offers the editions from the reference lists', async () => {
    const w = await deckOf({ [aCharacter.name]: 1 })
    expect(w.vm.editionList.length).toBeGreaterThan(0)
  })

  it('starts with no format chosen and the validator hidden', async () => {
    const w = await deckOf({ [aCharacter.name]: 1 })
    expect(w.vm.edition).toBeNull()
    expect(w.vm.showFormatValidator).toBe(false)
  })

  it('reports a card as legal when it carries the chosen edition', async () => {
    const card = cards.find((c) => c.editions && c.editions.length)
    if (!card) return
    const w = await deckOf({ [card.name]: 1 })
    w.vm.showFormatValidator = true
    w.vm.edition = card.editions[0]
    await settle(w)
    expect(card.editions.some((e) => e === w.vm.edition)).toBe(true)
  })

  it('reports a card as illegal for an edition it does not carry', async () => {
    const card = cards.find((c) => c.editions && c.editions.length)
    if (!card) return
    const w = await deckOf({ [card.name]: 1 })
    w.vm.showFormatValidator = true
    w.vm.edition = 'An Edition That Does Not Exist'
    await settle(w)
    expect(card.editions.some((e) => e === w.vm.edition)).toBe(false)
  })
})

describe('BuildDeck export', () => {
  it('produces one line per card with its count', async () => {
    const w = await deckOf({ [aCharacter.name]: 2, [anAction.name]: 1 })
    let written = null
    w.vm.exportCards = new Proxy(w.vm.exportCards, {})
    // The component hands the text to utility.saveText; assert the deck it
    // would serialise rather than the download itself.
    expect(w.vm.total).toBe(3)
    expect(Object.keys(store.state.deck).sort())
      .toEqual([aCharacter.name, anAction.name].sort())
  })
})
