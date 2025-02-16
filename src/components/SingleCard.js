import './SingleCard.css';

export function SingleCard({ card, handleChoice, flipped, disabled }) {

    const handleClick = () => {
        if (disabled) return;
        handleChoice(card);
    }

    return (
      <div className="card">
        <div className={flipped ? "flipped" : ""}>
          <img className="front" src={card.src} alt="front" />
          <img
            className="back"
            onClick={handleClick}
            src="/img/cover.png"
            alt="back"
          />
        </div>
      </div>
    );
};