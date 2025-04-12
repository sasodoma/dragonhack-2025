import React, { useState, useEffect } from 'react';
import BrailleInput from './components/BrailleInput';
import './index.css';

function App() {
  const [activeTab, setActiveTab] = useState(1);
  const [challenge, setChallenge] = useState(null);
  const [brailleInput, setBrailleInput] = useState(Array(6).fill(false));
  const [feedback, setFeedback] = useState(null);

  const fetchChallenge = (type) => {
    fetch(`http://localhost:5000/get-challenge-${type}`)
      .then(res => res.json())
      .then(data => {
        setChallenge(data);
        setFeedback(null);
        setBrailleInput(Array(6).fill(false));
      });
  };

  const submitAnswer = (letter) => {
    fetch('http://localhost:5000/submit-answer', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ letter, braille: brailleInput }),
    })
    .then(res => res.json())
    .then(data => setFeedback(data.correct ? "Correct! 🎉" : "Try again! 🧐"));
  };

  useEffect(() => {
    fetchChallenge(activeTab);
  }, [activeTab]);

  return (
    <div className="app">
      <div className="tabs">
        <button className={activeTab === 1 ? 'active' : ''} onClick={() => setActiveTab(1)}>
          Challenge 1
        </button>
        <button className={activeTab === 2 ? 'active' : ''} onClick={() => setActiveTab(2)}>
          Challenge 2
        </button>
      </div>

      {challenge && (
        <div className="challenge-container">
          <h2>{activeTab === 1 ? 'Identify the Braille' : 'Convert to Braille'}</h2>
          <div className="challenge-letter">{challenge.letters}</div>
          <BrailleInput braille={brailleInput} setBraille={setBrailleInput} />
          <button className="submit-btn" onClick={() => submitAnswer(challenge.letters)}>
            Submit Answer
          </button>
          {feedback && <div className="feedback">{feedback}</div>}
        </div>
      )}
    </div>
  );
}

export default App;
