import Feed from "./Feed";

function Home({ posts, fetchError, isLoading }) {
    return(
        <main className="home">

            {isLoading && <p className="statusMsg">Loading...</p> }

            {!isLoading && fetchError && <p className="statusMsg" style={{color: "red"}}>{fetchError}</p> }

            {!isLoading && !fetchError && (posts.length ? (
                <Feed 
                    posts = { posts }
                />
            ): (
                <p className="statusMsg"
                    style={{ marginTop: "2rem" , borderWidth: '0' }}>
                        No Posts Available
                </p>
            ))}

        </main>
    )
}

export default Home;