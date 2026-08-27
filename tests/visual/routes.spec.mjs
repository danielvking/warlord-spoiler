import { test, expect, gotoLoaded, VIEWPORTS } from './harness.mjs'

// Every route loads and renders at both widths. The 992px lg breakpoint forks
// the layout (showSideMenus), so each route is exercised on both sides of it.

const ROUTES = [
  ['home', '/'],
  ['card-list', '/card-list'],
  ['build-card', '/build-card'],
  ['ruleset-guide', '/ruleset-guide/Tournament%202.0'],
  ['print-deck', '/print-deck'],
  ['not-found', '/this-route-does-not-exist']
]

for (const [name, url] of ROUTES) {
  for (const [size, viewport] of Object.entries(VIEWPORTS)) {
    test(`${name} @ ${size}`, async ({ page }) => {
      await page.setViewportSize(viewport)
      await gotoLoaded(page, url)
      await expect(page.locator('#app').first()).toBeVisible()
      expect(await page.evaluate(() => document.body.innerText.trim().length)).toBeGreaterThan(0)
    })
  }
}

test.describe('interaction states', () => {
  test('advanced search expanded @ desktop', async ({ page }) => {
    await page.setViewportSize(VIEWPORTS.desktop)
    await gotoLoaded(page, '/')
    const advanced = page.getByText('Advanced', { exact: true }).first()
    await expect(advanced).toBeVisible()
    await advanced.click()
    await page.waitForTimeout(300)
    await expect(page.locator('#app').first()).toBeVisible()
  })

  test('search results populated @ desktop', async ({ page }) => {
    await page.setViewportSize(VIEWPORTS.desktop)
    await gotoLoaded(page, '/')
    const search = page.locator('button:has-text("Search")').first()
    await expect(search).toBeVisible()
    await search.click()
    // The pointer is left sitting over the results, which raises a card hover
    // popover and makes the shot depend on where the button happened to be.
    await page.mouse.move(2, 2)
    await page.waitForTimeout(800)
    await expect(page.locator('#app').first()).toBeVisible()
  })

  test('side menu open @ mobile', async ({ page }) => {
    await page.setViewportSize(VIEWPORTS.mobile)
    await gotoLoaded(page, '/')
    // The header button wrapping the fa-bars icon toggles the side menu.
    await page.locator('.site-header button').first().click()
    await page.waitForTimeout(600)
    await expect(page.locator('#app').first()).toBeVisible()
  })
})
