import { describe, it, expect, vi } from 'vitest'
import utility from '../../src/scripts/utility'

describe('escapeRegExp', () => {
  it('escapes regex metacharacters', () => {
    expect(utility.escapeRegExp('a.b*c')).toBe(String.raw`a\.b\*c`)
  })
  it('leaves plain text alone', () => {
    expect(utility.escapeRegExp('Orc Warrior')).toBe('Orc Warrior')
  })
})

describe('stringCompare', () => {
  it('orders alphabetically', () => {
    expect(utility.stringCompare('a', 'b')).toBeLessThan(0)
    expect(utility.stringCompare('b', 'a')).toBeGreaterThan(0)
    expect(utility.stringCompare('a', 'a')).toBe(0)
  })
  it('treats null as empty string', () => {
    expect(utility.stringCompare(null, '')).toBe(0)
    expect(utility.stringCompare(null, 'a')).toBeLessThan(0)
  })
})

describe('includesTokens', () => {
  it('matches unquoted tokens in order, anywhere in the string', () => {
    expect(utility.includesTokens('The Orc Warrior', 'orc warrior')).toBe(true)
    expect(utility.includesTokens('The Orc Mighty Warrior', 'orc warrior')).toBe(true)
  })
  it('does not match when tokens appear out of order', () => {
    expect(utility.includesTokens('Warrior Orc', 'orc warrior')).toBe(false)
  })
  it('is case insensitive', () => {
    expect(utility.includesTokens('ORC', 'orc')).toBe(true)
  })
  it('matches unquoted tokens inside larger words', () => {
    expect(utility.includesTokens('Warriors', 'warrior')).toBe(true)
  })
  it('requires a word boundary for quoted tokens', () => {
    expect(utility.includesTokens('Warriors', '"warrior"')).toBe(false)
    expect(utility.includesTokens('The Warrior Here', '"warrior"')).toBe(true)
  })
  it('matches a quoted phrase including its spaces', () => {
    expect(utility.includesTokens('an orc warrior here', '"orc warrior"')).toBe(true)
    expect(utility.includesTokens('an orc mighty warrior', '"orc warrior"')).toBe(false)
  })
  it('returns true for an empty search', () => {
    expect(utility.includesTokens('anything', '')).toBe(true)
  })
})

describe('insertKeyOrdered', () => {
  // Its whole purpose is preserving JSON key order, so key ORDER is the
  // assertion throughout.
  const keyOrder = ['name', 'text', 'type', 'level']

  it('inserts a key in its configured position', () => {
    const obj = { name: 'A', level: 1 }
    utility.insertKeyOrdered(obj, 'type', keyOrder)
    expect(Object.keys(obj)).toEqual(['name', 'type', 'level'])
  })

  it('appends a key that is last in the configured order', () => {
    const obj = { name: 'A', text: 'B' }
    utility.insertKeyOrdered(obj, 'level', keyOrder)
    expect(Object.keys(obj)).toEqual(['name', 'text', 'level'])
  })

  it('inserts at the front when the key sorts first', () => {
    const obj = { text: 'B', level: 1 }
    utility.insertKeyOrdered(obj, 'name', keyOrder)
    expect(Object.keys(obj)).toEqual(['name', 'text', 'level'])
  })

  it('initializes the inserted key to null', () => {
    const obj = { name: 'A' }
    utility.insertKeyOrdered(obj, 'type', keyOrder)
    expect(obj.type).toBe(null)
  })

  it('preserves existing values while reordering', () => {
    const obj = { name: 'A', level: 7 }
    utility.insertKeyOrdered(obj, 'type', keyOrder)
    expect(obj.name).toBe('A')
    expect(obj.level).toBe(7)
  })

  it('does nothing when the key already has a value', () => {
    const obj = { name: 'A', type: 'Character' }
    utility.insertKeyOrdered(obj, 'type', keyOrder)
    expect(Object.keys(obj)).toEqual(['name', 'type'])
    expect(obj.type).toBe('Character')
  })

  it('places unknown keys after known ones, alphabetically', () => {
    const obj = { name: 'A', zebra: 1 }
    utility.insertKeyOrdered(obj, 'apple', keyOrder)
    expect(Object.keys(obj)).toEqual(['name', 'apple', 'zebra'])
  })

  it('uses the supplied setFunc and deleteFunc when given', () => {
    // Nothing in src injects these today, but the parameters are part of the
    // signature, so pin that they are honoured when supplied.
    const obj = { name: 'A', level: 1 }
    const setFunc = vi.fn((o, k, v) => { o[k] = v })
    const deleteFunc = vi.fn((o, k) => { delete o[k] })
    utility.insertKeyOrdered(obj, 'type', keyOrder, setFunc, deleteFunc)
    expect(setFunc).toHaveBeenCalled()
    expect(deleteFunc).toHaveBeenCalled()
    expect(Object.keys(obj)).toEqual(['name', 'type', 'level'])
  })

  it('handles an empty object', () => {
    const obj = {}
    utility.insertKeyOrdered(obj, 'name', keyOrder)
    expect(Object.keys(obj)).toEqual(['name'])
  })

  it('treats an absent keyOrder as all-unknown keys, sorted alphabetically', () => {
    const obj = { b: 1, c: 2 }
    utility.insertKeyOrdered(obj, 'a')
    expect(Object.keys(obj)).toEqual(['a', 'b', 'c'])
  })
})

describe('debounce', () => {
  it('invokes immediately when calls are spaced beyond the interval', () => {
    const fn = vi.fn()
    const debounced = utility.debounce(fn, 50)
    debounced('first')
    expect(fn).toHaveBeenCalledTimes(1)
    expect(fn).toHaveBeenCalledWith('first')
  })

  it('defers a rapid second call rather than dropping it', async () => {
    vi.useFakeTimers()
    try {
      const fn = vi.fn()
      const debounced = utility.debounce(fn, 50)
      debounced('a')
      expect(fn).toHaveBeenCalledTimes(1)
      debounced('b')
      expect(fn).toHaveBeenCalledTimes(1) // still pending
      vi.advanceTimersByTime(50)
      expect(fn).toHaveBeenCalledTimes(2)
    } finally {
      vi.useRealTimers()
    }
  })

  it('uses the arguments from the most recent call when deferring', () => {
    vi.useFakeTimers()
    try {
      const fn = vi.fn()
      const debounced = utility.debounce(fn, 50)
      debounced('a')
      debounced('b')
      debounced('c')
      vi.advanceTimersByTime(50)
      expect(fn).toHaveBeenLastCalledWith('c')
    } finally {
      vi.useRealTimers()
    }
  })

  it('preserves the `this` context', () => {
    const ctx = { value: 42 }
    let seen
    const debounced = utility.debounce(function () { seen = this.value }, 50)
    debounced.call(ctx)
    expect(seen).toBe(42)
  })
})
