class Treasure {

  constructor({x, y, value = 5}) {
    this.x = x;
    this.y = y;
    this.value = value;
    this.number = Math.ceil(Math.random() * 3);
  }
}

export default Treasure;