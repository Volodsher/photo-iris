import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MyButton from '../../layout/MyButton/MyButton';
import styles from './AboutMeShort.module.scss';
import portret from '../../../images/portret.jpg';

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
    <div
      style={{
        margin: 'auto',
        padding: '50px 0px 50px 0px',
        width: '95%',
      }}
    >
      <img
        style={{
          display: 'inline-block',
          width: '100%',
          maxWidth: '250px',
        }}
        className={`${styles.fadeInSection} ${
          isVisible ? styles.isVisible : ''
        }`}
        src={portret}
        alt="Iryna's portret"
        ref={containerRef}
      />
      <div
        style={{
          display: 'inline-block',
          width: '50%',
          minWidth: '300px',
          padding: 30,
          textAlign: 'left',
        }}
      >
        <h1
          style={{
            color: 'var(--primary-color)',
          }}
        >
          Iryna Sheremeta
        </h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
        <Link to="/photo-iris-react/blog">
          <MyButton
            className={styles.aboutMeButton}
            borderColor="--light-gray"
            value="My Blog"
          />
        </Link>
      </div>
    </div>
  );
}
