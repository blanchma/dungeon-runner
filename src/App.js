import React, { useEffect, useReducer, useState } from 'react'
import './App.css'
import Grid from './components/Grid'
import useKeyboard from './hooks/useKeyboard'
import gameReducer from './reducers/game'
import Room from './models/room'
import treasureImage from './assets/decor_18.png'

//mover a un hook
import { db } from './firebase/config'
//https://firebase.google.com/docs/reference/js/
import { collection, query, getDocs, addDoc, serverTimestamp, orderBy, limit } from 'firebase/firestore'


function App() {
  const [state, dispatch] = useReducer(gameReducer, {})
  useKeyboard(dispatch)
  const [topScores, setTopScores] = useState([])
  const [playerName, setPlayerName] = useState("")
  const { gameOver, room, player, coins } = state

  useEffect(() => {
    dispatch({ type: 'NEW_GAME' })
  }, [dispatch])

  useEffect(() => {
    let tickId;

    if (!gameOver) {
      tickId = setInterval(() => {
        dispatch({ type: 'TICK', tickId })
      }, 100)
    }

    return () => {
      clearInterval(tickId)
    }
  }, [gameOver])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    getTopScores()
  }, [gameOver])


  const getTopScores = async () => {
    const q = query(collection(db, 'top_scores'), orderBy("coins", "desc"), limit(10));

    const newTopScores = await getDocs(q)

    let docs = []

    newTopScores.forEach((doc) => {
      docs.push({ id: doc.id, ...doc.data() })
    })

    setTopScores(docs)
  }

  const scoreGoodEnough = () => {
    return coins && topScores &&
      (topScores.length < 10 ||
        topScores[topScores.length - 1].coins < coins);
  }

  const handlePlayerNameChange = (event) => {
    setPlayerName(event.target.value);
  }

  const submitNewScore = async (event) => {
    event.preventDefault();
    if (playerName !== "") {
      addDoc(collection(db, 'top_scores'), {
          name: playerName,
          coins: coins,
          level: room.level,
          createdAt: serverTimestamp()
      })
      dispatch({ type: 'NEW_GAME' })
    }
  }

  const showGameOver = () => {
    if (gameOver) {
      let gameOverContent;
      if (scoreGoodEnough()) {
        gameOverContent = <>
          <div className="gameOverInfo">
            Congratulations!
            Your score is high enough to enter the Hall of Fame
          </div>
          <form onSubmit={submitNewScore}>
            <label>
              Introduce your name:
              <input
                type="text"
                value={playerName}
                onChange={handlePlayerNameChange}
                maxLength="12"
              />
            </label>
            <input type="submit" value=" SUBMIT " />
          </form>
          <div className="gameOverInfo">Press ENTER to start a new game</div>
        </>
      } else {
        gameOverContent = (<>
          <div className="gameOverInfo">Press ENTER to start a new game</div>
        </>)
      }

      return (
        <div className="gameOver">
          <div className="newTopScore">
            <div className="title">GAME OVER</div>
            {gameOverContent}
          </div>
        </div>
      )
    }
  }

  const showGameRunning = () => {
    if(room && room.ready)
      return <Grid
        room={room}
        player={player}
        />
  }

  const showTopScores = () => {
    const scores = topScores.map(score => {
      return <li className="score" key={score.id}>
        <div className="name">{score.name}</div>
        <div className="coins">{score.coins}</div>
        </li>
    })

    return <div className="topScores">
        <div className="title">Hall of Fame</div>
        <ul className="list">{scores}</ul>
      </div>
  }

  return (
    <div className="game">
      {showGameOver()}
      {showTopScores()}

      {room && room.ready ?
        <div className="header">
          <div className="level">Level {room.level}</div>
          <div className="coins">
            <img src={treasureImage}></img>Coins {coins}
          </div>
        </div>
      : ''}

      {showGameRunning()}

    </div>
  )
}

export default App
