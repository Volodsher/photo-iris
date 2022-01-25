import  styles from './Footer.module.scss';
import face from '../../face.png';
import insta from '../../insta.png';

export default function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.socialMediaContainer}>
        <a target="_blank" rel="noreferrer" href="https://www.facebook.com/chernyshova.irina">
          <img src={face} className={styles.socialMedia} alt="facebook-link" />
        </a>
        <a target="_blank" rel="noreferrer" href="https://www.facebook.com/chernyshova.irina">
          <img src={insta} className={styles.socialMedia} alt="facebook-link" />
        </a>
      </div>
      <div style={{color: "white", margin: "5px 0 10px 0"}}>
        &copy; {new Date().getFullYear()} Copyright: Iryna Sheremeta
      </div>
    </div>
  )
}