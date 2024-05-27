import React from 'react';
import PropTypes from 'prop-types';
import styles from './Layout.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faXmark } from '@fortawesome/free-solid-svg-icons';

function Picture(props) {
  return (
    <div
      className={styles.pictureWrapper}
      onClick={() => {
        props.clearPicture();
        props.toggleOneImage('');
      }}
    >
      <div className={styles.pictureContainer}>
        <img src={props.picture} className={styles.picture} />
      </div>
    </div>
  );
}

Picture.propTypes = {
  picture: PropTypes.string.isRequired,
  clearPicture: PropTypes.func.isRequired,
};

export default Picture;
