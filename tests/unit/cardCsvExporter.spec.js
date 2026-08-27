import { describe, it, expect } from 'vitest'
import { toCsv, fromCsv } from '../../src/scripts/cardCsvExporter'

// A card emits one CSV row per printInfo, and a printInfo is only retained on
// import if more than one of its fields is set, so fixtures use set + rarity.
const print = (set) => ({ set, rarity: 'Common' })
const card = (props) => ({ index: 'a', name: 'A', printInfos: [print('Core')], ...props })
const roundTrip = (cards) => fromCsv(toCsv(cards))

describe('toCsv', () => {
  it('emits a header row', () => {
    const [head] = toCsv([]).split('\r\n')
    expect(head).toContain('"Name"')
    expect(head).toContain('"Image URL"')
  })

  it('emits one row per printInfo', () => {
    const csv = toCsv([card({ printInfos: [print('Core'), print('Expansion')] })])
    expect(csv.split('\r\n')).toHaveLength(3) // header + 2
  })

  it('emits no rows for a card with no printInfos', () => {
    expect(toCsv([{ index: 'a', name: 'A' }]).split('\r\n')).toHaveLength(1)
  })

  it('escapes embedded double quotes by doubling them', () => {
    expect(toCsv([card({ name: 'The "Big" Orc' })])).toContain('"The ""Big"" Orc"')
  })
})

describe('round-trip', () => {
  it('preserves a lone card', () => {
    expect(roundTrip([card({ name: 'Orc', index: 'orc' })])).toHaveLength(1)
  })

  it('preserves every card, including the last', () => {
    const cards = roundTrip([
      card({ index: 'a', name: 'Alpha' }),
      card({ index: 'b', name: 'Beta' }),
      card({ index: 'c', name: 'Gamma' })
    ])
    expect(cards.map(c => c.name)).toEqual(['Alpha', 'Beta', 'Gamma'])
  })

  it('preserves text containing commas', () => {
    const [c] = roundTrip([card({ text: 'Draw a card, then discard.' })])
    expect(c.text).toBe('Draw a card, then discard.')
  })

  it('preserves text containing double quotes', () => {
    const [c] = roundTrip([card({ text: 'He said "go".' })])
    expect(c.text).toBe('He said "go".')
  })

  it('preserves array properties', () => {
    const [c] = roundTrip([card({ traits: ['Undead', 'Epic'] })])
    expect(c.traits).toEqual(['Undead', 'Epic'])
  })

  it('preserves numeric stats as numbers', () => {
    const [c] = roundTrip([card({ skill: 3, hitPoints: 12 })])
    expect(c.skill).toBe(3)
    expect(c.hitPoints).toBe(12)
  })

  it('preserves non-numeric stat placeholders', () => {
    const [c] = roundTrip([card({ hitPoints: 'X' })])
    expect(c.hitPoints).toBe('X')
  })

  it('preserves name/value keywords', () => {
    const [c] = roundTrip([card({ keywords: [{ name: 'Charges', value: 3 }] })])
    expect(c.keywords).toEqual([{ name: 'Charges', value: 3 }])
  })

  it('preserves valueless keywords', () => {
    const [c] = roundTrip([card({ keywords: [{ name: 'Unique' }] })])
    expect(c.keywords[0].name).toBe('Unique')
    expect(c.keywords[0].value).toBeUndefined()
  })

  it('preserves printInfo fields', () => {
    const [c] = roundTrip([card({
      printInfos: [{ set: 'Core', setNumber: '12', rarity: 'Rare', artist: 'Someone' }]
    })])
    expect(c.printInfos[0]).toMatchObject({
      set: 'Core', setNumber: '12', rarity: 'Rare', artist: 'Someone'
    })
  })

  it('regroups multiple printInfos back onto one card', () => {
    const cards = roundTrip([card({ printInfos: [print('Core'), print('Expansion')] })])
    expect(cards).toHaveLength(1)
    expect(cards[0].printInfos.map(p => p.set)).toEqual(['Core', 'Expansion'])
  })

  it('is stable across a second round-trip', () => {
    const once = roundTrip([card({ text: 'Some, "quoted" text', traits: ['X'] })])
    expect(roundTrip(once)).toEqual(once)
  })

  it('tolerates a trailing newline', () => {
    expect(fromCsv(toCsv([card()]) + '\r\n')).toHaveLength(1)
  })
})

describe('keyword and feat name/value parsing', () => {
  // A keyword serializes as "3 Charges" when it carries a value and plain
  // "Cursed" when it does not. Splitting on the first space to recover that
  // value eats the first word of a multi-word keyword without one, so
  // "True Strike" comes back as { name: "Strike", value: NaN }. That is silent
  // data loss on an Export CSV -> Import CSV cycle through the editor.
  const keywordsSurvive = (keywords) =>
    expect(roundTrip([card({ keywords })])[0].keywords).toEqual(keywords)

  it('keeps a single-word keyword', () => {
    keywordsSurvive([{ name: 'Cursed' }])
  })

  it('keeps a multi-word keyword that has no value', () => {
    keywordsSurvive([{ name: 'True Strike' }])
  })

  it('keeps a single-word keyword with a value', () => {
    keywordsSurvive([{ name: 'Charges', value: 3 }])
  })

  it('keeps a multi-word keyword with a value', () => {
    keywordsSurvive([{ name: 'Challenge Rating', value: 2 }])
  })

  it('keeps a keyword whose name starts with a digit', () => {
    // "2-Handed" has no space, so it was never at risk. Pinned because the
    // parser now reasons about whether the leading token is a number.
    keywordsSurvive([{ name: '2-Handed Weapon' }])
  })

  it('keeps a zero value rather than dropping it', () => {
    keywordsSurvive([{ name: 'Charges', value: 0 }])
  })

  it('applies the same parsing to feats', () => {
    const feats = [{ name: 'Magic Resistance' }, { name: 'Riding', value: 2 }]
    expect(roundTrip([card({ feats })])[0].feats).toEqual(feats)
  })

  it('keeps several keywords of mixed shape in one cell', () => {
    keywordsSurvive([
      { name: 'True Strike' },
      { name: 'Charges', value: 3 },
      { name: 'Cursed' },
      { name: 'Challenge Rating', value: 2 }
    ])
  })
})
