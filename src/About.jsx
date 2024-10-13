import Navbar from './Navbar';
import voluntarios from './assets/voluntarios.jpg';
import './About.css';

export function About() {
  return (
    <div className="about-container"> {/* Clase para el contenedor principal */}
      <header>
        <Navbar />
      </header>
      <div className="about-content"> {/* Clase para el contenido principal */}
        <p className="about-text"> {/* Clase para el párrafo */}
          Nuestra misión es conectar a personas apasionadas con oportunidades de voluntariado que generen un impacto positivo en sus comunidades.
          En Manos Unidas, creemos que juntos podemos construir un mundo más solidario, inclusivo y lleno de esperanza.

          A través de nuestra plataforma, podrás encontrar proyectos locales donde tu tiempo y habilidades pueden marcar la diferencia. 
          Ya sea que quieras colaborar en iniciativas ambientales o contribuir con mejora de espacios, estamos aquí para facilitar tu camino hacia el voluntariado.

          ¡Tu ayuda importa y puede transformar vidas!
        </p>
        <img src={voluntarios} className="voluntarios" alt="voluntarios" />
      </div>
    </div>
  );
}
