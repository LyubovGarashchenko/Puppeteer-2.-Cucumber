Feature: Check booking movie tickets tests
    Scenario: The first happy test
        Given user open the page
        When user choose the date
        Then user sees choosing place

    Scenario: The second happy test.Vip
        Given user open the page
        When Check purchase VIP ticket
        Then user sees choosing Vip place

    Scenario: The sad test
        Given user open the page
        When Check to buy busy ticket
        Then Error: the place is busy
