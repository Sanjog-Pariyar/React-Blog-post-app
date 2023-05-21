function NewPost({ postTitle, setPostTitle, postBody, setPostBody, handleSubmit }) {
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