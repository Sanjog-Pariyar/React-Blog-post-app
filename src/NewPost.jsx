import { useState, useContext } from "react";
import DataContext from "./context/DataContext";
import api from './api/posts'
import { format } from 'date-fns';


function NewPost() {

    const [postTitle, setPostTitle] = useState('');
    const [postBody, setPostBody] = useState('');

    const { posts, setPosts } = useContext(DataContext);

    const handleSubmit = async(e) => {
        e.preventDefault();
        const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
        const cDate = format(new Date(), 'MMMM dd, yyyy pp')

        const post = {
            id: id,
            title: postTitle,
            dateTime: cDate,
            body: postBody
        }

        try {
            const response = await api.post('/posts', post);

            const newPost = [...posts, response.data];
            setPosts(newPost);
            setPostTitle('');
            setPostBody('');
        } catch(err) {
            console.log(`Error: ${err.message}`);
        }
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