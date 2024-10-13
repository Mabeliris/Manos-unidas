import { PostForm } from './PostForm';
import { PostList } from './PostList';
import { getAuth } from 'firebase/auth'; // Asegúrate de importar el módulo de autenticación de Firebase
import { Link } from "react-router-dom";
export function Feed() {
    const auth = getAuth();

    const handleLogout = async () => {
        try {
            await auth.signOut(); // Cerrar sesión de Firebase
            alert("Has cerrado sesión exitosamente.");
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
            alert("Hubo un error al cerrar sesión. Inténtalo de nuevo.");
        }
    };

    return (
        <>
            <h2 style={{ color: "blue" }}>Publica y sé parte de un cambio positivo</h2>
            <Link to="/"> 
            <button type="button" onClick={handleLogout}>Cerrar Sesión</button>
            </Link>
            <PostForm />
            <PostList />
        </>
    );
}
