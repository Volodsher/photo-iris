// import './Header.css';
import PropTypes from 'prop-types';
import {
  NavLink
} from "react-router-dom";
import styles from './Header.module.scss';
import HamburgerButton from '../HamburgerButton/HamburgerButton';
import logo from '../../logo-iris-photo.png';

function Header(props) {
  return (
    <div className={styles.header}>
      <div className={styles.toCenterLogo} />
      <ul className={`${styles.menuList} ${styles.menuListFirst}`}>
        <li key='1'>
          <NavLink to="/" activeStyle={{color: "#E98074"}} exact>Home</NavLink>
        </li>
        <li key='2'>
          <NavLink to="/blog" activeStyle={{color: "#E98074"}} exact>Blog</NavLink>
        </li>
        <li key='3'>
          <NavLink to="/sessions" activeStyle={{color: "#E98074"}} exact>Sessions</NavLink>
        </li>
      </ul>
      <img src={logo} className={styles.logo} alt="logo" />
      <ul className={`${styles.menuList} ${styles.menuListSecond}`}>
        <li key='4'>
          <NavLink to="/gallery" activeStyle={{color: "#E98074"}} exact>Gallery</NavLink>
        </li>
        <li key='5'>
          <NavLink to="/inspiration" activeStyle={{color: "#E98074"}} exact>Inspiration</NavLink>
        </li>
        <li key='6'>
          <NavLink to="/contact" activeStyle={{color: "#E98074"}} exact>Contact</NavLink>
        </li>
      </ul>
      <HamburgerButton
        menuOpen={props.menuOpen}
        changeMenuStatus={props.changeMenuStatus}
      />
      <div className={props.menuOpen ? `${styles.sideMenu} ${styles.sideMenuOpen}` : styles.sideMenu}>
        <ul className={styles.menuList}>
          <li key='1' onClick={props.changeMenuStatus}>
            <NavLink to="/">Home</NavLink>
          </li>
          <li key='2' onClick={props.changeMenuStatus}>
            <NavLink to="/blog">Blog</NavLink>
          </li>
          <li key='3' onClick={props.changeMenuStatus}>
            <NavLink to="/sessions">Sessions</NavLink>
          </li>
          <li key='4' onClick={props.changeMenuStatus}>
            <NavLink to="/gallery">Gallery</NavLink>
          </li>
          <li key='5' onClick={props.changeMenuStatus}>
            <NavLink to="/inspiration">Inspiration</NavLink>
          </li>
          <li key='6' onClick={props.changeMenuStatus}>
            <NavLink to="/contact">Contact</NavLink>
          </li>
        </ul>
      </div>
      <div
        className={props.menuOpen ? `${styles.shadow} ${styles.shadowOpen}` : styles.shadow}
        onClick={props.changeMenuStatus}
      />
    </div>
  )
}

export default Header;

Header.propTypes = {
  menuOpen: PropTypes.bool,
  changeMenuStatus: PropTypes.func,
}
