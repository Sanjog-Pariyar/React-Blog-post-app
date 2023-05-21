import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";


function EditPost({ posts, handleEdit, editTitle, setEditTitle, editBody, setEditBody }) {

    const { id } = useParams();
    const post = posts.find((post) => (post.id).toString() === id)

    useEffect(() => {
        if (post) {
            setEditTitle(post.title);
            setEditBody(post.body)
        }
    }, [post, setEditTitle, setEditBody])

    return(
        <main className="NewPost">
            {editTitle &&
            <>
                <h3>Edit Post</h3>
                <form className="NewPostForm" onSubmit={(e) => e.preventDefault()}>
                    <label htmlFor="postTitle">Title: </label>
                    <input 
                        autoFocus
                        type="text" 
                        id="postTitle"
                        required
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}/>
                    
                    <label htmlFor="postBody">Post: </label>
                    <textarea 
                        id="postBody" 
                        cols="30" 
                        rows="10"
                        required
                        value={editBody}
                        onChange={(e) => setEditBody(e.target.value)}>
                    </textarea>

                    <button
                        type="submit"
                        onClick={() => handleEdit(post.id)}>
                            Add Post
                    </button>
                </form>
            </>
            }
            {!editTitle && 
                <>
                    <p style={{ marginTop: "2rem", color: "teal" }}>No Post Available</p>
                    <p><Link to={'/'}>Go to Home Page</Link></p>
                </>
            }
        </main>
    )
}

export default EditPost;