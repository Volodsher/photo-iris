import { Link } from 'react-router-dom';
import MyButton from '../layout/MyButton/MyButton';
import styles from './Home.module.scss';
import backShort from '../../images/shortGallery/Editar1.jpg';

export default function AdvertSession() {
  return (
    <div
      style={{
        padding: '3rem 5vw 3rem 5vw',
        textAlign: 'right',
        margin: '0 -5vw',
        backgroundImage: `url(${process.env.REACT_APP_URL}/int13.jpg)`,
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
      }}
    >
      <h1
        style={{
          textShadow: '2px 2px px var(--gray-color)',
        }}
      >
        Stories that transport us
      </h1>
      <p
        className="global-shortExplanation"
        style={{
          color: 'var(--gray-dark)',
        }}
      >
        Choose your photo session.
      </p>
      <Link to="/photo-iris-react/sessions">
        <MyButton
          className={styles.advertSession}
          value="Sessions"
          borderColor="--gray-dark"
        />
      </Link>
    </div>
  );
}
