import React, { useEffect, useReducer } from 'react'
import './App.css'
import Grid from './components/Grid'
import useMove from './hooks/useMove'
import movementReducer from './reducers/movement'
import Room from './models/room';

const initState = {
    room: new Room(),
    x: 5,
    y: 5,
    direction: 'UP'
}

function App() {
  const [state, dispatch] = useReducer(movementReducer, initState);
  useMove(dispatch)

  useEffect(() => {
    const tickId = setInterval(() => {
      dispatch({ type: 'TICK' })
    }, 5000)

    return () => {
      clearInterval(tickId)
    }
  }, []);

  return (<Grid
    x={state.x}
    y={state.y}
    room={state.room}
    direction={state.direction} />)
}

export default App
