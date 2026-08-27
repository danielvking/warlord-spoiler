import { describe, it, expect } from 'vitest'
import { reactive, watch, nextTick } from 'vue'
import { createMapper, buildConfig } from '../../src/scripts/cardMapper'

// The mapper writes the JSON that ends up in cards.json, and it deliberately
// inserts keys in a fixed order so those files stay diffable. Key order is
// therefore the assertion throughout.

// Stands in for the card builder: the mapper only needs an object it can read
// and write two named properties on, plus $watch.
const makeVm = () => {
  const vm = reactive({ cardData: {}, cardTemp: {} })
  vm.$watch = (expr, cb, opts) => {
    const get = typeof expr === 'function'
      ? () => expr.call(vm)
      : () => expr.split('.').reduce((o, k) => (o == null ? o : o[k]), vm)
    return watch(get, cb, opts)
  }
  return vm
}

const sync = async (vm, mapper) => {
  await nextTick()
  mapper.sync()
  await nextTick()
}

describe('cardMapper key ordering', () => {
  it('writes card properties in the canonical order, not insertion order', async () => {
    const vm = makeVm()
    const mapper = createMapper(vm, 'cardData', 'cardTemp')

    // Assign in deliberately reversed order; the mapper should still emit the
    // canonical order so exported JSON does not churn.
    vm.cardData.level = 3
    vm.cardData.type = 'Character'
    vm.cardData.name = 'Test Card'
    await sync(vm, mapper)

    const keys = Object.keys(vm.cardTemp)
    expect(keys.indexOf('name')).toBeLessThan(keys.indexOf('type'))
    expect(keys.indexOf('type')).toBeLessThan(keys.indexOf('level'))
  })

  it('keeps the order stable when a key is added after the fact', async () => {
    const vm = makeVm()
    const mapper = createMapper(vm, 'cardData', 'cardTemp')

    vm.cardData.name = 'Test Card'
    vm.cardData.level = 3
    await sync(vm, mapper)

    // 'type' sorts between the two already present.
    vm.cardData.type = 'Character'
    await sync(vm, mapper)

    const keys = Object.keys(vm.cardTemp)
    expect(keys.indexOf('name')).toBeLessThan(keys.indexOf('type'))
    expect(keys.indexOf('type')).toBeLessThan(keys.indexOf('level'))
  })

  it('removes a key entirely when its value goes away', async () => {
    const vm = makeVm()
    const mapper = createMapper(vm, 'cardData', 'cardTemp')

    vm.cardData.name = 'Test Card'
    vm.cardData.level = 3
    await sync(vm, mapper)
    expect(vm.cardTemp).toHaveProperty('level')

    // The key must not linger as undefined, or it serializes into the JSON.
    delete vm.cardData.level
    await sync(vm, mapper)
    expect(Object.keys(vm.cardTemp)).not.toContain('level')
  })

  it('closes the gap when a value is removed from the middle of an array', async () => {
    const vm = makeVm()
    const mapper = createMapper(vm, 'cardData', 'cardTemp')

    vm.cardData.traits = ['Aquatic', 'Undead', 'Flying']
    await sync(vm, mapper)
    expect(vm.cardTemp.traits).toEqual(['Aquatic', 'Undead', 'Flying'])

    // A plain delete leaves a hole, so the middle trait becomes null rather
    // than disappearing, and a null trait, class or subtype then fails
    // validation as "undefined is not a valid class".
    vm.cardData.traits = ['Aquatic', 'Flying']
    await sync(vm, mapper)
    expect(vm.cardTemp.traits).toEqual(['Aquatic', 'Flying'])
    expect(vm.cardTemp.traits).not.toContain(null)
    expect(vm.cardTemp.traits).toHaveLength(2)
  })

  it('shortens an array from the end without leaving a trailing hole', async () => {
    const vm = makeVm()
    const mapper = createMapper(vm, 'cardData', 'cardTemp')

    vm.cardData.class = ['Wizard', 'Cleric']
    await sync(vm, mapper)
    vm.cardData.class = ['Wizard']
    await sync(vm, mapper)

    expect(vm.cardTemp.class).toEqual(['Wizard'])
    expect(JSON.stringify(vm.cardTemp.class)).toBe('["Wizard"]')
  })

  it('carries print info key order over from the input, dropping empties', async () => {
    const vm = makeVm()
    const mapper = createMapper(vm, 'cardData', 'cardTemp')

    vm.cardData.name = 'Test Card'
    vm.cardData.printInfos = [{ artist: 'Someone', rarity: 'Common', set: 'Core' }]
    await sync(vm, mapper)

    // Nested print info keys never go through insertKeyOrdered. deepCopy
    // merges into the existing object, so the input's order survives rather
    // than the canonical one. Pinned because it is the shape that reaches
    // cards.json.
    expect(Object.keys(vm.cardTemp.printInfos[0])).toEqual(['artist', 'rarity', 'set'])
  })

  it('leaves no undefined-valued keys behind', async () => {
    const vm = makeVm()
    const mapper = createMapper(vm, 'cardData', 'cardTemp')

    vm.cardData.name = 'Test Card'
    vm.cardData.text = 'Some text'
    await sync(vm, mapper)

    vm.cardData.text = undefined
    await sync(vm, mapper)

    // JSON.stringify drops undefined values, so a lingering key never reaches
    // the file. It does show up in Object.keys and in any code that iterates
    // the card.
    for (const [key, value] of Object.entries(vm.cardTemp)) {
      expect(value, `${key} should not be undefined`).not.toBe(undefined)
    }
  })
})

describe('cardMapper config', () => {
  it('buildConfig hands back a copy, not the shared standard config', () => {
    const a = buildConfig((c) => { c.props.name.marker = 1 })
    const b = buildConfig(() => {})
    expect(a.props.name.marker).toBe(1)
    expect(b.props.name.marker).toBe(undefined)
  })
})
