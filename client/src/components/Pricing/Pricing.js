import React, { useState, useRef, useEffect } from 'react';
import styles from './Pricing.module.scss';
import Card from 'react-bootstrap/Card';
import MyButton from '../layout/MyButton/MyButton';
import Book from '../layout/Book';

const mustHaveText =
  'HST is added separately from the price. Additional costs for make-up (at the request of the client), photo studio rentals, photo permits (if needed), costume rentals are NOT INCLUDED in a price. We require a 10% deposit to book your date.';

const pricing = [
  {
    key: 1,
    id: 'family',
    title: 'Family Fun',
    image: '/pricing/family.jpg',
    price: '200$',
    about: `1hour session \n25 edited and retouched images`,
    mustHave: '',
  },
  {
    key: 2,
    id: 'kids',
    title: "Kids' Celebrations",
    image: '/pricing/children.jpg',
    price: '200$',
    about: '1 hour session \n25 edited and retouched images',
    mustHave: '',
  },
  {
    key: 3,
    id: 'lovestory',
    title: 'Love Story',
    image: '/pricing/business.jpg',
    price: '200$',
    about: '1 hour session \n25 edited and retouched images',
    mustHave: '',
  },
  {
    key: 4,
    id: 'maternity',
    title: 'Maternity',
    image: '/pricing/business.jpg',
    price: '200$',
    about: '1 hour session \n25 edited and retouched images',
    mustHave: '',
  },
  {
    key: 5,
    id: 'portrait',
    title: 'Portrait',
    image: '/pricing/portrait.jpg',
    price: '150$',
    about: '45 min session \n10 edited and retouched images',
    mustHave: '',
  },
  {
    key: 6,
    id: 'mini',
    title: 'Mini Session',
    image: '/pricing/business.jpg',
    price: '100$',
    about: '30 min \n5 edited and retouched images',
    mustHave: '',
  },
  {
    key: 7,
    id: 'smileandpaws',
    title: 'Smile and Paws',
    image: '/pricing/pet.jpg',
    price: '100$',
    about: '30 min \n5 edited and retouched images',
    mustHave: '',
  },
  {
    key: 8,
    id: 'business',
    title: 'Business',
    image: '/pricing/business.jpg',
    price: '250$',
    about: '1,5 hours session \n30-40 edited and retouched images',
    mustHave: '',
  },
  {
    key: 9,
    id: 'wedding',
    title: 'Wedding',
    image: '/pricing/business.jpg',
    price: '500$',
    about: '3 hours session \n100 edited and retouched images',
    mustHave: '',
  },
];

function Pricing() {
  const [booking, setBooking] = useState('');
  const [divHeight, setDivHeight] = useState(0);

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
    if (window.location.href.split('#').length === 2) {
      scroll(window.location.href.split('#')[1]);
    }
  }, [divHeight]);

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
