import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MyButton from '../layout/MyButton/MyButton';
import styles from './Home.module.scss';
import { useSelector } from 'react-redux';

const shortSessionsInitial = [
  {
    column: 1,
    number: 1,
    id: 'kids',
    key: 11,
  },
  {
    column: 2,
    number: 1,
    id: 'family',
    key: 21,
  },
  {
    column: 1,
    number: 2,
    id: 'lovestory',
    key: 12,
  },
  {
    column: 2,
    number: 2,
    id: 'maternity',
    key: 22,
  },
  {
    column: 1,
    number: 3,
    id: 'mini',
    key: 13,
  },
  {
    column: 2,
    number: 3,
    id: 'portrait',
    key: 23,
  },
  {
    column: 1,
    number: 4,
    id: 'business',
    key: 14,
  },
  {
    column: 2,
    number: 4,
    id: 'smileandpaws',
    key: 24,
  },
  {
    column: 1,
    number: 5,
    id: 'food',
    key: 15,
  },
  {
    column: 2,
    number: 5,
    id: 'wedding',
    key: 25,
  },
];

export default function ShortSession() {
  const { sessions, loading } = useSelector((store) => store.session);
  const [shortSessions, setShortSessions] = useState(shortSessionsInitial);

  useEffect(() => {
    if (!loading) {
      const seseionsFromServer = shortSessionsInitial.map((el) => {
        const elSession = sessions.find((session) => session.id === el.id);
        return { ...el, ...elSession };
      });
      setShortSessions(seseionsFromServer);
    }
  }, [sessions, loading]);

  return (
    !loading && (
      <div className={styles.shortSession}>
        <h1>Photo Sessions</h1>
        <p className="global-shortExplanation">
          I invite you to save every detail of your story, forever.
        </p>
        <p className="global-shortExplanation2">
          My camera is my magic wand that can immortalize the passage of time in
          a single click, looking with the heart.
        </p>
        {!loading && (
          <div className={styles.shortSessionGallery}>
            <div className={styles.column}>
              {shortSessions
                .filter((session, ind) => ind % 2 === 0)
                .map((session) => (
                  <Link
                    // key={session.number}
                    key={session.key}
                    to={session.link}
                    style={{ textDecoration: 'none' }}
                  >
                    <div className={styles.imageItem}>
                      <img src={session.image} alt="" />
                      <div className={styles.overlay}>
                        <h2>{session.title}</h2>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
            <div className={styles.column}>
              {shortSessions
                .filter((session, ind) => ind % 2 !== 0)
                .map((session) => (
                  <Link
                    key={session.number}
                    to={session.link}
                    style={{ textDecoration: 'none' }}
                  >
                    <div className={styles.imageItem}>
                      <img src={session.image} alt="" />
                      <div className={styles.overlay}>
                        <h2>{session.title}</h2>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        )}
        <Link to="/mygallery">
          <MyButton
            className={styles.shortSessionButton}
            borderColor="--white-color"
            value="Sessions"
          />
        </Link>
      </div>
    )
  );
}
