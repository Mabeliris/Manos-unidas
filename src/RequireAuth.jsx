import { useLocation, Navigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

export function RequireAuth({ children }) {
  const location = useLocation();
  const auth = getAuth();
  const [authenticated, setAuthenticated] = useState(null); // Estado para manejar la autenticación

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setAuthenticated(!!user); // Actualiza el estado según si hay un usuario autenticado
    });

    // Limpiar el listener al desmontar el componente
    return () => unsubscribe();
  }, [auth]);

  // Si el estado de autenticación aún está cargando
  if (authenticated === null) {
    return <div>Loading...</div>; // O un spinner, según prefieras
  }

  // Si el usuario está autenticado, muestra el contenido protegido
  return authenticated ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
}

RequireAuth.propTypes = {
  children: PropTypes.node.isRequired,
};
