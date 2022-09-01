import { useNavigate } from 'react-router-dom';
import MyButton from '../../layout/MyButton/MyButton';
import styles from './ShortSessions.module.scss';
import one from '../../../images/shortGallery/Editar1.jpg';
import portrait from '../../../images/sessions/port2.jpg';
import family from '../../../images/sessions/fam15.jpg';
import inthemoment from '../../../images/sessions/int1.jpg';
import charm from '../../../images/sessions/chan9.jpg';

export default function ShortSession() {
  const history = useNavigate();
  const handleCklick = () => history('/sessions');

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
      <div className={styles.sessionGrid}>
        <div>
          <img
            src={portrait}
            className={styles.shortSessionImg}
            alt="one of short session"
          />
          <p className="global-shortExplanation2">THIS IS WHAT WE NEED</p>
        </div>
        <div style={{}}>
          <img
            src={family}
            className={styles.shortSessionImg}
            alt="one of short session"
          />
          <p className="global-shortExplanation2">THIS IS WHAT WE NEED</p>
        </div>
        <div style={{}}>
          <img
            src={inthemoment}
            className={styles.shortSessionImg}
            alt="one of short session"
          />
          <p className="global-shortExplanation2">THIS IS WHAT WE NEED</p>
        </div>
        <div style={{}}>
          <img
            src={charm}
            className={styles.shortSessionImg}
            alt="one of short session"
          />
          <p className="global-shortExplanation2">THIS IS WHAT WE NEED</p>
        </div>
      </div>
      <MyButton
        className={styles.shortSessionButton}
        name="Sessions"
        handleCklick={handleCklick}
        borderColor="#f7f6f4"
      />
    </div>
  );
}
