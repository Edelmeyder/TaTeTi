let currentPlayer = "X";
let turn;
let tiles;
const winScenarios = [
	[0, 1, 2], // 0
	[3, 4, 5], // 1
	[6, 7, 8], // 2
	[0, 3, 6], // 3
	[1, 4, 7], // 4
	[2, 5, 8], // 5
	[0, 4, 8], // 6
	[2, 4, 6], // 7
];

window.addEventListener("DOMContentLoaded", () => {
	tiles = Array.from(document.querySelectorAll(".tile"));
	for (const tile of tiles) {
		tile.onclick = press;
	}
	document.getElementById("reset").onclick = reset;
	turn = document.getElementById("X");
});

function press() {
	if (this.innerHTML === "") {
		// if is a valid tile
		this.id = currentPlayer;
		this.innerHTML = currentPlayer; // writes the tile
		// and checks for win
		if (!checkWin()) {
			// if game is not over change the turn
			currentPlayer = currentPlayer === "X" ? "O" : "X";
			turn.id = currentPlayer;
			turn.innerHTML = currentPlayer;
		}
	}
}

function checkWin() {
	for (let i = 0; i < 8; i++) {
		// checks if there is a win
		// also finds which win it is, to draw the line
		if (
			tiles[winScenarios[i][0]].innerHTML === currentPlayer &&
			tiles[winScenarios[i][1]].innerHTML === currentPlayer &&
			tiles[winScenarios[i][2]].innerHTML === currentPlayer
		) {
			for (const tile of tiles) {
				tile.onclick = null;
			}
			document.getElementById(
				"winLine"
			).innerHTML = `<img src="img/${i}.png" />`;
			document.getElementById("winLine").style.display = "block";
			return true;
		}
	}
	return false;
}

function reset() {
	for (const tile of tiles) {
		tile.onclick = press;
		tile.innerHTML = "";
	}
	currentPlayer = "X";
	document.getElementById("winLine").style.display = "none";
	turn.id = "X";
	turn.innerHTML = "X";
}
