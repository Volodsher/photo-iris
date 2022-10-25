import Slideshow from './Slideshow';
import AboutMeShort from './AboutMeShort';
import styles from './Home.module.scss';
import ShortGallery from './ShortGallery';
import ShortSession from './ShortSessions';
import AdvertSession from './AdvertSession';
import { Fragment } from 'react';

export default function Home(props) {
  return (
    <Fragment>
      <Slideshow />
      <div className={styles.homeContainer}>
        <AboutMeShort />
        <ShortGallery />
        <ShortSession />
        <AdvertSession />
      </div>
    </Fragment>
  );
}
