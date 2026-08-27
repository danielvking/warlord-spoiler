import { test, expect, gotoLoaded, VIEWPORTS } from './harness.mjs'

// An existing user's saved state has to survive the migration. Nothing here is
// visible in a screenshot: a changed key name or shape would silently discard
// someone's deck, and they would just find it empty one day.
//
// The payloads below are verbatim captures of what the Vue 2 build wrote.

const DECK = `{"'Mad' Pat Carrik":1,"A Common Purpose":1}`
const EDITED = `{"'Mad' Pat Carrik":{"name":"'Mad' Pat Carrik","type":"Character","level":3}}`
const SETTINGS = `{"isEditMode":true}`

const seed = async (page, entries) => {
  // Land on the origin first so localStorage is addressable, then reload so
  // the app boots against the seeded state.
  await page.goto('/')
  await page.evaluate((kv) => {
    for (const [k, v] of Object.entries(kv)) localStorage.setItem(k, v)
  }, entries)
}

test('a deck saved by the previous build still loads', async ({ page }) => {
  await page.setViewportSize(VIEWPORTS.desktop)
  await seed(page, { deck: DECK })
  await gotoLoaded(page, '/')

  // The store rewrites this on load, so a shape change shows up as a failed
  // byte-identical round trip.
  expect(await page.evaluate(() => localStorage.getItem('deck'))).toBe(DECK)

  // And it reaches the UI, not just storage.
  const menu = page.locator('.side-menu-container-inner').first()
  await expect(menu).toContainText(`'Mad' Pat Carrik`)
  await expect(menu).toContainText('A Common Purpose')
})

test('edit mode state survives, without erroring', async ({ page }) => {
  const errors = []
  page.on('pageerror', (e) => errors.push(e.message))

  await page.setViewportSize(VIEWPORTS.desktop)
  await seed(page, { editedCards: EDITED, settings: SETTINGS })
  await gotoLoaded(page, '/')

  const after = await page.evaluate(() => ({
    edited: localStorage.getItem('editedCards'),
    settings: localStorage.getItem('settings')
  }))
  expect(after.edited).toBe(EDITED)
  expect(after.settings).toBe(SETTINGS)
  expect(errors).toEqual([])
})

test('a saved card builder session restores', async ({ page }) => {
  const errors = []
  page.on('pageerror', (e) => errors.push(e.message))

  await page.setViewportSize(VIEWPORTS.desktop)
  await seed(page, {
    cardBuilderSettings: JSON.stringify({
      cardSchema: 'https://theaccordlands.com/schemas/v4/card',
      cardData: { name: 'Regression Test Card', type: 'Character', subtype: ['Warlord'] }
    })
  })
  await gotoLoaded(page, '/build-card')

  await expect(page.locator('input[type=text]').first()).toHaveValue('Regression Test Card')
  expect(errors).toEqual([])
})
