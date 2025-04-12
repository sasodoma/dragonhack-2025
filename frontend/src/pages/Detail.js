import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

export default function Detail() {
  const { id } = useParams();
  const [challenge, setChallenge] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchChallenge() {
      try {
        const response = await fetch("http://localhost:5000/get-challenge-1");
        const data = await response.json();
        if (data.challenge_id) {
          setChallenge(data);
        } else {
          console.error("Challenge not found");
        }
      } catch (err) {
        console.error("Error fetching challenge:", err);
      }
    }

    fetchChallenge();
  }, []);

  if (!challenge) {
    return <p>Loading challenge...</p>;
  }

  const isLast = currentIndex === challenge.letters.length - 1;

  return (
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
          onClick={() => navigate("/some-other-page")}
        >
          Confirm & Continue
        </button>
      )}
    </div>
  );
}
