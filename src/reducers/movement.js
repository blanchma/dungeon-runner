import Room from "../models/room"
import Mob from "../models/mob"

const MAX = 10;

function moveUp({ room, x, y }) {
  let state = { direction: 'UP', room }

  if (room.isBorder(x, y - 1)) {
    room.active = false;
    const newRoom = new Room({ down: room });
    return {...state, x, y: MAX, room: newRoom }
  } else if (room.isBlock(x, y - 1)) {
    return {...state, x, y }
  } else {
    return {...state, x, y: y - 1 }
  }
}

function moveDown({ room, x, y }) {
  let state = { direction: 'DOWN', room }

  if (room.isBorder(x, y + 1)) {
    room.active = false;
    const newRoom = new Room({ up: room });
    return {...state, x, y: 0, room: newRoom }
  } else if (room.isBlock(x, y + 1)) {
    return {...state, x, y }
  } else {
    return {...state, x, y: y + 1 }
  }
}

function moveLeft({ room, x, y }) {
  let state = { direction: 'LEFT', room }

  if (room.isBorder(x - 1, y)) {
    room.active = false;
    const newRoom = new Room({ right: room });
    return {...state, x: MAX, y, room: newRoom }
  } else if (room.isBlock(x - 1, y)) {
    return {...state, x, y }
  } else {
    return {...state, x: x - 1, y }
  }
}

function moveRight({ room, x, y }) {
  let state = { direction: 'RIGHT', room }

  if (room.isBorder(x + 1, y)) {
    room.active = false;
    const newRoom = new Room({ left: room });
    return {...state, x: 0, y, room: newRoom }
  } else if (room.isBlock(x + 1, y)) {
    return {...state, x, y }
  } else {
    return {...state, x: x + 1, y }
  }
}

function tick({ mobs, room }) {
  const movedMobs = mobs.map( mob => Mob.move(mob, room) )

  return { mobs: movedMobs };
}

function collision({ mobs, x, y }) {

  if (mobs.some(mob => mob.x === x && mob.y === y)) {
    return {mobs, x, y, gameOver: true}
  } else {
    return {mobs, x, y, gameOver: false}
  }
}

function movementReducer(state, action) {
  let newState;
  switch (action.type) {
    case 'UP':
      newState = Object.assign({}, state, moveUp(state) )
      break;
    case 'DOWN':
      newState = Object.assign({}, state, moveDown(state) )
      break;
    case 'LEFT':
      newState = Object.assign({}, state, moveLeft(state) )
      break;
    case 'RIGHT':
      newState = Object.assign({}, state, moveRight(state) )
      break;

    case 'TICK':
      newState = Object.assign({}, state, tick(state) )
      break;
    default:
      throw new Error();
  }

  newState = Object.assign({}, newState, collision(newState) )

  return newState;
}

export default movementReducer;


