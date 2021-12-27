import { useState, useEffect } from 'react';
import styles from './Slideshow.module.scss';
// import '../../images1/1.jpg';
// import '../../images1/2.jpg';
// import '../../images1/3.jpg';
// import '../../images1/4.jpg';
// import '../../images1/5.jpg';
// // import { v4 as uuidv4 } from 'uuid';




export default function Slideshow() {
  const [counter, changeCounter] = useState(1);
  const [id, changeId] = useState(0);

  useEffect(() => {
    const picIndex = setInterval(() => {
      changeCounter((ind) => ind === 6 ? 1 : ind + 1);
      changeId(id => id + 1);
    }, 5000);

    return () => clearInterval(picIndex);
  }, [])

  return (
  <>
    <div style={{
      whiteSpace: 'nowrap'
    }}>
      <img
        key={id}
        className={styles.slide}
        src={`/images/${counter}.jpg`}
        alt="first-slide" 
      />
      <img 
        key={id + 1}
        className={`${styles.slide} ${styles.second}`}
        src={`/images/${counter === 6 ? 1 : counter + 1}.jpg`}
        alt="second-slide" 
      />
    </div>
  </>
  )
}
/////////////////////////////
// export default function Slideshow() {

//   // const [firstFade, setFirstFade] = useState(1);
//   // const [second, setSecond] = useState(2);
//   // const [secondIndex, setSecondIndex] = useState(0);

//   useEffect(() => {
//     const picIndex = setInterval(() => {

//       setFirstFade((index) => {
//         return index === 6 ? 1 : index + 1
//       });

//       setSecond((index) => {
//         return index === 6 ? 1 : index + 1
//       });
//     }, 5000);
//     return () => clearInterval(picIndex)
//   }, []);

//   return (
//     <div style={{

//     }}>
//       <div className={styles.slideshow}>
        
//         {/* <img
//           // key='1' 
//           key={second}
//           className={styles.secondSlide}
//           src={`../../images/${second}.jpg`}
//           alt="second-slide"
//         /> */}
//         <div 
//           //key={second}
//           style={{
//             backgroundImage: `url('../../images/${firstFade}.jpg')`,
//             width: 300,
//             height: 300
//           }}
//           className={styles.firstSlide}
//         />
//         <div 
//           key={second}
//           style={{
//             backgroundImage: `url('../../images/${second}.jpg')`,
//             width: 300,
//             height: 300
//           }}
//           className={styles.secondSlide}
//         />
//       {/* <img
//         //className={styles.firstSlide}
//         src={`../../images/${firstFade}.jpg`}
//         alt="first-slide" 
//       /> */}
//       </div>
//         <p>{firstFade} {second}</p>
//     </div>
//   )
// }
