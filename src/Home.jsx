import Feed from "./Feed";
import { useContext } from "react";
import DataContext from "./context/DataContext";

function Home() {

    const { searchResult, fetchError, isLoading } = useContext(DataContext)

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