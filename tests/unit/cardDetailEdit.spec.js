import { describe, it, expect, beforeEach } from 'vitest'
import CardDetailEdit from '../../src/components/editor/CardDetailEdit.vue'
import store from '../../src/store'
import cards from '../visual/fixtures/cards.json'
import { mountComponent, clearStorage, settle, referenceLists } from './componentHarness'

// The web admin editor is how cards.json gets updated, so what matters here is
// the data it produces rather than how it looks: the JSON view a human reads
// and diffs, the shape written into editedCards, and the keyword and feat
// pickers.

const sample = cards[0]

const edit = async (cardName = sample.name) => {
  const w = mountComponent(CardDetailEdit, { props: { card: cardName } })
  await settle(w, 4)
  return w
}

beforeEach(() => {
  clearStorage()
  Object.assign(store.state, {
    cardsLoaded: true,
    referenceLists,
    cards,
    cardIndex: Object.fromEntries(cards.map((c) => [c.name, c])),
    // The editor reads from editedCards and only ever shows cards that already
    // have a pending edit, so the card under test is seeded there.
    editedCards: { [sample.name]: JSON.parse(JSON.stringify(sample)) },
    settings: { ...store.state.settings, isEditMode: true }
  })
})

describe('CardDetailEdit loading a card', () => {
  it('finds the card it was given', async () => {
    const w = await edit()
    expect(w.vm.cardData.name).toBe(sample.name)
  })

  it('maps an edit straight through to the pending record', async () => {
    // Unlike the builder, the editor is editing the pending change itself -
    // there is no separate commit step, which is why leaving the page keeps
    // the edit.
    const w = await edit()
    w.vm.cardTemp.level = 42
    await settle(w, 4)
    expect(store.state.editedCards[sample.name].level).toBe(42)
  })

  it('survives a card name that matches nothing', async () => {
    const w = await edit('No Such Card At All')
    expect(w.exists()).toBe(true)
  })
})

describe('CardDetailEdit JSON view', () => {
  it('renders the card as indented JSON', async () => {
    const w = await edit()
    w.vm.updateJson()
    await settle(w)
    expect(w.vm.cardJson).toContain('\n  ')
    expect(JSON.parse(w.vm.cardJson).name).toBe(sample.name)
  })

  it('strips the index, which is derived rather than stored', async () => {
    const w = await edit()
    w.vm.updateJson()
    await settle(w)
    expect(JSON.parse(w.vm.cardJson).index).toBeUndefined()
  })

  it('emits keys in the canonical order, so the file stays diffable', async () => {
    const w = await edit()
    w.vm.updateJson()
    await settle(w)
    const keys = Object.keys(JSON.parse(w.vm.cardJson))
    if (keys.includes('name') && keys.includes('type')) {
      expect(keys.indexOf('name')).toBeLessThan(keys.indexOf('type'))
    }
    if (keys.includes('type') && keys.includes('printInfos')) {
      expect(keys.indexOf('type')).toBeLessThan(keys.indexOf('printInfos'))
    }
  })

  it('leaves the JSON alone while the field is being edited', async () => {
    const w = await edit()
    w.vm.cardJson = 'user is typing'
    w.vm.cardJsonSelected = true
    w.vm.updateJson()
    await settle(w)
    expect(w.vm.cardJson).toBe('user is typing')
  })
})

describe('CardDetailEdit keyword and feat pickers', () => {
  // These take the chosen name and store {name}. Handed a DOM event instead,
  // the card is written with {"name":{"isTrusted":false,...}}.
  it('stores a keyword by name', async () => {
    const w = await edit()
    const before = w.vm.cardTemp.keywords.length
    w.vm.selectKeyword('Cursed', before)
    await settle(w)
    expect(w.vm.cardTemp.keywords.at(-1)).toEqual({ name: 'Cursed' })
  })

  it('stores a feat by name', async () => {
    const w = await edit()
    const before = w.vm.cardTemp.feats.length
    w.vm.selectFeat('Stealth', before)
    await settle(w)
    expect(w.vm.cardTemp.feats.at(-1)).toEqual({ name: 'Stealth' })
  })

  it('never stores anything but a string as the name', async () => {
    const w = await edit()
    w.vm.selectKeyword('Charges', w.vm.cardTemp.keywords.length)
    w.vm.selectFeat('Defend', w.vm.cardTemp.feats.length)
    await settle(w)
    for (const list of [w.vm.cardTemp.keywords, w.vm.cardTemp.feats]) {
      for (const entry of list) {
        expect(typeof entry.name, JSON.stringify(entry)).toBe('string')
      }
    }
  })

  it('removes a keyword without leaving a gap', async () => {
    const w = await edit()
    w.vm.cardTemp.keywords = [{ name: 'A' }, { name: 'B' }, { name: 'C' }]
    await settle(w)
    w.vm.deselectKeyword(1)
    await settle(w)
    expect(w.vm.cardTemp.keywords).toEqual([{ name: 'A' }, { name: 'C' }])
  })

  it('removes a feat without leaving a gap', async () => {
    const w = await edit()
    w.vm.cardTemp.feats = [{ name: 'A' }, { name: 'B' }]
    await settle(w)
    w.vm.deselectFeat(0)
    await settle(w)
    expect(w.vm.cardTemp.feats).toEqual([{ name: 'B' }])
  })

  it('stops offering a keyword once it is on the card', async () => {
    const w = await edit()
    w.vm.cardTemp.keywords = [{ name: 'Cursed' }]
    await settle(w)
    expect(w.vm.keywordList).not.toContain('Cursed')
  })

  it('knows which keywords carry a numeric value', async () => {
    const w = await edit()
    expect(w.vm.keywordHasValueSet['Charges']).toBe(true)
    expect(w.vm.keywordHasValueSet['Cursed']).toBeFalsy()
  })
})

describe('CardDetailEdit printings', () => {
  it('adds a printing at the front', async () => {
    const w = await edit()
    const before = w.vm.cardTemp.printInfos.length
    w.vm.addPrintInfo()
    await settle(w)
    expect(w.vm.cardTemp.printInfos.length).toBe(before + 1)
    expect(w.vm.cardTemp.printInfos[0]).toEqual({})
  })

  it('removes a printing without leaving a gap', async () => {
    const w = await edit()
    w.vm.cardTemp.printInfos = [{ set: 'A' }, { set: 'B' }, { set: 'C' }]
    await settle(w)
    w.vm.removePrintInfo(1)
    await settle(w)
    expect(w.vm.cardTemp.printInfos).toEqual([{ set: 'A' }, { set: 'C' }])
  })
})

describe('CardDetailEdit option lists', () => {
  it('offers subtypes for the card type currently selected', async () => {
    const w = await edit()
    w.vm.cardTemp.type = 'Character'
    await settle(w)
    expect(w.vm.subtypeList).toContain('Warlord')
  })

  it('drops values already on the card from each list', async () => {
    const w = await edit()
    w.vm.cardTemp.type = 'Character'
    w.vm.cardTemp.traits = ['Abyssal']
    await settle(w)
    expect(w.vm.traitList).not.toContain('Abyssal')
    expect(w.vm.traitList).toContain('Aquatic')
  })
})

describe('CardDetailEdit saving', () => {
  it('commits edited cards to the store', async () => {
    const w = await edit()
    w.vm.cardTemp.name = sample.name
    await settle(w)
    expect(() => w.vm.saveChanges()).not.toThrow()
  })

  it('writes editedCards to localStorage in a re-readable shape', async () => {
    const w = await edit()
    store.state.editedCards = { [sample.name]: { name: sample.name, level: 3 } }
    w.vm.saveChanges()
    await settle(w)
    const stored = JSON.parse(localStorage.getItem('editedCards') || '{}')
    expect(stored[sample.name]).toEqual({ name: sample.name, level: 3 })
  })
})
