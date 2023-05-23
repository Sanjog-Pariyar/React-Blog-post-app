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
import { DataProvider } from './context/DataContext'


function App() {

  return (
      <Router>
        <div className='App'>
            <Header title = 'React JS Blog'/>
            <DataProvider>
              <Nav />
              <main className='main-content'>
                <Routes>
                  <Route path='/' element={<Home />} />
                  <Route path='/new-post' element={<NewPost />} />
                  <Route path='/edit-post/:id' element={<EditPost />} />
                  <Route path='/post/:id' element={<PostPage />} />
                  <Route path='/about' element={<About />} />
                  <Route path='/*' element={<Missing />} />
                </Routes>
              </main>
            </DataProvider>
            <Footer />
        </div>
    </Router>
  )
}

export default App;
