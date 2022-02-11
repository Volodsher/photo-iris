// import './Header.css';
import PropTypes from 'prop-types';
import {
  NavLink
} from "react-router-dom";
import styles from './Header.module.scss';
import HamburgerButton from '../HamburgerButton/HamburgerButton';
import logo from '../../logo-iris-photo.png';

//<NavLink to="/" activeStyle={{color: "#E98074"}} exact>Home</NavLink>

function Header(props) {
  let activeStyle = {
    color: "#E98074"
  }
  return (
    <div className={styles.header}>
      <div className={styles.toCenterLogo} />
      <ul className={`${styles.menuList} ${styles.menuListFirst}`}>
        <li key='1'>
          <NavLink
            to="/"
            style={({ isActive }) => 
              isActive ? activeStyle : undefined
            }
            end
          >
              Home
          </NavLink>
        </li>
        <li key='2'>
          <NavLink
            to="/blog"
            style={({ isActive }) => 
              isActive ? activeStyle : undefined
            }
            end
          >
            Blog
          </NavLink>
        </li>
        <li key='3'>
          <NavLink
            to="/sessions"
            style={({ isActive }) => 
              isActive ? activeStyle : undefined
            }
            end
          >
            Sessions
          </NavLink>
        </li>
      </ul>
      <img src={logo} className={styles.logo} alt="logo" />
      <ul className={`${styles.menuList} ${styles.menuListSecond}`}>
        <li key='4'>
          <NavLink
            to="/gallery"
            style={({ isActive }) => 
              isActive ? activeStyle : undefined
            }
            end
          >
            Gallery
          </NavLink>
        </li>
        <li key='5'>
          <NavLink
            to="/inspiration"
            style={({ isActive }) => 
              isActive ? activeStyle : undefined
            }
            end
          >
            Inspiration
          </NavLink>
        </li>
        <li key='6'>
          <NavLink
            to="/contact"
            style={({ isActive }) => 
              isActive ? activeStyle : undefined
            }
            end
          >
            Contact
          </NavLink>
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
