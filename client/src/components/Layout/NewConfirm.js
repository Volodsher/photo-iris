import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './Layout.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { closeConfirm } from '../../features/confirmSlice';

function NewConfirm(props) {
  const dispatch = useDispatch();

  return (
    <aside className={styles.confirmContainer}>
      <div className={styles.confirm}>
        <h4>{props.confirmName}:</h4>
        <p>{props.payload.title}</p>
        <div className={styles.btnContainer}>
          {props.link ? (
            <Link to={props.link} className="btn btn-primary">
              <button
                type="button"
                className={`${styles.btn} ${styles.confirmBtn}`}
                onClick={props.action}
              >
                Yes
              </button>
            </Link>
          ) : (
            <button
              type="button"
              className={`${styles.btn} ${styles.confirmBtn}`}
              onClick={props.action}
            >
              Yes
            </button>
          )}
          <button
            type="button"
            className={`${styles.btn} ${styles.cancelBtn}`}
            onClick={props.toggleConfirm}
          >
            Cancel
          </button>
        </div>
      </div>
    </aside>
  );
}

NewConfirm.propTypes = {};

export default NewConfirm;
