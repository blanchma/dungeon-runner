import generateKey from '../generators/generateKey';
import generateMobs from '../generators/generateMobs';
import generateTreasures from '../generators/generateTreasure';

class Room {
  static max = 11;

  constructor({ mobs, treasure, up = null, down = null, right = null, left = null, level = 1, ready = false, grid, topBorder, bottomBorder, leftBorder, rightBorder, door, key } = {}) {
    this.level = level;
    this.grid = grid || Array(Room.max).fill(Array(Room.max).fill(0));

    this.topBorder = topBorder;
    this.bottomBorder = bottomBorder;
    this.leftBorder = leftBorder;
    this.rightBorder = rightBorder;

    if (up) {
      this.up = up
      up.down = this;
    }

    if (down) {
      this.down = down;
      down.up = this;
    }

    this.left = left;
    this.right = right;

    this.mobs = mobs
    this.treasure = treasure;
    this.ready = ready;
    this.key = key;
    this.door = door;

    this.generate();
  }

  generate() {
    if (!this.ready) {
      console.log('new Room', this.level)
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
    let tempGrid = JSON.parse(JSON.stringify(this.grid));

    if (this.up) {
      this.topBorder = this.up.bottomBorder
      this.topBorder[half] = 0
    } else {
      this.topBorder = Array(max).fill(1);
    }

    if (this.down) {
      this.bottomBorder = this.down.topBorder
      this.bottomBorder[half] = 0
    } else {
      this.bottomBorder = Array(max).fill(1);
    }

    this.leftBorder = Array(max).fill(1);
    this.rightBorder = Array(max).fill(1);

    const borders = [this.topBorder,
    this.bottomBorder]

    while (!this.door) {
      const randomBorder = Math.floor(Math.random() * 2)
      const border = borders[randomBorder];

      if (border.indexOf(0) < 0) {
        border[half] = 2
        this.door = border === this.topBorder ? { x: half, y: 0 } : { x: half, y: Room.max - 1 }
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

  isExit(x, y) {
    return (this.isDoor(x, y) && !this.key) ||
      this.isOpen(x, y) || this.isOutside(x, y);
  }

  isDoor(x, y) {
    return this.isLimit(x,y) && this.grid[y][x] === 2
  }

  isOpen(x, y) {
    return this.isLimit(x,y) && this.grid[y][x] === 0;
  }

  isOutside(x, y) {
    return (x > (Room.max - 1) || y > (Room.max - 1) || x < 0 || y < 0);
  }

  isLimit(x, y) {
    return (x === (Room.max - 1) || y === (Room.max - 1) || x === 0 || y === 0);
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