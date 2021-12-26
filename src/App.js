import React, { useEffect, useReducer } from 'react'
import './App.css'
import Grid from './components/Grid'
import useMove from './hooks/useMove'
import movementReducer from './reducers/movement'
import Room from './models/room';

const initRoom = new Room();
const initState = {
    room: initRoom,
    mobs: initRoom.mobs,
    x: 5,
    y: 5,
    direction: 'UP',
    gameOver: false
}

function App() {
  const [state, dispatch] = useReducer(movementReducer, initState);
  useMove(dispatch)

  useEffect(() => {
    const tickId = setInterval(() => {
      dispatch({ type: 'TICK' })
    }, 2000)

    return () => {
      clearInterval(tickId)
    }
  }, []);

  return (<>
    <p>{state.gameOver ? 'GAME OVER' : ''}</p>
    <Grid
    x={state.x}
    y={state.y}
    room={state.room}
    mobs={state.mobs}
      direction={state.direction} />
    </>)
}

export default App
