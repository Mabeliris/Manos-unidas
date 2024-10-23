import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RequireAuth } from './RequireAuth'; 
import { ForgotPassword } from './ForgotPassword';

import Home from './Home';
import { Login } from './Login';
import Navbar from './Navbar';
import { Auth } from './Auth';
import { About } from './About';
import { Feed } from './Feed';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta para la página principal */}
        <Route path="/" element={<Home />} />
        
        {/* Ruta para la página de inicio de sesión */}
        <Route path="Login" element={<Login />} />
        
        {/* Ruta para el componente de Navbar */}
        <Route path="Navbar" element={<Navbar />} />
        
        {/* Ruta para la autenticación */}
        <Route path="Auth" element={<Auth />} />
        
        {/* Ruta para la página "Acerca de" */}
        <Route path="About" element={<About />} />
        
        {/* Ruta para restablecer contraseña */}
        <Route path="forgot-password" element={<ForgotPassword />} />
        
        {/* Ruta protegida para el Feed, solo accesible si el usuario está autenticado */}
        <Route
          path="/Feed"
          element={
            <RequireAuth>
              <Feed />
            </RequireAuth>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
