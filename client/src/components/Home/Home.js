
import Slideshow from './Slideshow/Slideshow';
import AboutMeShort from './AboutMeShort/AboutMeShort';
import ShortGallery from './ShortGallery/ShortGallery';
//import backShort from '../../images/shortGallery/Editar1.jpg';
//import backShort1 from '../../logo.svg';
import ShortSession from './ShortSessions/ShortSessions';
import AdvertSession from './AdvertSession/AdvertSession';

export default function Home(props) {

  return (
    <div style={{marginBottom: 100}}>
      <Slideshow />
      <div
        style={{
          margin: 'auto',
          padding: '40px 60px',
          maxWidth: '1300px',
          minWidth: '300px'
      }}>
        <AboutMeShort />
        <ShortGallery />
        <ShortSession />
        <AdvertSession />
      </div>
    </div>
  )
}
