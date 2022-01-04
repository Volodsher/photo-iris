import { useNavigate } from 'react-router-dom';
import MyButton from "../../MyButton/MyButton";
import styles from './AboutMeShort.module.scss';
import portret from '../../../images/portret.jpg';

export default function AboutMeShort() {
  const history = useNavigate();
  const handleCklick = () => history('/blog');

  return (
    <div style={{
      margin: 'auto',
      padding: '50px 0px 50px 0px',
      width: '95%'
    }}>
      <img
        style={{
          display: 'inline-block',
          //imageOrientation: '90deg',
          width: '100%',
          maxWidth: '250px',
        }}
        src={portret}
        alt='Iryna&apos;s portret'
      />
      <div style={{
        display : 'inline-block',
        width: '50%',
        //width: '60%',
        minWidth: '300px',
        padding: 30,
        textAlign: 'left'
      }}>
        <h1 style={{
          color: '#b08c59'
        }}>Iryna Sheremeta</h1>
        <p>
          This is something about me and what I love to do when I want to do it
          So take a seat and relax if you have time. But I belive that you actuly
          have that beautiful and dreamfool time. So lets go to speak a bit.
          I&apos;me a photographer of a big field of bright life.
        </p>
        <MyButton
          className={styles.aboutMeButton}
          name="About me"
          handleCklick={handleCklick}
        />
      </div>
    </div>
  )
}
