import styles from './Home.module.scss';
import { Link } from 'react-router-dom';
import MyButton from '../layout/MyButton/MyButton';
import { v4 as uuidv4 } from 'uuid';
import one from '../../images/shortGallery/fam1.jpg';
import two from '../../images/shortGallery/fam2.jpg';
import three from '../../images/shortGallery/kid1.jpg';
import four from '../../images/shortGallery/kid2.jpg';
import five from '../../images/shortGallery/love1.jpg';
import six from '../../images/shortGallery/love2.jpg';
import seven from '../../images/shortGallery/smile1.jpg';
import eight from '../../images/shortGallery/smile2.jpg';
import nine from '../../images/shortGallery/port1.jpg';
import ten from '../../images/shortGallery/port2.jpg';

export default function ShortGallery() {
  const sGallery = [one, two, three, four, five, six, seven, eight, nine, ten];

  const newGal = sGallery.map((pic) => {
    return (
      <div
        key={uuidv4()}
        style={{
          backgroundImage: `url(${pic})`,
          border: '2px white solid',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
      />
    );
  });

  return (
    <div className={styles.shortGalleryContainer}>
      <div className={styles.imageGrid}>{newGal}</div>
      <Link to="/mygallery">
        <MyButton
          className={styles.shortGalleryButton}
          value="More photos"
          // handleCklick={handleCklick}
          borderColor="--gray-light"
        />
      </Link>
    </div>
  );
}
