import './Modal.css';

export default function Modal({ message, score, shuffleCards }) {
  return (
    <div className="modal-backdrop">
        <div className="modal-message">
            <h2>{message}</h2>
            <p>Your score is: {score()}</p>
            <button onClick={shuffleCards}>Play Again</button>
        </div>
    </div>
  );
}