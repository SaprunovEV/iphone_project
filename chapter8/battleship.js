let view = {
    displayMessage: function(msg){
        let element = document.getElementById("messageArea");
        if(element) {
            element.innerHTML = msg;
        }
    },

    displayHit: function(location){
        let element = document.getElementById(location);
        if(element) {
            element.setAttribute("class", "hit");
        }
    },
    displayMiss: function(location){
        let element = document.getElementById(location);
        if(element) {
            element.setAttribute("class", "miss");
        }
    }
}

let model = {
    boardSize: 7,
	numShips: 3,
	shipLength: 3,
	shipsSunk: 0,
	
	ships: [
		{ locations: [0, 0, 0], hits: ["", "", ""] },
		{ locations: [0, 0, 0], hits: ["", "", ""] },
		{ locations: [0, 0, 0], hits: ["", "", ""] }
    ],
    
    // ships: [
	// 	{ locations: ["06", "16", "26"], hits: ["", "", ""] },
	// 	{ locations: ["24", "34", "44"], hits: ["", "", ""] },
	// 	{ locations: ["10", "11", "12"], hits: ["", "", ""] }
    // ],
    
    fire: function(guess){
        for(let i = 0; i < this.numShips; i++){
            let ship = this.ships[i];
            let index = ship.locations.indexOf(guess);
            if(index >= 0){
                ship.hits[index] = "hit";
                view.displayHit(guess);
                view.displayMessage("Попадание");
                if(this.isSunk(ship)) this.shipsSunk++;
                return true;
            }
        }
        view.displayMiss(guess);
        view.displayMessage("Промах");
        return false;
    },
    isSunk: function(ship){
        for(let i = 0; i < this.shipLength; i++){
            if(ship.hits[i] !== "hit"){
                return true;
            }
        }
        return false;
    },
    generateShipLocations: function() {
		var locations;
		for (var i = 0; i < this.numShips; i++) {
			do {
				locations = this.generateShip();
			} while (this.collision(locations));
			this.ships[i].locations = locations;
		}
		console.log("Ships array: ");
		console.log(this.ships);
	},

	generateShip: function() {
		var direction = Math.floor(Math.random() * 2);
		var row, col;

		if (direction === 1) { // horizontal
			row = Math.floor(Math.random() * this.boardSize);
			col = Math.floor(Math.random() * (this.boardSize - this.shipLength + 1));
		} else { // vertical
			row = Math.floor(Math.random() * (this.boardSize - this.shipLength + 1));
			col = Math.floor(Math.random() * this.boardSize);
		}

		var newShipLocations = [];
		for (var i = 0; i < this.shipLength; i++) {
			if (direction === 1) {
				newShipLocations.push(row + "" + (col + i));
			} else {
				newShipLocations.push((row + i) + "" + col);
			}
		}
		return newShipLocations;
	},

	collision: function(locations) {
		for (var i = 0; i < this.numShips; i++) {
			var ship = this.ships[i];
			for (var j = 0; j < locations.length; j++) {
				if (ship.locations.indexOf(locations[j]) >= 0) {
					return true;
				}
			}
		}
		return false;
	}
}

let controller = {
    guesses: 0,
    processGuess: function(guess){
        let location = parseGuess(guess);
        if(location) {
            this.guesses++;
            let hit = model.fire(location);
            if(hit && model.shipsSunk === model.shipLength){
                view.displayMessage("You sank all my battleships, in " + this.guesses + " guesses!");
            }
        }
    }
}

function parseGuess(guess){
    let alphabel = ["A", "B", "C", "D", "E", "F", "G"];
    if(guess === null || guess.length !== 2){
        alert("Ввели некоректный данные!");    
    } else {
        let firstChar = guess.charAt(0);
        let row = alphabel.indexOf(firstChar);
        let column = guess.charAt(1);

        if(isNaN(row) || isNaN(column)){
            alert("asdasd");
        } else if(
            row < 0 || row >= model.boardSize || 
            column < 0 || column >= model.boardSize
            ) {
                alert("asdasdadasdasdasd");
        } else {
            return row + column;
        }            
    }
    return null;
}

function handleFireButton() {
    let guessInput = document.getElementById("guessInput");
    let guess = guessInput.value;
    controller.processGuess(guess);
    guessInput.value = '';
}

function handleKeyPress(e) {
    let fireButton = document.getElementById("fierButton");
    if(e.keyCode === 13){
        fireButton.click();
        return false;
    }
}
window.onload = init;
function init() {
    // Fire! button onclick handler
	var fireButton = document.getElementById("fierButton");
	fireButton.onclick = handleFireButton;

	// handle "return" key press
	var guessInput = document.getElementById("guessInput");
    guessInput.onkeypress = handleKeyPress;
    
    model.generateShipLocations();
}