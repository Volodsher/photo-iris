// import React from 'react';
// import { useState, useEffect} from 'react';
// import styles from './AppExample.module.scss';
////////////////////////////////////////////////////////
import React from 'react';
import { useState } from 'react';
//import { useState, useRef, useEffect } from 'react';
// import styles from './AppExample.module.scss';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './components/Home/Home';
import Blog from './components/Blog/Blog';
import Sessions from './components/Sessions/Sessions';
import Gallery from './components/Gallery/Gallery';
import Inspiration from './components/Inspiration/Inspiration';
import Contact from './components/Contact/Contact';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import styles from './App.module.scss';

function App() {
  const [menuOpen, toOpenMenu] = useState(false);

  const changeMenuStatus = () => {
    toOpenMenu(!menuOpen);
  };

  // const [isVisible, setVisible] = useState(true);
  // const domRef = useRef();
  // useEffect(() => {
  //   const b = domRef;
  //   const observer = new IntersectionObserver(entries => {
  //     entries.forEach(entry => {
  //       console.log(entry.isIntersecting);
  //       //if (entry.isIntersecting) {
  //         setVisible(entry.isIntersecting)
  //       //}
  //     });
  //   });
  //   observer.observe(domRef.current);
  //   return () => observer.unobserve(b);
  // }, []);

  return (
    <Router>
      <div className={styles.App}>
        <Header menuOpen={menuOpen} changeMenuStatus={changeMenuStatus} />
        <div>
          <Routes>
            {/* <Route exact path="/" element={<Home isVisible={isVisible} domRef={domRef} />} /> */}
            <Route exact path="/" element={<Home />} />
            <Route exact path="/blog" element={<Blog />} />
            <Route path="/sessions" element={<Sessions />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/inspiration" element={<Inspiration />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

////////////////////////////////////////////////////////////
// function App() {
//   const [counter, changeCounter] = useState(1);
//   const [id, changeId] = useState(0);

//   useEffect(() => {
//     const picIndex = setInterval(() => {
//       changeCounter((ind) => ind === 6 ? 1 : ind + 1);
//       changeId(id => id + 1);
//     }, 3000);

//     return () => clearInterval(picIndex);
//   }, [])

//   return (
//   <>
//     <div style={{
//       whiteSpace: 'nowrap'
//     }}>
//       <img
//         key={id}
//         style={{
//           display: 'inline-block',
//           width: '100%',
//         }}
//         //className={`${styles.slide} ${styles.first}`}
//         src={`/images/${counter}.jpg`}
//         alt="first-slide"
//       />
//       <img
//         key={id + 1}
//         style={{
//           display: 'inline-block',
//           width: '100%',
//           transform: 'translateX(-100%)'
//         }}
//         //className={`${styles.slide} ${styles.second}`}
//         className={styles.second}
//         src={`/images/${counter === 6 ? 1 : counter + 1}.jpg`}
//         alt="second-slide"
//       />
//     </div>
//   </>
//   )
// }
/////////////////////////////////////////////////////////////

// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
