import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './Layout.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { closeConfirm } from '../../features/confirmSlice';
import ContactForm from './ContactForm';

function Book(props) {
  const { confirmAction } = useSelector((store) => store.confirm);
  const dispatch = useDispatch();

  return (
    <aside className={styles.bookContainer}>
      <div className={styles.book}>
        <ContactForm session={props.session} handleClick={props.handleClick} />
      </div>
    </aside>
  );
}

Book.propTypes = {};

export default Book;
