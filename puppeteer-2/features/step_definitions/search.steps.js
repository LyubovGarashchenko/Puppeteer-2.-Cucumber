const puppeteer = require("puppeteer");
const chai = require("chai");
const expect = chai.expect;
const { Given, When, Then, Before, After } = require("cucumber");
const { putText, getText } = require("../../lib/commands.js");
const { clickElement} = require("../../lib/commands.js");

Before(async function () {
  const browser = await puppeteer.launch({ headless: false, slowMo: 0 }); 
  const page = await browser.newPage();
  this.browser = browser;
  this.page = page;
});

After(async function () {
  if (this.browser) {
    await this.browser.close();
  }
});

Given('user open the page', async function () {
  return await this.page.goto(`https://qamid.tmweb.ru/client/index.php`, 
    {setTimeout: 200});
});

When('user choose the date', async function () {
    return await clickElement(this.page, "body nav[class='page-nav'] a:nth-child(2) span:nth-child(2)");
  });
When("user choose the film and time", async function () {
  return await clickElement(this.page, ".movie-seances__time[href='#'][data-seance-id='223']");
});
When("user choose place", async function () {
  return await clickElement(this.page, "div[class='buying-scheme__wrapper'] div:nth-child(1) span:nth-child(1)");
});
When("user click the book button", async function () {
  return await clickElement(this.page, ".acceptin-button");
});
Then('user sees choosing place', async function () {
  const actual = await getText(this.page, "body main p:nth-child(2)");
  expect(actual).contain("Ряд/Место: 1/1");
});

When("Check purchase VIP ticket", async function () {
  await clickElement(this.page, "a[class='page-nav__day page-nav__day_weekend']");
  await clickElement(this.page, ".movie-seances__time[href='#'][data-seance-id='225']");
  await clickElement(this.page, "div:nth-child(10) span:nth-child(5)");
  await clickElement(this.page, ".acceptin-button");
});

Then("user sees choosing Vip place", async function () {
  const actual = await getText(this.page, "body main p:nth-child(1)");
  expect(actual).contain("В зале: Современный зал");
});

 When("Check to buy busy ticket", async function () {
  await clickElement(this.page, ".page-nav__day.page-nav__day_chosen");
  await clickElement(this.page, ".movie-seances__time[href='#'][data-seance-id='217']");
  await clickElement(this.page, "div[class='buying-scheme__wrapper'] div:nth-child(2) span:nth-child(2)");
});

Then("Error: the place is busy", async function () {
  const acceptinButton = await this.page.$(".acceptin-button");
  const notAvailable = await acceptinButton.evaluate((btn) => btn.disabled);
  expect(notAvailable).equal(true);
});
 