import Slideshow from './Slideshow/Slideshow';
import AboutMeShort from './AboutMeShort/AboutMeShort';
import ShortGallery from './ShortGallery/ShortGallery';
import ShortSession from './ShortSessions/ShortSessions';
import AdvertSession from './AdvertSession/AdvertSession';

export default function Home(props) {
  return (
    <div style={{ marginBottom: 100 }}>
      <Slideshow />
      <div
        // className={styles.Home}
        style={{
          margin: 'auto',
          padding: '40px 60px',
          maxWidth: '1300px',
          minWidth: '300px',
        }}
      >
        <AboutMeShort />
        <ShortGallery />
        <ShortSession />
        <AdvertSession />
      </div>
    </div>
  );
}
