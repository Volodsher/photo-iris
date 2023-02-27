import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styles from './Pricing.module.scss';
import Card from 'react-bootstrap/Card';
import MyButton from '../layout/MyButton/MyButton';
import Book from '../layout/Book';

function Pricing() {
  const [booking, setBooking] = useState('');
  const [divHeight, setDivHeight] = useState(0);
  const { sessions, loading } = useSelector((store) => store.session);

  const pricing = sessions.filter((el) => el.title !== '');
  const pricingRef = useRef();

  const handleBookingClick = () => {
    setBooking('');
  };

  useEffect(() => {
    const observer = new ResizeObserver(() => {
      if (pricingRef.current) setDivHeight(pricingRef.current.offsetHeight);
    });
    if (pricingRef?.current) observer.observe(pricingRef.current);

    return () => observer.disconnect();
  }, [pricingRef]);

  useEffect(() => {
    const scroll = (id) => {
      const section = document.querySelector(`#${id}`);
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      console.log('in 5sec');
    };
    if (!loading && window.location.href.split('#').length === 2) {
      scroll(window.location.href.split('#')[1]);
    }
  }, [divHeight, loading]);

  return [
    <h1 key="1" style={{ margin: '3rem 0' }}>
      Photography Pricing & Booking
    </h1>,
    <div key="2" ref={pricingRef} className={styles.cardGroup}>
      <div className={styles.cardColumn}>
        {pricing
          .filter((session, ind) => ind % 2 === 0)
          .map((session, ind) => (
            <Card
              key={session.key}
              id={session.id}
              style={{ minWidth: '250px', flexGrow: 1 }}
            >
              <Card.Img width="100%" variant="top" src={session.image} />
              <Card.Body>
                <Card.Title>{session.title}</Card.Title>
                <Card.Text
                  style={{ textAlign: 'left', whiteSpace: 'pre-wrap' }}
                >
                  {session.about}
                </Card.Text>
                <Card.Text style={{ textAlign: 'left' }}>
                  {session.price}
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">
                  <MyButton
                    className={styles.priceButton}
                    value="Book"
                    borderColor="--gray-light"
                    handleClick={() => {
                      setBooking(session.title);
                    }}
                  />
                </small>
              </Card.Footer>
              {booking === session.title && (
                <Book
                  session={session.title}
                  handleClick={handleBookingClick}
                  handleCancel={handleBookingClick}
                />
              )}
            </Card>
          ))}
      </div>
      <div className={styles.cardColumn}>
        {pricing
          .filter((session, ind) => ind % 2 !== 0)
          .map((session) => (
            <Card
              key={session.key}
              id={session.id}
              style={{ minWidth: '250px', flexGrow: 1 }}
            >
              <Card.Img width="100%" variant="top" src={session.image} />
              <Card.Body>
                <Card.Title>{session.title}</Card.Title>
                <Card.Text
                  style={{ textAlign: 'left', whiteSpace: 'pre-wrap' }}
                >
                  {session.about}
                </Card.Text>
                <Card.Text style={{ textAlign: 'left' }}>
                  {session.price}
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">
                  <MyButton
                    className={styles.priceButton}
                    handleClick={() => {
                      setBooking(session.title);
                    }}
                    value="Book"
                    borderColor="--gray-light"
                  />
                </small>
              </Card.Footer>
              {booking === session.title && (
                <Book
                  session={session.title}
                  handleClick={handleBookingClick}
                  handleCancel={handleBookingClick}
                />
              )}
            </Card>
          ))}
      </div>
    </div>,
  ];
}

export default Pricing;
