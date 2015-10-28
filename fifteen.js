/*
 * Darren Hou
 * JavaScript for the fifteen puzzle web page, starring the beast Galen Rupp.
 */

 "use strict";

(function() {

	var blank = [3, 3]; // location of blank square
	var movables = []; // all currently movable pieces

	window.onload = function() {
		setUp(); // create squares and set up appropriate constants
		getMovables(); // the squares that currently can be moved

		// assigns onclick functions to all puzzle pieces
		var clickables = document.querySelectorAll(".piece");
		for (var i = 0; i < clickables.length; i++) {
			var clickable = clickables[i];
			clickable.onclick = move;
		}

		document.getElementById("shufflebutton").onclick = shuffle;
	};

	// Creates and sets up the puzzle pieces appropiately at the start of the game
	function setUp() {
		for (var i = 0; i < 4; i++) {
			for (var j = 0; j < 4; j++) {
				var piece = document.createElement("div");

				if (!(i == 3 && j == 3)) { // leave one square blank
					// appropriately sets up each piece
					piece.style.backgroundPosition = j * -100 + "px" + " " + i * -100 + "px";
					piece.className = "piece";
					piece.id = j + " " + i; // set position identifier

					piece.textContent = (i * 4) + (j + 1);

					piece.style.left = j * 100 + "px";
					piece.style.top = i * 100 + "px";

					document.getElementById("puzzlearea").appendChild(piece);
				}
			}
		}
	}

	// Passes a string id and boolean shuffling, indicating a specific id to move and whether
	// the move is occurring during shuffling; moves the clicked piece to the blank square, 
	// and approriately updates where blank is and the new movable pieces
	function move(id, shuffling) {
		var element;
		if (shuffling === true) {
			element = document.getElementById(id);
		} else {
			element = document.getElementById(this.id);
		}
		if (isMovable(element)) {
			var tempLeft = parseInt(element.style.left);
			var tempTop = parseInt(element.style.top);

			// update element position
			element.style.left = blank[0] * 100 + "px";
			element.style.top = blank[1] * 100 + "px";

			// update element id
			element.id = blank[0] + " " + blank[1];

			// update blank position
			blank[0] = (tempLeft / 100);
			blank[1] = (tempTop / 100);

			getMovables();
		}
	}

	// Returns true if the passed object exists within the movables array, false otherwise
	function isMovable(element) {
		for (var i = 0; i < movables.length; i++) {
			if (element == movables[i]) {
				return true;
			}
		}
		return false;
	}

	// Returns the puzzle squares directly adjacent to the blank space in an array
	function getMovables() {
		var options = [];
		var blankLeft = blank[0]; // left coordinate of current blank square
		var blankTop = blank[1]; // top coordinate of current blank square

		// check position of square--being on an edge signifies no adjacent square
		// on that side--otherwise, add to array
		if (blankTop > 0) {
			options.push(document.getElementById((blankLeft) + " " + 
				(blankTop - 1)));
		}
		if (blankLeft < 3) {
			options.push(document.getElementById((blankLeft + 1) + " " + 
				(blankTop)));
		}
		if (blankTop < 3) {
			options.push(document.getElementById((blankLeft) + " " + 
				(blankTop + 1)));
		}
		if (blankLeft > 0) {
			options.push(document.getElementById((blankLeft - 1) + " " + 
				(blankTop)));
		}

		movables = options;
		highlight();
	}

	// Changes all movable pieces to indicate through class that they are movable
	function highlight() {
		var allPieces = document.querySelectorAll(".piece");
		for (var i = 0; i < allPieces.length; i++) {
			if (isMovable(allPieces[i])) {
				allPieces[i].className += " movable";
			} else {
				allPieces[i].className = "piece";
			}
		}
	}

	// Randomly shuffles tiles into a new unsolved but solvable state
	function shuffle() {
		for (var i = 0; i < 1000; i++) {
			var random = parseInt(Math.random() * movables.length);
			move(movables[random].id, true);
			getMovables();
		}
	}
})();