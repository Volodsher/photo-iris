import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './Layout.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { closeConfirm } from '../../features/confirmSlice';

function Confirm(props) {
  const { confirmAction } = useSelector((store) => store.confirm);
  const dispatch = useDispatch();

  return (
    <aside className={styles.confirmContainer}>
      <div className={styles.confirm}>
        <h4>{props.confirmName}:</h4>
        <p>"{confirmAction.title}"?</p>
        <div className={styles.btnContainer}>
          <Link to="/photo-iris-react/blog" className="btn btn-primary">
            <button
              type="button"
              className={`${styles.btn} ${styles.confirmBtn}`}
              onClick={() => {
                dispatch(props.action(confirmAction));
                dispatch(closeConfirm());
              }}
            >
              Yes
            </button>
          </Link>
          <button
            type="button"
            className={`${styles.btn} ${styles.cancelBtn}`}
            onClick={() => {
              dispatch(closeConfirm());
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </aside>
  );
}

Confirm.propTypes = {};

export default Confirm;
