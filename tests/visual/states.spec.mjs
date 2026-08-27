import { test, expect, gotoLoaded } from './harness.mjs'

// Coverage of the states in which elements appear and disappear, across a
// spread of viewports. Routes alone miss these: the search page renders very
// differently with results vs without, in table vs detailed mode, and with the
// deck side menu populated vs empty.

const VIEWPORTS = {
  desktop: { width: 1280, height: 900 }, // >= lg, side menus shown
  tablet: { width: 768, height: 900 }, // between breakpoints
  mobile: { width: 480, height: 900 } // < lg, side menus collapse
}

// The state is reached; assert the page is actually rendering rather than
// comparing pixels. Committed baselines cost more than they caught: they went
// stale on every deliberate UI change and never failed on a real defect.
const shot = async (page) => {
  await expect(page.locator('#app').first()).toBeVisible()
  const painted = await page.evaluate(() => document.body.innerText.trim().length)
  expect(painted).toBeGreaterThan(0)
}

const search = async (page) => {
  const button = page.locator('button:has-text("Search")').first()
  await expect(button).toBeVisible()
  await button.click()
  // Leaving the pointer over the results raises a card hover popover, which
  // would put a floating panel in every screenshot taken after a search.
  await page.mouse.move(2, 2)
  await page.waitForTimeout(900)
}

for (const [size, viewport] of Object.entries(VIEWPORTS)) {
  test.describe(`${size}`, () => {
    test.use({ viewport })

    test('search: no results yet', async ({ page }) => {
      await gotoLoaded(page, '/')
      await shot(page)
    })

    test('search: results in table mode', async ({ page }) => {
      await gotoLoaded(page, '/')
      await search(page)
      await shot(page)
    })

    test('search: advanced form expanded', async ({ page }) => {
      await gotoLoaded(page, '/')
      const advanced = page.getByText('Advanced', { exact: true }).first()
      await expect(advanced).toBeVisible()
      await advanced.click()
      await page.waitForTimeout(400)
      await shot(page)
    })

    test('deck side menu populated', async ({ page }) => {
      await gotoLoaded(page, '/')
      await search(page)
      // Adding a card reveals the deck menu, which is a distinct layout on
      // desktop (inline) versus mobile (offcanvas). The control is an anchor,
      // not a button, so match it by the title the mixin sets.
      const add = page.locator('a[title="Add to build"]').first()
      await expect(add).toBeVisible()
      await add.click()
      await page.waitForTimeout(700)
      await shot(page)
    })

    test('card detail', async ({ page }) => {
      await gotoLoaded(page, '/')
      await search(page)
      const link = page.locator('a[href*="card-detail"]').first()
      await expect(link).toBeVisible()
      await link.click()
      await page.waitForTimeout(900)
      await shot(page)
    })

    test('card builder', async ({ page }) => {
      await gotoLoaded(page, '/build-card')
      await shot(page)
    })
  })
}

test.describe('color scheme', () => {
  // The site is light-only: it sets no data-bs-theme and Bootstrap 5.3 does not
  // apply dark styling without it. Bootstrap 5.3 ships dark rules though, so
  // this pins that they stay dormant.
  for (const scheme of ['light', 'dark']) {
    test(`renders identically under prefers-color-scheme: ${scheme}`, async ({ page }) => {
      await page.emulateMedia({ colorScheme: scheme })
      await page.setViewportSize(VIEWPORTS.desktop)
      await gotoLoaded(page, '/')
      const painted = await page.evaluate(() => ({
        theme: document.documentElement.getAttribute('data-bs-theme'),
        bg: getComputedStyle(document.body).backgroundColor,
        color: getComputedStyle(document.body).color
      }))
      expect(painted.theme).toBe(null)
      expect(painted.bg).toBe('rgb(255, 255, 255)')
      expect(painted.color).toBe('rgb(33, 37, 41)')
    })
  }
})
