import { useState, useEffect, Fragment } from 'react';
import styles from './Gallery.module.scss';
import Spinner from '../layout/Spinner';
import Picture from '../layout/Picture';

const sessions = [
  {
    id: 'family',
    title: 'Family Fun',
  },
  {
    id: 'kids',
    title: "Kids' Celebrations",
  },
  {
    id: 'lovestory',
    title: 'Love Story',
  },
  {
    id: 'maternity',
    title: 'Maternity',
  },
  {
    id: 'portrait',
    title: 'Portrait',
  },
  {
    id: 'mini',
    title: 'Mini Session',
  },
  {
    id: 'smileandpaws',
    title: 'Smile and Paws',
  },
  {
    id: 'business',
    title: 'Business',
  },
  {
    id: 'wedding',
    title: 'Wedding',
  },
];

export default function Gallery() {
  const [images, setImages] = useState(null);
  const [oneImage, setOneImage] = useState('');

  const handleOneImageUrl = (imageUrl) => {
    setOneImage(imageUrl);
  };

  const handleCleaarOneImage = () => {
    setOneImage('');
  };

  useEffect(async () => {
    try {
      await fetch('/api/gallery/')
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setImages(data);
        });
    } catch (error) {
      console.error(error.message);
    }
  }, []);

  return images === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className={styles.galleryImagesBox}>
        {images.map((image, ind) => {
          return [
            <img
              key={ind}
              src={`/gallery/${image}`}
              className={styles.galleryImage}
              onClick={() => handleOneImageUrl(`/gallery/${image}`)}
            />,
            oneImage.length > 0 && (
              <Picture clearPicture={handleCleaarOneImage} picture={oneImage} />
            ),
          ];
        })}
      </div>
    </Fragment>
  );
}
