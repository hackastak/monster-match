import { useState } from 'react'

import shortid from 'shortid'
import Card from './components/Card'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import monsterMatchLogo from '/monster-match.png'
import blueThunder from '/blue-thunder.png'
import graveDigger from '/grave-digger.png'
import maxD from '/max-d.png'
import mmDalmation from '/mm-dalmation.png'
import whiplash from '/whiplash.png'
import zombie from '/zombie.png'
import kraken from '/kraken.png'

import './App.css'

let cards = [
  {
    image: monsterMatchLogo,
    name: 'Monster Match'
  },
  {
    image: blueThunder,
    name: 'Blue Thunder'
  }, 
  {
    image: graveDigger,
    name: 'Grave Digger'
  }, 
  {
    image: maxD,
    name: 'Max D'
  },
  {
    image: mmDalmation,
    name: 'Monster Mutt Dalmation'
  },
  {
    image: whiplash,
    name: 'Whiplash'
  },
  {
    image: zombie,
    name: 'Zombie'
  },
  {
    image: kraken,
    name: 'Kraken'
  },
]
const dupCards = cards.concat(cards)

const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i +1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const App = () => {
  const [playing, setPlaying] = useState(false)
  const [gameCards, setGameCards] = useState([])
  const playGame = () => {
    setPlaying(true)
    setGameCards(shuffle(dupCards))
  }

  return (
    <>
      <h1>Monster Match</h1>
      {(playing) ? (  
        <div className="game-board-container">
          {gameCards.map(function(card) {
            return (
              <Card key={shortid.generate()} image={card.image} name={card.name} />
            )
          })}
        </div>
      ) : (
        <button className="btn-main" onClick={playGame}>Play Game</button>
      )}
    </>
  )
}

export default App
