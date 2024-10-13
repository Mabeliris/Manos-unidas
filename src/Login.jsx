import { useState } from "react";
import { auth } from "./firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); 

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        
        setError("");
        const user = userCredential.user;
        console.log("Has iniciado sesiòn correctamente:", user);
        navigate("/Feed");
      })
      .catch((error) => {
        let errorMessage;

        switch (error.code) {
          case "auth/invalid-email":
            errorMessage = "El correo electrónico no es válido.";
            console.error(errorMessage);
            break;
          case "auth/wrong-password":
            errorMessage = "La contraseña es incorrecta.";
            console.error(errorMessage);
            break;
          case "auth/user-not-found":
            errorMessage =
              "El usuario no está registrado. Verifica el correo electrónico o crea una cuenta nueva.";
            console.error(errorMessage);
            break;
          default:
            errorMessage = "Ha ocurrido un error desconocido.";
            console.error("Error desconocido:", error.code);
        }

      

        setError(errorMessage)

      })

        .finally(() => {
          setLoading(false); // Desactivar el estado de carga al final
        });
        
      
  };

  return (
    <>
      <section className="form-container">
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

          <button type="submit" className="submit-btn" disabled={loading} >
           {loading ? "Iniciando sesión..." : "Iniciar sesión"}
          </button>

          {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
      </section>
    </>
  );
}
