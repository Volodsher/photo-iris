import { Link } from 'react-router-dom';
import MyButton from '../layout/MyButton/MyButton';
import styles from './Home.module.scss';
import one from '../../images/shortGallery/Editar1.jpg';
import portrait from '../../images/sessions/port2.jpg';
import family from '../../images/sessions/fam15.jpg';
import inthemoment from '../../images/sessions/int1.jpg';
import charm from '../../images/sessions/chan9.jpg';

const sessions = [
  {
    key: 1,
    title: 'Family Fun',
    image: '/pricing/family.jpg',
  },
  {
    key: 2,
    title: "Kids' Celebrations",
    image: '/pricing/children.jpg',
  },
  {
    key: 3,
    title: 'Love Story',
    image: '/pricing/business.jpg',
  },
  {
    key: 4,
    title: 'Maternity',
    image: '/pricing/business.jpg',
  },
  {
    key: 5,
    title: 'Portrait',
    image: '/pricing/portrait.jpg',
  },
  {
    key: 6,
    title: 'Mini Session',
    image: '/pricing/business.jpg',
  },
  {
    key: 7,
    title: 'Smile and Paws',
    image: '/pricing/pet.jpg',
  },
  {
    key: 8,
    title: 'Business',
    image: '/pricing/business.jpg',
  },
  {
    key: 9,
    title: 'Wedding',
    image: '/pricing/business.jpg',
  },
];

export default function ShortSession() {
  return (
    <div className={styles.shortSession}>
      <h1>Photo Sessions</h1>
      <p className="global-shortExplanation">
        I invite you to save every detail of your story, forever.
      </p>
      <p className="global-shortExplanation2">
        My camera is my magic wand that can immortalize the passage of time in a
        single click, looking with the heart.
      </p>
      <div className={styles.shortSessionGallery}>
        <div className={styles.column}>
          {sessions
            .filter((session, ind) => ind % 2 !== 0)
            .map((session) => (
              <div key={session.key} className={styles.imageItem}>
                <img src={session.image} alt="" />
                <div className={styles.overlay}>
                  <h2>{session.title}</h2>
                </div>
              </div>
            ))}
        </div>
        <div className={styles.column}>
          {sessions
            .filter((session, ind) => ind % 2 === 0)
            .map((session) => (
              <div key={session.key} className={styles.imageItem}>
                <img src={session.image} alt="" />
                <div className={styles.overlay}>
                  <h2>{session.title}</h2>
                </div>
              </div>
            ))}
        </div>
      </div>
      <Link to="/gallery">
        <MyButton
          className={styles.shortSessionButton}
          borderColor="--white-color"
          value="Sessions"
        />
      </Link>
    </div>
  );
}
