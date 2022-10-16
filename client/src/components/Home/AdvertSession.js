import { Link } from 'react-router-dom';
import MyButton from '../layout/MyButton/MyButton';
import styles from './Home.module.scss';
import backShort from '../../images/shortGallery/Editar1.jpg';

export default function AdvertSession() {
  return (
    <div
      style={{
        padding: '3rem 5vw 3rem 5vw',
        textAlign: 'left',
        margin: '0 -5vw',
        backgroundImage: `url(${backShort})`,
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
      }}
    >
      <h1
        style={{
          textShadow: '2px 2px 10px var(--primary-ultralight)',
        }}
      >
        Stories that transport us
      </h1>
      <p className="global-shortExplanation">Choose your photo session.</p>
      <Link to="/photo-iris-react/sessions">
        <MyButton
          className={styles.shortSessionButton}
          value="Sessions"
          borderColor="--white-color"
        />
      </Link>
    </div>
  );
}
