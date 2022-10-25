import { Link } from 'react-router-dom';
import MyButton from '../layout/MyButton/MyButton';
import styles from './Home.module.scss';
import one from '../../images/shortGallery/Editar1.jpg';
import portrait from '../../images/sessions/port2.jpg';
import family from '../../images/sessions/fam15.jpg';
import inthemoment from '../../images/sessions/int1.jpg';
import charm from '../../images/sessions/chan9.jpg';

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
          <div className={styles.imageItem}>
            <img src={portrait} alt="" />
            <div className={styles.overlay}>
              <h2>Portrait</h2>
            </div>
          </div>
          <div className={styles.imageItem}>
            <img src={family} alt="" />
            <div className={styles.overlay}>
              <h2>Family</h2>
            </div>
          </div>
        </div>
        <div className={styles.column}>
          <div className={styles.imageItem}>
            <img src={inthemoment} alt="" />
            <div className={styles.overlay}>
              <h2>In the moment</h2>
            </div>
          </div>
          <div className={styles.imageItem}>
            <img src={charm} alt="" />
            <div className={styles.overlay}>
              <h2>Charm</h2>
            </div>
          </div>
          <Link to="/photo-iris-react/sessions">
            <MyButton
              className={styles.shortSessionButton}
              borderColor="--white-color"
              value="Sessions"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
