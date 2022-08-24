import { useNavigate } from 'react-router-dom';
import MyButton from '../../Layout/MyButton/MyButton';
import styles from './AdvertSession.module.scss';
import backShort from '../../../images/shortGallery/Editar1.jpg';

export default function AdvertSession() {
  const history = useNavigate();
  const handleCklick = () => history('/sessions');

  return (
    <div
      style={{
        padding: '50px 0 100px 60px',
        textAlign: 'left',
        margin: '0 -60px',
        backgroundImage: `url(${backShort})`,
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
      }}
    >
      <h1>Stories that transport us</h1>
      <p className="global-shortExplanation">Choose your photo session.</p>
      <MyButton
        className={styles.shortSessionButton}
        name="Sessions"
        handleCklick={handleCklick}
        borderColor="white"
      />
    </div>
  );
}
