import './App.css'
import { BrowserRouter, Routes, Route} from "react-router-dom";
import { RequireAuth } from './RequireAuth'; // Asegúrate de que la ruta sea correcta

import Home from './Home';
import {Login } from './Login';
import  Navbar from './Navbar';
import { Auth } from './Auth';
import { About }from './About';
import { Feed } from './feed';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>          
        <Route path="Login" element={<Login />} />        
        <Route path="Navbar" element={<Navbar />} />
        <Route path="Auth" element={<Auth />} />
        <Route path="About" element={<About />} />
        <Route 
  path="/Feed" 
  element={
    <RequireAuth>
      <Feed />
    </RequireAuth>
  }
></Route>

        
      </Routes>
    </BrowserRouter>
  );
}
export default App
//<img src={viteLogo} className="logo" alt="Vite logo" />

