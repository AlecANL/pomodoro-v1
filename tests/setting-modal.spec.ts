import {expect, test} from "@playwright/test";

const LOCALHOST_URL = 'http://localhost:5173';

test.describe('Change Setting in Modal', () => {
  test.describe.configure({mode: 'parallel'});

  test.beforeEach(async ({page}) => {
    await page.goto(LOCALHOST_URL);
  })

  test.afterEach(async ({page}) => {
    await page.close()
  })


  test('Should show a error message when value input is invalid', async ({page}) => {
    const button = page.getByTestId(/settingsButton/)
    await button.click()
    await page.waitForSelector('.modal-content')
    const input = page.getByTestId('input-pomodoro')
    await input.fill('100')
    const errorMessage = page.getByTestId('error-input-pomodoro')
    const errorMessageText = await errorMessage.textContent()
    expect(errorMessageText).toContain('Invalid value. max: 60min and min: 1min')
  })

  test('Should change the value of pomodoro time', async ({page}) => {
    const button = page.getByTestId(/settingsButton/)
    await button.click()
    await page.waitForSelector('.modal-content')
    const input = page.getByTestId('input-pomodoro')
    await input.fill('3')

    const buttonApply = page.getByTestId('apply-button')
    await buttonApply.click()

    const textTime = page.getByTestId(/timePlaceholdert/)
    const initialText = await textTime.textContent()

    expect(initialText).toContain('03:00')
  })

  test('Should change the current color', async ({page}) => {
    const button = page.getByTestId(/settingsButton/)
    await button.click()
    await page.waitForSelector('.modal-content')

    const inputColorCyan = page.getByTestId('input-cyan')
    await inputColorCyan.click()

    const buttonApply = page.getByTestId('apply-button')
    await buttonApply.click()

    const element = page.getByRole('document')
    const style = await element.getAttribute('style')

    expect(String(style).trim()).toContain('cyan')
  })
})