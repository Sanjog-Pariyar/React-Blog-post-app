import { useParams, Link } from "react-router-dom";
import { useContext } from "react";
import DataContext from "./context/DataContext";
import api from './api/posts';

function PostPage() {

    const { posts, setPosts } = useContext(DataContext);

    const { id } = useParams();
    const post = posts.find((post) => (post.id).toString() === id);

    const handleDelete = async(id) => {
        try {
            await api.delete(`/posts/${id}`);
            const filteredItems = posts.filter((post) => post.id !== id );
            setPosts(filteredItems);
        } catch(err) {
            console.log(`Error: ${err.message}`);
        }
    }

    return(
        <main className="postPage">
            <article className="post">
                { post && 
                    <>
                        <h4 className="title">{post.title}</h4>
                        <p>{post.dateTime}</p>
                        <p className="postBody">{post.body}</p>
                        <Link to={`/edit-post/${post.id}`}>
                            <button
                                id="editPost">
                                    Edit post
                            </button>
                        </Link>
                        <button 
                            id="deletePost"
                            onClick={() => handleDelete(post.id)}>
                            Delete Post
                        </button>
                    </>
                }
                { !post && 
                    <>
                        <p style={{ marginTop: "2rem", color: "teal" }}>Deleted!</p>
                        <p><Link to={'/'}>Go to Home Page</Link></p>
                    </>
                    
                }
            </article>
        </main>
    )
}

export default PostPage;