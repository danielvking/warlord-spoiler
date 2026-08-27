import { describe, it, expect, beforeEach } from 'vitest'
import EditCards from '../../src/components/editor/EditCards.vue'
import store from '../../src/store'
import cards from '../visual/fixtures/cards.json'
import { toCsv, fromCsv } from '../../src/scripts/cardCsvExporter'
import { mountComponent, clearStorage, settle, referenceLists } from './componentHarness'

// The pending-changes screen: what is queued for the next cards.json, grouped
// by type, plus the CSV and JSON exports the owner ships. The export paths hand
// their text to utility.saveText, so the round trip is asserted through the
// exporter itself and the screen on what it queues.

const sample = cards[0]
const second = cards[1]

const editing = async (edited = {}) => {
  Object.keys(store.state.editedCards).forEach((k) => delete store.state.editedCards[k])
  Object.assign(store.state.editedCards, edited)
  const w = mountComponent(EditCards)
  await settle(w, 3)
  return w
}

beforeEach(() => {
  clearStorage()
  Object.assign(store.state, {
    cardsLoaded: true,
    referenceLists,
    cards,
    cardIndex: Object.fromEntries(cards.map((c) => [c.name, c])),
    settings: { ...store.state.settings, isEditMode: true }
  })
})

describe('EditCards pending changes', () => {
  it('lists nothing when no card has been edited', async () => {
    const w = await editing({})
    expect(w.vm.total).toBe(0)
  })

  it('counts each edited card once', async () => {
    const w = await editing({
      [sample.name]: { ...sample, level: 9 },
      [second.name]: { ...second, level: 4 }
    })
    expect(w.vm.total).toBe(2)
  })

  it('groups pending changes by card type', async () => {
    const w = await editing({ [sample.name]: { ...sample } })
    expect(Object.keys(w.vm.typedCards)).toContain(sample.type)
  })

  it('files a card with no type under a placeholder rather than dropping it', async () => {
    const w = await editing({ mystery: { name: 'Mystery' } })
    expect(Object.keys(w.vm.typedCards)).toContain('[Unknown]')
  })
})

describe('EditCards new card', () => {
  it('queues a new card under a fresh index', async () => {
    const w = await editing({})
    w.vm.viewCardDetail = () => {}
    w.vm.newCard()
    await settle(w)
    expect(Object.keys(store.state.editedCards)).toContain('new_card_0')
  })

  it('does not collide with a new card already queued', async () => {
    const w = await editing({ new_card_0: { name: 'First' } })
    w.vm.viewCardDetail = () => {}
    w.vm.newCard()
    await settle(w)
    expect(Object.keys(store.state.editedCards)).toContain('new_card_1')
    expect(store.state.editedCards.new_card_0.name).toBe('First')
  })
})

describe('EditCards clear', () => {
  it('drops every pending change', async () => {
    const w = await editing({ [sample.name]: { ...sample } })
    w.vm.clear()
    await settle(w)
    expect(Object.keys(store.state.editedCards)).toEqual([])
  })
})

describe('EditCards CSV round trip', () => {
  // This is the path that ships data, so a card that survives export but not
  // re-import silently loses whatever the parser mangled.
  //
  // Real cards carry an index. The visual fixture drops it and the importer
  // groups rows by index, so without one every row folds into a single card.
  const withIndex = (list) => list.map((c, i) => ({ index: c.index || 'c' + i, ...c }))
  const roundTrip = (list) => fromCsv(toCsv(withIndex(list)))

  it('returns every card it was given', () => {
    const list = cards.slice(0, 5)
    expect(roundTrip(list)).toHaveLength(list.length)
  })

  it('keeps the last card, which a trailing-newline bug used to drop', () => {
    const list = cards.slice(0, 3)
    expect(roundTrip(list).at(-1).name).toBe(list.at(-1).name)
  })

  it('keeps a single card', () => {
    expect(roundTrip([cards[0]])).toHaveLength(1)
  })

  it('preserves names, types and levels', () => {
    const list = cards.slice(0, 8)
    const back = roundTrip(list)
    for (let i = 0; i < list.length; i++) {
      expect(back[i].name).toBe(list[i].name)
      expect(back[i].type).toBe(list[i].type)
      if (list[i].level != null) expect(back[i].level).toBe(list[i].level)
    }
  })

  it('preserves a multi-word keyword that carries no value', () => {
    const card = { index: 'k1', name: 'Keyworded', type: 'Character',
      keywords: [{ name: 'True Strike' }], printInfos: [{ set: 'Core', rarity: 'Common' }] }
    expect(roundTrip([card])[0].keywords).toEqual([{ name: 'True Strike' }])
  })

  it('preserves a valued keyword', () => {
    const card = { index: 'k2', name: 'Valued', type: 'Character',
      keywords: [{ name: 'Charges', value: 3 }], printInfos: [{ set: 'Core', rarity: 'Common' }] }
    expect(roundTrip([card])[0].keywords).toEqual([{ name: 'Charges', value: 3 }])
  })

  it('preserves the real dataset cards that carry keywords', () => {
    const withKeywords = cards.filter((c) => c.keywords && c.keywords.length)
    if (!withKeywords.length) return
    const back = roundTrip(withKeywords)
    for (let i = 0; i < withKeywords.length; i++) {
      expect(back[i].keywords, withKeywords[i].name).toEqual(withKeywords[i].keywords)
    }
  })

  it('preserves traits and editions', () => {
    const withArrays = cards.filter((c) => (c.traits && c.traits.length) || (c.editions && c.editions.length))
    if (!withArrays.length) return
    const back = roundTrip(withArrays)
    for (let i = 0; i < withArrays.length; i++) {
      if (withArrays[i].traits) expect(back[i].traits).toEqual(withArrays[i].traits)
      if (withArrays[i].editions) expect(back[i].editions).toEqual(withArrays[i].editions)
    }
  })
})
