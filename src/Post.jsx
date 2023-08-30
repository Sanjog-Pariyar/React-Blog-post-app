import { Link } from "react-router-dom";

function Post({post}) {
    return(
        <article className="post">
                <h4 className="title">{post.title}</h4>
                <p className="postDate">{post.dateTime}</p>
            <p className="postBody" >
                {(post.mainContent)}
            </p>

            <Link to={`/post/${post._id}`}>
                    <p style={{ color: "lightseagreen",  borderBottom: '1px solid #242424', paddingBottom: '20px' }}>Read More...</p>
            </Link>
        </article>
    )
}

export default Post;