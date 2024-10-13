import { useState } from "react";
import { db } from "./firebaseConfig"; // Asegúrate de que tu configuración de Firebase esté bien importada
import { doc, updateDoc, arrayUnion } from "firebase/firestore"; // Importa arrayUnion
import PropTypes from "prop-types";

export function CommentForm({ postId }) {
  const [comment, setComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (comment.trim() === "") {
      return; // Evitar enviar comentarios vacíos
    }

    const date = new Date();
    const createdAt = date.toISOString(); // Usar un formato de fecha ISO

    try {
      // Referencia al documento de la publicación
      const postRef = doc(db, "posts", postId);

      // Añadir el comentario al campo 'comments' del documento
      await updateDoc(postRef, {
        comments: arrayUnion({ // Usa arrayUnion directamente
          comment,
          createdAt,
        }),
      });

      setComment(""); 
    } catch (error) {
      console.error("Error al agregar el comentario: ", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Escribe un comentario..."
        required
      />
      <button type="submit">Comentar</button>
    </form>
  );
}

CommentForm.propTypes = {
  postId: PropTypes.string.isRequired,
};
