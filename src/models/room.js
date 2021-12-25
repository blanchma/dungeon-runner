class Room {
  static max = 10;

  constructor({ up = null, down = null, right = null, left = null } = {}) {
    this.grid = Array(Room.max).fill([]);
    this.ready = false;

    this.up = up;
    this.down = down;
    this.left = left;
    this.right = right;

    this.generate();
  }

  isWall(x, y) {
    return this.grid[x][y] === 1;
  }

  //this.grid = [  [1, 1, 1, 1, 1],
                // [0, 0, 0, 0, 0],
                // [0, 0, 0, 0, 0],
                // [0, 0, 0, 0, 0],
                // [1, 1, 1, 1, 1] ];

  generate() {
    if (!this.ready) {
      // for (const rows of this.grid) {
      //   console.log('rows', rows)
      //   if (this.getRandom > 5) {
      //     rows.splice(0,5,1,1,1,1,1)
      //   } else {
      //     rows.splice(0,5,0,0,0,0,0)
      //   }
      // }

      this.generateBorders()
      console.log('my grid', this.grid)
      this.generateTraps()
      this.generateTreasures()
    }
  }

  generateBorders() {
    const max = Room.max;
    let tempBorder;

    if (this.up) {
      this.topBorder = this.up.bottomBorder;
    } else {
      tempBorder = Array(max).fill(1);
      if (this.getRandom() > 3) {
        console.log('topBorder has door')
        tempBorder[max / 2] = 0;
      }
      this.topBorder = tempBorder;
    }

    if (this.down) {
      this.bottomBorder = this.down.topBorder;
    } else {
      tempBorder = Array(max).fill(1);
      if (this.getRandom() > 3) {
        console.log('bottomBorder has door')
        tempBorder[max / 2] = 0;
      }
      this.bottomBorder = tempBorder;
    }

    if (this.left) {
      this.leftBorder = this.left.rightBorder;
    } else {
      tempBorder = Array(max).fill(1);
      if (this.getRandom() > 3) {
        tempBorder[max / 2] = 0;
        console.log('leftBorder has door')
      }
      this.leftBorder = tempBorder;
    }

    if (this.right) {
      this.rightBorder = this.right.leftBorder;
    } else {
      tempBorder = Array(max).fill(1);
      if (this.getRandom() > 3) {
        tempBorder[max / 2] = 0;
        console.log('righBorder has door')
      }
      this.rightBorder = tempBorder;
    }

    console.log('borders', this.topBorder, this.bottomBorder, this.leftBorder, this.rightBorder);

    this.grid[0] = this.topBorder;
    this.grid[max - 1] = this.bottomBorder;

    for (let i = 0; i < max; i++) {
      this.grid[i][0] = this.leftBorder[i];
      this.grid[i][max - 1] = this.rightBorder[i];
    }
  }

  generateTraps() {

  }


  generateTreasures() {

  }

  isBorder(x, y) {
    return this.isLimit(x, y) && !(this.isWall(x, y));
  }

  isLimit(x, y) {
    return (x >= Room.max || y >= Room.max || x < 0 || y < 0) || this.isWall(x, y);
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