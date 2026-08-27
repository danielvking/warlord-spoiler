import { describe, it, expect } from 'vitest'
import { formatCardProperty } from '../../src/scripts/cardFormatter'

describe('formatCardProperty', () => {
  describe('attack', () => {
    it('prefixes bare numbers with + and joins with /', () => {
      expect(formatCardProperty('attack', [3, 5])).toBe('+3/+5')
    })
    it('leaves already-signed and non-numeric values alone', () => {
      expect(formatCardProperty('attack', ['+3', '-2', 'X'])).toBe('+3/-2/X')
    })
    it('maps null entries to empty strings', () => {
      expect(formatCardProperty('attack', [1, null, 2])).toBe('+1//+2')
    })
    it('passes through non-arrays unchanged', () => {
      expect(formatCardProperty('attack', 'N/A')).toBe('N/A')
      expect(formatCardProperty('attack', null)).toBe(null)
    })
  })

  // armorClass and hitPoints share identical logic: sign for non-Characters, strip for Characters
  describe.each(['armorClass', 'hitPoints'])('%s', (prop) => {
    it('prefixes + for non-Character types', () => {
      expect(formatCardProperty(prop, 5, { type: 'Item' })).toBe('+5')
    })
    it('leaves bare numbers bare for Characters', () => {
      expect(formatCardProperty(prop, 5, { type: 'Character' })).toBe('5')
    })
    it('strips a leading + for Characters', () => {
      expect(formatCardProperty(prop, '+5', { type: 'Character' })).toBe('5')
    })
    it('keeps a leading + for non-Characters', () => {
      expect(formatCardProperty(prop, '+5', { type: 'Item' })).toBe('+5')
    })
    it('returns empty string for null', () => {
      expect(formatCardProperty(prop, null, { type: 'Item' })).toBe('')
    })
    it('passes through non-numeric text', () => {
      expect(formatCardProperty(prop, 'X', { type: 'Item' })).toBe('X')
    })
  })

  describe('skill', () => {
    it('prefixes bare numbers regardless of card type', () => {
      expect(formatCardProperty('skill', 4, { type: 'Character' })).toBe('+4')
    })
    it('returns empty string for null', () => {
      expect(formatCardProperty('skill', null)).toBe('')
    })
    it('passes through already-signed values', () => {
      expect(formatCardProperty('skill', '-1')).toBe('-1')
    })
  })

  describe('level', () => {
    // level inverts the armorClass rule: Epic Class is the signed one
    it('prefixes + for Epic Class', () => {
      expect(formatCardProperty('level', 2, { type: 'Epic Class' })).toBe('+2')
    })
    it('leaves bare numbers bare for non-Epic Class', () => {
      expect(formatCardProperty('level', 2, { type: 'Character' })).toBe('2')
    })
    it('strips a leading + for non-Epic Class', () => {
      expect(formatCardProperty('level', '+2', { type: 'Character' })).toBe('2')
    })
    it('returns empty string for null', () => {
      expect(formatCardProperty('level', null, { type: 'Character' })).toBe('')
    })
  })

  describe('keyword', () => {
    it('returns just the name when there is no value', () => {
      expect(formatCardProperty('keyword', { name: 'Flying', value: null })).toBe('Flying')
    })
    it('appends the value for ordinary keywords', () => {
      expect(formatCardProperty('keyword', { name: 'Armor', value: 2 })).toBe('Armor 2')
    })
    it('singularizes Charges when the value is 1', () => {
      expect(formatCardProperty('keyword', { name: 'Charges', value: 1 })).toBe('1 Charge')
    })
    it('pluralizes Charges above 1 and puts the count first', () => {
      expect(formatCardProperty('keyword', { name: 'Charges', value: 3 })).toBe('3 Charges')
    })
  })

  describe('feat', () => {
    it('returns just the name when there is no value', () => {
      expect(formatCardProperty('feat', { name: 'Cleave', value: null })).toBe('Cleave')
    })
    it('signs numeric values', () => {
      expect(formatCardProperty('feat', { name: 'Cleave', value: 2 })).toBe('Cleave +2')
    })
    it('leaves non-numeric values unsigned', () => {
      expect(formatCardProperty('feat', { name: 'Cleave', value: 'X' })).toBe('Cleave X')
    })
  })

  it('passes setNumber through unchanged', () => {
    expect(formatCardProperty('setNumber', '012a')).toBe('012a')
  })

  it('throws for an unknown property', () => {
    expect(() => formatCardProperty('nope', 1)).toThrow()
  })
})
