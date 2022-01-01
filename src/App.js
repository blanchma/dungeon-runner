import React, { useEffect, useReducer, useState } from 'react'
import './App.css'
import Grid from './components/Grid'
import useKeyboard from './hooks/useKeyboard'
import gameReducer from './reducers/game'
import Room from './models/room'

//mover a un hook
import { db } from './firebase/config'
import { collection, getDocs, addDoc, serverTimestamp, orderBy, limit } from 'firebase/firestore'


function App() {
  const [state, dispatch] = useReducer(gameReducer, {})
  useKeyboard(dispatch)
  const [topScores, setTopScores] = useState([])


  const { gameOver, level, coins } = state

  useEffect(() => {
    dispatch({type: 'NEW_GAME'})
  }, [dispatch])

  useEffect(() => {
    const tickId = setInterval(() => {
      dispatch({ type: 'TICK' })
    }, 500)

    return () => {
      clearInterval(tickId)
    }
  }, [])



  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    const now = Date.now();
    if (gameOver && coins > 0) {
      await addDoc(collection(db, 'top_scores'), {
        name: 'Test-' + now,
        coins: coins,
        level: level,
        createdAt: serverTimestamp()
      })
    }
  }, [gameOver, coins, level])

  useEffect(async () => {
    const newTopScores = await getDocs(collection(db, 'top_scores'), orderBy("score"), limit(10))

    let docs = []
    newTopScores.forEach((doc) => {
      docs.push({ id: doc.id, data: doc.data() })
    })
    setTopScores(docs)
  }, [gameOver])

  const isGameOver = () => {
    if (gameOver) return <div className="gameOver">GAME OVER</div>
  }

  const isGameRunning = () => {
    if(level)
      return <Grid
          x={state.x}
          y={state.y}
          room={state.room}
          mobs={state.mobs}
          treasure={state.treasure}
          direction={state.direction}
        />
  }

  return (
    <>
      {isGameOver()}

      <div className="header">
        <div className="level">Level {level}</div>
        <div className="coins">
          <img src="/treasure.png"></img>Coins {coins}
        </div>
      </div>

      {isGameRunning()}

    </>
  )
}

export default App
