import { describe, it, expect, beforeEach } from 'vitest'
import SearchAdvanced from '../../src/components/spoiler/SearchAdvanced.vue'
import store from '../../src/store'
import cards from '../visual/fixtures/cards.json'
import { mountComponent, clearStorage, settle, referenceLists } from './componentHarness'

// The advanced search is ~70 filters over the whole card set. A filter that
// silently stops applying returns the wrong results with no error and nothing
// visibly different, so these assert result sets rather than rendering.

// onSearch walks the card list through utility.forEachAsync, so the results
// arrive a few macrotasks later rather than on the next tick.
const untilSearched = async (w, since = 0) => {
  for (let i = 0; i < 200; i++) {
    const e = w.emitted('search-completed')
    if (e && e.length > since) return e.at(-1)[0]
    await new Promise((r) => setTimeout(r, 5))
  }
  throw new Error('search never completed')
}

const searchWith = async (fields) => {
  const w = mountComponent(SearchAdvanced)
  await settle(w)
  Object.assign(w.vm, fields)
  await settle(w)
  w.vm.onSearch()
  return { w, results: await untilSearched(w) }
}

const names = (results) => results.map((x) => x.name).sort()

beforeEach(() => {
  clearStorage()
  Object.assign(store.state, {
    cardsLoaded: true,
    referenceLists,
    cards,
    cardIndex: Object.fromEntries(cards.map((c) => [c.name, c]))
  })
})

describe('SearchAdvanced with no criteria', () => {
  it('returns every card', async () => {
    const { results } = await searchWith({})
    expect(results).toHaveLength(cards.length)
  })

  it('emits search-started before the results', async () => {
    const { w } = await searchWith({})
    expect(w.emitted('search-started')).toBeTruthy()
  })
})

describe('SearchAdvanced text filters', () => {
  it('matches a name substring, case-insensitively', async () => {
    const target = cards.find((c) => c.name.includes(' '))
    const word = target.name.split(' ')[0]
    const { results } = await searchWith({ name: word.toLowerCase() })
    expect(results.length).toBeGreaterThan(0)
    expect(results.every((r) => r.name.toLowerCase().includes(word.toLowerCase()))).toBe(true)
  })

  it('matches card text', async () => {
    const withText = cards.find((c) => c.text && c.text.length > 12)
    const fragment = withText.text.split(' ').slice(1, 3).join(' ')
    const { results } = await searchWith({ text: fragment })
    expect(results.some((r) => r.name === withText.name)).toBe(true)
  })

  it('returns nothing for a name that matches no card', async () => {
    const { results } = await searchWith({ name: 'zzzznotacard' })
    expect(results).toHaveLength(0)
  })
})

describe('SearchAdvanced list filters', () => {
  it('filters by type', async () => {
    const { results } = await searchWith({ type: 'Action' })
    expect(results.length).toBeGreaterThan(0)
    expect(results.every((r) => r.type === 'Action')).toBe(true)
  })

  it('filters by alignment', async () => {
    const { results } = await searchWith({ alignment: 'Evil' })
    expect(results.every((r) => r.alignment === 'Evil')).toBe(true)
  })

  it('requires every selected trait, not any of them', async () => {
    const trait = cards.find((c) => c.traits && c.traits.length)?.traits[0]
    if (!trait) return
    const { results } = await searchWith({ traits: [trait] })
    expect(results.length).toBeGreaterThan(0)
    expect(results.every((r) => (r.traits || []).includes(trait))).toBe(true)
  })

  it('excludes cards carrying an excluded trait', async () => {
    const trait = cards.find((c) => c.traits && c.traits.length)?.traits[0]
    if (!trait) return
    const { results } = await searchWith({ excludeTraits: [trait] })
    expect(results.every((r) => !(r.traits || []).includes(trait))).toBe(true)
  })

  it('include and exclude of the same trait returns nothing', async () => {
    const trait = cards.find((c) => c.traits && c.traits.length)?.traits[0]
    if (!trait) return
    const { results } = await searchWith({ traits: [trait], excludeTraits: [trait] })
    expect(results).toHaveLength(0)
  })

  it('filters by class', async () => {
    const cls = cards.find((c) => c.class && c.class.length)?.class[0]
    if (!cls) return
    const { results } = await searchWith({ classes: [cls] })
    expect(results.every((r) => (r.class || []).includes(cls))).toBe(true)
  })

  it('filters by faction', async () => {
    const faction = cards.find((c) => c.faction && c.faction.length)?.faction[0]
    if (!faction) return
    const { results } = await searchWith({ factions: [faction] })
    expect(results.every((r) => (r.faction || []).includes(faction))).toBe(true)
  })
})

describe('SearchAdvanced numeric comparisons', () => {
  // Each stat carries its own operator select. The operator defaulting to the
  // wrong value, or the handler that seeds it never firing, silently changes
  // which cards come back.
  const withLevel = cards.filter((c) => typeof c.level === 'number')

  it('matches an exact level', async () => {
    const level = withLevel[0]?.level
    if (level == null) return
    const { results } = await searchWith({ level, levelOp: '=' })
    expect(results.every((r) => r.level === level)).toBe(true)
  })

  it('matches at or above a level', async () => {
    const level = withLevel[0]?.level
    if (level == null) return
    const { results } = await searchWith({ level, levelOp: '≥' })
    expect(results.every((r) => r.level >= level)).toBe(true)
  })

  it('matches at or below a level', async () => {
    const level = withLevel[0]?.level
    if (level == null) return
    const { results } = await searchWith({ level, levelOp: '≤' })
    expect(results.every((r) => r.level <= level)).toBe(true)
  })

  it('treats each operator as a genuinely different query', async () => {
    const levels = [...new Set(withLevel.map((c) => c.level))].sort((a, b) => a - b)
    if (levels.length < 2) return
    const mid = levels[Math.floor(levels.length / 2)]
    const eq = (await searchWith({ level: mid, levelOp: '=' })).results.length
    const ge = (await searchWith({ level: mid, levelOp: '≥' })).results.length
    const le = (await searchWith({ level: mid, levelOp: '≤' })).results.length
    expect(ge).toBeGreaterThanOrEqual(eq)
    expect(le).toBeGreaterThanOrEqual(eq)
    expect(ge + le).toBeGreaterThan(eq)
  })

  it('ignores a stat with no value entered', async () => {
    const { results } = await searchWith({ level: null, levelOp: '=' })
    expect(results).toHaveLength(cards.length)
  })
})

describe('SearchAdvanced combinations', () => {
  it('applies filters together, narrowing the result', async () => {
    const byType = (await searchWith({ type: 'Character' })).results
    const both = (await searchWith({ type: 'Character', alignment: 'Evil' })).results
    expect(both.length).toBeLessThanOrEqual(byType.length)
    expect(both.every((r) => r.type === 'Character' && r.alignment === 'Evil')).toBe(true)
  })

  it('returns nothing when two filters cannot both hold', async () => {
    const { results } = await searchWith({ type: 'Action', alignment: 'Evil', name: 'zzzz' })
    expect(results).toHaveLength(0)
  })
})

describe('SearchAdvanced clear', () => {
  it('resets every field back to its initial state', async () => {
    const w = mountComponent(SearchAdvanced)
    await settle(w)
    Object.assign(w.vm, {
      name: 'something', text: 'else', type: 'Action', alignment: 'Evil',
      traits: ['Abyssal'], classes: ['Cleric'], level: 5, levelOp: '≥'
    })
    await settle(w)

    w.vm.clear()
    await settle(w)

    expect(w.vm.name).toBeNull()
    expect(w.vm.text).toBeNull()
    expect(w.vm.type).toBeNull()
    expect(w.vm.alignment).toBeNull()
    expect(w.vm.traits).toEqual([])
    expect(w.vm.classes).toEqual([])
    expect(w.vm.level).toBeNull()
  })

  it('returns every card again after clearing', async () => {
    const w = mountComponent(SearchAdvanced)
    await settle(w)
    w.vm.name = 'zzzznotacard'
    await settle(w)
    w.vm.onSearch()
    expect(await untilSearched(w)).toHaveLength(0)

    w.vm.clear()
    await settle(w)
    w.vm.onSearch()
    expect(await untilSearched(w, 1)).toHaveLength(cards.length)
  })
})

describe('SearchAdvanced feat and misc pickers', () => {
  // These add a row per selection and carry their own operator, so both the row
  // generation and the operator defaulting are asserted.
  it('seeds an operator when a feat is chosen', async () => {
    const w = mountComponent(SearchAdvanced)
    await settle(w)
    w.vm.selectFeat('Stealth', 0)
    await settle(w)
    expect(w.vm.selectedFeats).toEqual(['Stealth'])
    expect(w.vm.featOps.Stealth).toBe('=')
  })

  it('seeds an operator when a misc stat is chosen', async () => {
    const w = mountComponent(SearchAdvanced)
    await settle(w)
    w.vm.selectMisc('Charges', 0)
    await settle(w)
    expect(w.vm.selectedMisc).toEqual(['Charges'])
    expect(w.vm.miscOps.Charges).toBe('=')
  })

  it('ignores a null choice rather than adding an empty row', async () => {
    const w = mountComponent(SearchAdvanced)
    await settle(w)
    w.vm.selectFeat(null, 0)
    await settle(w)
    expect(w.vm.selectedFeats).toEqual([])
  })

  it('accumulates several feats', async () => {
    const w = mountComponent(SearchAdvanced)
    await settle(w)
    w.vm.selectFeat('Stealth', 0)
    await settle(w)
    w.vm.selectFeat('Defend', 1)
    await settle(w)
    expect(w.vm.selectedFeats).toEqual(['Stealth', 'Defend'])
  })

  it('removes a feat and its stored value', async () => {
    const w = mountComponent(SearchAdvanced)
    await settle(w)
    w.vm.selectFeat('Stealth', 0)
    w.vm.selectFeat('Defend', 1)
    await settle(w)

    w.vm.deselectFeat(0)
    await settle(w)
    expect(w.vm.selectedFeats).toEqual(['Defend'])
  })

  it('stops offering a feat once it is selected', async () => {
    const w = mountComponent(SearchAdvanced)
    await settle(w)
    expect(w.vm.featList).toContain('Stealth')

    w.vm.selectFeat('Stealth', 0)
    await settle(w)
    expect(w.vm.featList).not.toContain('Stealth')
  })
})
