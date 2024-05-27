import React from 'react';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Layout.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowUp } from '@fortawesome/free-solid-svg-icons';

function ScrollButton(props) {
  const [visible, setVisible] = useState(false);
  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisible);
    return () => window.removeEventListener('scroll', toggleVisible);
  }, []);

  return (
    <div
      className={styles.scrollButton}
      style={{
        display: visible ? 'block' : 'none',
      }}
    >
      <FontAwesomeIcon icon={faCircleArrowUp} onClick={scrollToTop} size="2x" />
    </div>
  );
}

export default ScrollButton;
