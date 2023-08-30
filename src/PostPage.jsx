import { useParams, Link } from "react-router-dom";
import { useStoreState, useStoreActions } from "easy-peasy";


function PostPage() {

    const { id } = useParams();

    const deletePost = useStoreActions((actions) => actions.deletePost);
    const getPostById = useStoreState((state) => state.getPostById);

    const post = getPostById(id);

    const handleDelete = (id) => {
        deletePost(id)
    }



    return(
        <main className="postPage">
            <article className="post">
                { post && 
                    <>
                        <h4 className="title">{post.title}</h4>
                        <p>{post.dateTime}</p>
                        <p className="postBody">{post.mainContent}</p>
                        <Link to={`/edit-post/${post._id}`}>
                            <button
                                id="editPost">
                                    Edit post
                            </button>
                        </Link>
                        <button 
                            id="deletePost"
                            onClick={() => handleDelete(post._id)}>
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