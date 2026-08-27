import { test as base, expect } from '@playwright/test'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const here = path.dirname(fileURLToPath(import.meta.url))
const cards = fs.readFileSync(path.join(here, 'fixtures/cards.json'), 'utf8')
const referenceLists = fs.readFileSync(path.join(here, 'fixtures/referenceLists.json'), 'utf8')

// A 1x1 transparent PNG, used in place of every remote card image.
const BLANK_PNG = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
  'base64'
)

// Desktop is >= 992px (the lg breakpoint) which turns on showSideMenus;
// mobile is below it. The layout forks there, so both are captured.
export const VIEWPORTS = {
  desktop: { width: 1280, height: 900 },
  mobile: { width: 480, height: 900 }
}

export const test = base.extend({
  // Replaces the 5.4MB live card data with a pinned 29-card fixture and stubs
  // every external image, so screenshots depend only on app code.
  page: async ({ page }, use) => {
    await page.route(/\/assets\/resources\/cards\.[^/]*\.json$/, route =>
      route.fulfill({ contentType: 'application/json', body: cards }))
    await page.route(/\/assets\/resources\/referenceLists\.[^/]*\.json$/, route =>
      route.fulfill({ contentType: 'application/json', body: referenceLists }))
    await page.route(/^https:\/\/images\.theaccordlands\.com\/.*/, route =>
      route.fulfill({ contentType: 'image/png', body: BLANK_PNG }))
    // Typekit is a remote font that would otherwise shift text between runs.
    await page.route(/^https:\/\/use\.typekit\.net\/.*/, route =>
      route.fulfill({ contentType: 'text/css', body: '' }))
    await use(page)
  }
})

export { expect }

/**
 * Navigates and waits for the app to finish loading card data.
 * networkidle never settles reliably here, so this keys on the Vuex
 * cardsLoaded flag reaching the DOM instead.
 */
export async function gotoLoaded(page, url) {
  await page.goto(url, { waitUntil: 'domcontentloaded' })
  // Card data arrives asynchronously; the footer only renders once the app has
  // mounted, and search controls only populate once reference lists load.
  await page.waitForFunction(() => document.body.innerText.trim().length > 0,
    { timeout: 30000 })
  // The card preview img lands early with an empty src, so it reports complete
  // while occupying no height. Every settle measure agrees the page is done and
  // the shot is taken 400px short, so wait on naturalWidth instead.
  if (/build-card|card-detail|edit/.test(url)) {
    await page.waitForFunction(() => {
      const i = document.querySelector('img.card-image')
      return i && i.naturalWidth > 0 && i.getBoundingClientRect().height > 0
    }, { timeout: 30000, polling: 100 }).catch(() => {})
  }
  await page.waitForFunction(
    () => [...document.images].every((i) => i.complete),
    { timeout: 30000, polling: 250 }
  ).catch(() => {})

  // Then let the layout come to rest, for anything that moves without an
  // image being involved.
  await page.waitForFunction(() => {
    const key = '__vrSettle'
    let now = ''
    for (const el of document.body.querySelectorAll('button, input, select, h1, table')) {
      const r = el.getBoundingClientRect()
      now += `${Math.round(r.x)},${Math.round(r.y)},${Math.round(r.width)};`
    }
    const state = window[key] || { last: null, runs: 0 }
    state.runs = state.last === now ? state.runs + 1 : 0
    state.last = now
    window[key] = state
    return state.runs >= 3
  }, { timeout: 30000, polling: 250 }).catch(() => {})
  // Let images settle; they are all stubbed so this is fast.
  await page.waitForLoadState('load')
  await page.evaluate(() => document.fonts && document.fonts.ready)
}
