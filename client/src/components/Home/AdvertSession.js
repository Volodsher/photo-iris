import { Link } from 'react-router-dom';
import MyButton from '../layout/MyButton/MyButton';
import styles from './Home.module.scss';
import backShort from '../../images/shortGallery/Editar1.jpg';
import int13 from '../../images/int13.JPG';

export default function AdvertSession() {
  return (
    <div
      style={{
        padding: '3rem 5vw 3rem 5vw',
        textAlign: 'right',
        margin: '0 -5vw',
        backgroundImage: `url(${int13})`,
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
      <Link to="/sessions">
        <MyButton
          className={styles.advertSession}
          value="Sessions"
          borderColor="--gray-dark"
        />
      </Link>
    </div>
  );
}
