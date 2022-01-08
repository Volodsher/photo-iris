
import Slideshow from './Slideshow/Slideshow';
import AboutMeShort from './AboutMeShort/AboutMeShort';
import ShortGallery from './ShortGallery/ShortGallery';
//import backShort from '../../images/shortGallery/Editar1.jpg';
//import backShort1 from '../../logo.svg';
import ShortSession from './ShortSessions/ShortSessions';
import AdvertSession from './AdvertSession/AdvertSession';

export default function Home() {

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
        
        
        {/* <div style={{
          backgroundImage: `url(${backShort})`,
          width: '100%',
          height: 200,
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
          backgroundSize: 'cover'
        }}>
          sdfsdfsd
        </div> */}
        {/* <div style={{
          backgroundImage: `url(${backShort1})`,
          width: '100%',
          height: 200,
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
          backgroundSize: 'cover'
        }}>
          sdfsdfsd
        </div>
        <div style={{
          backgroundImage: `url(${backShort})`,
          width: '100%',
          height: 200,
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
          backgroundSize: 'cover'
        }}>
          sdfsdfsd
        </div>
        <div style={{
          backgroundImage: `url(${backShort1})`,
          width: '100%',
          height: 200,
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
          backgroundSize: 'cover'
        }}>
          sdfsdfsd
        </div> */}
      </div>
    </div>
  )
}
