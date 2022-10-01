import React from 'react';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import ScrollToTop from './components/ScrollToTop';
import Home from './components/Home/Home';
import Blog from './components/Blog/Blog';
import Sessions from './components/Sessions/Sessions';
import Gallery from './components/Gallery/Gallery';
import Inspiration from './components/Inspiration/Inspiration';
import Contact from './components/Contact/Contact';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import NotFound from './components/layout/NotFound';
import Login from './components/auth/Login';
import Post from './components/Blog/Post';
import PostForm from './components/Blog/PostForm';
// import styles from './App.module.scss';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './features/authSlice';
import { useDispatch, useSelector } from 'react-redux';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  const auth = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const [menuOpen, toOpenMenu] = useState(false);
  const changeMenuStatus = () => {
    toOpenMenu(!menuOpen);
  };

  useEffect(() => {
    dispatch(loadUser());
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <div className="app">
        <Header menuOpen={menuOpen} changeMenuStatus={changeMenuStatus} />
        <div className="main">
          <Routes>
            <Route exact path="/photo-iris-react/" element={<Home />} />
            <Route exact path="/photo-iris-react/blog" element={<Blog />} />
            <Route path="/photo-iris-react/sessions" element={<Sessions />} />
            <Route path="/photo-iris-react/gallery" element={<Gallery />} />
            <Route
              path="/photo-iris-react/inspiration"
              element={<Inspiration />}
            />
            <Route path="/photo-iris-react/contact" element={<Contact />} />
            <Route path="/photo-iris-react/posts/:id" element={<Post />} />
            <Route path="/photo-iris-react/vhid" element={<Login />} />
            <Route
              path="/photo-iris-react/posts/postForm"
              element={<PostForm />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
