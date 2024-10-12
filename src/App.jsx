import './App.css'
import { BrowserRouter, Routes, Route} from "react-router-dom";
import { Home } from './Home';
import {Login } from './Login';
import  Navbar from './Navbar';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
          
        <Route path="Login" element={<Login />} />
        
        <Route path="Navbar" element={<Navbar />} />
        
      </Routes>
    </BrowserRouter>
  );
}
export default App
//<img src={viteLogo} className="logo" alt="Vite logo" />

