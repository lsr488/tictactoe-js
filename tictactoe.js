// TIC TAC TOE

var winCond = 
[	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6]
	];
var game = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
var gameTurn = 0;
var player1Token = "X";
var player2Token = "O";
var sqs = document.querySelectorAll(".square span");
var sqContainer = document.querySelectorAll(".square");
var display = document.querySelector(".display p");

display.textContent = "Player 1, make your selection.";

sqContainer.forEach(sq => {
	sq.addEventListener("click", clickOnSquare, true);
});

// TODO: figure out how to grab the div with the span on top of it
function clickOnSquare() {
	var userInputNum = event.currentTarget.id;
	// insert "X" into the correct place in the game array
		// but only if that place is empty
	if(game[userInputNum] == " ") {
		if(gameTurn % 2 === 0) {
			takeTurn(userInputNum, player1Token, 2);
		} else {
			takeTurn(userInputNum, player2Token, 1);				
		}
		gameTurn++;
		this.removeEventListener("click", clickOnSquare, true);
	} else {
		display.textContent = "That's not a valid move.";
	}
}

function takeTurn(userInputNum, playerToken, nextPlayerNum) {
	game.splice(userInputNum, 1, playerToken);
	display.textContent = `It's Player ${nextPlayerNum}'s turn.`;
	sqs[userInputNum].classList.remove("num");
	updateSquare(userInputNum);

	var winner = whoIsTheWinner();
	if(winner || isCatsGame(winner)) {
		displayWinner(winner);
		endGame();
	}	
};

// update the span by using the game index
function updateSquare(userInputNum) {
	sqs[userInputNum].textContent = game[userInputNum];
}

function endGame() {
	sqContainer.forEach(sq => {
		sq.removeEventListener("click", clickOnSquare, true);
	});	
}

function isGameOver(){
	return !game.includes(" ");
}

function whoIsTheWinner() {
	var winner = undefined;

	for(var i = 0; i < winCond.length; i++) {
		if(!winner) {
			var set = winCond[i];
			if( (game[set[0]] == "X") && (game[set[1]] == "X") && (game[set[2]] == "X")) {
				winner = player1Token;
			}	else if( (game[set[0]] == "O") && (game[set[1]] == "O") && (game[set[2]] == "O")) {
				winner = player2Token;
			}
		}
	}

	return winner;
}

function isCatsGame(winner) {
	return (!winner && isGameOver());
}

function displayWinner(winner) {
	if(isCatsGame(winner)) {
		display.textContent = "It's a Cat's Game!";
	} else if(winner) {
		display.innerHTML = "The winner is " + winner + "!";
	}
}