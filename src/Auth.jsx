import { useState } from "react";
import { auth } from "./firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

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
        
        // Navegar a la página de inicio de sesión después de un registro exitoso
        navigate("/Login");
      })
      .catch((error) => {
        setError(error.message);
        setSuccess(false);
      });
  };

  return (
    <div className="auth-container">
      <div className="form-container">
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
      </div>
    </div>
  );
}
