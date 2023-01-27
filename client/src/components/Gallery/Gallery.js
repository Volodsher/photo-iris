import { useState, useEffect, useRef, Fragment } from 'react';
import { Link } from 'react-router-dom';
import styles from './Gallery.module.scss';
import Spinner from '../layout/Spinner';
import Picture from '../layout/Picture';
import MyButton from '../layout/MyButton/MyButton';

export default function Gallery() {
  const [sessions, setSessions] = useState([]);
  const [oneImage, setOneImage] = useState('');

  const [divHeight, setDivHeight] = useState(0);
  const [refHeight, setRefHeight] = useState(0);

  const galleryRef = useRef();
  // const [pageHeight, setPageHeight] = useState(
  //   document.documentElement.scrollHeight
  // );

  const handleOneImageUrl = (imageUrl) => {
    setOneImage(imageUrl);
  };

  const handleCleaarOneImage = () => {
    setOneImage('');
  };

  // console.log(document.documentElement.scrollHeight);

  // useEffect (() => {
  //   setRefHeight(galleryRef.current.offsetHeight)
  // }, [divHeight])

  useEffect(() => {
    // if (!galleryRef?.current) return;
    // if (!window?.ResizeObserver) return;
    // let refHeight = 0;
    // if (galleryRef.current) refHeight = galleryRef.current.offsetHeight;
    const observer = new ResizeObserver(() => {
      if (galleryRef.current) setDivHeight(galleryRef.current.offsetHeight);
    });
    if (galleryRef?.current) observer.observe(galleryRef.current);

    // return () => observer.disconnect();
    return () => {
      if (galleryRef.current) {
        console.log('out from gallery - unobserve');
        observer.unobserve(galleryRef);
      } else {
        console.log('out from gallery - disconnect');
        observer.disconnect();
      }
    };
  }, [galleryRef]);

  useEffect(async () => {
    try {
      await fetch('/api/gallery/')
        .then((res) => res.json())
        .then((data) => {
          setSessions(data);
        });
    } catch (error) {
      console.error(error.message);
    }

    // const scroll = (id) => {
    //   const section = document.querySelector(`#${id}`);
    //   section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    //   console.log('in 5sec');
    // };

    // if (window.location.href.split('#').length === 2) {
    //   scroll(window.location.href.split('#')[1]);
    //   // setTimeout(scroll, 500, window.location.href.split('#')[1]);
    // }

    // if (window.location.href.split('#').length === 2) {
    //   return () => {
    //     console.log('it is clen');
    //     clearTimeout(setTimeout);
    //   };
    // }
  }, []);

  useEffect(() => {
    if (sessions.length > 0) {
      const scroll = (id) => {
        const section = document.querySelector(`#${id}`);
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        console.log('in 5sec');
      };
      if (window.location.href.split('#').length === 2) {
        scroll(window.location.href.split('#')[1]);
      }
    }
  }, [sessions, divHeight]);

  // useEffect(() => {
  //   if (!galleryRef.current) return; // wait for the elementRef to be available
  //   const resizeObserver = new ResizeObserver(() => {
  //     // Do what you want to do when the size of the element changes
  //     console.log('it has been resided');
  //   });
  //   resizeObserver.observe(galleryRef.current.height);
  //   return () => resizeObserver.disconnect(); // clean up
  // }, []);

  // useEffect(() => {
  //   if (galleryRef.current) {
  //     setDivHeight(galleryRef.current.offsetHeight);
  //   }
  // }, []);

  /////////// console.log(galleryRef.getBoundingClientRect().width)

  // setTimeout(() => console.log(document.documentElement.scrollHeight), 1000);

  // useEffect(() => {
  // const newSessions = [...initialSessions];
  // const scroll = (id) => {
  //   const section = document.querySelector(`#${id}`);
  //   section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  //   console.log('in 5sec');
  // };
  // const getImages = () => {
  //   newSessions.map(async (session, ind) => {
  //     try {
  //       await fetch(`/api/gallery/${session.id}`)
  //         .then((res) => res.json())
  //         .then((data) => {
  //           newSessions[ind].images = data;
  //           // this is a temporary solution just to change the state.
  //           if (newSessions.length - 1 === ind) {
  //             setSessions(newSessions);
  //           }
  //           console.log(document.documentElement.scrollHeight);
  //         });
  //     } catch (err) {
  //       console.log(err.message);
  //     }
  //   });
  // };
  // getImages();
  // console.log(window.location.href);
  // console.log(window.location.href.split('#'));
  // if (window.location.href.split('#').length === 2) {
  //   var timer = setTimeout(scroll, 1000, window.location.href.split('#')[1]);
  // }
  // if (window.location.href.split('#').length === 2) {
  //   return () => {
  //     clearTimeout(timer);
  //     console.log('it is clen');
  //   };
  // }
  // }, []);

  // return sessions.length === 0 ? (
  //   <Spinner />
  // ) : (
  return (
    <div ref={galleryRef} style={{ paddingBottom: '3rem' }}>
      {sessions.length === 0 ? (
        <Spinner />
      ) : (
        sessions.map((session) => (
          <div key={session.id} id={session.id}>
            <h1 style={{ margin: '3rem 0' }}>{session.title}</h1>
            <div key={session.id} className={styles.galleryImagesBox}>
              {session.images?.map((image, ind) => {
                return [
                  <img
                    key={ind}
                    src={`/gallery/${session.id}/${image}`}
                    className={styles.galleryImage}
                    onClick={() => handleOneImageUrl(`/gallery/${image}`)}
                  />,
                  oneImage.length > 0 && (
                    <Picture
                      key={session.id}
                      clearPicture={handleCleaarOneImage}
                      picture={oneImage}
                    />
                  ),
                ];
              })}
            </div>
            <Link to="/pricing">
              <MyButton borderColor="--gray-light" value="Book" />
            </Link>
          </div>
        ))
      )}
    </div>
  );
  // );
}
