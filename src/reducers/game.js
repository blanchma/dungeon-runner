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
      room: new Room({ ...room, treasure: null,  }),
      coins: coins + treasure.value
    }
  } else if (key && key.x === x && key.y === y) {

    return {
      ...state,
      room: new Room({ ...room, door: null, key: null })
    }
  } else {
    return {
      ...state
    }
  }
}

function tick(state) {
  if (state.gameOver) {
    return { ...state };
  }
  const { room } = state;
  const movedMobs = room.mobs.map((mob) => Mob.move(mob, room))

  return {
    room: new Room({ ...room, mobs: movedMobs })
  };
}

function moveUp(state) {
  if (state.gameOver) {
    return { ...state };
  }
  const { room, player } = state;
  const direction = 'UP'
  const { x, y } = player;

  if (room.isOpenExit(x, y - 1) || (room.isCloseExit(x, y - 1) && !room.key) ) {
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

function moveDown(state) {
  if (state.gameOver) {
    return { ...state };
  }
  const { room, player } = state;
  const direction = 'DOWN'
  const { x, y } = player;

  if (room.isOpenExit(x, y + 1) || (room.isCloseExit(x, y + 1) && !room.key) ) {

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
  } else if (room.isBlock(x, y + 1) || room.isCloseExit(x, y + 1)) {
    return { player: { direction, x, y, running: true } }
  } else {
    return { player: { direction, x, y: y + 1, running: true } }
  }
}

function moveLeft(state) {
  if (state.gameOver) {
    return { ...state };
  }
  const { room, player } = state;
  const direction = 'LEFT'
  const { x, y } = player;

  if (room.isOpenExit(x - 1, y) || (room.isCloseExit(x - 1, y) && !room.key) ) {

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

function moveRight(state) {
  if (state.gameOver) {
    return { ...state };
  }
  const { room, player } = state;
  const direction = 'RIGHT'
  const { x, y } = player;

  if (room.isOpenExit(x + 1, y)) {
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

function gameReducer(state, action) {

  switch (action.type) {
    case 'NEW_GAME':
      return { ...state, ...newGame({ ...state, ...action.payload }) };
    case 'UP':
      return checkCollision({ ...state, ...moveUp(state) })
    case 'DOWN':
      return checkCollision({ ...state, ...moveDown(state) })
    case 'LEFT':
      return checkCollision({ ...state, ...moveLeft(state) })
    case 'RIGHT':
      return checkCollision({ ...state, ...moveRight(state) })
    case 'TICK':
      return checkCollision({ ...state, ...tick(state) })
    default:
      throw new Error()
  }
}

export default gameReducer
