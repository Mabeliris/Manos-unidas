// Home.js
import banner from './assets/banner.jpg';
import Navbar from './Navbar';
import './Home.css';
import { Link } from "react-router-dom"; // Importa Link para la navegación

const Home = () => {
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <div className="home-container">
        <div className="image-container">
          <img src={banner} className="banner" alt="banner" />
          <div className="text-overlay">
            <h1>Bienvenidos a Manos Unidas</h1>
            <h2>Únete a nosotros y forma parte de una red de voluntarios comprometidos con el cambio.</h2>
          </div>
        </div>
        <Link to="/auth" className="register-button">Regístrate</Link> {/* Aquí aplicamos la clase */}
      </div>
    </div>
  );
};

export default Home;

