import './App.css'
import Header from './Header'
import Nav from './Nav'
import Footer from './Footer'
import Home from './Home'
import NewPost from './NewPost'
import PostPage from './PostPage'
import About from './About'
import Missing from './Missing'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import { useState, useEffect } from 'react'
import { format } from 'date-fns'
import api from './api/posts'
import EditPost from './EditPost'
import useWindowSize from './hooks/useWindowSize'
import useAxiosFetch from './hooks/useAxiosFetch'


function App() {

  const [ search, setSearch ] = useState('');
  const [posts, setPosts] = useState([]);
  const [ searchResult, setSearchResult] = useState([]);
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const [ editTitle, setEditTitle ] = useState('');
  const [ editBody, setEditBody ] = useState('');
  const { width } = useWindowSize();

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



  const handleSubmit = async(e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const cDate = format(new Date(), 'MMMM dd, yyyy pp')

    const post = {
      id: id,
      title: postTitle,
      dateTime: cDate,
      body: postBody
    }

    try {
      const response = await api.post('/posts', post);

      const newPost = [...posts, response.data];
      setPosts(newPost);
      setPostTitle('');
      setPostBody('');
    } catch(err) {
      console.log(`Error: ${err.message}`);
    }
  }

  const handleEdit = async(id) => {
    const cDate = format(new Date(), 'MMMM dd, yyyy pp')

    const updatedPost = {
      id: id,
      title: editTitle,
      dateTime: cDate,
      body: editBody
    }

    try {
      const response = await api.put(`/posts/${id}`, updatedPost);
      setPosts(posts.map((post) => post.id === id ? {...response.data} : post))
      setEditTitle('');
      setEditBody('');
    } catch(err) {
      console.log(`Error: ${err.message}`);
    }
  }



  const handleDelete = async(id) => {
    try {
      await api.delete(`/posts/${id}`);
      const filteredItems = posts.filter((post) => post.id !== id );
      setPosts(filteredItems);
    } catch(err) {
      console.log(`Error: ${err.message}`);
    }
  }

  return (
      <Router>
      <div className='App'>
        <Header title = 'React JS Blog' width={width}/>
        <Nav 
          search = { search }
          setSearch = { setSearch }
        />

        <main className='main-content'>
          <Routes>
            <Route 
              path='/' 
              element={<Home 
                posts = { searchResult }
                fetchError = {fetchError}
                isLoading = {isLoading}
              />} 
            />
            <Route 
              path='/new-post' 
              element={<NewPost 
                postTitle = {postTitle}
                setPostTitle = {setPostTitle}
                postBody = {postBody}
                setPostBody = { setPostBody }
                handleSubmit = { handleSubmit }
              />} 
            />
            <Route 
              path='/edit-post/:id' 
              element={<EditPost
                posts = { posts }
                editTitle = {editTitle}
                setEditTitle = {setEditTitle}
                editBody = {editBody}
                setEditBody = { setEditBody }
                handleSubmit = { handleEdit }
              />} 
            />
            <Route 
              path='/post/:id' 
              element={<PostPage 
                posts = { posts }
                handleDelete={handleDelete}
              />} 
            />
            <Route path='/about' element={<About />} />
            <Route path='/*' element={<Missing />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App;
