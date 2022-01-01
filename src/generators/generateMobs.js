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


export default function generateMobs(room, level = 1) {
  const mobs = []
  let mobsMax = parseInt(level / 5) + 3;
  mobsMax = mobsMax > 10 ? 10 : mobsMax;

  const allPositions = getAllPossiblePositions();
  console.log('allPositions', allPositions)
  const axis = [0,1]
  for (let i = 0; i < mobsMax; i++) {
    const randomPosition = allPositions[i % 4].pop()
    const direction = randomDirection()
    const newMob = new Mob({ room: room, speed: 500, direction, ...randomPosition });
    mobs.push(newMob)
    axis.reverse()
  }

  return mobs;
}