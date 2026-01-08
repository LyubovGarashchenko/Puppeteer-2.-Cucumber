const {clickElement,putText, getText,} = require("./puppeteer-2/lib/commands.js");

let page;

beforeEach(async () => {
  page = await browser.newPage();
  await page.goto("https://qamid.tmweb.ru/client/index.php");
  await page.setDefaultNavigationTimeout(70000);
});

afterEach(() => {
 page.close();
});

describe("Check booking movie tickets tests", () => {
  test("The first happy test", async () => {
    await clickElement(page, "body nav[class='page-nav'] a:nth-child(2) span:nth-child(2)"); // choose the date
    await clickElement(page, ".movie-seances__time[href='#'][data-seance-id='223']"); // choose film and time seance
    await clickElement(page, "div[class='buying-scheme__wrapper'] div:nth-child(1) span:nth-child(1)"); // choose place
    await clickElement(page, ".acceptin-button");// to clich the book button
    const actual = await getText(page, "body main p:nth-child(2)");
    expect(actual).toContain("Ряд/Место: 1/1");
  });

  test("The second happy test.Vip", async () => {
    await clickElement(page, "a:nth-child(2)");
    await clickElement(page, ".movie-seances__time[href='#'][data-seance-id='225']");
    await clickElement(page, "div:nth-child(10) span:nth-child(5)");
    await clickElement(page, ".acceptin-button");
    await clickElement(page, ".acceptin-button");
    const actual = await getText(page, "body main p:nth-child(3)");
    expect(actual).toContain("Современный зал");
  }, 70000);

  test("The sad test", async () => {
    await clickElement(page, "a:nth-child(2)");
    await clickElement(page, ".movie-seances__time[href='#'][data-seance-id='225']");
    await clickElement(page, "span[class='buying-scheme__chair buying-scheme__chair_taken']");
    const acceptinButton = await page.$(".acceptin-button");
    const notAvailable = await acceptinButton.evaluate((btn) => btn.disabled);
    expect(notAvailable).toEqual(true);
  }, 50000);
}); 
    