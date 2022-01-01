import Mob from "../models/mob";

export default function generateMobs(room) {
  const mobs = []
  let mobsMax = Math.ceil(Math.log(1));

  mobsMax = mobsMax === 0 ? 3 : mobsMax;
  mobsMax = mobsMax > 8 ? 8 : mobsMax;

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

    const newMob = new Mob({ room: room, x, y, speed: 500, axis });
    mobs.push(newMob)
  }

  return mobs;
}