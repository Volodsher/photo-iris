
import Slideshow from './Slideshow/Slideshow';
import AboutMeShort from './AboutMeShort/AboutMeShort';
import ShortGallery from './ShortGallery/ShortGallery';

export default function Home() {

  return (
    <div>
      <Slideshow />
      <div
        style={{
        margin: 'auto',
        padding: '20px',
        maxWidth: '1300px',
        minWidth: '300px'
      }}>
        <AboutMeShort />
        <ShortGallery />
      </div>
    </div>
    
  )
}
