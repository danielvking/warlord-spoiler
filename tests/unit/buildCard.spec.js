import { describe, it, expect, beforeEach } from 'vitest'
import BuildCard from '../../src/components/builder/BuildCard.vue'
import { mountComponent, clearStorage, settle, referenceLists } from './componentHarness'
import { vi } from 'vitest'

// The card builder is the largest component in the app. Its failures are
// invisible to a screenshot, because the form looks right and computes the
// wrong numbers, so this suite asserts the contract instead: card data in,
// points, validation and saved JSON out.

const build = async (ruleset) => {
  clearStorage()
  const w = mountComponent(BuildCard)
  await settle(w, 6)
  if (ruleset) {
    w.vm.selectedRulesetOption = ruleset
    await settle(w, 6)
    await w.vm.refreshCacheAll(true)
    await settle(w)
  }
  return w
}

// The pickers are OptionTags instances; drive them by their model the way the
// component does, then let the mapper and the cache catch up.
const setField = async (w, prop, value) => {
  w.vm.cardTemp[prop] = value
  await settle(w)
  await w.vm.refreshCache(prop)
  await settle(w)
}

const saved = () => JSON.parse(localStorage.getItem('cardBuilderSettings') || '{}')

beforeEach(clearStorage)

describe('BuildCard initial state', () => {
  it('starts on a ruleset with the card seeded from it', async () => {
    const w = await build()
    expect(w.vm.selectedRulesetOption).toBe('Tournament 1.1')
    expect(w.vm.cardData.type).toBe('Character')
    expect(w.vm.cardData.subtype).toEqual(['Warlord'])
    expect(w.vm.cardData.class).toEqual(['Classless'])
  })

  it('copies the ruleset initial value rather than sharing it', async () => {
    // The rulesets are deep-frozen. Assigning initialValue by reference makes
    // the card's own subtype list the frozen array, so appending to it throws
    // and the value is silently lost.
    const w = await build()
    expect(Object.isFrozen(w.vm.cardData.subtype)).toBe(false)
    expect(() => w.vm.cardData.subtype.push('Overlord')).not.toThrow()
  })

  it('offers only the card types the builder supports', async () => {
    const w = await build()
    expect(w.vm.typeList).toEqual(['Character', 'Action', 'Item'])
  })
})

describe('BuildCard point scoring', () => {
  it('scores a class selection', async () => {
    const w = await build('Tournament 2.0')
    expect(w.vm.infoCache.pointTotal).toBe(0)

    await setField(w, 'class', ['Cleric'])
    expect(w.vm.infoCache.points.class).toBe(10)
    expect(w.vm.infoCache.pointTotal).toBe(10)
  })

  it('scores a second class far higher than the first', async () => {
    const w = await build('Tournament 2.0')
    await setField(w, 'class', ['Cleric', 'Wizard'])
    // 10 for the first, 40 for the second.
    expect(w.vm.infoCache.points.class).toBe(50)
  })

  it('leaves Classless free', async () => {
    const w = await build('Tournament 2.0')
    await setField(w, 'class', ['Classless'])
    expect(w.vm.infoCache.points.class).toBe(0)
  })

  it('scores a second faction', async () => {
    const w = await build('Tournament 2.0')
    await setField(w, 'faction', ['Deverenian Empire'])
    expect(w.vm.infoCache.points.faction).toBe(0)

    await setField(w, 'faction', ['Deverenian Empire', 'Elven Branches'])
    expect(w.vm.infoCache.points.faction).toBe(55)
  })

  it('adds each scoring field into the total', async () => {
    const w = await build('Tournament 2.0')
    await setField(w, 'class', ['Cleric'])
    await setField(w, 'faction', ['Deverenian Empire', 'Elven Branches'])
    expect(w.vm.infoCache.pointTotal).toBe(65)
  })

  it('reports a maximum for rulesets that cap points', async () => {
    const w = await build('Tournament 2.0')
    expect(w.vm.infoCache.pointMaximum).toBe(150)
  })

  it('scores nothing under No Ruleset', async () => {
    const w = await build('No Ruleset')
    await setField(w, 'class', ['Cleric', 'Wizard'])
    expect(w.vm.infoCache.pointTotal).toBe(0)
  })
})

describe('BuildCard validation', () => {
  it('rejects a second subtype under a tournament ruleset', async () => {
    const w = await build('Tournament 2.0')
    await setField(w, 'subtype', ['Warlord', 'Dragon Lord'])
    expect(w.vm.infoCache.validationText.subtype).toMatch(/must be a warlord/i)
    expect(w.vm.hasValidationErrors).toBe(true)
  })

  it('accepts a second subtype under No Ruleset', async () => {
    const w = await build('No Ruleset')
    await setField(w, 'subtype', ['Warlord', 'Dragon Lord'])
    expect(w.vm.infoCache.validationText.subtype).toBeFalsy()
  })

  it('clears a validation message once the value is corrected', async () => {
    const w = await build('Tournament 2.0')
    await setField(w, 'subtype', ['Warlord', 'Dragon Lord'])
    expect(w.vm.infoCache.validationText.subtype).toBeTruthy()

    await setField(w, 'subtype', ['Warlord'])
    expect(w.vm.infoCache.validationText.subtype).toBeFalsy()
    // An empty card still reports its required fields; only subtype clears.
  })
})

describe('BuildCard field mapping', () => {
  it('carries an edit through to the saved card', async () => {
    const w = await build('Tournament 2.0')
    await setField(w, 'name', 'Test Card')
    w.vm.saveChanges()
    expect(saved().cardData.name).toBe('Test Card')
  })

  it('removes a value from the middle of an array without leaving a hole', async () => {
    // A plain delete leaves ["a", null, "c"], and the null then fails
    // validation as an undefined class and zeroes the points.
    const w = await build('No Ruleset')
    await setField(w, 'traits', ['Abyssal', 'Aquatic', 'Dragon'])
    expect(w.vm.cardData.traits).toEqual(['Abyssal', 'Aquatic', 'Dragon'])

    await setField(w, 'traits', ['Abyssal', 'Dragon'])
    expect(w.vm.cardData.traits).toEqual(['Abyssal', 'Dragon'])
    expect(w.vm.cardData.traits).not.toContain(null)
  })

  it('keeps class and printInfos across a ruleset switch', async () => {
    // printInfos holds the flavour text, so losing it on a switch means every
    // card built afterwards exports without its flavour-text container.
    const w = await build('No Ruleset')
    await setField(w, 'name', 'Alpha')
    expect(w.vm.cardData.class).toBeTruthy()
    expect(w.vm.cardData.printInfos).toBeTruthy()

    w.vm.selectedRulesetOption = 'Tournament 1.0'
    await settle(w, 6)
    await setField(w, 'name', 'Beta')

    expect(w.vm.cardData.class).toEqual(['Classless'])
    expect(w.vm.cardData.printInfos).toBeTruthy()
    expect(w.vm.cardData.printInfos.length).toBeGreaterThan(0)
  })

  it('emits card properties in the canonical key order', async () => {
    // These files are diffed by a human, so the order has to be stable.
    const w = await build('No Ruleset')
    await setField(w, 'name', 'Ordered')
    await setField(w, 'level', 3)
    const keys = Object.keys(w.vm.cardData)
    expect(keys.indexOf('name')).toBeLessThan(keys.indexOf('type'))
    expect(keys.indexOf('type')).toBeLessThan(keys.indexOf('level'))
  })
})

describe('BuildCard persistence', () => {
  it('saves and restores a card through localStorage', async () => {
    const w = await build('Tournament 2.0')
    await setField(w, 'name', 'Persisted')
    await setField(w, 'class', ['Cleric'])
    w.vm.saveChanges()

    const stored = saved()
    expect(stored.cardData.name).toBe('Persisted')
    expect(stored.cardData.class).toEqual(['Cleric'])
    expect(stored.selectedRulesetOption).toBe('Tournament 2.0')

    const again = mountComponent(BuildCard)
    await settle(again, 8)
    expect(again.vm.cardData.name).toBe('Persisted')
    expect(again.vm.selectedRulesetOption).toBe('Tournament 2.0')
  })

  it('stamps the current schema on what it saves', async () => {
    const w = await build('No Ruleset')
    await setField(w, 'name', 'Schema')
    w.vm.saveChanges()
    expect(saved().cardSchema).toMatch(/schemas\/v\d+\/card/)
  })

  it('omits the ruleset when it is the default one', async () => {
    const w = await build()
    await setField(w, 'name', 'Default Ruleset')
    w.vm.saveChanges()
    // Tournament 1.1 is the default, so it is deliberately not written out.
    expect(saved().selectedRulesetOption).toBeUndefined()

    const again = mountComponent(BuildCard)
    await settle(again, 8)
    expect(again.vm.cardData.name).toBe('Default Ruleset')
  })
})

describe('BuildCard option lists', () => {
  it('drops already-selected values from each picker', async () => {
    const w = await build('No Ruleset')
    expect(w.vm.classList).not.toContain('Classless')

    await setField(w, 'traits', ['Abyssal'])
    expect(w.vm.traitList).not.toContain('Abyssal')
    expect(w.vm.traitList).toContain('Aquatic')
  })

  it('offers subtypes for the selected card type only', async () => {
    const w = await build('No Ruleset')
    expect(w.vm.subtypeList).toContain('Overlord')

    await setField(w, 'type', 'Action')
    // No subtypes are defined for Action in the reference lists.
    expect(w.vm.subtypeList).toEqual([])
  })

  it('keeps offering the remaining subtypes after one is chosen', async () => {
    const w = await build('No Ruleset')
    await setField(w, 'subtype', ['Warlord'])
    const remaining = w.vm.subtypeList
    expect(remaining).not.toContain('Warlord')
    expect(remaining.length).toBe(referenceLists.subtypeLists.Character.length - 1)
  })
})

describe('BuildCard reset', () => {
  it('clears the card back to the ruleset defaults', async () => {
    const w = await build('Tournament 2.0')
    await setField(w, 'name', 'Doomed')
    await setField(w, 'class', ['Cleric'])
    expect(w.vm.infoCache.pointTotal).toBe(10)

    vi.stubGlobal('confirm', () => true)
    await w.vm.reset()
    await settle(w, 6)

    expect(w.vm.cardData.name).toBeUndefined()
    expect(w.vm.cardData.subtype).toEqual(['Warlord'])
    expect(w.vm.cardData.class).toEqual(['Classless'])
  })
})
