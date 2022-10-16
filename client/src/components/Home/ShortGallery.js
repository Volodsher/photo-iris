import styles from './Home.module.scss';
import { Link } from 'react-router-dom';
import MyButton from '../layout/MyButton/MyButton';
import { v4 as uuidv4 } from 'uuid';
import one from '../../images/shortGallery/fam10.jpg';
import two from '../../images/shortGallery/chan4.jpg';
import three from '../../images/shortGallery/fam5.jpg';
import four from '../../images/shortGallery/port12.jpg';
import five from '../../images/shortGallery/fam19.jpg';
import six from '../../images/shortGallery/chan8.jpg';
import seven from '../../images/shortGallery/int4.jpg';
import eight from '../../images/shortGallery/int7.jpg';

export default function ShortGallery() {
  const sGallery = [one, two, three, four, five, six, seven, eight];

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
      <Link to="/photo-iris-react/gallery">
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
