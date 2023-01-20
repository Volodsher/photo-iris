import { useState, useEffect, Fragment } from 'react';
import styles from './Gallery.module.scss';
import Spinner from '../layout/Spinner';
import Picture from '../layout/Picture';

const initialSessions = [
  {
    id: 'family',
    title: 'Family Fun',
    images: [],
  },
  {
    id: 'kids',
    title: "Kids' Celebrations",
    images: [],
  },
  {
    id: 'lovestory',
    title: 'Love Story',
    images: [],
  },
  {
    id: 'maternity',
    title: 'Maternity',
    images: [],
  },
  {
    id: 'portrait',
    title: 'Portrait',
    images: [],
  },
  {
    id: 'mini',
    title: 'Mini Session',
    images: [],
  },
  {
    id: 'smileandpaws',
    title: 'Smile and Paws',
    images: [],
  },
  {
    id: 'business',
    title: 'Business',
    images: [],
  },
  {
    id: 'wedding',
    title: 'Wedding',
    images: [],
  },
];

export default function Gallery() {
  const [sessions, setSessions] = useState(initialSessions);
  const [images, setImages] = useState(null);
  const [oneImage, setOneImage] = useState('');

  const handleOneImageUrl = (imageUrl) => {
    setOneImage(imageUrl);
  };

  const handleCleaarOneImage = () => {
    setOneImage('');
  };

  useEffect(() => {
    const newSessions = [...initialSessions];
    const getImages = () => {
      newSessions.map(async (session, ind) => {
        try {
          await fetch(`/api/gallery/${session.id}`)
            .then((res) => res.json())
            .then((data) => {
              newSessions[ind].images = data;
              // this is a temporary solution just to change the state.
              if (newSessions.length - 1 === ind) {
                setSessions(newSessions);
              }
            });
        } catch (err) {
          console.log(err.message);
        }
      });
    };
    getImages();
  }, []);

  return (
    <div style={{ paddingBottom: '3rem' }}>
      {sessions.map((session) => (
        <div key={session.id} id={session.id}>
          <h1 style={{ margin: '3rem 0' }}>{session.title}</h1>
          {session.images.length === 0 ? (
            <Spinner />
          ) : (
            <div className={styles.galleryImagesBox}>
              {session.images?.map((image, ind) => {
                return [
                  <img
                    key={ind}
                    src={`/gallery/${session.id}/${image}`}
                    className={styles.galleryImage}
                    onClick={() => handleOneImageUrl(`/gallery/${image}`)}
                  />,
                  oneImage.length > 0 && (
                    <Picture
                      clearPicture={handleCleaarOneImage}
                      picture={oneImage}
                    />
                  ),
                ];
              })}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
