class Fifou {
  constructor(name, linkedBike) {
    this.name = name;
    this.linkedBike = linkedBike;
    this.redMatrix = [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 15, 15, 15,
      15, 20, 20, 25, 30, 30, 30, 30, 35, 35, 40, 40, 45, 45, 50, 0, 0, 15, 20,
      20, 20, 25, 25, 30, 35, 35, 35, 35, 40, 40, 45, 45, 50, 50, 55, 0, 0, 15,
      20, 25, 25, 30, 30, 35, 40, 40, 40, 40, 45, 45, 50, 50, 55, 55, 60, 0, 0,
      15, 20, 25, 30, 35, 35, 40, 45, 45, 45, 45, 50, 50, 55, 55, 60, 60, 65, 0,
      0, 20, 25, 30, 35, 40, 40, 45, 50, 50, 50, 50, 55, 55, 60, 60, 65, 65, 70,
      0, 0, 20, 25, 30, 35, 40, 45, 50, 55, 55, 55, 55, 60, 60, 65, 65, 70, 70,
      75, 0, 0, 25, 30, 35, 40, 45, 50, 55, 60, 60, 60, 60, 65, 65, 70, 70, 75,
      75, 80, 0, 0, 30, 35, 40, 45, 50, 55, 60, 65, 65, 65, 65, 70, 70, 75, 75,
      80, 80, 85, 0, 0, 30, 35, 40, 45, 50, 55, 60, 65, 70, 70, 65, 70, 70, 75,
      75, 80, 80, 85, 0, 0, 30, 35, 40, 45, 50, 55, 60, 65, 70, 70, 65, 70, 70,
      75, 75, 80, 80, 85, 0, 0, 30, 35, 40, 45, 50, 55, 60, 65, 65, 65, 65, 70,
      70, 75, 75, 80, 80, 85, 0, 0, 25, 30, 35, 40, 45, 50, 55, 60, 60, 60, 60,
      65, 65, 70, 70, 75, 75, 80, 0, 0, 20, 25, 30, 35, 40, 45, 50, 55, 55, 55,
      55, 60, 60, 65, 65, 70, 70, 75, 0, 0, 20, 25, 30, 35, 40, 40, 45, 50, 50,
      50, 50, 55, 55, 60, 60, 65, 65, 70, 0, 0, 15, 20, 25, 30, 35, 35, 40, 45,
      45, 45, 45, 50, 50, 55, 55, 60, 60, 65, 0, 0, 15, 20, 25, 25, 30, 30, 35,
      40, 40, 40, 40, 45, 45, 50, 50, 55, 55, 60, 0, 0, 15, 20, 20, 20, 25, 25,
      30, 35, 35, 35, 35, 40, 40, 45, 45, 50, 50, 55, 0, 0, 15, 15, 15, 15, 20,
      20, 25, 30, 30, 30, 30, 35, 35, 40, 40, 45, 45, 50, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ];
    this.blueMatrix = [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 5, 5, 5,
      5, 5, 5, 8, 8, 8, 8, 8, 5, 5, 5, 5, 5, 5, 0, 0, 5, 10, 10, 10, 10, 10, 12,
      15, 15, 15, 15, 12, 10, 10, 10, 10, 10, 5, 0, 0, 5, 10, 15, 15, 15, 18,
      20, 22, 22, 22, 22, 20, 18, 15, 15, 15, 10, 5, 0, 0, 5, 10, 15, 20, 22,
      25, 28, 30, 30, 30, 30, 28, 25, 22, 20, 15, 10, 5, 0, 0, 5, 10, 15, 22,
      25, 30, 33, 35, 35, 35, 35, 33, 30, 25, 22, 15, 10, 5, 0, 0, 5, 10, 18,
      25, 30, 35, 38, 40, 40, 40, 40, 38, 35, 30, 25, 18, 10, 5, 0, 0, 5, 12,
      20, 28, 33, 38, 42, 45, 45, 45, 45, 42, 38, 33, 28, 20, 12, 5, 0, 0, 8,
      15, 22, 30, 35, 40, 45, 48, 50, 50, 48, 45, 40, 35, 30, 22, 15, 8, 0, 0,
      8, 15, 22, 30, 35, 40, 45, 50, 55, 55, 50, 45, 40, 35, 30, 22, 15, 8, 0,
      0, 8, 15, 22, 30, 35, 40, 45, 50, 55, 55, 50, 45, 40, 35, 30, 22, 15, 8,
      0, 0, 8, 15, 22, 30, 35, 40, 45, 48, 50, 50, 48, 45, 40, 35, 30, 22, 15,
      8, 0, 0, 5, 12, 20, 28, 33, 38, 42, 45, 45, 45, 45, 42, 38, 33, 28, 20,
      12, 5, 0, 0, 5, 10, 18, 25, 30, 35, 38, 40, 40, 40, 40, 38, 35, 30, 25,
      18, 10, 5, 0, 0, 5, 10, 15, 22, 25, 30, 33, 35, 35, 35, 35, 33, 30, 25,
      22, 15, 10, 5, 0, 0, 5, 10, 15, 20, 22, 25, 28, 30, 30, 30, 30, 28, 25,
      22, 20, 15, 10, 5, 0, 0, 5, 10, 15, 15, 15, 18, 20, 22, 22, 22, 22, 20,
      18, 15, 15, 15, 10, 5, 0, 0, 5, 10, 10, 10, 10, 10, 12, 15, 15, 15, 15,
      12, 10, 10, 10, 10, 10, 5, 0, 0, 5, 5, 5, 5, 5, 5, 5, 8, 8, 8, 8, 8, 5, 5,
      5, 5, 5, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ];
    this.activeMatrix = [];
  }

  // Put your code here
  // This should only return an array containing the choosen coordinates
  // Ex: [2, 1]

  getMove(arena, game) {
    let bestScore = 0;
    let bestMoves = [];

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

    // only one move possible
    if (moves.length === 1) {
      return [moves[0].xMove, moves[0].yMove];
    }

    // evaluation mouv
    moves.forEach((getLegalMoves) => {
      const newX = getLegalMoves.xMove;
      const newY = getLegalMoves.yMove;

      // scoring
      getLegalMoves.score =
        arena.getAvailableTilesNumber(newX, newY) +
        this.activeMatrix[newX + newY * arena.gridSize];

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
