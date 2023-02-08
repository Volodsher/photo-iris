import { Link } from 'react-router-dom';
import MyButton from '../layout/MyButton/MyButton';
import styles from './Home.module.scss';

const sessions = [
  {
    key: 1,
    id: 'family',
    link: '/gallery#family',
    title: 'Family Fun',
    image: '/sessions/family.jpg',
  },
  {
    key: 2,
    id: 'kids',
    link: '/gallery#kids',
    title: "Kids' Adventures",
    image: '/sessions/kids.jpg',
  },
  {
    key: 4,
    id: 'maternity',
    link: '/gallery#maternity',
    title: 'Maternity',
    image: '/sessions/maternity.jpg',
  },
  {
    key: 3,
    id: 'lovestory',
    link: '/gallery#lovestory',
    title: 'Love Story',
    image: '/sessions/lovestory.jpg',
  },
  {
    key: 5,
    id: 'portrait',
    link: '/gallery#portrait',
    title: 'Portrait',
    image: '/sessions/portrait.jpg',
  },
  {
    key: 6,
    id: 'mini',
    link: '/gallery#mini',
    title: 'Mini Session',
    image: '/sessions/mini.jpg',
  },
  {
    key: 7,
    id: 'smileandpaws',
    link: '/gallery#smileandpaws',
    title: 'Smile and Paws',
    image: '/sessions/smileandpaws.jpg',
  },
  {
    key: 8,
    id: 'business',
    link: '/gallery#business',
    title: 'Business',
    image: '/sessions/business.jpg',
  },
  {
    key: 9,
    id: 'wedding',
    link: '/gallery#wedding',
    title: 'Wedding',
    image: '/sessions/wedding.jpg',
  },
  {
    key: 10,
    id: 'food',
    link: '/gallery#food',
    title: 'Food Feast',
    image: '/sessions/food.jpg',
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
              <Link
                key={session.key}
                to={session.link}
                style={{ textDecoration: 'none' }}
              >
                <div key={session.key} className={styles.imageItem}>
                  <img src={session.image} alt="" />
                  <div className={styles.overlay}>
                    <h2>{session.title}</h2>
                  </div>
                </div>
              </Link>
            ))}
        </div>
        <div className={styles.column}>
          {sessions
            .filter((session, ind) => ind % 2 === 0)
            .map((session) => (
              <Link
                key={session.key}
                to={session.link}
                style={{ textDecoration: 'none' }}
              >
                <div key={session.key} className={styles.imageItem}>
                  <img src={session.image} alt="" />
                  <div className={styles.overlay}>
                    <h2>{session.title}</h2>
                  </div>
                </div>
              </Link>
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
