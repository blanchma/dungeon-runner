import { randomPosition } from "../helpers/randomPosition";
import Treasure from "../models/treasure";

export default function generateTreasure() {
  let x, y;

  do  {
    [x, y] = randomPosition();
  } while ([x, y] === [5, 5])
  return new Treasure({ x, y });
}