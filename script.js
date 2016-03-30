$(function(){

	// Initialize variables
	var playerBalance = 100.00;

	var appleBin = new Fruit("apples");
	var orangeBin = new Fruit("oranges");
	var bananaBin = new Fruit("bananas");
	var grapeBin = new Fruit("grapes");

	var fruitList = [appleBin, orangeBin, bananaBin, grapeBin];

	updateFruitPrices();

	// Initialize interval function
	function updateFruitPrices() {
		for (var i = 0; i < fruitList.length; i++) {
			fruitList[i].adjustPrice();
		}
		updatePriceDisplay();
	}

	// Called every 15 seconds, when prices change
	// Updates prices onscreen
	function updatePriceDisplay () {
			$(".apples p").text(moneyReadable(appleBin.price));
			$(".oranges p").text(moneyReadable(orangeBin.price));
			$(".bananas p").text(moneyReadable(bananaBin.price));
			$(".grapes p").text(moneyReadable(grapeBin.price));
	}

	// Sets on-click listener for all buy buttons
	$(".buy").on("click", function(event) {
			event.preventDefault();
			if ($(this).parent().hasClass("apples")) {
				appleBin.buy();

			} else if ($(this).parent().hasClass("oranges")) {
				orangeBin.buy();

			} else if ($(this).parent().hasClass("bananas")) {
				bananaBin.buy();

			} else if ($(this).parent().hasClass("grapes")) {
				grapeBin.buy();
			}
	})

	// Sets on-click listener for all sell buttons
	$(".sell").on("click", function(event) {
			event.preventDefault();
			if ($(this).parent().hasClass("apples")) {
				appleBin.sell();

			} else if ($(this).parent().hasClass("oranges")) {
				orangeBin.sell();

			} else if ($(this).parent().hasClass("bananas")) {
				bananaBin.sell();

			} else if ($(this).parent().hasClass("grapes")) {
				grapeBin.sell();
			}
	})

	// Updates inventory display on screen for all fruits
	// Called after any fruit is bought or sold
	function updateInventoryDisplay() {
		$(".inv .apples").text(appleBin.playerInventory);
		$(".inv .oranges").text(orangeBin.playerInventory);
		$(".inv .bananas").text(bananaBin.playerInventory);
		$(".inv .grapes").text(grapeBin.playerInventory);
	}

	// Updates player cash balance
	// Called after any fruit is bought or sold
	function updatePlayerBalanceDisplay() {
     $("#balance").text("You have " + moneyReadable(playerBalance));

	}

	// Returns random number
	function randomNumber(min, max) {
		return Math.floor(Math.random() * (1 + max - min) + min);
	}

	// Object constructor
	function Fruit(binName) {
		this.name = binName;
		this.playerInventory = 0;
		this.price = 3.00;

		// Called when buy button is clicked
		this.buy = function() {
			if (playerBalance > this.price) {
				playerBalance -= this.price;
				this.playerInventory ++;
				updateInventoryDisplay();
				updatePlayerBalanceDisplay();
			} else {
				alert("Come back after payday.");
			}
		}

		// Called when sell button is clicked
		this.sell = function() {
			if (this.playerInventory > 1) {
				playerBalance += this.price;
				this.playerInventory --;
				updateInventoryDisplay();
				updatePlayerBalanceDisplay();

			} else {
				alert("You don't have any more " + this.name);
			}
		}

		// Called every 15 seconds by updateFruitPrices function
		this.adjustPrice = function() {

			var determiner = randomNumber(1,2);

			if (determiner === 1 && this.price < 9.50) {
				this.price += ((randomNumber(1,50))/100);

			} else if (this.price > .50) {
				this.price -= ((randomNumber(1,50))/100);
			}
		}
	}

	function moneyReadable(num) {
		return num.toLocaleString("en-US",{style: "currency", currency: "USD"});
	}

	window.setInterval(updateFruitPrices, 15000);

})
