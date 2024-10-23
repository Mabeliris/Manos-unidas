import { useState } from "react";
import { auth } from "./firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import "./Login.css";
import logo from "./assets/logo.png";
import { useNavigate } from "react-router-dom";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setSuccess(true);
        setError("");
        const user = userCredential.user;
        console.log("Has iniciado sesión correctamente:", user);

        alert("¡Has iniciado sesión correctamente.");

        navigate("/Feed");
      })
      .catch((error) => {
        console.error("Error de Firebase:", error);
        switch (error.code) {
          case "auth/invalid-email":
            setError("El correo electronico no es válido.");
            break;
          case "auth/wrong-password":
            setError("La contraseña es incorrecta.");
            break;
          case "auth/weak-password":
            setError("La contraseña debe tener al menos seis caracteres.");
            break;
          case "auth/user-not-found":
            setError(
              "El usuario no está registrado. Verifica el correo electrónico o crea una cuenta nueva."
            );
            break;
          case "auth/too-many-requests":
            setError(
              "Demasiados intentos de inicio de sesión fallidos. Por favor, intenta restablecer tu contraseña o intenta más tarde."
            );
            break;
          default:
            setError("Ha ocurrido un error desconocido.");
            break;
        }
        setSuccess(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleForgotPassword = () => {
    navigate("/forgot-password"); // Redirige a la página de restablecimiento de contraseña
  };

  return (
    <div className="form-wrapper">
      <section className="form-container">
        <img src={logo} alt="Descripción de la imagen" className="login-image" />
        <form onSubmit={handleLogin} className="auth-form">
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

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Iniciando sesión..." : "Iniciar sesión"}
          </button>

          {/* Botón de "Olvidaste tu contraseña" */}
          <button
            type="button"
            className="forgot-password-btn"
            onClick={handleForgotPassword}
          >
            ¿Olvidaste tu contraseña?
          </button>

          {success && (
            <p style={{ color: "green" }}>
              ¡Has iniciado sesión correctamente!
            </p>
          )}
          {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
      </section>
    </div>
  );
}
