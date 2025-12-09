class Bot {
  constructor(name, linkedBike) {
    this.name = name;
    this.linkedBike = linkedBike;
    this.redMatrix = [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 100, 5, 5, 5, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 5, 5, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 5, 5, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 5, 5, 5, 5,
      5, 5, 5, 5, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0,
    ];
    this.blueMatrix = [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 5, 5, 5,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 5, 5, 5, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 5, 5, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 100, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0,
    ];
    this.activeMatrix = [];
  }

  // Put your code here
  // This should only return an array containing the choosen coordinates
  // Ex: [2, 1]

  getMove(arena, game) {
    let bestScore = 0;
    let bestMoves = [];

    console.log(this.linkedBike.x);
    console.log(this.linkedBike.y);
    console.log(
      arena.getLegalMoves(this.linkedBike.x, this.linkedBike.y, false)
    );

    let moves = arena.getLegalMoves(
      this.linkedBike.x,
      this.linkedBike.y,
      false
    );

    // Matrix

    if (game.turn <= 2) {
      if (this.linkedBike.x === 1 && this.linkedBike.y === 1) {
        this.activeMatrix = this.blueMatrix;
      } else {
        this.activeMatrix = this.redMatrix;
      }
    }

    //death
    if (moves.length === 0) {
      return [0, 0];
    }

    console.log(moves[0].xMove);
    console.log(moves[0].yMove);

    // only one move possible
    if (moves.length === 1) {
      return [moves[0].xMove, moves[0].yMove];
    }
    console.log(moves.length);

    // evaluation mouv
    moves.forEach((getLegalMoves) => {
      const newX = getLegalMoves.xMove;
      const newY = getLegalMoves.yMove;
      console.log(newX);
      console.log(newY);

      // scoring
      getLegalMoves.score =
        arena.getAvailableTilesNumber(newX, newY) +
        this.activeMatrix[newX + newY * arena.gridSize];

      console.log(arena.getAvailableTilesNumber(newX, newY));

      // bestScore = 0
      // Vérifier si bestScore < > == getLegalMoves.score
      // Si bestScore < score -> Je prends ce coup et bestScore devient score
      // Si bestScore == score -> J'ajoute le coup et je prendrais au hasard
      // Si bestScore > score -> osef

      if (bestScore < getLegalMoves.score) {
        bestScore = getLegalMoves.score;
        bestMoves = [getLegalMoves];
      } else if (bestScore == getLegalMoves.score) {
        bestMoves.push(getLegalMoves);
      }
    });
    const chosenMove = bestMoves[Math.floor(Math.random() * bestMoves.length)];

    return [chosenMove.xMove, chosenMove.yMove];
  }
}

class rouge {
  constructor(name, linkedBike) {
    this.name = name;
    this.linkedBike = linkedBike;
  }

  // Put your code here
  // This should only return an array containing the choosen coordinates
  // Ex: [2, 1]
  getMove() {
    console.log(this.linkedBike.x);
    console.log(this.linkedBike.y);
    return [this.linkedBike.x - 1, this.linkedBike.y];
  }
}

// Game Initialisation
currentArena = new Arena(30, 20);
currentArena.fillGrid(true);

player1 = new Bike(1, 1, 3, 3, "rgb(15, 28, 125)", "rgb(29, 10, 82)");
player2 = new Bike(
  currentArena.gridSize - 2,
  currentArena.gridSize - 2,
  3,
  3,
  "rgb(161, 18, 32)",
  "rgb(110, 19, 44)"
);

player1.placeBike(player1.x, player1.y, currentArena);
player2.placeBike(player2.x, player2.y, currentArena);

bot1 = new Bot("Blue", player1);
bot2 = new Bot("Red", player2);

currentArena.drawArena();

// Game Loop
currentGame = new Game(bot1, bot2, bot1);

function gameLoop() {
  if (!currentGame.isOver) {
    let moveCoordinates = [];
    moveCoordinates = currentGame.currentPlayer.getMove(
      currentArena,
      currentGame
    );

    currentGame.currentPlayer.linkedBike.moveBike(
      moveCoordinates[0],
      moveCoordinates[1],
      currentArena,
      currentGame
    );
  }
  window.requestAnimationFrame(gameLoop);
}

gameLoop();
