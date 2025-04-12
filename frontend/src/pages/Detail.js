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
  console.log(input);
  return ( 
    ( challenge.type === 1 ?
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
          onClick={() => navigate("/results")}
        >
          Confirm & Continue
        </button>
      )}
    </div>
    :<div>
      <Link to="/" className="back-button">&larr; Back</Link>

      <div className="letter-card">
        <h2>Letter {currentIndex + 1}</h2>
        <p className="letter">Guess</p>
        <input className="guess-input" id="inputBox" ref={inputRef}></input>
      </div>

      {!isLast ? (
        <button className="next-button" onClick={
          () =>{ 
            setCurrentIndex((prev) => prev + 1);
            setInput(inputRef.current.value);
          }
        }>
          Next
        </button>
      ) : (
        <button
          className="confirm-button"
          onClick={() => navigate("/results")}
        >
          Confirm & Continue
        </button>
      )}
    </ div>)
  );
}
