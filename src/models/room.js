import generateKey from '../generators/generateKey';
import generateMobs from '../generators/generateMobs';
import generateTreasures from '../generators/generateTreasure';

class Room {
  static max = 11;

  constructor({ mobs, treasure, up = null, down = null, right = null, left = null, level = 1, ready = false, grid, topBorder, bottomBorder, leftBorder, rightBorder, key } = {}) {
    this.level = level;
    this.grid = grid || Array(Room.max).fill(Array(Room.max).fill(0));

    this.topBorder = topBorder;
    this.bottomBorder = bottomBorder;
    this.leftBorder = leftBorder;
    this.rightBorder = rightBorder;

    this.up = up;
    this.down = down;
    this.left = left;
    this.right = right;

    this.mobs = mobs
    this.treasure = treasure;
    this.ready = ready;
    this.key = key;

    this.generate();
  }

  generate() {
    if (!this.ready) {
      this.generateBorders()
      this.generateMobs()
      this.generateTreasure()
      this.generateKey()
      this.ready = true;
    }
  }

  generateMobs() {
    this.mobs = generateMobs(this)
  }

  generateTreasure() {
    this.treasure = generateTreasures(this)
  }

  generateKey() {
    this.key = generateKey(this)
  }

  generateBorders() {
    const max = Room.max, half = 5
    let doors = 1, tempGrid = JSON.parse(JSON.stringify(this.grid));

    this.topBorder = this.up ? this.up.bottomBorder : Array(max).fill(1);
    this.bottomBorder = this.down ? this.down.topBorder : Array(max).fill(1);
    this.leftBorder = this.left ? this.left.rightBorder : Array(max).fill(1);
    this.rightBorder = this.right ? this.right.leftBorder : Array(max).fill(1);

    const borders = [this.topBorder,
    this.bottomBorder]


    while (doors < 2) {
      const randomBorder = Math.floor(Math.random() * 2)
      const border = borders[randomBorder];
      if (border.indexOf(0) < 0) {
        border[half] = 0
        doors += 1
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

  isWall(x, y) {
    return this.grid[y][x] === 1;
  }

  isHorizontalWall(x, y) {
    return this.isWall(x, y) && (y === 0 || y === Room.max -1)
  }

  isVerticalWall(x, y) {
    return this.isWall(x,y) && (x === 0 || x === Room.max -1)
  }

  isLeftWall(x, y) {
    return this.isWall(x,y) && x === 0
  }

  isRightWall(x, y) {
    return this.isWall(x,y) &&  x === Room.max -1
  }

  isTopCorner(x, y) {
    return (x === 0 && y === 0) || (x === 10 && y === 0)
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
}

export default Room;