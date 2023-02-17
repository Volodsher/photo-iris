import React from 'react';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import ScrollToTop from './components/ScrollToTop';
import Home from './components/Home/Home';
import Blog from './components/Blog/Blog';
import Sessions from './components/Sessions/Sessions';
import Gallery from './components/Gallery/Gallery';
// import Inspiration from './components/Inspiration/Inspiration';
import Contact from './components/Contact/Contact';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import NotFound from './components/layout/NotFound';
import Login from './components/auth/Login';
import Post from './components/Blog/Post';
import PostForm from './components/Blog/PostForm';
import Pricing from './components/Pricing/Pricing';
import setAuthToken from './utils/setAuthToken';
import ScrollButton from './components/layout/ScrollButton';
import { loadUser } from './features/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getSessionAction } from './features/sessionsSlice';
import 'bootstrap/dist/css/bootstrap.min.css';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  const { sessions, loading } = useSelector((store) => store.session);
  const auth = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const [menuOpen, toOpenMenu] = useState(false);
  const changeMenuStatus = () => {
    toOpenMenu(!menuOpen);
  };

  useEffect(() => {
    dispatch(loadUser());
    dispatch(getSessionAction());
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <div className="app">
        <Header menuOpen={menuOpen} changeMenuStatus={changeMenuStatus} />
        <main className="main">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
            {/* <Route exact path="/blog" element={<Blog />} /> */}
            {/* <Route path="/sessions" element={<Sessions />} /> */}
            <Route path="/posts/:id" element={<Post />} />
            <Route path="/vhid" element={<Login />} />
            <Route path="/posts/postForm" element={<PostForm />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <ScrollButton />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
