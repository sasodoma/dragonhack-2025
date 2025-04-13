import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";
import FingerIcon from '../gesture-tap.svg';
import LetterIcon from '../alpha-f-circle-outline.svg';
import BluetoothManager from "../BluetoothManager";

const colors = ["#FFE066", "#A2DED0", "#E6EE9C", "#FF6B6B", "#FFD54F"];

export default function Home() {
  const [items, setItems] = useState([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    // Get challenges
    fetch("http://localhost:5000/get-all-challenges")
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.map((challenge, index) => ({
          id: challenge.challenge_id,
          title: `Challenge ${challenge.challenge_id}`,
          color: colors[index % colors.length],
          type: challenge.type,
        }));
        setItems(formatted);
      })
      .catch((error) => console.error("Failed to fetch challenges", error));

    // Get user score
    fetch("http://localhost:5000/get-user?username=mirko")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.score !== undefined) {
          setScore(data.score);
        }
      })
      .catch((error) => console.error("Failed to fetch user data", error));

    // Attempt auto-connect (only for previously paired devices)
  }, []);

  const handleBluetoothConnect = () => {
    BluetoothManager.connect(false); // Manual pairing flow triggered by user gesture
  };

  return (
    <>
      <div className="home-header" >
        <img src="/FT_logo.png" className="header-logo"></img>
        <h1 className="title">Hi, Mirko!</h1>
        <p className="score">Score: {score}</p>
        <button className="bottom-connect-btn" onClick={handleBluetoothConnect}>
          🔵 Connect
        </button>

      </div>
      <div className="home-container">
        <div className="card-list">
          {items.map((item) => (
            <Link to={`/item/${item.id}`} key={item.id} className="card-link">
              <div className="card" style={{ backgroundColor: item.color }}>
                <img src={item.type === 1 ? LetterIcon : FingerIcon} alt="class" className="card-image" />
                <div className="card-content">
                  <h2 className="card-title">{item.title}</h2>
                  <p className="card-sub">{item.type === 1 ? "Type" : "Feel"}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
