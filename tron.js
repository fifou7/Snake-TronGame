const canvas = document.querySelector("#game");
const context = canvas.getContext("2d");

// Object to handle the grid and drawing
class Arena {
  constructor(tileSize, gridSize) {
    this.tileSize = tileSize;
    this.gridSize = gridSize;
    this.grid = [];
  }

  // Fills the grid with tiles
  fillGrid(updateCanvas, createBorderWalls = true) {
    let xPos, yPos;

    for (xPos = 0; xPos < this.gridSize; xPos++) {
      for (yPos = 0; yPos < this.gridSize; yPos++) {
        if (createBorderWalls && this.isBorder(xPos, yPos)) {
          this.grid.push(new Tile(xPos, yPos, "Wall", "rgb(0 0 0)"));
        } else {
          this.grid.push(new Tile(xPos, yPos, "Empty", "rgb(222 222 222)"));
        }
      }
    }

    if (updateCanvas) {
      this.updateCanvasSize();
    }
  }

  // Update the canvas size to fit the current grid
  updateCanvasSize() {
    canvas.width = this.gridSize * this.tileSize;
    canvas.height = this.gridSize * this.tileSize;
  }

  // Check if a pos is on the border of the grid
  isBorder(x, y) {
    if (
      x == 0 ||
      y == 0 ||
      x == this.gridSize - 1 ||
      y == this.gridSize - 1 ||
      (x == this.gridSize - 1 && y == this.gridSize - 1)
    ) {
      return true;
    }

    return false;
  }

  // Draw the whole game or an array of tiles to update
  drawArena(tilesArray = this.grid) {
    let currentTile = 0;
    for (currentTile; currentTile < tilesArray.length; currentTile++) {
      switch (tilesArray[currentTile].content) {
        case "Wall":
          context.fillStyle = tilesArray[currentTile].color;

          context.fillRect(
            tilesArray[currentTile].x * this.tileSize,
            tilesArray[currentTile].y * this.tileSize,
            this.tileSize,
            this.tileSize
          );
          break;

        case "Empty":
          context.fillStyle = tilesArray[currentTile].color;

          context.fillRect(
            tilesArray[currentTile].x * this.tileSize,
            tilesArray[currentTile].y * this.tileSize,
            this.tileSize,
            this.tileSize
          );
          break;

        case "Player":
          context.fillStyle = tilesArray[currentTile].linkedPlayer.color;
          context.fillRect(
            tilesArray[currentTile].x * this.tileSize,
            tilesArray[currentTile].y * this.tileSize,
            this.tileSize,
            this.tileSize
          );
      }

      context.strokeStyle = "black";
      context.rect(
        tilesArray[currentTile].x * this.tileSize,
        tilesArray[currentTile].y * this.tileSize,
        this.tileSize,
        this.tileSize
      );
      context.stroke();
    }
  }

  // Get moves next to a given position if they are inside the grid
  getLegalMoves(x, y, returnCollision = true) {
    let possibleMoves = [
      [x + 1, y],
      [x - 1, y],
      [x, y + 1],
      [x, y - 1],
    ];

    let currentMove = 0;
    let legalMoves = [];
    let isCollision = false;

    for (currentMove; currentMove < possibleMoves.length; currentMove++) {
      if (
        this.isValidMove(
          possibleMoves[currentMove][0],
          possibleMoves[currentMove][1]
        )
      ) {
        isCollision = this.checkCollision(
          possibleMoves[currentMove][0],
          possibleMoves[currentMove][1],
          true
        );
        if (returnCollision || (!isCollision && !returnCollision)) {
          legalMoves.push({
            xMove: possibleMoves[currentMove][0],
            yMove: possibleMoves[currentMove][1],
            collision: isCollision,
          });
        }
      }
    }

    return legalMoves;
  }

  // Get a line from a pos and a dir, returning the max tile and line length
  getLineSize(x, y, dir) {
    let lineSize = 0;
    let currentX = x;
    let currentY = y;

    currentX += dir[0];
    currentY += dir[1];
    lineSize++;

    while (
      this.isValidMove(currentX, currentY) &&
      this.checkCollision(currentX, currentY) == false
    ) {
      currentX += dir[0];
      currentY += dir[1];
      lineSize++;
    }

    return {
      maxX: currentX,
      maxY: currentY,
      lineSize: lineSize,
    };
  }

  // Takes two pos and returns a direction that can be used as a set of [x, y] modifiers
  getMoveDirection(x, y, xMove, yMove) {
    return [Math.sign(xMove - x), Math.sign(yMove - y)];
  }

  // Get how many tiles are available after a movement
  getAvailableTilesNumber(x, y) {
    let totalMoves = [];
    let newMoves = this.getLegalMoves(x, y, false);
    let isNewMove = true;
    let foundMoves = [];
    let currentMove = 0;
    let currentTotalMove = 0;

    while (newMoves.length > 0) {
      foundMoves = this.getLegalMoves(
        newMoves[0].xMove,
        newMoves[0].yMove,
        false
      );
      newMoves.splice(0, 1);

      // Check if found moves are new
      for (currentMove = 0; currentMove < foundMoves.length; currentMove++) {
        isNewMove = true;
        for (
          currentTotalMove = 0;
          currentTotalMove < totalMoves.length;
          currentTotalMove++
        ) {
          if (
            foundMoves[currentMove].xMove ==
              totalMoves[currentTotalMove].xMove &&
            foundMoves[currentMove].yMove == totalMoves[currentTotalMove].yMove
          ) {
            isNewMove = false;
            break;
          }
        }
        if (isNewMove) {
          totalMoves.push(foundMoves[currentMove]);
          newMoves.push(foundMoves[currentMove]);
        }
      }
    }

    return totalMoves.length;
  }

  // Check if a set of coordinate is valid to play (a collision is valid, but being out of the grid isnt for example)
  isValidMove(x, y) {
    if (
      x * this.gridSize + y >= this.gridSize * this.gridSize ||
      x * this.gridSize + y < 0
    ) {
      return false;
    }
    return true;
  }

  // Check if the current tile will result in a collision with a wall or a player
  checkCollision(x, y, getCollisionType = false) {
    if (
      this.grid[x * this.gridSize + y].content == "Wall" ||
      this.grid[x * this.gridSize + y].content == "Player"
    ) {
      if (getCollisionType) {
        return this.grid[x * this.gridSize + y].content;
      }

      return true;
    }

    return false;
  }
}

class Tile {
  // Eligible content types are: Empty, Wall, Player
  // Colors format should be a string color code, ex: "rbg(xxx, xxx, xxx)"
  constructor(x, y, content, color) {
    this.x = x;
    this.y = y;
    this.content = content;
    this.color = color;
    this.linkedPlayer = undefined;
  }
}

class Bike {
  constructor(x, y, boost, maxBoost, color, wallColor) {
    this.x = x;
    this.y = y;
    this.boost = boost;
    this.maxBoost = maxBoost;
    this.color = color;
    this.wallColor = wallColor;
  }

  // Initial placement for the cycles, used at the start of a game
  placeBike(x, y, arena) {
    arena.grid[this.x * arena.gridSize + this.y].content = "Player";
    arena.grid[this.x * arena.gridSize + this.y].linkedPlayer = this;
    arena.grid[this.x * arena.gridSize + this.y].color = this.wallColor;
  }

  // Only approved way to move your cycle during a turn
  moveBike(x, y, arena, game) {
    if (!arena.isValidMove(x, y)) {
      game.endGame(true);
      return;
    }

    let isCollision = arena.checkCollision(x, y);

    // Stop the game if a collision is detected
    if (isCollision) {
      game.endGame();
      return;
    }

    arena.grid[this.x * arena.gridSize + this.y].content = "Wall";
    arena.grid[x * arena.gridSize + y].content = "Player";
    arena.grid[x * arena.gridSize + y].linkedPlayer = this;
    arena.grid[x * arena.gridSize + y].color = this.wallColor;
    arena.drawArena([
      arena.grid[this.x * arena.gridSize + this.y],
      arena.grid[x * arena.gridSize + y],
    ]);

    this.x = x;
    this.y = y;

    game.changePlayer();
  }
}

class Game {
  constructor(player1, player2, currentPlayer) {
    this.player1 = player1;
    this.player2 = player2;
    this.currentPlayer = currentPlayer;
    this.winner = undefined;
    this.turn = 1;
    this.isOver = false;
  }

  // Switch the player currently playing
  changePlayer() {
    if (this.currentPlayer == this.player1) {
      this.currentPlayer = this.player2;
    } else {
      this.currentPlayer = this.player1;
    }
    this.turn++;
  }

  // Get the player who isn't playing
  getOtherPlayer() {
    if (this.currentPlayer == this.player1) {
      return this.player2;
    } else {
      return this.player1;
    }
  }

  // End the game and show scores
  endGame(isCrash = false) {
    let winner = this.getOtherPlayer();
    console.log(winner.name + " has won !");
    console.log("It took " + this.turn + " turns to achieve victory");
    if (isCrash) {
      console.log(
        "Victory was obtained because" +
          currentPlayer.name +
          " crashed the game (ex: invalid move)"
      );
    }

    this.isOver = true;
  }
}

class Fifou {
  constructor(name, linkedBike) {
    this.name = name;
    this.linkedBike = linkedBike;
    this.redMatrix = [
      0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 3, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 2, 4, 4, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 5,
      5, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 6, 6, 2, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 7, 7, 2, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 2, 8, 8, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 2, 9, 9, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2,
      10, 10, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 11, 11, 2,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 12, 12, 2, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 12, 12, 2, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 2, 11, 11, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 2, 10, 10, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      2, 9, 9, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 8, 8, 2, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 7, 7, 2, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 6, 6, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 2, 5, 5, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      2, 4, 4, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 3, 2, 0,
      0, 0, 0, 0, 0, 0, 0,
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

class cortobot {
  constructor(name, linkedBike) {
    this.name = name;
    this.linkedBike = linkedBike;
    this.targetDir = [0, 0];
    this.matrix = [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 9, 9, 9,
      9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 0, 0, 9, 8, 8, 8, 8, 8, 8, 8, 8,
      8, 8, 8, 8, 8, 8, 8, 8, 9, 0, 0, 9, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7,
      7, 7, 7, 9, 0, 0, 9, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 9, 0,
      0, 9, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 9, 0, 0, 9, 4, 4, 4,
      4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 9, 0, 0, 9, 3, 3, 3, 3, 3, 3, 3, 3,
      3, 3, 3, 3, 3, 3, 3, 3, 9, 0, 0, 9, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
      2, 2, 2, 9, 0, 0, 9, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 9, 0,
      0, 9, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 9, 0, 0, 9, 2, 2, 2,
      2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 9, 0, 0, 9, 3, 3, 3, 3, 3, 3, 3, 3,
      3, 3, 3, 3, 3, 3, 3, 3, 9, 0, 0, 9, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,
      4, 4, 4, 9, 0, 0, 9, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 9, 0,
      0, 9, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 9, 0, 0, 9, 7, 7, 7,
      7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 9, 0, 0, 9, 8, 8, 8, 8, 8, 8, 8, 8,
      8, 8, 8, 8, 8, 8, 8, 8, 9, 0, 0, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9,
      9, 9, 9, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ];
  }

  getMove(arena, game) {
    let legalMoves = arena.getLegalMoves(this.linkedBike.x, this.linkedBike.y);
    let safeMoves = [];
    let bestMoves = [];
    let randomMove = [];
    let currentMove = 0;

    let points = 0;
    let bestPoints = -1;

    for (currentMove; currentMove < legalMoves.length; currentMove++) {
      if (legalMoves[currentMove].collision == false) {
        safeMoves.push(legalMoves[currentMove]);
      }
    }

    for (currentMove = 0; currentMove < safeMoves.length; currentMove++) {
      points =
        arena.getAvailableTilesNumber(
          safeMoves[currentMove].xMove,
          safeMoves[currentMove].yMove
        ) +
        this.matrix[
          safeMoves[currentMove].yMove * arena.gridSize +
            safeMoves[currentMove].xMove
        ];

      if (points > bestPoints) {
        bestPoints = points;
        bestMoves = [safeMoves[currentMove]];
      } else if (points == bestPoints) {
        bestMoves.push(safeMoves[currentMove]);
      }
    }

    if (bestMoves.length == 0) {
      randomMove = legalMoves[Math.floor(Math.random() * legalMoves.length)];
    } else {
      randomMove = bestMoves[Math.floor(Math.random() * bestMoves.length)];
    }

    return [randomMove.xMove, randomMove.yMove];
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

bot1 = new cortobot("cortobot", player1);
bot2 = new Fifou("Fifou", player2);

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
