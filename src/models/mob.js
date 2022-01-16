class Mob {
  constructor({  x, y, speed, axis, direction, delay = 0 }) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.axis = axis;
    this.direction = direction;
    this.delay = delay

    if (!this.direction) {
      this.direction = 1;
    }
  }

  copy() {
    return Object.assign({}, this)
  }

  static move(mob, room) {
    let { x, y, speed, axis, direction, delay } = mob.copy();

    if (mob.delay < mob.speed) {
      return new Mob({ x, y, axis, speed, direction, delay: delay + 1 });
    }

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