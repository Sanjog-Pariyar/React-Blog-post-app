import { useEffect, useContext, useState } from "react";
import { useParams, Link } from "react-router-dom";
import DataContext from "./context/DataContext";
import api from './api/posts';
import { format } from 'date-fns';


function EditPost() {

    const [ editTitle, setEditTitle ] = useState('');
    const [ editBody, setEditBody ] = useState('');

    const { posts, setPosts } = useContext(DataContext);

    const { id } = useParams();
    const post = posts.find((post) => (post.id).toString() === id)

    useEffect(() => {
        if (post) {
            setEditTitle(post.title);
            setEditBody(post.body)
        }
    }, [post, setEditTitle, setEditBody])

    const handleEdit = async(id) => {
        const cDate = format(new Date(), 'MMMM dd, yyyy pp')

        const updatedPost = {
            id: id,
            title: editTitle,
            dateTime: cDate,
            body: editBody
        }

        try {
            const response = await api.put(`/posts/${id}`, updatedPost);
            setPosts(posts.map((post) => post.id === id ? {...response.data} : post))
            setEditTitle('');
            setEditBody('');
        } catch(err) {
            console.log(`Error: ${err.message}`);
        }
        }

    return(
        <main className="NewPost">
            {editTitle &&
            <>
                <h3>Edit Post</h3>
                <form className="NewPostForm" onSubmit={(e) => {
                    e.preventDefault()
                    handleEdit(post.id)
                }}>
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

                    <button>Submit</button>
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