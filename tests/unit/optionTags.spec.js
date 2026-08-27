import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import OptionTags from '../../src/components/shared/OptionTags.vue'

const factory = (props) => mount(OptionTags, {
  props: { options: ['Alpha', 'Beta', 'Gamma'], ...props },
  attachTo: document.body
})

const lastEmit = (w) => {
  const e = w.emitted('update:modelValue')
  return e ? e.at(-1)[0] : undefined
}

describe('OptionTags display', () => {
  it('renders selected values as tags', () => {
    const w = factory({ modelValue: ['Alpha', 'Beta'] })
    expect(w.text()).toContain('Alpha')
    expect(w.text()).toContain('Beta')
  })

  it('gives each tag a remove control', () => {
    const w = factory({ modelValue: ['Alpha', 'Beta'] })
    expect(w.findAll('.option-tags-remove')).toHaveLength(2)
  })

  it('treats a null modelValue as empty', () => {
    const w = factory({ modelValue: null })
    expect(w.findAll('.option-tags-remove')).toHaveLength(0)
  })

  it('shows the placeholder only while nothing is selected', async () => {
    expect(factory({ modelValue: [], placeholder: 'Pick' }).find('input').attributes('placeholder')).toBe('Pick')
    expect(factory({ modelValue: ['Alpha'], placeholder: 'Pick' }).find('input').attributes('placeholder')).toBe('')
  })
})

describe('OptionTags selection', () => {
  it('opens the menu on focus, listing unselected options', async () => {
    const w = factory({ modelValue: ['Alpha'] })
    await w.find('input').trigger('focus')
    expect(w.findAll('[role="option"]').map(o => o.text())).toEqual(['Beta', 'Gamma'])
  })

  it('adds an option when it is clicked', async () => {
    const w = factory({ modelValue: [] })
    await w.find('input').trigger('focus')
    await w.findAll('[role="option"]')[1].trigger('mousedown')
    expect(lastEmit(w)).toEqual(['Beta'])
  })

  it('appends to an existing selection rather than replacing it', async () => {
    const w = factory({ modelValue: ['Alpha'] })
    await w.find('input').trigger('focus')
    await w.findAll('[role="option"]')[0].trigger('mousedown')
    expect(lastEmit(w)).toEqual(['Alpha', 'Beta'])
  })

  it('removes a tag when its remove control is clicked', async () => {
    const w = factory({ modelValue: ['Alpha', 'Beta'] })
    await w.findAll('.option-tags-remove')[0].trigger('click')
    expect(lastEmit(w)).toEqual(['Beta'])
  })

  it('never offers an already-selected option', async () => {
    const w = factory({ modelValue: ['Alpha', 'Beta'] })
    await w.find('input').trigger('focus')
    expect(w.findAll('[role="option"]').map(o => o.text())).toEqual(['Gamma'])
  })
})

describe('OptionTags filtering', () => {
  it('filters the menu by typed text, case-insensitively', async () => {
    const w = factory({ modelValue: [] })
    await w.find('input').setValue('a') // Alpha, Beta, Gamma all contain "a"
    await w.find('input').trigger('focus')
    expect(w.findAll('[role="option"]')).toHaveLength(3)
    await w.find('input').setValue('BET')
    expect(w.findAll('[role="option"]').map(o => o.text())).toEqual(['Beta'])
  })

  it('shows no menu when nothing matches', async () => {
    const w = factory({ modelValue: [] })
    await w.find('input').trigger('focus')
    await w.find('input').setValue('zzz')
    expect(w.findAll('[role="option"]')).toHaveLength(0)
  })

  it('cannot add a value that is not an option', async () => {
    const w = factory({ modelValue: [] })
    await w.find('input').trigger('focus')
    await w.find('input').setValue('Nonsense')
    await w.find('input').trigger('keydown.enter')
    expect(lastEmit(w)).toBeUndefined()
  })

  it('clears the search box after adding', async () => {
    const w = factory({ modelValue: [] })
    await w.find('input').trigger('focus')
    await w.find('input').setValue('Bet')
    await w.find('input').trigger('keydown.enter')
    expect(w.find('input').element.value).toBe('')
  })
})

describe('OptionTags keyboard', () => {
  it('adds the highlighted option on Enter', async () => {
    const w = factory({ modelValue: [] })
    await w.find('input').trigger('focus')
    await w.find('input').trigger('keydown.enter')
    expect(lastEmit(w)).toEqual(['Alpha'])
  })

  it('moves the highlight with arrow keys', async () => {
    const w = factory({ modelValue: [] })
    await w.find('input').trigger('focus')
    await w.find('input').trigger('keydown.down')
    await w.find('input').trigger('keydown.enter')
    expect(lastEmit(w)).toEqual(['Beta'])
  })

  it('wraps the highlight around the ends', async () => {
    const w = factory({ modelValue: [] })
    await w.find('input').trigger('focus')
    await w.find('input').trigger('keydown.up') // wraps to the last option
    await w.find('input').trigger('keydown.enter')
    expect(lastEmit(w)).toEqual(['Gamma'])
  })

  it('removes the last tag on backspace with an empty search', async () => {
    const w = factory({ modelValue: ['Alpha', 'Beta'] })
    await w.find('input').trigger('keydown.delete')
    expect(lastEmit(w)).toEqual(['Alpha'])
  })

  it('leaves tags alone on backspace while typing', async () => {
    const w = factory({ modelValue: ['Alpha'] })
    await w.find('input').setValue('Be')
    await w.find('input').trigger('keydown.delete')
    expect(lastEmit(w)).toBeUndefined()
  })

  it('closes the menu on Escape', async () => {
    const w = factory({ modelValue: [] })
    await w.find('input').trigger('focus')
    expect(w.findAll('[role="option"]').length).toBeGreaterThan(0)
    await w.find('input').trigger('keydown.esc')
    expect(w.findAll('[role="option"]')).toHaveLength(0)
  })
})

describe('OptionTags option shapes', () => {
  // An object option is passed through to the model untouched, so a caller
  // that reads its own fields back off the record still can.
  it('labels an object option, preferring label then text then value', async () => {
    const cases = [
      [{ value: 'X', text: 'Ex', label: 'Elle' }, 'Elle'],
      [{ value: 'X', text: 'Ex' }, 'Ex'],
      [{ value: 'X' }, 'X']
    ]
    for (const [option, expected] of cases) {
      const w = factory({ options: [option], modelValue: [] })
      await w.find('input').trigger('focus')
      expect(w.findAll('[role="option"]').map((o) => o.text()), JSON.stringify(option)).toEqual([expected])
    }
  })

  it('emits the whole object, not its label', async () => {
    const option = { id: 7, value: 'While in play...', points: 30, label: '7 - While in play... (30 Points)' }
    const w = factory({ options: [option], modelValue: [] })
    await w.find('input').trigger('focus')
    await w.findAll('[role="option"]')[0].trigger('mousedown')
    expect(lastEmit(w)).toEqual([option])
  })

  it('does not re-offer a selected object option, matching on id', async () => {
    const a = { id: 1, value: 'One' }
    const b = { id: 2, value: 'Two' }
    // A fresh copy of a, as a round trip through storage would produce.
    const w = factory({ options: [a, b], modelValue: [{ id: 1, value: 'One' }] })
    await w.find('input').trigger('focus')
    expect(w.findAll('[role="option"]').map((o) => o.text())).toEqual(['Two'])
  })

  it('filters object options on their label', async () => {
    const w = factory({
      options: [{ id: 1, value: 'Alpha' }, { id: 2, value: 'Beta' }],
      modelValue: []
    })
    await w.find('input').trigger('focus')
    await w.find('input').setValue('be')
    expect(w.findAll('[role="option"]').map((o) => o.text())).toEqual(['Beta'])
  })

  it('tolerates an empty options list', async () => {
    const w = factory({ options: [], modelValue: [] })
    await w.find('input').trigger('focus')
    expect(w.findAll('[role="option"]')).toHaveLength(0)
  })
})

describe('OptionTags change event', () => {
  // Callers hang a refresh off change, so it has to fire on every edit.
  it('emits change alongside update:modelValue when adding', async () => {
    const w = factory({ modelValue: [] })
    await w.find('input').trigger('focus')
    await w.findAll('[role="option"]')[0].trigger('mousedown')
    expect(w.emitted('change')?.at(-1)[0]).toEqual(['Alpha'])
  })

  it('emits change when removing', async () => {
    const w = factory({ modelValue: ['Alpha', 'Beta'] })
    await w.findAll('.option-tags-remove')[0].trigger('mousedown')
    expect(w.emitted('change')?.at(-1)[0]).toEqual(['Beta'])
  })
})

describe('OptionTags menu lifecycle', () => {
  // Leaving the menu open after a select re-shows the whole unfiltered list,
  // which reads as the filter resetting itself and the typed text not taking.
  it('closes the menu after a selection', async () => {
    const w = factory({ modelValue: [] })
    await w.find('input').trigger('focus')
    expect(w.find('.option-tags-menu').exists()).toBe(true)

    await w.findAll('[role="option"]')[0].trigger('mousedown')
    expect(w.vm.open).toBe(false)
  })

  it('clears the typed filter after a selection', async () => {
    const w = factory({ modelValue: [] })
    await w.find('input').trigger('focus')
    await w.find('input').setValue('al')
    expect(w.findAll('[role="option"]').map((o) => o.text())).toEqual(['Alpha'])

    await w.findAll('[role="option"]')[0].trigger('mousedown')
    expect(w.vm.search).toBe('')
  })

  it('reopens on the next keystroke, so tags can be added in a row', async () => {
    const w = factory({ modelValue: [] })
    await w.find('input').trigger('focus')
    await w.findAll('[role="option"]')[0].trigger('mousedown')
    expect(w.vm.open).toBe(false)

    await w.find('input').setValue('be')
    expect(w.vm.open).toBe(true)
    expect(w.findAll('[role="option"]').map((o) => o.text())).toEqual(['Beta'])
  })

  it('filters case-insensitively, anywhere in the option', async () => {
    const w = factory({ modelValue: [] })
    await w.find('input').trigger('focus')

    for (const [term, expected] of [['AL', ['Alpha']], ['ph', ['Alpha']], ['a', ['Alpha', 'Beta', 'Gamma']]]) {
      await w.find('input').setValue(term)
      expect(w.findAll('[role="option"]').map((o) => o.text()), term).toEqual(expected)
    }
  })

  it('shows no menu when nothing matches', async () => {
    const w = factory({ modelValue: [] })
    await w.find('input').trigger('focus')
    await w.find('input').setValue('zzz')
    expect(w.findAll('[role="option"]')).toHaveLength(0)
  })
})

describe('OptionTags with a soft keyboard', () => {
  // Phone keyboards (swipe, autocomplete, IME) deliver text as a composition
  // rather than plain keystrokes, and Vue's v-model deliberately ignores input
  // while isComposing is true. Bound with v-model the filter does not narrow
  // until composition ends, which on a swipe keyboard can be the whole word or
  // never. Desktop typing looks identical, so this only shows up on a phone.
  const compose = async (w, text, { end = false } = {}) => {
    const input = w.find('input')
    input.element.value = text
    await input.trigger('compositionstart')
    await input.trigger('input', { isComposing: true, inputType: 'insertCompositionText' })
    if (end) {
      await input.trigger('compositionend')
      await input.trigger('input', { isComposing: false })
    }
  }

  it('filters while composition is still in progress', async () => {
    const w = factory({ modelValue: [] })
    await w.find('input').trigger('focus')
    await compose(w, 'al')
    expect(w.findAll('[role="option"]').map((o) => o.text())).toEqual(['Alpha'])
  })

  it('filters once composition ends', async () => {
    const w = factory({ modelValue: [] })
    await w.find('input').trigger('focus')
    await compose(w, 'be', { end: true })
    expect(w.findAll('[role="option"]').map((o) => o.text())).toEqual(['Beta'])
  })

  it('clears the composed text when an option is chosen', async () => {
    const w = factory({ modelValue: [] })
    await w.find('input').trigger('focus')
    await compose(w, 'al')

    await w.findAll('[role="option"]')[0].trigger('mousedown')
    expect(w.vm.search).toBe('')
    expect(w.find('input').element.value).toBe('')
    expect(lastEmit(w)).toEqual(['Alpha'])
  })
})

describe('OptionTags interaction rules', () => {
  // The control has two regions. The text region takes a cursor and always
  // opens; everything else (the caret, a pill, the slack) toggles. Selecting
  // keeps the cursor for more typing but dismisses the menu, which is the one
  // state where the input is focused and the menu is shut.
  //
  // These drive mousedown, not click, because that is where the handler is: the
  // menu has to settle before the browser moves focus.
  const down = (w, sel) => w.find(sel).trigger('mousedown')

  it('opens when the text region is used, and keeps focus there', async () => {
    const w = factory({ modelValue: [] })
    await down(w, 'input')
    expect(w.vm.open).toBe(true)
  })

  it('dismisses the menu on select but keeps the cursor', async () => {
    const w = factory({ modelValue: [] })
    await w.find('input').trigger('focus')
    await w.findAll('[role="option"]')[0].trigger('mousedown')
    expect(w.vm.open).toBe(false)
    expect(lastEmit(w)).toEqual(['Alpha'])
  })

  it('reopens when the text region is used again while still focused', async () => {
    const w = factory({ modelValue: [] })
    await w.find('input').trigger('focus')
    await w.findAll('[role="option"]')[0].trigger('mousedown')
    expect(w.vm.open).toBe(false)

    // Focus never left, so this fires mousedown and no focus event.
    await down(w, 'input')
    expect(w.vm.open).toBe(true)
  })

  it('reopens on the next keystroke after a select', async () => {
    const w = factory({ modelValue: [] })
    await w.find('input').trigger('focus')
    await w.findAll('[role="option"]')[0].trigger('mousedown')
    await w.find('input').setValue('be')
    expect(w.vm.open).toBe(true)
    expect(w.findAll('[role="option"]').map((o) => o.text())).toEqual(['Beta'])
  })

  it('toggles when the control outside the text region is used', async () => {
    const w = factory({ modelValue: [] })
    await down(w, '.option-tags-control')
    expect(w.vm.open).toBe(true)
    await down(w, '.option-tags-control')
    expect(w.vm.open).toBe(false)
  })

  it('toggles from a pill rather than removing it', async () => {
    const w = factory({ modelValue: ['Alpha'] })
    await down(w, '.option-tags-tag')
    expect(w.vm.open).toBe(true)
    expect(w.emitted('update:modelValue')).toBeUndefined()
  })

  it('removes from the remove button without toggling', async () => {
    const w = factory({ modelValue: ['Alpha', 'Beta'] })
    await w.findAll('.option-tags-remove')[0].trigger('mousedown')
    expect(lastEmit(w)).toEqual(['Beta'])
  })

  it('closes and clears the filter when focus leaves entirely', async () => {
    const w = factory({ modelValue: [] })
    await w.find('input').trigger('focus')
    await w.find('input').setValue('al')
    await w.find('input').trigger('blur')
    expect(w.vm.open).toBe(false)
    expect(w.vm.search).toBe('')
  })
})
