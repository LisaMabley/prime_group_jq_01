function randomNumber(min, max) {
	return Math.floor(Math.random() * (1 + max - min) + min);
}

// Initialize variables
var applePrice = 0.00;
var orangePrice = 0.00;
var bananaPrice = 0.00;
var grapesPrice = 0.00;

var numApples = 0;
var numOranges = 0;
var numBananas = 0;
var numGrapes = 0;

var playerBalance = 100.00;

// Initialize functions
function buy(fruit) {
	playerBalance -= fruit.price;
	fruit.playerInventory ++;
}

function sell(fruit) {
	playerBalance += fruit.price;
	fruit.playerInventory --;
}

function adjustPrice() {

}
