import { Link } from "react-router-dom";
import "../styles/Home.css";

const items = [
  { id: 1, title: "Mathematics - Class 1A", color: "#FFE066", image: "/assets/math.png" },
  { id: 2, title: "Science - Class 6C", color: "#A2DED0", image: "/assets/science.png" },
  { id: 3, title: "Music - Class 4B", color: "#E6EE9C", image: "/assets/music.png" },
  { id: 4, title: "Sport - Class 1C", color: "#FF6B6B", image: "/assets/sport.png" },
  { id: 5, title: "English - Class 1A", color: "#FFD54F", image: "/assets/english.png" },
];

export default function Home() {
  return (
    <div className="home-container">
      <h1 className="title">Hi, Naomi!</h1>
      <p className="subtitle">Your Classes</p>
      <div className="card-list">
        {items.map((item) => (
          <Link to={`/item/${item.id}`} key={item.id} className="card-link">
            <div className="card" style={{ backgroundColor: item.color }}>
              <img src={item.image} alt="class" className="card-image" />
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
