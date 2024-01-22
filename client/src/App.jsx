import { useState, useEffect, useRef } from 'react';

import shortid from 'shortid';
import Card from './components/Card';
import monsterMatchLogo from '/monster-match.png';
import megaladon from '/megaladon.png';
import blueThunder from '/blue-thunder.png';
import graveDigger from '/grave-digger.png';
import maxD from '/max-d.png';
import mmDalmation from '/mm-dalmation.png';
import whiplash from '/whiplash.png';
import zombie from '/zombie.png';
import kraken from '/kraken.png';

import './App.css';

let uniqueCards = [
  {
    image: megaladon,
    name: 'Megaladon',
  },
  {
    image: blueThunder,
    name: 'Blue Thunder',
  },
  {
    image: graveDigger,
    name: 'Grave Digger',
  },
  {
    image: maxD,
    name: 'Max D',
  },
  {
    image: mmDalmation,
    name: 'Monster Mutt Dalmation',
  },
  {
    image: whiplash,
    name: 'Whiplash',
  },
  {
    image: zombie,
    name: 'Zombie',
  },
  {
    image: kraken,
    name: 'Kraken',
  },
];

const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const App = () => {
  const [cards, setCards] = useState(() => {
    shuffle(uniqueCards.concat(uniqueCards));
  });
  const [openCards, setOpenCards] = useState([]);
  const [clearedCards, setClearedCards] = useState([]);
  const [shouldDisableAllCards, setShouldDisableAllCards] = useState(false);
  // const [showModal, setShowModal] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [winnerCircle, setWinnerCircle] = useState(false);
  const playGame = () => {
    setPlaying(true);
    setCards(shuffle(uniqueCards.concat(uniqueCards)));
  };
  const timeout = useRef(null);

  const checkCompletion = () => {
    if (Object.keys(clearedCards).length === uniqueCards.length) {
      console.log('YOU WON!!!');
      
      setWinnerCircle(true);
    }
  };

  const handleCardClick = (index) => {
    if (openCards.length === 1) {
      setOpenCards((prev) => [...prev, index]);
      disable();
    } else {
      clearTimeout(timeout.current);
      setOpenCards([index]);
    }
  };

  const disable = () => {
    setShouldDisableAllCards(true);
  };

  const enable = () => {
    setShouldDisableAllCards(false);
  };

  const checkIsInactive = (card) => {
    return Boolean(clearedCards[card.name]);
  };

  const checkIsFlipped = (index) => {
    return openCards.includes(index);
  };

  const handleRestart = () => {
    setClearedCards({});
    setOpenCards([]);
    setShouldDisableAllCards(false);
    setWinnerCircle(false);
    setPlaying(true);
    setCards(shuffle(uniqueCards.concat(uniqueCards)));
  };

  useEffect(() => {
    let timeout = null;

    const evaluateMatch = () => {
      const [first, second] = openCards;
      enable();
      if (cards[first].name === cards[second].name) {
        console.log('Yeah they match');
        setClearedCards((prev) => ({ ...prev, [cards[first].name]: true }));
        setOpenCards([]);
        return;
      }
      console.log(clearedCards);
      timeout.current = setTimeout(() => {
        setOpenCards([]);
      }, 500);
    };
    console.log(clearedCards);
    if (openCards.length === 2) {
      timeout = setTimeout(evaluateMatch, 500);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [openCards]);

  useEffect(() => {
    checkCompletion();
  }, [clearedCards]);

  return (
    <>
      <h1>Monster Match</h1>
      {(playing && !winnerCircle) && (
        <>
          <div className='game-board-container'>
            {cards.map((card, index) => {
              return (
                <Card
                  key={index}
                  card={card}
                  index={index}
                  isDisabled={shouldDisableAllCards}
                  isInactive={checkIsInactive(card)}
                  isFlipped={checkIsFlipped(index)}
                  onClick={handleCardClick}
                />
              );
            })}
          </div>
          <button className='btn-main' onClick={handleRestart}>
            Restart
          </button>
        </>
      )}
      {(playing && winnerCircle) && (
        <button className='btn-highlight' onClick={handleRestart}>
          Play Again
        </button>
      )}  
      {(!playing) && (
        <button className='btn-main' onClick={playGame}>
            Fieldglass
        </button>
      )}
      {winnerCircle && (
        <>
          <div className='giffy-embed'>
            <iframe
              src='https://giphy.com/embed/POpr7nTrhogeI'
              width='100%'
              height='100%'
              allowFullScreen
            ></iframe>
          </div>
        </>
      )}
    </>
  );
};

export default App;
