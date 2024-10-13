import './Navbar.css';
import logo from './assets/logo.png';
import { Link } from "react-router-dom"; // Importa Link para la navegación

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt="Logo" className="logo-img" />
      </div>
      <div className="nav-buttons">
        {/* Envolver los botones en Link para navegación */}
        <Link to="/" className="nav-buttons">Home</Link>
        <Link to="/About" className="nav-buttons">About</Link>
        <Link to="/Login" className="nav-buttons">Iniciar Sesión</Link>
      </div>
    </nav>
  );
};

export default Navbar;
