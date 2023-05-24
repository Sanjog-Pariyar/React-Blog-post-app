import Feed from "./Feed";
import { useStoreState } from "easy-peasy";

function Home({ fetchError, isLoading }) {

    const searchResult = useStoreState((state) => state.searchResult)

    return(
        <main className="home">

            {isLoading && <p className="statusMsg">Loading...</p> }

            {!isLoading && fetchError && <p className="statusMsg" style={{color: "red"}}>{fetchError}</p> }

            {!isLoading && !fetchError && (searchResult.length ? (
                <Feed 
                    posts = { searchResult }
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