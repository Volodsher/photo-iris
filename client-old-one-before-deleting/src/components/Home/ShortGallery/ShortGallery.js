import styles from './ShortGallery.module.scss';
import { useNavigate } from 'react-router-dom';
import MyButton from "../../MyButton/MyButton";

import { v4 as uuidv4 } from 'uuid';
import one from '../../../images/shortGallery/Editar1.jpg';
import two from '../../../images/shortGallery/Editar1.jpg';
import three from '../../../images/shortGallery/Editar1.jpg';
import four from '../../../images/shortGallery/Editar1.jpg';
import five from '../../../images/shortGallery/Editar1.jpg';
import six from '../../../images/shortGallery/Editar1.jpg';
import seven from '../../../images/shortGallery/Editar1.jpg';
import eight from '../../../images/shortGallery/Editar1.jpg';

export default function ShortGallery() {
  const sGallery = [one, two, three, four, five, six, seven, eight];
  const history = useNavigate();
  const handleCklick = () => history('/gallery');
  
  const newGal = sGallery.map((pic) => {
    return <div
      key={uuidv4()}
      style={{ 
        backgroundImage: `url(${pic})`,
        border: '2px white solid',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
      }}
    />
  });

  return (
    <div>
      <div className={styles.imageGrid}>
        {newGal}
      </div>
      <MyButton 
        className={styles.shortGalleryButton}
        name="More photos"
        handleCklick={handleCklick}
        borderColor='#8E8D8A'
      />
    </div>
  );
}
