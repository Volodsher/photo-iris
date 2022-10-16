import Slideshow from './Slideshow';
import AboutMeShort from './AboutMeShort';
import styles from './Home.module.scss';
import ShortGallery from './ShortGallery';
import ShortSession from './ShortSessions';
import AdvertSession from './AdvertSession';

export default function Home(props) {
  return (
    <div>
      <Slideshow />
      <div className={styles.homeContainer}>
        <AboutMeShort />
        <ShortGallery />
        <ShortSession />
        <AdvertSession />
      </div>
    </div>
  );
}
