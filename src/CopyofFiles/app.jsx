import './App.css'
import Header from './Header'
import Nav from './Nav'
import Footer from './Footer'
import Home from './Home'
import NewPost from './NewPost'
import PostPage from './PostPage'
import About from './About'
import Missing from './Missing'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { useState, useEffect } from 'react'


function App() {

  const [ search, setSearch ] = useState('');

  const [ searchResult, setSearchResult] = useState([]);

  return (
      <Router>
      <div className='App'>
        <Header title = 'React JS Blog' />
        <Nav 
          search = { search }
          setSearch = { setSearch }
        />

        <section className='main-content'>
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/new-post' element={<NewPost />} />
            <Route path='/post/:id' element={<PostPage />} />
            <Route path='/about' element={<About />} />
            <Route path='/*' element={<Missing />} />
          </Routes>
        </section>
        <Footer />
      </div>
    </Router>
  )
}

export default App;
