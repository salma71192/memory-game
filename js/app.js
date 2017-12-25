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
	cardSymbol,	li, cards;

// Shuffle cards
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
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
	for (let i = 0; i <= cardSymbols.length-1 ; i++) {
		let cardSymbol = `<li class="card"><i class="fa fa-${cardSymbols[i]}"></i></li>`;
		deck.innerHTML += cardSymbol;		
	}
}

// game initialization
(function gameInit() {
	'use strict';	
	shuffle(cardSymbols);
	CardHTML();
})();

// Redeclare cards array to iterate after Li created
li = deck.getElementsByTagName('li');
cards = [... li];


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */


// add open cards to open list and check that it only receive two cards
let open = [],
	moveBox = document.getElementById('moves'),
	counter = 0;
function openCards() {
	// Build up open cards
	let promise = new Promise((resolve) => {
			if(card.classList.contains('open', 'show')) {
				open.push(card);
			}
		resolve(open);
	});
	promise.then((open) => {
		// Check if cards match or not
		if(open.length % 2 === 0) {
			if(open[open.length -1].childNodes[0].className == open[open.length -2].childNodes[0].className) {
				console.log("match");			
				matchedCards();
				moveCounter();
			} else {			
				UnmatchedCards();		
				console.log("Not match");
				moveCounter();
			}
		}	
	});
}
let stars = document.querySelectorAll('.fa-star');

// counter Function 
function moveCounter() {
	counter++;
	moveBox.innerHTML = counter;
	console.log(counter);
	if(counter === 16) {
		stars[2].style.color = 'black';
	} else if(counter === 20) {
		stars[1].style.color = 'black';
	} else if(counter >= 24) {
		stars[0].style.color = 'black';
	}
}

var match = [];
// match function to lock up matched cards in open position
function matchedCards() {
	open[open.length -1].classList.add('match');
	open[open.length -2].classList.add('match');
	for (var i = 0; i < open.length; i++) {
		if(open[i].classList.contains('match') === true) {
			match.push(open[i]);
		}
	}
	console.log(match);
	if(match.length === 16){ 
		win();
	}
	open = [];
}

// win function 
function win() {
	let gameContainer = document.getElementById('container'),
		winBox = document.getElementById('win'),
		winParagraph = winBox.querySelector('p'),
		starNumber = 3,
		starString = 'stars';

	setTimeout(() => {
			gameContainer.style.display = "none";
			winBox.style.display = "block";
		}, 500);
	match = [];
	
	if(stars[2].style.color = 'black') {
		starNumber = 2;
	} else if(stars[1].style.color = 'black') {
		starNumber = 1;
		starString = 'star';
	} else if(stars[0].style.color = 'black') {
		starNumber = '';
		starString = 'no stars';
	}
	setTimeout(() => {
		winParagraph.textContent = `You won with ${starNumber} ${starString} and ${counter} moves`;
	}, 500);
	
} 

// function restart the game
function restartGame() {
	setTimeout(() => {
			gameContainer.style.display = "block";
			winBox.style.display = "none";
		}, 500);
}

// Unmatch function to remove cards from opencards list and remove their symbols
function UnmatchedCards() {
	for (var i = 0; i < open.length; i++) {
		if(open[i].classList.contains('open', 'show') === true) {
			open = [];
		}
		console.log(open);
	}
	setTimeout(() => {
		resetDeck();
	}, 500);
	
};

// Event Listener Function
function cardListerener(evt) {
	evt.preventDefault();

	for (card of cards) {
		card = evt.target;
	}
	card.classList.add('open', 'show');	
	openCards();
}

// function to show cards
(function clickCard() {
	for (card of cards) {
		card.addEventListener('click', cardListerener);		
	}
})();

// reset cards to original state
function resetDeck() {
	console.log('salma');
	for (card of cards) {
		card.classList.remove('open', 'show');		
	}
}

// restart function
(function RestartDeck() {
	const reset = document.getElementById('reset');
	reset.addEventListener('click', function() {
		for (card of cards) {
			card.classList.remove('open', 'show', 'match');
			open = [];
			match = [];		
		}
		counter = 0;		
		moveBox.innerHTML = counter;
		for(star of stars) {
			star.style.color = 'yellow';
		}
	});
})();


/*
	Star Rating
*/
