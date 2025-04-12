import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";
import FingerIcon from '../gesture-tap.svg';
import LetterIcon from '../alpha-f-circle-outline.svg';

const colors = ["#FFE066", "#A2DED0", "#E6EE9C", "#FF6B6B", "#FFD54F"];
const images = ["/assets/math.png", "/assets/science.png", "/assets/music.png", "/assets/sport.png", "/assets/english.png"];

export default function Home() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/get-all-challenges")
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.map((challenge, index) => ({
          id: challenge.challenge_id,
          title: `Challenge ${challenge.challenge_id}`,
          color: colors[index % colors.length],
          image: images[index % images.length],
          type: challenge.type,
        }));
        setItems(formatted);
      })
      .catch((error) => console.error("Failed to fetch challenges", error));
  }, []);

  return (
    <div className="home-container">
      <h1 className="title">Hi, Naomi!</h1>
      <p className="subtitle">Your Classes</p>
      <div className="card-list">
        {items.map((item) => (
          <Link to={`/item/${item.id}`} key={item.id} className="card-link">
            <div className="card" style={{ backgroundColor: item.color }}>
              <img src={item.type === 1 ? LetterIcon : FingerIcon} alt="class" className="card-image" />
              <div className="card-content">
                <h2 className="card-title">{item.title}</h2>
                <p className="card-sub">Naomi</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
