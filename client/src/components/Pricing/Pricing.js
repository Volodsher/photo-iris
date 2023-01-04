import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './Pricing.module.scss';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import MyButton from '../layout/MyButton/MyButton';

import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

const mustHaveText =
  'HST is added separately from the price. Additional costs for make-up (at the request of the client), photo studio rentals, photo permits (if needed), costume rentals are NOT INCLUDED in a price. We require a 10% deposit to book your date.';

const pricing = [
  {
    title: 'Family',
    image: '/pricing/family.jpg',
    price: '500$',
    about:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    mustHave: mustHaveText,
  },
  {
    title: 'Children',
    image: '/pricing/children.jpg',
    price: '500$',
    about:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    mustHave: mustHaveText,
  },
  {
    title: 'Business',
    image: '/pricing/business.jpg',
    price: '500$',
    about:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    mustHave: mustHaveText,
  },
  {
    title: 'Portrait',
    image: '/pricing/portrait.jpg',
    price: '500$',
    about:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    mustHave: mustHaveText,
  },
  {
    title: 'Pets',
    image: '/pricing/pet.jpg',
    price: '500$',
    about:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    mustHave: mustHaveText,
  },
  {
    title: 'Beautiful moments',
    image: '/pricing/moments.jpg',
    price: '500$',
    about:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    mustHave: mustHaveText,
  },
];

function GroupExample() {
  return [
    <h1 style={{ margin: '3rem 0' }}>Photography Pricing</h1>,
    <div className={styles.cardGroup}>
      <div className={styles.cardColumn}>
        {pricing
          .filter((session, ind) => ind % 2 === 0)
          .map((session, ind) => (
            <Card
              key={session.title}
              style={{ minWidth: '250px', flexGrow: 1 }}
            >
              <Card.Img width="100%" variant="top" src={session.image} />
              <Card.Body>
                <Card.Title>{session.title}</Card.Title>
                <Card.Text style={{ textAlign: 'left' }}>
                  {session.about}
                </Card.Text>
                <Card.Text style={{ textAlign: 'left' }}>
                  {session.mustHave}
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">
                  <MyButton value="Book" borderColor="--gray-light" />
                </small>
              </Card.Footer>
            </Card>
          ))}
      </div>
      <div className={styles.cardColumn}>
        {pricing
          .filter((session, ind) => ind % 2 !== 0)
          .map((session) => (
            <Card
              key={session.title}
              style={{ minWidth: '250px', flexGrow: 1 }}
            >
              <Card.Img width="100%" variant="top" src={session.image} />
              <Card.Body>
                <Card.Title>{session.title}</Card.Title>
                <Card.Text style={{ textAlign: 'left' }}>
                  {session.about}
                </Card.Text>
                <Card.Text style={{ textAlign: 'left' }}>
                  {session.mustHave}
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">
                  <MyButton value="Book" borderColor="--gray-light" />
                </small>
              </Card.Footer>
            </Card>
          ))}
      </div>
    </div>,
  ];
}

export default GroupExample;
