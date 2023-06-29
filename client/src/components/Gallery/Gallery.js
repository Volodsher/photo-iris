import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from './Gallery.module.scss';
import Spinner from '../layout/Spinner';
import Picture from '../layout/Picture';
import MyButton from '../layout/MyButton/MyButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faXmark } from '@fortawesome/free-solid-svg-icons';

export default function Gallery() {
  const [screenSize, setScreenSize] = useState('.jpg');
  const { sessions, loading } = useSelector((store) => store.session);
  const [newSessions, setNewSessions] = useState([]);
  const [oneImageUrl, setOneImageUrl] = useState('');
  const [oneImage, setOneImage] = useState('');
  const [divHeight, setDivHeight] = useState(0);
  const [openSMGallery, setOpenSMGallery] = useState(false);
  const galleryRef = useRef();
  const location = useLocation();

  const openMenuGallery = () => setOpenSMGallery(!openSMGallery);
  const toggleOneImage = (id) => setOneImage(id);
  const handleCleaarOneImageUrl = () => setOneImageUrl('');

  const handleOneImageUrl = (imageUrl) => {
    const bigImageArr = imageUrl
      .split(/[-.]/g)
      .filter((imeg, ind) => ind % 2 === 0);

    let imageSize = '';
    switch (screenSize) {
      case '200.jpg':
        imageSize = '350';
        break;
      case '350.jpg':
        imageSize = '450';
        break;
      case '450.jpg':
        imageSize = '';
        break;
      default:
        imageSize = '';
    }
    const bigImageUrl = bigImageArr[0] + '-' + imageSize + '.' + bigImageArr[1];
    setOneImageUrl(bigImageUrl);
  };

  useEffect(() => {
    const updateDimension = () => {
      const realScreenSize = window.innerWidth;
      setScreenSize(
        realScreenSize < 600
          ? '200.jpg'
          : realScreenSize < 800
          ? '350.jpg'
          : realScreenSize < 1280
          ? '450.jpg'
          : '.jpg'
      );
    };

    updateDimension();
    window.addEventListener('resize', updateDimension);
    return () => window.removeEventListener('resize', updateDimension);
  }, []);

  useEffect(() => {
    const observer = new ResizeObserver(() => {
      if (galleryRef.current) setDivHeight(galleryRef.current.offsetHeight);
    });
    if (galleryRef?.current) observer.observe(galleryRef.current);

    return () => observer.disconnect();
  }, [galleryRef]);

  useEffect(() => {
    if (newSessions.length > 0) {
      const scroll = (id) => {
        const section = document.querySelector(`#${id}`);

        section.scrollIntoView({ block: 'start' });
      };
      if (
        !loading &&
        newSessions.length > 0 &&
        window.location.href.split('#').length === 2
      ) {
        scroll(window.location.href.split('#')[1]);
      }
    }
  }, [newSessions, divHeight, location, loading]);

  useEffect(() => {
    if (window.location.href.includes('#')) {
      const requestedSessions = sessions.filter((ses) => {
        return (
          ses.name.substring(0, 3) ===
          window.location.href.split('#')[1].substring(0, 3)
        );
      });

      const restSessions = sessions.filter((ses) => {
        return (
          ses.name.substring(0, 3) !==
          window.location.href.split('#')[1].substring(0, 3)
        );
      });
      setNewSessions([...requestedSessions, ...restSessions]);
    } else {
      setNewSessions(sessions);
    }
  }, [sessions]);

  return (
    <div
      ref={galleryRef}
      className={styles.gallery}
      style={{ paddingBottom: '3rem' }}
    >
      {oneImage !== '' && (
        <FontAwesomeIcon
          style={{
            position: 'fixed',
            zIndex: '102',
            color: 'var(--primary-color)',
            cursor: 'pointer',
            top: '1rem',
            right: '1rem',
          }}
          icon={faXmark}
          size="xl"
          onClick={() => toggleOneImage('')}
        />
      )}
      <div
        style={{
          position: 'sticky',
          top: '70px',
          marginTop: '0.5rem',
          marginBottom: '-1rem',
        }}
      >
        <button
          onClick={openMenuGallery}
          style={{
            display: 'lfex',
            color: 'var(--primary-color)',
            borderRadius: '1rem',
            backgroundColor: 'rgba(255, 255, 255, 0.6)',
            boxShadow: 'none',
          }}
        >
          <FontAwesomeIcon icon={faCamera} size="2x" />
          <p style={{ marginBottom: '0', marginTop: '-7px' }}>sessions</p>
        </button>
      </div>
      <div
        style={
          openSMGallery
            ? {
                display: 'flex',
                position: 'fixed',
                zIndex: '100',
                width: '100%',
                height: '100vh',
                left: '0',
                top: '0',
                justifyContent: 'flex-start',
              }
            : { display: 'none' }
        }
      >
        <div className={styles.sideMenuGallery}>
          <ul className={styles.menuSessionsList}>
            {sessions.map((el) => {
              if (el.title !== '') {
                return (
                  <li key={el.id} onClick={openMenuGallery}>
                    <Link to={`/mygallery#${el.name}`}>{el.title}</Link>
                  </li>
                );
              }
            })}
          </ul>
        </div>
        <div className={styles.shadowSessions} onClick={openMenuGallery}>
          <FontAwesomeIcon style={{ cursor: 'pointer' }} icon={faXmark} />
        </div>
      </div>
      {newSessions.length === 0 ? (
        <Spinner />
      ) : (
        newSessions.map((session) => (
          <div key={session.id} id={session.name}>
            <h1 style={{ margin: '3rem 0' }}>{session.title}</h1>
            <div key={session.id} className={styles.galleryImagesBox}>
              {session.images
                ?.filter((img) => img.split('-')[1] === screenSize)
                .map((image, ind) => {
                  return [
                    <img
                      key={ind}
                      src={`/gallery/${session.name}/${image}`}
                      className={styles.galleryImage}
                      onClick={() => {
                        handleOneImageUrl(`/gallery/${session.name}/${image}`);

                        toggleOneImage(`${session.name}${image}`);
                      }}
                      alt={`one of ${session.title} session photo`}
                    />,
                    oneImage === `${session.name}${image}` && (
                      <Picture
                        key={session.id}
                        clearPicture={handleCleaarOneImageUrl}
                        picture={oneImageUrl}
                        toggleOneImage={toggleOneImage}
                      />
                    ),
                  ];
                })}
            </div>
            {session.last === 1 && (
              <Link to={session.priceLink}>
                <MyButton borderColor="--gray-light" value="Book" />
              </Link>
            )}
          </div>
        ))
      )}
    </div>
  );
}
