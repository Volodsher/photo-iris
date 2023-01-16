import React, { useState, useEffect, Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './Contact.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { openConfirm } from '../../features/confirmSlice';
import { addPostAction, updatePostAction } from '../../features/postSlice';
import { useLocation } from 'react-router';
import MyButton from '../layout/MyButton/MyButton';
import Confirm from '../layout/Confirm';
import ContactForm from '../layout/ContactForm';
import axios from 'axios';

export default function Contact() {
  return (
    <Fragment>
      <section
        style={{
          textAlign: 'left',
          width: '70vw',
          margin: '1rem auto',
          borderBottom: '1px solid black',
        }}
      >
        <p>Located in Ottawa, Canada</p>
      </section>
      <section style={{ width: '70vw', margin: '1rem auto' }}>
        <ContactForm session="Family" />
      </section>
    </Fragment>
  );
}
