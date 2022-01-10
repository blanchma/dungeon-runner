import { randomPosition } from "../helpers/randomPosition";
import Key from "../models/key";

export default function generateKey(room) {
  let x, y, validPosition;

  do  {
    [x, y] = randomPosition();
    validPosition = validatePosition(x, y, room);
  } while (!validPosition)

  console.log(`Key ${x} ${y}`)

  return new Key({ x, y });
}

function validatePosition(x, y, room) {
  const keyQuadrant = [Math.ceil(x / 3), Math.ceil(y / 3)]
  const treasureQuadrant = [Math.ceil(room.treasure.x / 3), Math.ceil(room.treasure.y / 3)]

  return keyQuadrant !== treasureQuadrant &&
    [x, y] !== [5, 5];
}