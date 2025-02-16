import { useEffect, useState } from "react";
import { SingleCard } from "./components/SingleCard";
import Timer from "./components/Timer"; // Import Timer component

// styles
import "./App.css";
import Modal from "./components/Modal";

const cardImages = [
  { src: "/img/helmet-1.png", matched: false },
  { src: "/img/potion-1.png", matched: false },
  { src: "/img/ring-1.png", matched: false },
  { src: "/img/scroll-1.png", matched: false },
  { src: "/img/shield-1.png", matched: false },
  { src: "/img/sword-1.png", matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [gameLost, setGameLost] = useState(false);

  // Timer and game status states
  const [isActive, setIsActive] = useState(false); // Timer active status
  const [gameOver, setGameOver] = useState(false);
  const [time, setTime] = useState(0);

  // Shuffle cards and reset game state
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
    setTime(0);
    setGameOver(false);
    setGameWon(false);
    setGameLost(false);
    setIsActive(false); // Timer will NOT start until a card is clicked
  };

  // Handle a card selection
  const handleChoice = (card) => {
    if (!disabled) {
      // Start the timer on the very first card click
      if (!isActive) {
        setIsActive(true);
      }
      choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
    }
  };

  // Compare two selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) =>
          prevCards.map((card) =>
            card.src === choiceOne.src ? { ...card, matched: true } : card
          )
        );
        resetChoices();
      } else {
        setTimeout(() => resetChoices(), 500);
      }
    }
  }, [choiceOne, choiceTwo]);

  // Reset choices and increase turns
  const resetChoices = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  // Check if the game is over (all cards matched)
  useEffect(() => {
    if (cards.length && cards.every((card) => card.matched)) {
      setGameOver(true);
      setIsActive(false); // Stop the timer when game is over
    }
  }, [cards]);

  // Score calculation example
  const calculateScore = () => {
    return Math.max(0, 1000 - (turns * 10 + time * 10));
  };

  // Start a new game automatically when the component mounts
  useEffect(() => {
    shuffleCards();
  }, []);

  useEffect(() => {
    if (cards.length && cards.every((card) => card.matched)) {
      setGameOver(true);
      setGameWon(true); // Mark the game as won
      setIsActive(false); // Stop the timer when game is over
    }
    if (calculateScore() <=0) {
      setGameOver(true);
      setGameLost(true); // Mark the game as lost
      setIsActive(false); // Stop the timer when game is over
    }
  }, [cards, time]);

  return (
    <div className="App">
      <h2>Matching Game</h2>
      <button onClick={shuffleCards}>New Game</button>

      <div>
        <div className="stats">
          <p>Turns: {turns}</p>
          <Timer
            isActive={isActive}
            gameOver={gameOver}
            setTime={setTime}
            time={time}
          />
          <p>Score: {calculateScore()}</p>
        </div>
        {gameWon && (
          <Modal
            message="Congratulations, you won!"
            score={calculateScore}
            shuffleCards={shuffleCards}
          />
        )}
        {gameLost && (
          <Modal
            message="Sorry, you lost!"
            score={calculateScore}
            shuffleCards={shuffleCards}
          />
        )}
      </div>

      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
