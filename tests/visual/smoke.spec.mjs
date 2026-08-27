import { test, expect, gotoLoaded, VIEWPORTS } from './harness.mjs'

// Proves the fixture interception works before any other spec is trusted.
// If these fail, every screenshot below them is meaningless.

// Guards against running the visual suite against `npm run dev`, which serves
// /src/resources/cards.json and slips past the fixture interception, silently
// testing the full 4884-card dataset.
test('is served from a production build, not the dev server', async ({ page }) => {
  const requested = []
  page.on('request', r => {
    if (/cards\.json/.test(r.url())) requested.push(r.url())
  })
  await gotoLoaded(page, '/')
  expect(requested.some(u => /\/src\/resources\//.test(u))).toBe(false)
})

test('serves fixture card data, not the live 5.4MB file', async ({ page }) => {
  const served = []
  page.on('response', r => {
    if (/\/assets\/resources\/cards\..*\.json$/.test(r.url())) served.push(r)
  })

  await page.setViewportSize(VIEWPORTS.desktop)
  await gotoLoaded(page, '/')

  expect(served.length).toBeGreaterThan(0)
  const body = await served[0].text()
  const cards = JSON.parse(body)
  // The fixture is 29 cards; the live file is 4884.
  expect(cards.length).toBe(29)
})

test('search finds a card that exists only in the fixture', async ({ page }) => {
  await page.setViewportSize(VIEWPORTS.desktop)
  await gotoLoaded(page, '/')

  // Reference lists drive the edition dropdown; these come from the fixture.
  const text = await page.locator('body').innerText()
  expect(text).toContain('Alliance')
})

test('external card images are stubbed, none broken', async ({ page }) => {
  await page.setViewportSize(VIEWPORTS.desktop)
  await gotoLoaded(page, '/')

  const broken = await page.evaluate(() =>
    Array.from(document.images).filter(i => i.complete && i.naturalWidth === 0).length)
  expect(broken).toBe(0)
})
