// import { useState, useEffect } from 'react';
import { Fragment } from 'react';
import styles from './Sessions.module.scss';

const sessionData = [
  {
    name: 'Family',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim adminim veniam, quis nostrud exercitation ullamco laboris nisi utaliquip ex ea commodo consequat.',
    images: [
      `/sessions/fam/fam0.jpg`,
      `/sessions/fam//fam14.jpg`,
      `/sessions/fam//fam16.jpg`,
      `/sessions/fam//fam13.jpg`,
    ],
  },
  {
    name: 'Portrait',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim adminim veniam, quis nostrud exercitation ullamco laboris nisi utaliquip ex ea commodo consequat.',
    images: [
      `/sessions/portrait/port9.JPG`,
      `/sessions/portrait/port11.JPG`,
      `/sessions/portrait/port7.jpg`,
      `/sessions/portrait/port6.jpg`,
    ],
  },
  {
    name: 'In the moment',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim adminim veniam, quis nostrud exercitation ullamco laboris nisi utaliquip ex ea commodo consequat.',
    images: [
      `/sessions/inthemoment/int6.jpg`,
      `/sessions/inthemoment/int0.jpg`,
      `/sessions/inthemoment/int2.jpg`,
      `/sessions/inthemoment/int11.jpg`,
    ],
  },
  {
    name: 'Charm',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim adminim veniam, quis nostrud exercitation ullamco laboris nisi utaliquip ex ea commodo consequat.',
    images: [
      `/sessions/chandfam/chan5.jpg`,
      `/sessions/chandfam/chan1.jpg`,
      `/sessions/chandfam/chan11.jpg`,
      `/sessions/chandfam/chan12.jpg`,
    ],
  },
];

export default function Sessions() {
  return (
    <Fragment>
      {sessionData.map((session, index) => {
        return (
          <div
            key={index}
            className={`${styles.sessionContainer} ${
              index % 2 === 0 && styles.backgroundColor
            }`}
          >
            <h1>{session.name}</h1>
            <p
              className="global-shortExplanation"
              style={{
                color: 'var(--gray-dark)',
                textAlign: 'left',
              }}
            >
              {session.text}
            </p>
            <div className={styles.sessionImagesBox}>
              {session.images.map((image, ind) => {
                return (
                  <img key={ind} src={image} className={styles.sessionsImage} />
                );
              })}
            </div>
          </div>
        );
      })}
    </Fragment>
  );
}

// export default function Sessions() {
//   return (
//     <Fragment>
//       <div>
//         <h1>Family</h1>
//         <p
//           className="global-shortExplanation"
//           style={{
//             color: 'var(--gray-color)',
//             textAlign: 'left',
//           }}
//         >
//           Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
//           eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
//           minim veniam, quis nostrud exercitation ullamco laboris nisi ut
//           aliquip ex ea commodo consequat.
//         </p>
//       </div>
//       <div className={styles.sessionContainer}>
//         <h1>Portrait</h1>
//         <p
//           className="global-shortExplanation"
//           style={{
//             color: 'var(--gray-color)',
//             textAlign: 'left',
//           }}
//         >
//           Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
//           eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
//           minim veniam, quis nostrud exercitation ullamco laboris nisi ut
//           aliquip ex ea commodo consequat.
//         </p>
//       </div>
//       <div>
//         <h1>In the moment</h1>
//         <p
//           className="global-shortExplanation"
//           style={{
//             color: 'var(--gray-color)',
//             textAlign: 'left',
//           }}
//         >
//           Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
//           eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
//           minim veniam, quis nostrud exercitation ullamco laboris nisi ut
//           aliquip ex ea commodo consequat.
//         </p>
//         <div className={styles.sessionsImages}>for images</div>
//       </div>
//       <div className={styles.sessionContainer}>
//         <h1>Charm</h1>
//         <p
//           className="global-shortExplanation"
//           style={{
//             color: 'var(--gray-color)',
//             textAlign: 'left',
//           }}
//         >
//           Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
//           eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
//           minim veniam, quis nostrud exercitation ullamco laboris nisi ut
//           aliquip ex ea commodo consequat.
//         </p>
//       </div>
//     </Fragment>
//   );
// }
