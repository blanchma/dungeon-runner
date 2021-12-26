class Mob {
  constructor({  x, y, speed, axis, direction }) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.axis = axis;
    this.direction = direction;

    if (!this.direction) {
      this.direction = 1;
    }
  }

  copy() {
    return Object.assign({}, this)
  }

  static move(mob, room) {
    let { x, y, speed, axis, direction } = mob.copy();

    if (axis === 'x') {
      if (room.isBlock(x + direction, y)) {
        direction = -direction;
      }

      x = x + direction;

    } else {

      if (room.isBlock(x, y + direction) ) {
        direction = -direction;
      }
      y = y + direction;
    }

    return new Mob({ x, y, axis, speed, direction });
  }
}

export default Mob;