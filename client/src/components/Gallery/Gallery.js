import { useState, useEffect, useRef, Fragment } from 'react';
import { Link } from 'react-router-dom';
import styles from './Gallery.module.scss';
import Spinner from '../layout/Spinner';
import Picture from '../layout/Picture';
import MyButton from '../layout/MyButton/MyButton';

const galleryTitle = [
  'Family Fun',
  "Kids' Adventure",
  'Love Story',
  'Maternity',
  'Portrait',
  'Mini Session',
  'Smiles and Paws',
  'Business',
  'Wedding',
  'Food Feast',
  'Art',
];

export default function Gallery() {
  const [sessions, setSessions] = useState([]);
  const [oneImage, setOneImage] = useState('');
  const [divHeight, setDivHeight] = useState(0);
  const galleryRef = useRef();

  const handleOneImageUrl = (imageUrl) => {
    setOneImage(imageUrl);
  };

  const handleCleaarOneImage = () => {
    setOneImage('');
  };

  useEffect(() => {
    const observer = new ResizeObserver(() => {
      if (galleryRef.current) setDivHeight(galleryRef.current.offsetHeight);
    });
    if (galleryRef?.current) observer.observe(galleryRef.current);

    return () => observer.disconnect();
  }, [galleryRef]);

  useEffect(async () => {
    try {
      await fetch('/api/gallery/')
        .then((res) => res.json())
        .then((data) => {
          setSessions(data);
        });
    } catch (error) {
      console.error(error.message);
    }
  }, []);

  useEffect(() => {
    if (sessions.length > 0) {
      const scroll = (id) => {
        const section = document.querySelector(`#${id}`);
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      };
      if (window.location.href.split('#').length === 2) {
        scroll(window.location.href.split('#')[1]);
      }
    }
  }, [sessions, divHeight]);

  return (
    <div ref={galleryRef} style={{ paddingBottom: '3rem' }}>
      {sessions.length === 0 ? (
        <Spinner />
      ) : (
        sessions.map((session) => (
          <div key={session.id} id={session.id}>
            <h1 style={{ margin: '3rem 0' }}>{session.title}</h1>
            <div key={session.id} className={styles.galleryImagesBox}>
              {session.images?.map((image, ind) => {
                return [
                  <img
                    key={ind}
                    src={`/gallery/${session.id}/${image}`}
                    className={styles.galleryImage}
                    onClick={() =>
                      handleOneImageUrl(`/gallery/${session.id}/${image}`)
                    }
                  />,
                  oneImage.length > 0 && (
                    <Picture
                      key={session.id}
                      clearPicture={handleCleaarOneImage}
                      picture={oneImage}
                    />
                  ),
                ];
              })}
            </div>
            {session.last && (
              <Link to={session.link}>
                <MyButton borderColor="--gray-light" value="Book" />
              </Link>
            )}
          </div>
        ))
      )}
    </div>
  );
  // );
}
