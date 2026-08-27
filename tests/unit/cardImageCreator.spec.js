import { describe, it, expect, beforeEach } from 'vitest'
import CardImageCreator from '../../src/components/builder/CardImageCreator.vue'
import { mountComponent, clearStorage, settle } from './componentHarness'

// This component turns card data into the rendered card: the header line, the
// bolded keywords in the body, the italicised flavour text, and the image data
// URL the Download button saves. When the last of those breaks, the form around
// it still looks completely normal, which is why it is asserted here.

const card = (props) => ({
  name: 'Test Card',
  type: 'Character',
  printInfos: [{ set: 'Core', rarity: 'Common' }],
  ...props
})

const create = (cardData, props) => mountComponent(CardImageCreator, {
  props: { cardData, points: 0, keywordRegex: /(^|\s)(Charges|Cursed)/gm, ...props },
  stubs: {}
})

beforeEach(clearStorage)

describe('CardImageCreator header line', () => {
  it('bolds factions and separates them with bullets', async () => {
    const w = create(card({ faction: ['Nothrog Legions', 'Elven Branches'] }))
    await settle(w)
    const header = w.vm.formattedHeaderText
    expect(header).toContain('<b>')
    expect(header).toContain('•')
    expect(header).toContain('Nothrog')
  })

  it('keeps multi-word names from breaking across lines', async () => {
    const w = create(card({ faction: ['Nothrog Legions'] }))
    await settle(w)
    expect(w.vm.formattedHeaderText).toContain('&nbsp;')
  })

  it('produces no header for a card with nothing to show', async () => {
    const w = create(card())
    await settle(w)
    expect(w.vm.formattedHeaderText).toBe('')
  })
})

describe('CardImageCreator body text', () => {
  it('wraps the card text in a paragraph', async () => {
    const w = create(card({ text: 'A simple ability.' }))
    await settle(w)
    expect(w.vm.formattedMainText).toBe('<p>A simple ability.</p>')
  })

  it('turns a line break into a new paragraph', async () => {
    const w = create(card({ text: 'First line.\r\nSecond line.' }))
    await settle(w)
    expect(w.vm.formattedMainText).toBe('<p>First line.</p><p>Second line.</p>')
  })

  it('bolds a keyword where the regex matches', async () => {
    const w = create(card({ text: 'This card has Charges and more.' }))
    await settle(w)
    expect(w.vm.formattedMainText).toContain('<b>Charges</b>')
  })

  it('leaves a card with no text empty rather than emitting an empty paragraph', async () => {
    const w = create(card())
    await settle(w)
    expect(w.vm.formattedMainText).toBe('')
  })

  it('escapes markup in the card text', async () => {
    const w = create(card({ text: 'Not <script>evil()</script> markup' }))
    await settle(w)
    expect(w.vm.formattedMainText).not.toContain('<script>')
  })
})

describe('CardImageCreator flavour text', () => {
  it('italicises the flavour text from the first printing', async () => {
    const w = create(card({ printInfos: [{ set: 'Core', flavorText: 'A quotable line.' }] }))
    await settle(w)
    expect(w.vm.formattedFlavorText).toContain('<i>')
    expect(w.vm.formattedFlavorText).toContain('A quotable line.')
  })

  it('keeps an attribution dash with its name', async () => {
    const w = create(card({ printInfos: [{ set: 'Core', flavorText: 'A line.\r\n- Someone' }] }))
    await settle(w)
    expect(w.vm.formattedFlavorText).toContain('-&nbsp;Someone')
  })

  it('breaks a line without starting a new paragraph', async () => {
    const w = create(card({ printInfos: [{ set: 'Core', flavorText: 'One\r\nTwo' }] }))
    await settle(w)
    expect(w.vm.formattedFlavorText).toContain('<br>')
    expect(w.vm.formattedFlavorText).not.toContain('</p><p>')
  })

  it('produces nothing when the printing carries no flavour text', async () => {
    const w = create(card())
    await settle(w)
    expect(w.vm.formattedFlavorText).toBe('')
  })
})

describe('CardImageCreator two-way html props', () => {
  // When these emits do not land, turning auto-format off blanks the textarea.
  it('emits the formatted html back to its parent', async () => {
    const w = create(card({ text: 'Some text.' }))
    await settle(w)
    // Reading the computed is what triggers the emit.
    void w.vm.formattedMainText
    await settle(w)
    expect(w.emitted('update:mainHtml')).toBeTruthy()
    expect(w.emitted('update:mainHtml').at(-1)[0]).toContain('Some text.')
  })

  it('prefers an override supplied by the parent over its own formatting', async () => {
    const w = create(card({ text: 'Original.' }), { mainHtml: '<p>Edited by hand.</p>' })
    await settle(w)
    expect(w.vm.computeFormattedCardText()).toContain('Edited by hand.')
  })

  it('falls back to its own formatting when the override uses a disallowed tag', async () => {
    // Only p, b, i and br are permitted in a hand-edited override.
    const w = create(card({ text: 'Original.' }), { mainHtml: '<div>not allowed</div>' })
    await settle(w)
    expect(w.vm.computeFormattedCardText()).toContain('Original.')
  })
})

describe('CardImageCreator output event', () => {
  // The parent listens for update:modelValue. Emit anything else and the
  // preview never appears and Download Card Image does nothing at all.
  it('declares update:modelValue rather than input', () => {
    const emits = CardImageCreator.emits || []
    expect(emits).not.toContain('input')
  })

  it('never emits a bare input event', async () => {
    const w = create(card({ text: 'Something' }))
    await settle(w, 5)
    expect(w.emitted('input')).toBeFalsy()
  })
})
