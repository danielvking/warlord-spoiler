import { describe, it, expect } from 'vitest'
import { upgradeCard, currentCardSchema } from '../../src/scripts/cardUpgrader'

const V1 = 'https://theaccordlands.com/schemas/v1/card'
const V2 = 'https://theaccordlands.com/schemas/v2/card'
const V3 = 'https://theaccordlands.com/schemas/v3/card'
const V4 = 'https://theaccordlands.com/schemas/v4/card'

describe('currentCardSchema', () => {
  it('is v4', () => {
    expect(currentCardSchema).toBe(V4)
  })
})

describe('upgradeCard', () => {
  it('returns a v4 card unchanged', () => {
    const card = { name: 'Orc', printInfos: [] }
    expect(upgradeCard(card, V4)).toEqual({ name: 'Orc', printInfos: [] })
  })

  it('throws on an unrecognized schema', () => {
    expect(() => upgradeCard({}, 'https://example.com/schemas/v9/card')).toThrow()
  })

})

describe('v2 -> v3: subtype becomes an array', () => {
  it('wraps a scalar subtype', () => {
    const out = upgradeCard({ name: 'A', subtype: 'Warlord', printInfos: [] }, V2)
    expect(out.subtype).toEqual(['Warlord'])
  })

  it('leaves an absent subtype absent', () => {
    const out = upgradeCard({ name: 'A', printInfos: [] }, V2)
    expect(out.subtype).toBeUndefined()
  })
})

describe('v3 -> v4: setNumber is zero-padded per set', () => {
  const upgrade = (printInfos) => upgradeCard({ name: 'A', printInfos }, V3).printInfos

  it('pads to 3 digits for a 3-padding set', () => {
    expect(upgrade([{ set: 'Siege (SG)', setNumber: 7 }])[0].setNumber).toBe('007')
  })

  it('pads to 2 digits for a 2-padding set', () => {
    expect(upgrade([{ set: 'Ancient Lore (AL)', setNumber: 7 }])[0].setNumber).toBe('07')
  })

  it('coerces a numeric setNumber to a string', () => {
    expect(upgrade([{ set: 'Siege (SG)', setNumber: 123 }])[0].setNumber).toBe('123')
  })

  it('does not truncate a setNumber longer than the padding', () => {
    expect(upgrade([{ set: 'Siege (SG)', setNumber: '1234' }])[0].setNumber).toBe('1234')
  })

  it('leaves setNumber alone for an unknown set', () => {
    expect(upgrade([{ set: 'Not A Real Set', setNumber: 7 }])[0].setNumber).toBe('7')
  })

  it('leaves a null setNumber untouched', () => {
    expect(upgrade([{ set: 'Siege (SG)' }])[0].setNumber).toBeUndefined()
  })

  it('pads every printInfo', () => {
    const out = upgrade([
      { set: 'Siege (SG)', setNumber: 1 },
      { set: 'Ancient Lore (AL)', setNumber: 2 }
    ])
    expect(out.map(p => p.setNumber)).toEqual(['001', '02'])
  })
})

describe('v1 -> v2', () => {
  const upgrade = (card) => upgradeCard({ printInfos: [], ...card }, V1)

  it('expands faction abbreviations to full names', () => {
    expect(upgrade({ faction: 'Elf' }).faction).toEqual(['Elven Branches'])
    expect(upgrade({ faction: 'Nothrog' }).faction).toEqual(['Nothrog Legions'])
  })

  it('splits slash-delimited factions', () => {
    expect(upgrade({ faction: 'Elf/Dwarf' }).faction)
      .toEqual(['Elven Branches', 'Dwarven Forges'])
  })

  it('passes through an unrecognized faction', () => {
    expect(upgrade({ faction: 'Something Else' }).faction).toEqual(['Something Else'])
  })

  it('leaves an absent faction undefined', () => {
    expect(upgrade({ name: 'A' }).faction).toBeUndefined()
  })

  it('promotes lordship traits to subtype', () => {
    expect(upgrade({ traits: 'Warlord' }).subtype).toEqual(['Warlord'])
    expect(upgrade({ traits: 'Dragon Lord' }).subtype).toEqual(['Dragon Lord'])
  })

  it('converts marker traits to keywords', () => {
    const keywords = upgrade({ traits: 'Epic/Unique' }).keywords
    expect(keywords.map(k => k.name)).toEqual(expect.arrayContaining(['Epic', 'Unique']))
  })

  it('maps the planar family of traits to a single Planar keyword', () => {
    expect(upgrade({ traits: 'Ethereal' }).keywords.map(k => k.name)).toContain('Planar')
    expect(upgrade({ traits: 'Astral' }).keywords.map(k => k.name)).toContain('Planar')
  })

  it('strips promoted traits from the trait list', () => {
    const out = upgrade({ traits: 'Epic/Undead' })
    expect(out.traits).not.toContain('Epic')
    expect(out.traits).toContain('Undead')
  })

  it('upgrades a v1 card with no schema argument, since v1 is the default', () => {
    expect(upgradeCard({ name: 'Orc', faction: 'Elf', printInfos: [] }).faction)
      .toEqual(['Elven Branches'])
  })
})

describe('chained upgrades', () => {
  it('runs v1 all the way to v4', () => {
    const out = upgradeCard({
      name: 'Orc',
      faction: 'Nothrog',
      traits: 'Warlord',
      printInfos: [{ set: 'Siege (SG)', setNumber: 5 }]
    }, V1)
    expect(out.faction).toEqual(['Nothrog Legions'])
    expect(out.subtype).toEqual(['Warlord'])
    expect(out.printInfos[0].setNumber).toBe('005')
  })

  it('runs v2 to v4', () => {
    const out = upgradeCard({
      name: 'A', subtype: 'Overlord',
      printInfos: [{ set: 'Ancient Lore (AL)', setNumber: 3 }]
    }, V2)
    expect(out.subtype).toEqual(['Overlord'])
    expect(out.printInfos[0].setNumber).toBe('03')
  })

  it('runs v3 to v4', () => {
    const out = upgradeCard({
      name: 'A', subtype: ['Warlord'],
      printInfos: [{ set: 'Siege (SG)', setNumber: 5 }]
    }, V3)
    expect(out.printInfos[0].setNumber).toBe('005')
  })
})
