import Room from '../models/room'
import Mob from '../models/mob'

const MAX = 10

function checkCollision(state) {
  const { player, coins, room } = state
  const { treasure, mobs, key } = room
  const { x, y } = player;

  if (mobs.some((mob) => mob.x === x && mob.y === y)) {
    return {
      ...state,
      player: { ...player, dead: true },
      gameOver: true
    }

  } else if (treasure && treasure.x === x && treasure.y === y) {
    return {
      ...state,
      room: new Room({ ...room, treasure: null }),
      coins: coins + treasure.value
    }
  } else if (key && key.x === x && key.y === y) {
    return {
      ...state,
      room: new Room({ ...room, key: null })
    }
  } else {
    return {
      ...state
    }
  }
}

function tick({ room, player }) {
  const movedMobs = room.mobs.map((mob) => Mob.move(mob, room))

  return {
    room: new Room({ ...room, mobs: movedMobs })
  };
}

function moveUp({ room, player }) {
  const direction = 'UP'
  const { x, y } = player;

  if (room.isBorder(x, y - 1)) {
    let newRoom

    if (room.up) {
      newRoom = room.up
    } else {
      newRoom = new Room({
        down: room,
        level: room.level + 1,
      })
    }

    return {
      player: { direction, x, y: MAX },
      room: newRoom
    }
  } else if (room.isBlock(x, y - 1)) {
    return { player: { direction, x, y, running: true } }
  } else {
    return { player: { direction, x, y: y - 1, running: true } }
  }
}

function moveDown({ room, player }) {
  const direction = 'DOWN'
  const { x, y } = player;

  if (room.isBorder(x, y + 1)) {

    let newRoom
    if (room.down) {
      newRoom = room.down
    } else {
      newRoom = new Room({
        up: room,
        level: room.level + 1,
      })
    }

    return {
      player: { direction, x, y: 0 },
      room: newRoom
    }
  } else if (room.isBlock(x, y + 1)) {
    return { player: { direction, x, y, running: true } }
  } else {
    return { player: { direction, x, y: y + 1, running: true } }
  }
}

function moveLeft({ room, player }) {
  const direction = 'LEFT'
  const { x, y } = player;

  if (room.isBorder(x - 1, y)) {

    let newRoom
    if (room.left) {
      newRoom = room.left
    } else {

      newRoom = new Room({
        right: room,
        level: room.level + 1,
      })
    }

    return {
      player: { direction, x: MAX, y },
      room: newRoom
    }
  } else if (room.isBlock(x - 1, y)) {
    return { player: { direction, x, y, running: true } }
  } else {
    return { player: { direction, x: x - 1, y, running: true } }
  }
}

function moveRight({ room, player }) {
  const direction = 'RIGHT'
  const { x, y } = player;

  if (room.isBorder(x + 1, y)) {
    let newRoom
    if (room.right) {
      newRoom = room.right
    } else {
      newRoom = new Room({
        left: room,
        level: room.level + 1,
      })
    }

    return {
      player: {direction,  x: 0, y },
      room: newRoom,
    }
  } else if (room.isBlock(x + 1, y)) {
    return { direction, player: { direction, x, y, running: true } }
  } else {
    return { direction, player: { direction, x: x + 1, y, running: true } }
  }
}

function newGame(state) {

  const initRoom = new Room()

  return {
    pause: false,
    room: initRoom,
    player: {x: 5, y: 5, direction: 'RIGHT' },
    coins: 0,
    gameOver: false,
    tickId: state.tickId
  }
}

function pause({tickId}) {
  console.log('pause', pause, ' TICK', tickId)
  if (tickId) {
    clearInterval(tickId)
    return {pause: true}
  } else {
    return {pause: false}
  }

}

function gameReducer(state, action) {
  if (state.gameOver) {
    return state
  }
  switch (action.type) {

    case 'PAUSE':
      return { ...state, ...pause(state) };
      break;
    case 'NEW_GAME':
      return { ...state, ...newGame({ ...state, ...action.payload }) };
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
