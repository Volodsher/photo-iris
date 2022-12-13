import { useState, useEffect } from 'react';
import styles from './Home.module.scss';

import img1 from '../../slides/1.jpg';
import img2 from '../../slides/2.jpg';
import img3 from '../../slides/3.jpg';
import img4 from '../../slides/4.jpg';
import img5 from '../../slides/5.jpg';
import img6 from '../../slides/6.jpg';

let imgs = [img1, img2, img3, img4, img5, img6];
// let imgs = [
//   '/slides/1.jpg',
//   '/slides/2.jpg',
//   '/slides/3.jpg',
//   '/slides/4.jpg',
//   '/slides/5.jpg',
//   '/slides/6.jpg',
// ];

// import im1 from 'img/im1.png'
// import im2 from 'img/im2.png'
// import im3 from 'img/im3.png'

// componentDidMount() {
//     imageList = [im1, im2, im3]
//     imageList.forEach((image) => {
//         new Image().src = image
//     });
// }

export default function Slideshow() {
  const [counter, changeCounter] = useState(0);
  const [id, changeId] = useState(0);

  useEffect(() => {
    imgs.forEach((image) => {
      const img = new Image();
      img.src = image;
    });

    const picIndex = setInterval(() => {
      changeCounter((ind) => (ind === 5 ? 0 : ind + 1));
      changeId((id) => id + 1);
    }, 5000);

    return () => clearInterval(picIndex);
  }, []);

  return (
    <>
      <div
        className={styles.slideShow}
        style={{
          whiteSpace: 'nowrap',
        }}
      >
        <img
          key={id}
          className={styles.slide}
          src={imgs[counter]}
          alt="first-slide"
        />
        <img
          key={id + 1}
          className={`${styles.slide} ${styles.second}`}
          src={imgs[counter === 5 ? 0 : counter + 1]}
          alt="second-slide"
        />
      </div>
    </>
  );
}
