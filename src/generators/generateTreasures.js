import { randomPosition } from "../helpers/randomPosition";
import Treasure from "../models/treasure";

export default function generateTreasures(room) {
  let x, y;

  do  {
    [x, y] = randomPosition();
  } while ([x, y] === [5, 5])
  console.log(`Treasure ${x} ${y}`)
  return new Treasure({ x, y });
}