//import './Navbar.css'; // Importa tu archivo CSS

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="ruta-de-tu-logo.png" alt="Logo" />
      </div>
      <div className="navbar-links">
        <button>Home</button>
        <button>About</button>
        <button>Iniciar Sesión</button>
      </div>
    </nav>
  );
};

export default Navbar;
