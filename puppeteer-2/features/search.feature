Feature: Ticket booking
    Scenario: The first happy test
        Given user open the page "https://qamid.tmweb.ru/client/index.php"
        When the user selects the day of week "4"
        When the user selects the time and movie title "223"
        When the user selects the place in the cinema
        When the user clicks the «Reservation» button
        Then user sees choosing place "Ряд/Место: 1/1"

    Scenario: The second happy test.Vip
        Given user open the page "https://qamid.tmweb.ru/client/index.php"
        When Check purchase VIP ticket "6"
        When the user selects the show time and movie title "225"
        When the user has selected free Vip seat in the cinema
        When the user clicks the «Reservation» button
        Then user sees choosing Vip place "В зале: Современный зал" 

    Scenario: The sad test
        Given user open the page "https://qamid.tmweb.ru/client/index.php"
        When the user selects the day of week "2"
        When the user selects the show time and movie title "217"
        When a user selects a seat in the cinema hall that is not available for booking
        When the user clicks the «Reservation» button 
        Then Error the place is busy