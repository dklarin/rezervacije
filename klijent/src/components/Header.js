import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <header className="app-header">
      <nav>
        <div className="navigacija-wrap">
          <div className="prazno"></div>
          <ul className="navigacija">
            <li>
              <Link to="/">Početna</Link>
            </li>
            <li>
              <Link to="/nova">Nova rezervacija</Link>
            </li>
            <li>
              <Link to="/kalendar">Kalendar</Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;
