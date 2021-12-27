
import Slideshow from '../Slideshow/Slideshow';
import AboutMeShort from './AboutMeShort';

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
      </div>
    </div>
    
  )
}
