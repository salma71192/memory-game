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
	li = deck.getElementsByTagName('li'),
	cards = [],
	cardSymbol,
	symbol;

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
		cardSymbol = `<li class="card"><i class="fa fa-${cardSymbols[i]}"></i></li>`;
		deck.innerHTML += cardSymbol;
	}
}

function gameInit() {
	'use strict';	
	shuffle(cardSymbols);
	CardHTML();
}
gameInit();
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

function matchCards() {
	/*if(open[0].children.hasAttribute('class') === open[1].children.hasAttribute('class')) {
		console.log(true);
	} else {
		console.log(false);
	}*/
}

function openCards(openCard) {
	let open = [];
	open.push(openCard);
	console.log(open);
	if(open[0]){
		matchCards();
	}
}

// Event Listener Function
function cardListerener(evt) {
	evt.preventDefault();
	cards = [... li];
	for (card of cards) {
		card = evt.target;
	}
	card.classList.add('open', 'show');
	let cardHTML = card.outerHTML;
	openCards(cardHTML);
}

// function to show cards
(function clickCard() {
	cards = [... li];
	for (card of cards) {
		card.addEventListener('click', cardListerener);		
	}
})();

// reset function
(function ResetDeck() {
	const reset = document.getElementById('reset');
	reset.addEventListener('click', function(){
		console.log('salma');
		cards = [... li];
		for (card of cards) {
			card.classList.remove('open', 'show');		
		}
	});
})();