import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import CardHover from '../../src/components/shared/CardHover.vue'

// Characterizes the CardHover state machine. The popover itself is stubbed,
// because what matters here is the sequencing, not the rendering.
//
// States: loading -> loaded -> hiding -> destroying -> loading
//   loading    computes the image size, then advances to loaded
//   loaded     shows the popover if a target and image are present
//   hiding     asks the popover to hide, waits for it to actually be hidden
//   destroying removes the popover from the DOM so it can be rebuilt fresh

const IMAGE_URL = 'https://images.theaccordlands.com/card.jpg'

const cardWith = (url) => ({ printInfos: url ? [{ imageUrl: url }] : [] })

// jsdom does not load images, so drive Image.onload by hand.
let images
class FakeImage {
  constructor() {
    this.naturalWidth = 400
    this.naturalHeight = 560
    images.push(this)
  }
  set src(v) { this._src = v }
  get src() { return this._src }
  fire() { this.onload && this.onload() }
}

const factory = (props = {}) => mount(CardHover, {
  props: { target: null, card: cardWith(IMAGE_URL), show: false, ...props },
  global: { stubs: { BPopover: { template: '<div class="popover-stub"><slot/></div>' } } }
})

beforeEach(() => {
  images = []
  vi.stubGlobal('Image', FakeImage)
})

describe('CardHover lifecycle', () => {
  it('starts in loading on mount', () => {
    const w = factory()
    expect(w.vm.state).toBe('loading')
  })

  it('stays loaded with no target, without erroring', async () => {
    const w = factory({ target: null })
    await w.vm.$nextTick()
    expect(w.vm.state).toBe('loaded')
    expect(w.vm.targetInternal).toBe(null)
  })

  it('sizes a portrait image to 400px tall', async () => {
    const el = document.createElement('div')
    const w = factory({ target: el })
    await w.vm.$nextTick()
    images.at(-1).naturalWidth = 300
    images.at(-1).naturalHeight = 600
    images.at(-1).fire()
    await w.vm.$nextTick()
    expect(w.vm.height).toBe(400)
    expect(w.vm.width).toBe(200)
  })

  it('sizes a landscape image to 400px wide', async () => {
    const el = document.createElement('div')
    const w = factory({ target: el })
    await w.vm.$nextTick()
    images.at(-1).naturalWidth = 600
    images.at(-1).naturalHeight = 300
    images.at(-1).fire()
    await w.vm.$nextTick()
    expect(w.vm.width).toBe(400)
    expect(w.vm.height).toBe(200)
  })

  it('reaches loaded with zero size when the card has no image', async () => {
    const el = document.createElement('div')
    const w = factory({ target: el, card: cardWith(null) })
    await w.vm.$nextTick()
    expect(w.vm.state).toBe('loaded')
    expect(w.vm.width).toBe(0)
    expect(w.vm.height).toBe(0)
  })
})

describe('CardHover target resolution', () => {
  // Several target shapes are accepted, and all of them have to keep working.
  const resolvesTo = async (target, expected) => {
    const w = factory()
    w.vm.setTargetInternal(target)
    expect(w.vm.targetInternal).toBe(expected)
  }

  it('accepts a raw element', async () => {
    const el = document.createElement('div')
    await resolvesTo(el, el)
  })

  it('accepts a function returning an element', async () => {
    const el = document.createElement('div')
    await resolvesTo(() => el, el)
  })

  it('accepts a component-like object with $el', async () => {
    const el = document.createElement('div')
    await resolvesTo({ $el: el }, el)
  })

  it('accepts an element id string', async () => {
    const el = document.createElement('div')
    el.id = 'hover-target'
    document.body.appendChild(el)
    await resolvesTo('hover-target', el)
    el.remove()
  })

  it('clears the target on null', async () => {
    await resolvesTo(null, null)
  })
})

describe('CardHover hide sequencing', () => {
  it('waits for the popover to report hidden before destroying', async () => {
    const w = factory({ target: document.createElement('div') })
    await w.vm.$nextTick()
    w.vm.actuallyShowing = true
    w.vm.state = 'hiding'
    await w.vm.$nextTick()
    // Still hiding: it asked the popover to hide and is waiting.
    expect(w.vm.showInternal).toBe(false)
    expect(w.vm.state).toBe('hiding')
    w.vm.handleHidden()
    expect(w.vm.state).toBe('destroying')
  })

  it('skips straight to destroying when it was never actually shown', async () => {
    const w = factory({ target: document.createElement('div') })
    await w.vm.$nextTick()
    w.vm.actuallyShowing = false
    w.vm.state = 'hiding'
    await w.vm.$nextTick()
    expect(w.vm.state).toBe('destroying')
  })

  it('cycles back to loading after destroying', async () => {
    const w = factory({ target: document.createElement('div') })
    await w.vm.$nextTick()
    w.vm.state = 'destroying'
    await w.vm.$nextTick()
    await w.vm.$nextTick()
    expect(['loading', 'loaded']).toContain(w.vm.state)
    expect(w.vm.targetInternal).toBe(null)
  })

  it('records visibility from the popover events', async () => {
    const w = factory()
    w.vm.handleShown()
    expect(w.vm.actuallyShowing).toBe(true)
    w.vm.handleHidden()
    expect(w.vm.actuallyShowing).toBe(false)
  })
})

describe('CardHover refresh triggers', () => {
  // A refresh enters 'hiding'; with nothing actually shown that advances to
  // 'destroying' in the same tick, so assert the refresh happened rather than
  // catching a specific intermediate state.
  const refreshesOn = async (prop, value) => {
    const w = factory({ target: document.createElement('div') })
    await w.vm.$nextTick()
    w.vm.state = 'loaded'
    await w.setProps({ [prop]: value })
    expect(['hiding', 'destroying']).toContain(w.vm.state)
  }

  it('refreshes when the target changes', async () => {
    await refreshesOn('target', document.createElement('span'))
  })

  it('refreshes when the card changes', async () => {
    await refreshesOn('card', cardWith('https://images.theaccordlands.com/other.jpg'))
  })

  it('refreshes when the placement changes', async () => {
    await refreshesOn('placement', 'top')
  })

  it('clears target suppression when the target changes', async () => {
    const w = factory({ target: document.createElement('div') })
    await w.vm.$nextTick()
    w.vm.ignoreTarget = true
    await w.setProps({ target: document.createElement('span') })
    expect(w.vm.ignoreTarget).toBe(false)
  })

  it('passes show through only once loaded', async () => {
    const w = factory({ target: document.createElement('div') })
    await w.vm.$nextTick()
    w.vm.state = 'loaded'
    await w.setProps({ show: true })
    expect(w.vm.showInternal).toBe(true)

    w.vm.state = 'loading'
    await w.setProps({ show: false })
    // Ignored while not loaded, so the loaded transition owns it.
    expect(w.vm.showInternal).toBe(true)
  })
})
