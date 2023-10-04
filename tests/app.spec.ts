import {expect, test} from '@playwright/test';

const LOCALHOST_URL = 'http://localhost:5173';

test.describe('Init App', () => {
  test('has title', async ({page}) => {
    await page.goto(LOCALHOST_URL);

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Pomodoro/);
  });


  test('has short break title', async ({page}) => {
    await page.goto(LOCALHOST_URL);

    const text = page.getByRole('list')

    // Expect a title "to contain" a substring.
    await expect(text).toContainText(/short break/)
  });
})

test.describe('Modal Test', () => {
  test('should get the settings modal', async ({page}) => {
    await page.goto(LOCALHOST_URL);

    const button = page.getByTestId(/settingsButton/)
    await button.click()
    await page.waitForSelector('.modal-content')

    const modal = page.getByRole('dialog')
    await expect(modal).toHaveText(/Settings/)
    await page.close()
  });
})

test.describe('Pomodoro 25min time', () => {
  test.describe.configure({mode: 'parallel'});
  test.beforeEach(async ({page}) => {
    await page.goto(LOCALHOST_URL);
  })

  test.afterEach(async ({page}) => {
    await page.close()
  })


  test('Should print difference between initialTime and after 5 seconds', async ({page}) => {
    const button = page.getByTestId(/timeButton/)
    const textTime = page.getByTestId(/timePlaceholdert/)
    const initialText = await textTime.textContent()
    const parseInitialText = String(initialText).trim().replace(/"/g, '')
    await button.click()
    await page.waitForTimeout(5000)
    await button.click()

    const newText = await textTime.textContent()
    const parseNewText = String(newText).trim().replace(/"/g, '')


    expect(parseInitialText).not.toBe(parseNewText)
    expect(parseNewText).toBe("24:55")
    expect(parseInitialText).toBe("25:00")
  })

  test('Should print pause label when press button to start pomodoro', async ({page}) => {
    const button = page.getByTestId(/timeButton/)
    const pomodoroStatus = page.getByTestId(/pomodoroStatus/)
    await button.click()
    await page.waitForTimeout(1000)
    const text = await pomodoroStatus.textContent()
    await button.click()

    expect(String(text).trim()).toBe("Pause")
  })
})




