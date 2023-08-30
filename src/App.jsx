import './App.css'
import Header from './Header'
import Nav from './Nav'
import Footer from './Footer'
import Home from './Home'
import NewPost from './NewPost'
import PostPage from './PostPage'
import About from './About'
import Missing from './Missing'
import EditPost from './EditPost'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import { useEffect } from 'react'
import useAxiosFetch from './hooks/useAxiosFetch'
import { useStoreActions } from 'easy-peasy'


function App() {

  const setPosts = useStoreActions((actions) => actions.setPosts)

  const {data, fetchError, isLoading} = useAxiosFetch('http://localhost:3000/api/v1/blogs')

  useEffect(() => {
      setPosts(data);
  }, [data, setPosts]);

  return (
      <Router>
        <div className='App'>
          <Header title = 'React JS Blog'/>
            <Nav />
            <main className='main-content'>
              <Routes>
                <Route path='/' element={<Home 
                  isLoading = {isLoading}
                  fetchError = {fetchError}
                />} />
                <Route path='/new-post' element={<NewPost />} />
                <Route path='/edit-post/:id' element={<EditPost />} />
                <Route path='/post/:id' element={<PostPage />} />
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
