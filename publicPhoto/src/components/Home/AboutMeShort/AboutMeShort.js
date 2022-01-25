import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MyButton from "../../MyButton/MyButton";
import styles from './AboutMeShort.module.scss';
import portret from '../../../images/portret.jpg';

export default function AboutMeShort(props) {
  const history = useNavigate();
  const handleCklick = () => history('/blog');

  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef();

  useEffect(() => {
    const newContainerRef = containerRef;
    const observer = new IntersectionObserver((entries) => {
      const [ entry ] = entries;
      setIsVisible(entry.isIntersecting);
    });
    observer.observe(newContainerRef.current)

    return () => observer.disconnect(newContainerRef)
  }, [])
  
  // const [isVisible, setVisible] = useState(false);
  // const domRef = useRef();
  // useEffect(() => {
  //   const b = domRef;
  //   const observer = new IntersectionObserver(entries => {
  //     entries.forEach(entry => {
  //         setVisible(entry.isIntersecting)
  //     });
  //   });
  //   observer.observe(b.current);
  //   return () => observer.disconnect(b);
  // }, []);

  

  return (
    <div style={{
      margin: 'auto',
      padding: '50px 0px 50px 0px',
      width: '95%'
    }}>
      <img
        style={{
          display: 'inline-block',
          width: '100%',
          maxWidth: '250px',
        }}
        className={`${styles.fadeInSection} ${ isVisible ? styles.isVisible : ''}`}
        src={portret}
        alt='Iryna&apos;s portret'
        ref={containerRef}
        //ref={domRef}
      />
      <div style={{
        display : 'inline-block',
        width: '50%',
        minWidth: '300px',
        padding: 30,
        textAlign: 'left'
      }}>
        <h1 style={{
          color: '#b08c59'
        }}>Iryna Sheremeta</h1>
        <p>
          This is something about me and what I love to do when I want to do it
          So take a seat and relax if you have time. But I belive that you actuly
          have that beautiful and dreamfool time. So lets go to speak a bit.
          I&apos;me a photographer of a big field of bright life.
        </p>
        <MyButton
          className={styles.aboutMeButton}
          borderColor='#8E8D8A'
          name="About me"
          handleCklick={handleCklick}
        />
      </div>
    </div>
  )
}
