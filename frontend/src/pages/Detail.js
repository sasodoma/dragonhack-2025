import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import BluetoothManager from "../BluetoothManager"; // Make sure this path is correct
import "../styles/Detail.css";

export default function Detail() {
  const { id } = useParams();
  const [challenge, setChallenge] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
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

  // Send letter on index change if type is 2
  useEffect(() => {
    if (challenge?.type === 2) {
      const currentLetter = challenge.letters[currentIndex];
      BluetoothManager.sendLetter(currentLetter);
    }
  }, [currentIndex, challenge]);

  const isLast = challenge && currentIndex === challenge.letters.length - 1;

  const handleAnswer = () => {
    const userInput = inputRef.current.value.toLowerCase();
    const correctAnswer = challenge.letters[currentIndex];
    const isAnswerCorrect = userInput === correctAnswer;

    setIsCorrect(isAnswerCorrect ? 1 : -1);
    if (isAnswerCorrect) {
      correctSound.current.play();
      setScore((prev) => prev + 1);
    } else {
      incorrectSound.current.play();
    }

    setTimeout(() => {
      setIsCorrect(null);
      inputRef.current.value = "";

      if (!isLast) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        navigate("/results", { state: { score: isAnswerCorrect ? score + 1 : score } });
      }
    }, 500);
  };

  if (!challenge) {
    return <p>Loading challenge...</p>;
  }

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

        <button
          className={isLast ? "confirm-button" : "next-button"}
          onClick={handleAnswer}
        >
          {isLast ? "Confirm & Continue" : "Next"}
        </button>
      </div>
    )
  );
}
