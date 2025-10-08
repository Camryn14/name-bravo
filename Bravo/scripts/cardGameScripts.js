document.addEventListener("DOMContentLoaded", () => {
    console.log("document succesfully loaded, baby");

    console.log(`here's the cookie`, document.cookie); 
    
    // Function to display all storage data
    function displayStorageData() {
        // Display cookies
        const cookies = document.cookie || 'None';
        $('#cookieData').text(cookies);
        
        // Display sessionStorage
        let sessionItems = [];
        for (let i = 0; i < sessionStorage.length; i++) {
            const key = sessionStorage.key(i);
            const value = sessionStorage.getItem(key);
            sessionItems.push(`${key}: ${value}`);
        }
        $('#sessionData').text(sessionItems.length > 0 ? sessionItems.join(', ') : 'None');
        
        // Display localStorage
        let localItems = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            const value = localStorage.getItem(key);
            localItems.push(`${key}: ${value}`);
        }
        $('#localData').text(localItems.length > 0 ? localItems.join(', ') : 'None');
    }
    
    // Initial display
    displayStorageData();
    
    // Update storage display every 2 seconds
    setInterval(displayStorageData, 2000);

    const randomDeckOfCards = makeDeckOfCards();
    console.log("random Deck: ", randomDeckOfCards);

    //todo: make 'em random 

    console.log(Math.floor(Math.random() * 52));

    let cardP = document.createElement('p');
    cardP.classList.add("text-wrap");
    cardP.classList.add("drag");
    
    randomDeckOfCards.forEach((card) => {
        // document.getElementById('stackOfCards').append("index of the array = " + j + " & " + "avlue of the array =" + card + "<br>")
        cardP.textContent += card + ' ';
        // document.getElementById('btnClicky').addEventListener('click', btnClicky); 
    });
    document.getElementById('stackOfCards').append(cardP);

    $('.drag').draggable(); 

    //$ == jquery land.
    $( "#spades" ).droppable( 
             { drop: function( event, ui ) {
          $( this ).addClass( "redClass" );
          //todo: if it's correct, make it green. 
            
        }
      }
    );
    
});

function makeDeckOfCards() {

    //make 52 cards, 4 suits, 13 per. 

    // var = ... let or const 
    // hard code array const deck = [[Kheart, qheart, jheark], [kspades, ... ]]

    const suits = ["🐟", "🐠", "🐡"];
    let deckOfCards = [];

    for (i = 1; i <= 13; i++) {

        //ex: fruits.forEach((fruit) => console.log(fruit));
        suits.forEach((suit) => {
            // console.log(suit, i);
            deckOfCards.push(suit + i);
        });

    }

    return deckOfCards;

}