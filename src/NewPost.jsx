import { format } from 'date-fns';
import { useStoreState, useStoreActions } from "easy-peasy";
import { useNavigate } from 'react-router-dom';


function NewPost() {
    const navigate = useNavigate();

    const posts = useStoreState((state) => state.posts);
    const postTitle = useStoreState((state) => state.postTitle)
    const postBody = useStoreState((state) => state.postBody)

    const savePost = useStoreActions((actions) => actions.savePost)
    const setPostTitle = useStoreActions((actions) => actions.setPostTitle)
    const setPostBody = useStoreActions((actions) => actions.setPostBody)

    const handleSubmit = (e) => {
        e.preventDefault();
        const cDate = format(new Date(), 'MMMM dd, yyyy pp')

        const post = {
            title: postTitle,
            dateTime: cDate,
            mainContent: postBody
        }

        savePost(post)
        navigate('/')
    }

    return(
        <main className="NewPost">
            <h3>New Post</h3>
            <form className="NewPostForm" onSubmit={handleSubmit}>
                <label htmlFor="postTitle">Title: </label>
                <input 
                    autoFocus
                    type="text" 
                    id="postTitle"
                    required
                    value={postTitle}
                    onChange={(e) => setPostTitle(e.target.value)}/>
                
                <label htmlFor="postBody">Post: </label>
                <textarea 
                    id="postBody" 
                    cols="30" 
                    rows="30"
                    required
                    value={postBody}
                    onChange={(e) => setPostBody(e.target.value)}>
                </textarea>

                <button
                    type="submit">
                        Add Post
                </button>
            </form>
        </main>
    )
}

export default NewPost;