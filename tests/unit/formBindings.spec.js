import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { BFormSelect, BFormSelectOption, BFormInput, BFormTextarea } from 'bootstrap-vue-next'

// The two ways a BootstrapVueNext form control silently stops working. Neither
// shows up as a layout difference, a console error, or a failing screenshot:
// the control is the right size and in the right place, it just does the wrong
// thing.

const SRC = path.join(path.dirname(fileURLToPath(import.meta.url)), '../../src')

const vueFiles = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
  e.isDirectory() ? vueFiles(path.join(dir, e.name))
    : e.name.endsWith('.vue') ? [path.join(dir, e.name)] : [])

describe('BootstrapVueNext event contract', () => {
  // BootstrapVueNext emits only `update:modelValue`, so an @input handler is
  // never called, and any handler taking an argument gets the raw DOM event
  // instead of the value.
  it('form components do not emit input', () => {
    for (const C of [BFormSelect, BFormInput, BFormTextarea]) {
      expect(C.emits ?? [], `${C.__name ?? C.name} emits`).not.toContain('input')
    }
  })

  it('no template binds @input to a bootstrap-vue-next component', () => {
    const offenders = []
    for (const file of vueFiles(SRC)) {
      const lines = fs.readFileSync(file, 'utf8').split('\n')
      lines.forEach((line, i) => {
        if (!/@input\s*=/.test(line)) return
        // Walk back to the tag this attribute belongs to.
        let tag = null
        for (let j = i; j >= 0 && j > i - 12 && !tag; j--) {
          const m = lines[j].match(/<([a-zA-Z][\w-]*)/g)
          if (m) tag = m[m.length - 1].slice(1)
        }
        if (tag && /^b-/.test(tag)) {
          offenders.push(`${path.relative(SRC, file)}:${i + 1} <${tag}>`)
        }
      })
    }
    expect(offenders, 'use @update:model-value instead').toEqual([])
  })
})

describe('select placeholder options', () => {
  // <option> has no "undefined" state. Binding undefined to its value drops
  // the attribute, and the browser then reports the option's TEXT as its value,
  // so a placeholder can never match the model and the control renders blank.
  const withPlaceholder = (placeholderValue, modelValue) => mount({
    components: { BFormSelect, BFormSelectOption },
    props: ['placeholderValue', 'modelValue'],
    template: `
      <b-form-select :model-value="modelValue" :options="['Alpha', 'Beta']">
        <template #first>
          <b-form-select-option :value="placeholderValue">- Pick -</b-form-select-option>
        </template>
      </b-form-select>`
  }, { props: { placeholderValue, modelValue }, attachTo: document.body })

  it('shows the placeholder when it is bound to null', () => {
    const select = withPlaceholder(null, null).find('select').element
    expect(select.selectedIndex).toBe(0)
    expect(select.options[0].text.trim()).toBe('- Pick -')
  })

  it('renders nothing selected when the placeholder is bound to undefined', () => {
    // Characterizes the trap rather than endorsing it.
    const select = withPlaceholder(undefined, null).find('select').element
    expect(select.selectedIndex).toBe(-1)
    expect(select.options[0].value).toBe('- Pick -')
  })

  it('no template gives a select option an undefined value', () => {
    const offenders = []
    for (const file of vueFiles(SRC)) {
      const text = fs.readFileSync(file, 'utf8')
      if (/<b-form-select-option[^>]*:value="undefined"/.test(text)) {
        offenders.push(path.relative(SRC, file))
      }
    }
    expect(offenders, 'bind null so the placeholder can match').toEqual([])
  })
})
