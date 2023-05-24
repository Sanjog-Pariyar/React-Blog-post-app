import { createContext, useState, useEffect } from "react";
import useAxiosFetch from '../hooks/useAxiosFetch';

const DataContext = createContext({

});

export const DataProvider = ({ children }) => {

    const [posts, setPosts] = useState([]);
    const [ searchResult, setSearchResult] = useState([]);
    
    const {data, fetchError, isLoading} = useAxiosFetch('http://localhost:3500/posts')

    useEffect(() => {
        setPosts(data);
    }, [data]);


    return (
        <DataContext.Provider value={{
            posts, setPosts, fetchError, isLoading,
            searchResult, setSearchResult
        }}>
            {children}
        </DataContext.Provider>
    )
};

export default DataContext;