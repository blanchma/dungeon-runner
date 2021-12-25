function moveUp({ room, x, y }) {
  let state = { direction: 'UP', room }

  if (room.isBorder(x, y - 1)) {
    console.log('isBorder')
  } else if (room.isLimit(x, y - 1)) {
    return {...state, x, y }
  } else {
    return {...state, x, y: y - 1 }
  }
}

function moveDown({ room, x, y }) {
  let state = { direction: 'DOWN', room }

  if (room.isBorder(x, y + 1)) {
    console.log('isBorder')
  } else if (room.isLimit(x, y + 1)) {
    return {...state, x, y }
  } else {
    return {...state, x, y: y + 1 }
  }
}

function moveLeft({ room, x, y }) {
  let state = { direction: 'LEFT', room }

  if (room.isBorder(x - 1, y)) {
    console.log('isBorder')
  } else if (room.isLimit(x - 1, y)) {
    return {...state, x, y }
  } else {
    return {...state, x: x - 1, y }
  }
}

function moveRight({ room, x, y }) {
  let state = { direction: 'RIGHT', room }

  if (room.isBorder(x + 1, y)) {
    console.log('isBorder')
  } else if (room.isLimit(x + 1, y)) {
    return {...state, x, y }
  } else {
    return {...state, x: x + 1, y }
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
    default:
      throw new Error();
  }
  return newState;
}

export default movementReducer;


