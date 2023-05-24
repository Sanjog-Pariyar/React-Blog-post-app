import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import DataContext from "./context/DataContext";

function Nav() {

    const [ search, setSearch ] = useState('');

    const { posts, setSearchResult } = useContext(DataContext);

    useEffect(() => {
        const filteredResult = posts.filter((post) => {
        const lowercaseBody = post.body ? post.body.toLowerCase() : '';
        const lowercaseTitle = post.title ? post.title.toLowerCase() : '';

        return lowercaseBody.includes(search.toLowerCase()) || lowercaseTitle.includes(search.toLowerCase());
    });

        setSearchResult(filteredResult.reverse());
    }, [posts, search]);
    
    return(
        <nav className="nav">
            <form className="searchForm" onSubmit={(e) => e.preventDefault()}>
                <input 
                    type="text" 
                    id="search"
                    placeholder="Search Posts"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}/>
            </form>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/new-post">Post</Link></li>
                <li><Link to="/about">About</Link></li>
            </ul>
        </nav>
        
    )
}

export default Nav;