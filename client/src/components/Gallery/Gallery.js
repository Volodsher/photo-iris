import { useState, useEffect, Fragment } from 'react';
import styles from './Gallery.module.scss';
import Spinner from '../layout/Spinner';
import Picture from '../layout/Picture';

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
        .then((data) => setImages(data));
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
  /////////////////////////////////////////////////
  // const [imagesCount, setImagesCount] = useState();
  // const [arrOfImages, setArrOfImages] = useState();
  // useEffect(async () => {
  // try {
  //   const numberOfImages = await fetch('/api/gallery')
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setImagesCount(data.length);
  //       setArrOfImages(Array.from({ length: data.length - 1 }, (v, i) => i));
  //       // console.log(imagesCount);
  //     });
  // } catch (error) {
  //   console.log(error.message);
  // }
  // }, []);

  // console.log(arrOfImages);

  // return (
  //   <div>
  //     <ul>
  //       {arrOfImages &&
  //         arrOfImages.map((img, ind) => (
  //           <li key={ind}>
  //             <img src={`/gallery/${img}.jpg`} key={ind} />
  //           </li>
  //         ))}
  //     </ul>
  //   </div>
  // );
}
