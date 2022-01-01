import Room from '../models/room'
import Mob from '../models/mob'
import generateMobs from '../generators/generateMobs'
import generateTreasures from '../generators/generateTreasures'

const MAX = 10

function checkCollision(state) {
  const { treasure, mobs, x, y, coins, room } = state

  if (mobs.some((mob) => mob.x === x && mob.y === y)) {
    return { ...state, gameOver: true }
  } else if (treasure && treasure.x === x && treasure.y === y) {
    room.treasure = null
    return { ...state, treasure: null, coins: coins + treasure.value }
  } else {
    return { ...state, gameOver: false }
  }
}

function tick({ mobs, room }) {
  const movedMobs = mobs.map((mob) => Mob.move(mob, room))

  return { mobs: movedMobs }
}

function moveUp({ room, x, y }) {
  let state = { direction: 'UP', room }

  if (room.isBorder(x, y - 1)) {
    room.current = false

    let newRoom
    if (room.up) {
      newRoom = room.up
    } else {
      newRoom = new Room({ down: room, level: room.level + 1 })
    }

    return {
      ...state,
      x,
      y: MAX,
      room: newRoom,
      mobs: generateMobs(newRoom),
      treasure: generateTreasures(newRoom),
      level: newRoom.level,
    }
  } else if (room.isBlock(x, y - 1)) {
    return { ...state, x, y }
  } else {
    return { ...state, x, y: y - 1 }
  }
}

function moveDown({ room, x, y }) {
  let state = { direction: 'DOWN', room }

  if (room.isBorder(x, y + 1)) {
    room.current = false

    let newRoom
    if (room.down) {
      newRoom = room.down
    } else {
      newRoom = new Room({ up: room, level: room.level + 1 })
    }

    return {
      ...state,
      x,
      y: 0,
      room: newRoom,
      mobs: generateMobs(newRoom),
      treasure: generateTreasures(newRoom),
      level: newRoom.level,
    }
  } else if (room.isBlock(x, y + 1)) {
    return { ...state, x, y }
  } else {
    return { ...state, x, y: y + 1 }
  }
}

function moveLeft({ room, x, y }) {
  let state = { direction: 'LEFT', room }

  if (room.isBorder(x - 1, y)) {
    room.current = false

    let newRoom
    if (room.left) {
      newRoom = room.left
    } else {
      newRoom = new Room({ right: room, level: room.level + 1 })
    }

    return {
      ...state,
      x: MAX,
      y,
      room: newRoom,
      mobs: generateMobs(newRoom),
      treasure: generateTreasures(newRoom),
      level: newRoom.level,
    }
  } else if (room.isBlock(x - 1, y)) {
    return { ...state, x, y }
  } else {
    return { ...state, x: x - 1, y }
  }
}

function moveRight({ room, x, y }) {
  let state = { direction: 'RIGHT', room }

  if (room.isBorder(x + 1, y)) {
    room.current = false

    let newRoom
    if (room.right) {
      newRoom = room.right
    } else {
      newRoom = new Room({ left: room, level: room.level + 1 })
    }

    return {
      ...state,
      x: 0,
      y,
      room: newRoom,
      mobs: generateMobs(newRoom),
      treasure: generateTreasures(newRoom),
      level: newRoom.level,
    }
  } else if (room.isBlock(x + 1, y)) {
    return { ...state, x, y }
  } else {
    return { ...state, x: x + 1, y }
  }
}

function newGame(state) {
  const initRoom = new Room()
  return {
    room: initRoom,
    mobs: generateMobs(initRoom),
    treasure: generateTreasures(initRoom),
    x: 5,
    y: 5,
    level: initRoom.level,
    coins: 0,
    direction: 'UP',
    gameOver: false,
  }
}

function gameReducer(state, action) {
  if (state.gameOver) {
    return state
  }
  switch (action.type) {
    case 'NEW_GAME':
      return { ...state, ...newGame(state) };
      break
    case 'UP':
      return checkCollision({ ...state, ...moveUp(state) })
      break
    case 'DOWN':
      return checkCollision({ ...state, ...moveDown(state) })
      break
    case 'LEFT':
      return checkCollision({ ...state, ...moveLeft(state) })
      break
    case 'RIGHT':
      return checkCollision({ ...state, ...moveRight(state) })
      break
    case 'TICK':
      return checkCollision({ ...state, ...tick(state) })
      break
    default:
      throw new Error()
  }
}

export default gameReducer
