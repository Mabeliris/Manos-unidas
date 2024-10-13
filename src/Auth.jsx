import { useState } from "react";
import { auth } from "./firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import logo from './assets/logo.png';


export function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setSuccess(true);
        setError(null);
        const user = userCredential.user;
        console.log("Usuario registrado:", user);

        // Mostrar alerta de éxito
        alert("¡Usuario registrado con éxito! Por favor, inicia sesión.");
        
        // Navegar a la página de inicio de sesión después de un registro exitoso
        navigate("/Login");
      })
      .catch((error) => {
        let errorMessage;

        switch (error.code) {
          case 'auth/invalid-email':
            errorMessage = "El correo electrónico no es válido.";
            console.error(errorMessage);
            break;
          case 'auth/invalid-password':
            errorMessage = "La contraseña debe tener al menos seis caracteres.";
            console.error(errorMessage);
            break;
          case 'auth/email-already-exists':
            errorMessage = "El correo electrónico ya está registrado.";
            console.error(errorMessage);
            break;
          default:
            errorMessage = "Ha ocurrido un error desconocido.";
            console.error("Error desconocido:", error.code);
        }
      


        setError(error.message);
        setSuccess(false);
      });
  };

  return (

    <>
      <section className="form-container">
      <img src={logo} alt="Descripción de la imagen" className="login-image" />

        <form onSubmit={handleRegister} className="auth-form">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="submit-btn">
            Registrarse
          </button>

          {success && (
            <p style={{ color: "green" }}>¡Usuario registrado con éxito!</p>
          )}
          {error && <p style={{ color: "red" }}>Ingrese sus datos </p>}
        </form>
      </section>
    </>
  );
}
