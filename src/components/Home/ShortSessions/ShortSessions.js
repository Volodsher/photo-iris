import { useNavigate } from 'react-router-dom';
import MyButton from "../../MyButton/MyButton";
import styles from './ShortSessions.module.scss';
import one from '../../../images/shortGallery/Editar1.jpg';


export default function ShortSession() {
  const history = useNavigate();
  const handleCklick = () => history('/sessions');

  return (
    <div style={{
      backgroundColor: '#D8C3A5',
      margin: '50px -60px 0 -60px',
      padding: '50px 140px 110px 140px',
      textAlign: 'center'
    }}>
      <h1>Photo Sessions</h1>
      <p className='shortExplanation'>I invite you to save every detail of your story, forever.</p>
      <p className='shortExplanation2'>My camera is my magic wand that can immortalize the passage of time in a single click, looking with the heart.</p>
      <div 
        className={styles.sessionGrid}
      >
        <div style={{
        }}>
          <img 
            src={one}
            className={styles.shortSessionImg}
            alt='one of short session'
          />
          <p className='shortExplanation2'>THIS IS WHAT WE NEED</p>
        </div>
        <div style={{
        }}>
          <img 
            src={one}
            className={styles.shortSessionImg}
            alt='one of short session'
          />
          <p className='shortExplanation2'>THIS IS WHAT WE NEED</p>
        </div>
        <div style={{
        }}>
          <img 
            src={one}
            className={styles.shortSessionImg}
            alt='one of short session'
          />
          <p className='shortExplanation2'>THIS IS WHAT WE NEED</p>
        </div>
        <div style={{
        }}>
          <img 
            src={one}
            className={styles.shortSessionImg}
            alt='one of short session'
          />
          <p className='shortExplanation2'>THIS IS WHAT WE NEED</p>
        </div>
      </div>
      <MyButton
        className={styles.shortSessionButton}
        name="Sessions"
        handleCklick={handleCklick}
      />
    </div>
  )
}
