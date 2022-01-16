import {randomDirection } from "../helpers/randomPosition";
import Mob from "../models/mob";
//const shuffledCards = [1,2,3,4,5].sort(() => Math.random() - 0.5)

function getAllPossiblePositions() {
  let positionsOnTop = [],
    positionsOnLeft = [],
    positionsOnBottom = [],
    positionsOnRight = [];

  const positions = [1, 2, 3, 4, 6, 7, 8, 9]
  positions.forEach(position => {

    positionsOnTop.push({
      x: position,
      y: [1, 2, 3].sort(() => Math.random() - 0.5)[0],
      axis: 'y'
    })

    positionsOnLeft.push({
      x: [1, 2, 3].sort(() => Math.random() - 0.5)[0],
      y: position,
      axis: 'x'
    })

    positionsOnBottom.push({
      x: position,
      y: [7, 8, 9].sort(() => Math.random() - 0.5)[0],
      axis: 'y'
    })

    positionsOnRight.push({
      x: [7, 8, 9].sort(() => Math.random() - 0.5)[0],
      y: position,
      axis: 'x'
    })

  })

  const permutations = [positionsOnTop, positionsOnLeft, positionsOnBottom, positionsOnRight];
  permutations.map(positions => positions.sort(() => Math.random() - 0.5))

  return permutations.sort(() => Math.random() - 0.5)
}


export default function generateMobs(room) {
  const level = room.level;
  const mobs = []
  let mobsMax = parseInt(level / 2) + 3;
  mobsMax = mobsMax > 15 ? 15 : mobsMax;

  const levelSpeed = parseInt(level / 5)
  const speed = [5,4,3,2,1][levelSpeed > 4 ? 4 : levelSpeed]
  const allPositions = getAllPossiblePositions();
  const axis = [0, 1]
  for (let i = 0; i < mobsMax; i++) {
    const randomPosition = allPositions[i % 4].pop()
    const direction = randomDirection()
    const newMob = new Mob({ speed, direction, ...randomPosition });
    mobs.push(newMob)
    axis.reverse()
  }

  return mobs;
}