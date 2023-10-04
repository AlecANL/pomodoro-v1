import {expect, test} from "@playwright/test";

const LOCALHOST_URL = 'http://localhost:5173';

test.describe('Settings for Tab Component', () => {
  test.beforeEach(async ({page}) => {
    await page.goto(LOCALHOST_URL);
  })

  test.afterEach(async ({page}) => {
    await page.close()
  })

  test('Should show 05:00 minutes whe change to shor break', async ({page}) => {
    const tabButton = page.getByTestId('tab-shortBreak')
    await tabButton.click()

    const textTime = page.getByTestId(/timePlaceholdert/)
    const text = await textTime.textContent()

    expect(text).toContain('05:00')
  })
})