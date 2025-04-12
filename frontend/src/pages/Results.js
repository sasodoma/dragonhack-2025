import { Link } from "react-router-dom";
import "../styles/Home.css";


export default function Home() {
  return (
    <div>
        <Link to="/" className="back-button">&larr; Back</Link>
    </div>
  );
}
