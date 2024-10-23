import { sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import { auth } from "./firebaseConfig";
export function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const handleResetPassword = (e) => {
    e.preventDefault();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setMessage("¡Correo de restablecimiento enviado!");
        setError("");
      })
      .catch((error) => {
        setError("Error al enviar el correo: " + error.message);
        setMessage("");
      });
  };
  return (
    <>
      <form onSubmit={handleResetPassword}>
        <label htmlFor="email"> Introduce tu correo electronico aquí:  </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Enviar</button>
      </form>
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </>
  );
}