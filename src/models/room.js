import Mob from './mob';

class Room {
  static max = 11;

  constructor({ up = null, down = null, right = null, left = null, level = 1 } = {}) {
    this.grid = Array(Room.max).fill( Array(Room.max).fill(0) );
    this.ready = false;

    this.up = up;
    this.down = down;
    this.left = left;
    this.right = right;
    this.level = level;

    this.mobs = []
    this.current = true;
    this.generate();
  }


  generate() {
    if (!this.ready) {
      this.generateBorders()
      this.generateMobs()
      this.generateTraps()
      this.generateTreasures()

      this.ready = true;
    }
  }

  generateMobs() {
    let mobsMax = Math.ceil(Math.log(1));

    mobsMax = mobsMax === 0 ? 3 : mobsMax;
    mobsMax = mobsMax > 8 ? 8 : mobsMax;

    console.log('mobsMax', mobsMax)
    for (let i = 0; i < mobsMax; i++) {
      const axis = ['x', 'y'][Math.floor(Math.random() * 2)]

      let x, y;
      if (axis === 'x') {
        y = [1, 2, 3, 4, 6, 7, 8, 9][Math.ceil(Math.random() * 7)]
        x = [1, 9][Math.floor(Math.random() * 2)]
      } else {
        x = [1, 2, 3, 4, 6, 7, 8, 9][Math.ceil(Math.random() * 7)]
        y = [1, 9][Math.floor(Math.random() * 2)]
      }

      const newMob = new Mob({ room: this, x, y, speed: 500, axis });
      console.log('newMob', newMob)
      this.mobs.push(newMob)
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

  isMob(x, y) {
    return this.mobs.some(mob => {
      return mob.x === x && mob.y === y;
    })
  }

  isWall(x, y) {
    return this.grid[y][x] === 1;
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

  getRandomPosition() {
    return [parseInt(Math.random() * Room.max), parseInt(Math.random() * Room.max)]
  }

}

export default Room;