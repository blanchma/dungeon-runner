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
    treasure: initRoom.treasure,
    x: 5,
    y: 5,
    level: initRoom.level,
    coins: 0,
    direction: 'UP',
    gameOver: false
}

function App() {
  const [state, dispatch] = useReducer(movementReducer, initState);
  useMove(dispatch)

  useEffect(() => {
    const tickId = setInterval(() => {
      dispatch({ type: 'TICK' })
    }, 500)

    return () => {
      clearInterval(tickId)
    }
  }, []);

  const isGameOver = () => {
    if (state.gameOver)
      return <div className="gameOver">GAME OVER</div>

  }

  console.log('level', state.room.level)
  return (<>
    {isGameOver()}

    <div className="header">
      <div className="level">Level {state.level}</div>
      <div className="coins"><img src="/treasure.png"></img>Coins {state.coins}</div>
    </div>

    <Grid
    x={state.x}
    y={state.y}
    room={state.room}
    mobs={state.mobs}
    treasure={state.treasure}
      direction={state.direction} />
    </>)
}

export default App
