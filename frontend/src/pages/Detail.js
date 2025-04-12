import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import "../styles/Detail.css";

export default function Detail() {
  const { id } = useParams(); // gets challenge ID from URL
  const [challenge, setChallenge] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const inputRef = useRef(null);
  const [score, setScore] = useState(0);
  const [isCorrect, setIsCorrect] = useState(0);

  // Sound refs
  const correctSound = useRef(new Audio("/correct.mp3"));
  const incorrectSound = useRef(new Audio("/incorrect.mp3"));

  useEffect(() => {
    async function fetchChallenge() {
      try {
        const response = await fetch(`http://localhost:5000/get-challenge/${id}`);
        const data = await response.json();
        if (response.ok && data.challenge_id) {
          setChallenge(data);
        } else {
          console.error("Challenge not found or invalid response");
        }
      } catch (err) {
        console.error("Error fetching challenge:", err);
      }
    }

    fetchChallenge();
  }, [id]);

  if (!challenge) {
    return <p>Loading challenge...</p>;
  }

  const isLast = currentIndex === challenge.letters.length - 1;

  return ( 
    challenge.type === 1 ? (
      <div className="letter-container">
        <Link to="/" className="back-button">&larr; Back</Link>

        <div className="letter-card">
          <h2>Letter {currentIndex + 1}</h2>
          <p className="letter">{challenge.letters[currentIndex]}</p>
        </div>

        {!isLast ? (
          <button className="next-button" onClick={() => setCurrentIndex((prev) => prev + 1)}>
            Next
          </button>
        ) : (
          <button
            className="confirm-button"
            onClick={() => navigate("/results", { state: { score } })}
          >
            Confirm & Continue
          </button>
        )}
      </div>
    ) : (
      <div className="letter-container">
        <Link to="/" className="back-button">&larr; Back</Link>

        <div className="letter-card">
          <h2>Letter {currentIndex + 1}</h2>
          <p className="letter">Guess</p>
          <input
            className={`guess-input ${
              isCorrect === 1 ? "correct" : isCorrect === -1 ? "incorrect" : "neutral"
            }`}
            id="inputBox"
            ref={inputRef}
          />
        </div>

        {!isLast ? (
          <button
            className="next-button"
            onClick={() => {
              const userInput = inputRef.current.value.toLowerCase();
              setInput(userInput);
              
              const correctAnswer = challenge.letters[currentIndex];
              const isAnswerCorrect = userInput === correctAnswer;
              
              // Set correctness and play corresponding sound
              setIsCorrect(isAnswerCorrect ? 1 : -1);
              if (isAnswerCorrect) {
                correctSound.current.play();
              } else {
                incorrectSound.current.play();
              }

              setTimeout(() => {
                setIsCorrect(null);
                setCurrentIndex((prev) => prev + 1);
                inputRef.current.value = "";
                if (isAnswerCorrect) {
                  setScore((prev) => prev + 1);
                }
              }, 500);
            }}
          >
            Next
          </button>
        ) : (
          <button
            className="confirm-button"
            onClick={() => navigate("/results", { state: { score } })}
          >
            Confirm & Continue
          </button>
        )}
      </div>
    )
  );
}
