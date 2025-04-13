import { Link, useLocation } from "react-router-dom";
import "../styles/Results.css"; // Make sure the path is correct

export default function Results() {
  const location = useLocation();
  const { score } = location.state || { score: 0 };

  const getFeedback = (score) => {
    if (score >= 2) return "Excellent job! 🦆";
    if (score >= 1) return "Good effort! 💪";
    return "Keep practicing! 🌱";
  };

  return (
    <div className="results-container">
      <div className="results-card">
        <h1 className="results-title">Your Score</h1>
        <p className="results-score">{score}</p>
        <p className="results-feedback">{getFeedback(score)}</p>
        <Link to="/" className="results-button">
          Try Again
        </Link>
      </div>
    </div>
  );
}
