import { useState, useRef, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import MyButton from '../layout/MyButton/MyButton';
import styles from './Home.module.scss';
import portrait from '../../images/portrait.jpg';

export default function AboutMeShort(props) {
  const [isVisible, setIsVisible] = useState(false);
  const [forIsVisible, setForIsVisible] = useState('old');

  const containerRef = useRef();

  useEffect(() => {
    const newContainerRef = containerRef;
    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      setForIsVisible(entry.isIntersecting);
    });
    if (forIsVisible === true) {
      setIsVisible(true);
    }
    observer.observe(newContainerRef.current);

    return () => observer.disconnect(newContainerRef);
  }, [forIsVisible]);

  return (
    <div className={styles.aboutMeContainer}>
      <div
        style={{
          margin: 'auto',
          // padding: '50px 0px 50px 0px',
        }}
      >
        <img
          className={`${styles.aboutMeImage} ${
            isVisible ? styles.isVisible : ''
          }`}
          src={portrait}
          alt="Iryna's portrait"
          ref={containerRef}
        />
        <div className={styles.abutMeTextDiv}>
          <h1
            style={{
              color: 'var(--primary-color)',
            }}
          >
            Iryna Sheremeta
          </h1>
          <p>
            Hello! My name is Iryna and I’m in love with photography. I would
            like to share this love with you by creating beautiful images of
            your life’s precious moments. I strive to make my photography
            sessions fun, friendly and cozy so that you truly enjoy the
            photoshoot itself and look forward to seeing the beauty we create
            together. If it resonates with you, feel free to chat;)
          </p>
          <Link to="/contact">
            <MyButton
              className={styles.aboutMeButton}
              borderColor="--gray-light"
              value="Contact"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
