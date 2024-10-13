
import { useState } from "react";
import { db, storage } from './firebaseConfig'; // Asegúrate de tener esto configurado
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes } from 'firebase/storage';
import { getAuth } from 'firebase/auth';
import './PostForm.css';
export function PostForm ()  {
    const [comment, setComment] = useState('');
    const [image, setImage] = useState(null);
    const auth = getAuth();
    
    //Para postear imagenes
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!image) return;

        const storageRef = ref(storage, `images/${image.name}`);
        await uploadBytes(storageRef, image);

        // Obtener la URL de la imagen
        const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${storage.app.options.storageBucket}/o/images%2F${image.name}?alt=media`;
        
        //fecha y hora de post
        const date = new Date();
        const [month, day, year] = [
            date.getMonth() + 1, 
            date.getDate(),
            date.getFullYear(),
        ];
        const [hour, minutes, seconds] = [
            date.getHours(),
            date.getMinutes(),
            date.getSeconds(),
        ];
        const chain = `${month}/${day}/${year} ${hour}:${minutes}:${seconds}`;


        await addDoc(collection(db, 'posts'), {
            comment,
            imageUrl,
            userId: auth.currentUser.uid,
            createdAt: chain,
        });

        setComment('');
        setImage(null);
    };

    // Verificar si el usuario está autenticado
    if (!auth.currentUser) {
        return <p>Debes iniciar sesión para publicar.</p>;
    }
    return (
        <form onSubmit={handleSubmit}>
            <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="¿En qué quieres contribuir hoy?..."
                required
            />
            <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                required
            />
            <button 
                type="submit" 
                className="btn-publicar" // Aquí agregas la clase al botón
            >
                Publicar
            </button>
        </form>
    );
}    

