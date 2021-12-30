// import { useState, useEffect } from 'react';
//import styles from './ShortGallery.module.scss';
// import '../../images1/1.jpg';
// import '../../images1/2.jpg';
// import '../../images1/3.jpg';
// import '../../images1/4.jpg';
// import '../../images1/5.jpg';
//import { uuid } from 'uuidv4';
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
  
  const newGal = sGallery.map((pic) => {
      return <img
        key={uuidv4()}
        src={pic}
        alt='from small gallery'
      />
    });

  return <div
    style={{
    display: 'flex',
    flexDirection: 'column',
  }}
  >
    {newGal}
  </div>
}
