class Room {
  static max = 11;

  constructor({ up = null, down = null, right = null, left = null } = {}) {
    this.grid = Array(Room.max).fill( Array(Room.max).fill(0) );
    this.ready = false;

    this.up = up;
    this.down = down;
    this.left = left;
    this.right = right;

    this.generate();
  }

  isWall(x, y) {
    return this.grid[y][x] === 1;
  }

  //this.grid = [  [1, 1, 1, 1, 1],
                // [0, 0, 0, 0, 0],
                // [0, 0, 0, 0, 0],
                // [0, 0, 0, 0, 0],
                // [1, 1, 1, 1, 1] ];

  generate() {
    if (!this.ready) {
      this.generateBorders()
      this.generateTraps()
      this.generateTreasures()
      console.log('grid', this.grid);
    }
  }

  generateBorders() {
    const max = Room.max, half = 5
    let doors = 0, tempGrid = JSON.parse(JSON.stringify(this.grid));

    this.topBorder = this.up ? this.up.bottomBorder : Array(max).fill(1);
    this.bottomBorder = this.down ? this.down.topBorder : Array(max).fill(1);
    this.leftBorder = this.left ? this.left.rightBorder : Array(max).fill(1);
    this.rightBorder = this.right ? this.right.leftBorder : Array(max).fill(1);

    const borders = [this.topBorder,
    this.bottomBorder,
    this.leftBorder,
    this.rightBorder]

    while (doors < 2) {
      for (const border of borders) {
        if (border.indexOf(0) > -1) {
          doors += 1
        } else if (this.getRandom() >= 4) {
          border[half] = 0
          doors += 1
        }
      }
    }

    tempGrid[0] = this.topBorder;
    tempGrid[max - 1] = this.bottomBorder;

    let i = 0

    tempGrid.forEach( (row) => {
      row[0] = this.leftBorder[i];
      row[max - 1] = this.rightBorder[i];
      tempGrid[i] = row;
      i += 1;
    })

    this.grid = tempGrid;

  }

  generateTraps() {

  }


  generateTreasures() {

  }

  isBorder(x, y) {
    return this.isLimit(x, y); //&& !(this.isWall(x, y));
  }

  isLimit(x, y) {
    return (x >= Room.max || y >= Room.max || x < 0 || y < 0);
  }

  isBlock(x, y) {
    return this.isLimit(x,y) || this.isWall(x, y);
  }

  //wrong
  isCorner(x, y) {
    return (x === 0 && y === x + 5) || (y === 0 && x === y + 5)
  }

  getRandom() {
      return parseInt(Math.random() * 10)
  }

}

export default Room;