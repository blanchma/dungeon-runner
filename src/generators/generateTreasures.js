import { randomPosition } from "../helpers/randomPosition";
import Treasure from "../models/treasure";

export default function generateTreasures(room) {
  const [x, y] = randomPosition();
  return new Treasure({ x, y });
}