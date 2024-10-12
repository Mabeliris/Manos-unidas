import { useState } from "react";
import { auth } from "./firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import login from "./assets/login1.png";
import Grid from "@mui/material/Grid2";

export function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
      })
      .catch((error) => {
        setError(error.message);
        setSuccess(false);
      });
  };

  return (
    <>
      {/* Contenedor del formulario y la imagen */}
      <Grid container spacing={2} alignItems="center" justifyContent="center">
        {/* Formulario a la izquierda */}
        <Grid item xs={12} md={6}>
          <Box
            component="form"
            onSubmit={handleRegister}
            sx={{
              "& .MuiTextField-root": {
                m: 1,
                width: "25ch",
                display: "flex",
                flexDirection: "column",
              },
              marginLeft: "20%",
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              type="email"
              id="email"
              value={email}
              variant="standard"
              label="Email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <TextField
              type="password"
              id="password"
              value={password}
              variant="standard"
              label="Contraseña"
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <Button variant="contained" type="submit">
              Registrarse
            </Button>

            {success && (
              <p style={{ color: "green" }}>¡Usuario registrado con éxito!</p>
            )}
            {error && <p style={{ color: "red" }}>Ingrese sus datos </p>}
          </Box>
        </Grid>

        {/* Imagen a la derecha */}
        <Grid item xs={12} md={6}>
          <img
            src={login}
            className="login"
            alt="icono_login"
            style={{ width: "100%" }} // Asegura que la imagen se ajuste al ancho del contenedor
          />
        </Grid>
      </Grid>
    </>
  );
}
