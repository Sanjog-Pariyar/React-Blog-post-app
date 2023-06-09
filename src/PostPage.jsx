import { useParams, Link } from "react-router-dom";

function PostPage({ posts, handleDelete }) {

    const { id } = useParams();
    const post = posts.find((post) => (post.id).toString() === id);

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
                        <p style={{ marginTop: "2rem", color: "teal" }}>No Post Available</p>
                        <p><Link to={'/'}>Go to Home Page</Link></p>
                    </>
                    
                }
            </article>
        </main>
    )
}

export default PostPage;