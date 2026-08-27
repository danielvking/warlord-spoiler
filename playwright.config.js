import { defineConfig } from '@playwright/test'

// Drives the site in a real browser: every route and state loads, renders and
// responds. These assert behaviour, not pixels, so they do not go stale when
// the UI deliberately changes.
export default defineConfig({
  testDir: './tests/visual',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  reporter: [['list']],
  use: {
    baseURL: 'http://localhost:50005',
    // Deterministic rendering: no animation, no caret blink.
    launchOptions: { args: ['--force-color-profile=srgb', '--disable-lcd-text'] }
  },
  expect: {
    toHaveScreenshot: {
      animations: 'disabled',
      caret: 'hide',
      scale: 'css',
      // Small tolerance for font rasterization differences between runs.
      maxDiffPixelRatio: 0.002
    }
  },
  webServer: {
    command: 'node tests/visual/server.mjs',
    url: 'http://localhost:50005',
    reuseExistingServer: !process.env.CI,
    timeout: 180000
  }
})
