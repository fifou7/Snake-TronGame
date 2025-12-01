class Bot {
  constructor(name, linkedBike) {
    this.name = name;
    this.linkedBike = linkedBike;
  }

  // Put your code here
  // This should only return an array containing the choosen coordinates
  // Ex: [2, 1]

  getMove(arena) {
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
    let Matrix = [
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
    console.log(Matrix);

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
        Matrix[newX + newY * arena.gridSize];

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
