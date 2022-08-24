import React from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Home from './components/Home/Home';
import Blog from './components/Blog/Blog';
import Sessions from './components/Sessions/Sessions';
import Gallery from './components/Gallery/Gallery';
import Inspiration from './components/Inspiration/Inspiration';
import Contact from './components/Contact/Contact';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import styles from './App.module.scss';

function App() {
  const [menuOpen, toOpenMenu] = useState(false);
  const changeMenuStatus = () => {
    toOpenMenu(!menuOpen);
  };

  return (
    <Router>
      <div className={styles.App}>
        <Header menuOpen={menuOpen} changeMenuStatus={changeMenuStatus} />
        <div>
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
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
