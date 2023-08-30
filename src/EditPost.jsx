import { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { format } from 'date-fns';
import { useStoreActions, useStoreState } from "easy-peasy";


function EditPost() {

    const navigate = useNavigate();

    const editTitle = useStoreState((state) => state.editTitle);
    const editBody = useStoreState((state) => state.editBody);

    const editPost = useStoreActions((actions) => actions.editPost)
    const setEditTitle = useStoreActions((actions) => actions.setEditTitle);
    const setEditBody = useStoreActions((actions) => actions.setEditBody);

    const { id } = useParams();
    const getPostById = useStoreState((state) => state.getPostById);
    const post = getPostById(id);


    useEffect(() => {
        if (post) {
            setEditTitle(post.title);
            setEditBody(post.mainContent)
        }
    }, [post, setEditTitle, setEditBody])


    const handleEdit = (id) => {
        const cDate = format(new Date(), 'MMMM dd, yyyy pp')

        const updatedPost = {
            id: post._id,
            title: editTitle,
            dateTime: cDate,
            mainContent: editBody
        }

        editPost(updatedPost);

        navigate(`/post/${id}`)
    }

    return(
        <main className="NewPost">
            {editTitle &&
            <>
                <h3>Edit Post</h3>
                <form className="NewPostForm" onSubmit={(e) => {
                    e.preventDefault()
                    handleEdit(post._id)
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