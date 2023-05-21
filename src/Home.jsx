import Feed from "./Feed";

function Home({ posts }) {
    return(
        <main className="home">

            { posts.length ? (
                <Feed 
                    posts = { posts }
                />
            ): (
                <p
                    style={{ marginTop: "2rem" , borderWidth: '0' }}>
                        No Posts Available
                </p>
            )}

        </main>
    )
}

export default Home;