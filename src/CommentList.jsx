import { useEffect, useState } from "react";
import { db } from "./firebaseConfig";
import { doc, getDoc } from "firebase/firestore"; // Importa getDoc
import PropTypes from "prop-types";

export function CommentList({ postId }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true); // Para manejar el estado de carga
  const [error, setError] = useState(null); // Para manejar errores

  useEffect(() => {
    const fetchComments = async () => {
      try {
        // Referencia al documento de la publicación
        const postRef = doc(db, "posts", postId);
        const postDoc = await getDoc(postRef); // Obtener el documento de la publicación

        if (postDoc.exists()) {
          const postData = postDoc.data();
          setComments(postData.comments || []); // Establece los comentarios o un array vacío
        } else {
          console.log("El documento no existe");
          setComments([]); // Si no existe el documento, aseguramos que comments sea un array vacío
        }
      } catch (error) {
        console.error("Error al obtener comentarios: ", error);
        setError("Error al cargar comentarios"); // Manejo de errores
      } finally {
        setLoading(false); // Se termina la carga
      }
    };

    fetchComments();
  }, [postId]);

  if (loading) return <p>Cargando comentarios...</p>; // Mensaje de carga
  if (error) return <p>{error}</p>; // Mensaje de error

  return (
    <>
      {comments.map((comment, index) => (
        <article
          key={index} // Usar index como clave si no hay un id único
          style={{
            marginBottom: "10px",
            border: "1px solid #ccc",
            padding: "5px",
          }}
        >
          <p>{comment.comment}</p>
          <p>{comment.createdAt}</p>
        </article>
      ))}
    </>
  );
}

CommentList.propTypes = {
  postId: PropTypes.string.isRequired,
};
