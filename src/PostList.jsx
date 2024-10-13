// PostList.js
import { useEffect, useState } from 'react';
import { db } from './firebaseConfig'; // Asegúrate de tener esto configurado
import { collection, getDocs } from 'firebase/firestore';

export function PostList () {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const postRef = collection(db, 'posts');
            const postDocs = await getDocs(postRef);
            const postsData = postDocs.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setPosts(postsData);
        };
        fetchPosts();
    }, []);

    return (
        <>
            {posts.map(post => (
                <article key={post.id} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
                    <p>{post.comment}</p>
                    <img src={post.imageUrl} alt={post.comment} style={{ maxWidth: '100%', height: 'auto' }} />
                    <p>{new Date(post.createdAt).toLocaleString()}</p>
                </article>
            ))}
        </>
    );
};


