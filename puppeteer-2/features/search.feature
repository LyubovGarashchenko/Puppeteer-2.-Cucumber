Feature: Check booking movie tickets tests
    Scenario: The first happy test
        Given('user open the page {string}', async function (string) {
            return await this.page.goto("https://qamid.tmweb.ru/client/index.php"), {setTimeout: 5000,};
        });
             
        When('Buy simple ticket {string}', async function (string) {
           return await clickElement(this.page, "a:nth-child(4)");
        });
        And('choose film and time seance {string}', async function (string) {
           return await clickElement(this.page, ".movie-seances__time[href='#'][data-seance-id='223']");
        });
        And('choose the simple place)  {string}', async function (string) {      
           return await clickElement(this.page, "div[class='buying-scheme__wrapper'] div:nth-child(1) span:nth-child(1)");
        });
        And('the user clicks the «Reservation» button', async function () {
            return await clickElement(this.page, ".acceptin-button");
        });
        Then("user sees choosing place", async function () {
        const actual = await getText(this.page, "body main p:nth-child(2)");
        expect(actual).contain("Ряд/Место: 1/1");
        });

    Scenario: The second happy test.Vip
        Given('user open the page {string}', async function (string) {
            return await this.page.goto("https://qamid.tmweb.ru/client/index.php");;
        });
             
        When('Check purchase VIP ticket {string}', async function (string) {
           return await clickElement(this.page, "a:nth-child(6)");
        });
        And('choose film and time seance {string}', async function (string) {
           return await clickElement(this.page, ".movie-seances__time[href='#'][data-seance-id='225']");
        });
        And('choose the simple place)  {string}', async function (string) {      
           return await clickElement(this.page, "div:nth-child(10) span:nth-child(5)");
        });
        And('the user clicks the «Reservation» button', async function () {
            return await clickElement(this.page, ".acceptin-button");
        });
        Then("user sees choosing Vip place", async function () {
        const actual = await getText(this.page, "body main p:nth-child(3)");
        expect(actual).contain("В зале: Современный зал");
        });

    Scenario: The sad test
        Given('user open the page {string}', async function (string) {
            return await this.page.goto("https://qamid.tmweb.ru/client/index.php");;
         });
             
        When('Check to buy busy ticket {string}', async function (string) {
           return await clickElement(this.page, "a:nth-child(2)");
         });
        And('choose film and time seance {string}', async function (string) {
           return await clickElement(this.page, ".movie-seances__time[href='#'][data-seance-id='217']");
         });
        And('choose the buisy place)  {string}', async function (string) {      
           return await clickElement(this.page, "span[class='buying-scheme__chair buying-scheme__chair_taken']");
         });
        Then("Error the place is busy", async function () {
        const acceptinButton = await this.page.$(".acceptin-button");
        const notAvailable = await acceptinButton.evaluate((btn) => btn.disabled);
        expect(notAvailable).equal(true);
        });