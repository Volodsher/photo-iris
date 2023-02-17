import React from 'react';
import PropTypes from 'prop-types';
import styles from './Layout.module.scss';

function Picture(props) {
  return (
    <aside className={styles.confirmContainer} onClick={props.clearPicture}>
      <div className={styles.pictureContainer}>
        <img src={props.picture} className={styles.picture} />
      </div>
    </aside>
  );
}

Picture.propTypes = {
  picture: PropTypes.string.isRequired,
  clearPicture: PropTypes.func.isRequired,
};

export default Picture;
