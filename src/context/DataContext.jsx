import { createContext, useState, useEffect } from "react";
import useAxiosFetch from '../hooks/useAxiosFetch';

const DataContext = createContext({

});

export const DataProvider = ({ children }) => {

    const [ search, setSearch ] = useState('');
    const [posts, setPosts] = useState([]);
    const [ searchResult, setSearchResult] = useState([]);
    

    const {data, fetchError, isLoading} = useAxiosFetch('http://localhost:3500/posts')


    useEffect(() => {
        setPosts(data);
    }, [data]);


    useEffect(() => {
        const filteredResult = posts.filter((post) => {
            const lowercaseBody = post.body ? post.body.toLowerCase() : '';
            const lowercaseTitle = post.title ? post.title.toLowerCase() : '';

            return lowercaseBody.includes(search.toLowerCase()) || lowercaseTitle.includes(search.toLowerCase());
    });

        setSearchResult(filteredResult.reverse());
    }, [posts, search]);


    return (
        <DataContext.Provider value={{
            search, setSearch,
            posts, setPosts, fetchError, isLoading,
            searchResult,
        }}>
            {children}
        </DataContext.Provider>
    )
};

export default DataContext;