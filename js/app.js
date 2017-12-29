
// Create a list that holds all the cards symbols
let cardSymbols = [
    'diamond', 'diamond',
    'paper-plane-o', 'paper-plane-o',
    'anchor', 'anchor',
    'bolt', 'bolt',
    'cube', 'cube',
    'leaf', 'leaf',
    'bicycle', 'bicycle',
    'bomb', 'bomb'
];

let deck = document.getElementById('deck'),
    cardSymbol;


// Shuffle cards function: to shuffle cards symbols
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;
    for (var i = 0; i < array.length - 1; i++) {
        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
    }
    return array;
}


// Create card HTML 
function CardHTML() {
    for (let i = 0; i <= cardSymbols.length - 1; i++) {
        let cardSymbol = `<li class="card"><i class="fa fa-${cardSymbols[i]}"></i></li>`;
        deck.innerHTML += cardSymbol;
    }
}


// game initialization: add cards Html and shuffle the cards.
(function gameInit() {
    'use strict';
    shuffle(cardSymbols);
    CardHTML();
})();


// Redeclare cards array to iterate after Li created
let li = deck.getElementsByTagName('li'),
    cards = [...li],
    open = [],
    moveBox = document.getElementById('moves'),
    counter = 0,
    gameContainer = document.getElementById('container'),
    winBox = document.getElementById('win'),
    winParagraph = winBox.querySelector('p'),
    winButton = winBox.querySelector('button'),
    restartBtn = document.getElementById('restart-btn'),
    stars = document.querySelectorAll('.fa-star'),
    starNumber = 3,
    starString = ' stars',
    timer;


// counter Function to count number of moves player make and display them in the document.
function moveCounter() {
    counter++;
    moveBox.innerHTML = counter;
}


// add open cards to open list and check that it only receive two cards.
function openCards(card) {
    // Build up open cards
    let promise = new Promise((resolve) => {
        // push open cards to open array & prevent adding the same card.
        if (card.classList.contains('open', 'show') && !card.classList.contains('opened')) {            
            card.classList.add('opened');
            open.push(card);
            resolve(open);

            //start timer with first card clicked only.
            if(!card.parentNode.classList.contains('startTimer')) {
                card.parentNode.classList.add('startTimer');
                timer = setInterval(setTime, 1000);
            }

        } else {
            // if the card already in the open array "already opened":
            // if already matched with another card. alert "Matched card!".
            if(card.classList.contains('match')) {
                alert('Matched card!');
            } else {
                // if just opened. flip it and remove it from the open array.
                card.classList.remove('open', 'show', 'animated', 'bounceIn', 'opened');
                open.pop(-1);
            }            
        }
    });
    // after adding open cards successfuly. check matching.
    promise.then((open) => {
    		// Check if open array has two cards then start matching. 
	        if (open.length % 2 === 0 && open.length > 0) {
	            if (open[open.length - 1].childNodes[0].className == open[open.length - 2].childNodes[0].className) {
                    // keep cards open through matchcards function.
	                matchedCards();
                    // move counter
	                moveCounter();
	            } else {
                    // flip cards if not matched through matchcards function.
	                UnmatchedCards();
	                moveCounter();
	            }
	        }
    });
}


// match function to lock up matched cards in open position
function matchedCards() {
    let matchesCardsDelete = open.slice(-2);
        matchesCardsDelete.forEach(function (openItem){
            openItem.classList.remove('bounceIn');
            openItem.classList.add('match','rubberBand');
        });
    // if all matched. player wins.
    if (open.length === 16) {
        win();
    }
}

// win function 
function win() {
    setTimeout(() => {
        gameContainer.style.display = "none";
        winBox.style.display = "block";
        let gameEnd_timer = (pad(parseInt(totalSeconds / 60))) + ':' + (pad(totalSeconds % 60));

        winParagraph.textContent = `You won with ${starNumber} ${starString} and ${counter} moves.
		Your Time: ${gameEnd_timer} min.`;
    }, 500);
}


// Unmatch function to remove cards from opencards list and remove their symbols
function UnmatchedCards() {
        let unmatchesCardsDelete = open.slice(-2);
        unmatchesCardsDelete.forEach(function(cardItem) {
            setTimeout(() => {
                flipCards(cardItem);
                cardItem.classList.remove('opened');
                open.pop(unmatchesCardsDelete);
                console.log(open);
            }, 500);
        });
}


// Event Listener Function: when click on a card
function clickCard_Listener() {
    this.classList.add('open', 'show', 'animated', 'bounceIn');    
    openCards(this);
}


// function to open cards
(function clickCard() {
    for (card of cards) {
        card.addEventListener('click', clickCard_Listener);
    }
})();


// flip cards to original state
function flipCards(openItem) {
    openItem.classList.add('shake', 'red');
    openItem.classList.remove('bounceIn');
    setTimeout(() => {
        openItem.classList.remove('open', 'show', 'shake', 'red');
    }, 700);
}


// restart function
function restartDeck_Listener() {
    // reset all cards to the flipped over position
    for (card of cards) {
        card.classList.remove('open', 'show', 'match');
        open = [];
    }

    // remove startTimer calss from card parent node to restart the timer when click on the first card
    card.parentNode.classList.remove('startTimer');

    // reset move counter and timer to starting state
    counter = 0;
    secondsLabel.innerHTML = '00';
    minutesLabel.innerHTML = '00';
    clearInterval(timer);
    totalSeconds = 0;
    moveBox.innerHTML = counter;

    // reset the star rating to 3 stars
    for (star of stars) {
        star.style.color = 'yellow';
    }

    // reshuffle the cards
    shuffle(cardSymbols);
}


(function restartDeck() {
    restartBtn.addEventListener('click', restartDeck_Listener);
})();


// function play again to restart the game when click on play again button
function playAgain() {
    setTimeout(() => {
        gameContainer.style.display = "flex";
        winBox.style.display = "none";        
        restartDeck_Listener();
    }, 500);
}


// restart game when clicking on play again button.
(function() {
    winButton.addEventListener('click', playAgain);
})();


// starCounter function
function starCounter() {
    if (counter === 16) {
        stars[2].style.color = 'black';
        starNumber = 2;
    } else if (counter >= 22) {
        stars[1].style.color = 'black';
        starNumber = 1;
        starString = 'star';
    }
}


// function game timer
let minutesLabel = document.getElementById("minutes"),
    secondsLabel = document.getElementById("seconds"),
    totalSeconds = 0;

function setTime() {
    ++totalSeconds;
    secondsLabel.innerHTML = pad(totalSeconds % 60);
    minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
}

function pad(val) {
    var valString = val + "";
    if (valString.length < 2) {
        return "0" + valString;
    } else {
        return valString;
    }
}
