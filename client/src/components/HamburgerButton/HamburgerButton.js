import PropTypes from 'prop-types';
import styles from './HamburgerButton.module.scss';

export default function HamburgerButton(props) {

  return (
    <div 
      className={styles.hamburgerMenuButton}
      onClick={props.changeMenuStatus}
    >
      <div 
        className={
          props.menuOpen
          ? `${styles.firstLine} ${styles.firstLineAngle}`
          : styles.firstLine}
      />
      <div
        className={props.menuOpen
          ? `${styles.secondLine} ${styles.secondLineAngle}`
          : styles.secondLine}
      />
      <div
        className={props.menuOpen
          ? `${styles.thirdLine} ${styles.thirdLineAngle}`
          : styles.thirdLine}
      />
    </div>
  )
}

HamburgerButton.propTypes = {
  inMenu: PropTypes.bool,
  menuOpen: PropTypes.bool,
  changeMenuStatus: PropTypes.func
}
