import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import styles from './Layout.module.scss';
import HamburgerButton from './HamburgerButton/HamburgerButton';
import logo from '../../logo-iris-photo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../features/authSlice';

function Header(props) {
  const auth = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  let activeStyle = {
    color: '#E98074',
  };

  return (
    <div className={styles.headerWrapper}>
      <div
        key="2"
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '5rem',
          marginBottom: '-2.5rem',
          padding: '0 1rem',
          lineHeight: '0.8',
        }}
      >
        <h1>DreamSmile</h1>
        <h1>Photography</h1>
      </div>
      <div className={styles.header}>
        <div className={styles.toCenterLogo} />
        <ul className={`${styles.menuList} ${styles.menuListFirst}`}>
          <li key="1">
            <NavLink
              to="/"
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
              end
            >
              Home
            </NavLink>
          </li>
          <li key="2">
            <NavLink
              to="/mygallery"
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
              end
            >
              Gallery
            </NavLink>
          </li>
        </ul>
        <a href="/vhid">
          <img src={logo} className={styles.logo} alt="logo" />
        </a>
        <ul className={`${styles.menuList} ${styles.menuListSecond}`}>
          <li key="3">
            <NavLink
              to="/pricing"
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
              end
            >
              Pricing
            </NavLink>
          </li>
          <li key="4">
            <NavLink
              to="/blog"
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
              end
            >
              Blog
            </NavLink>
          </li>
          <li
            key="5"
            style={{
              position: 'relative',
            }}
          >
            <NavLink
              to="/contact"
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
              end
            >
              Contact
            </NavLink>
            {auth.isAuthenticated && (
              <a
                onClick={() => dispatch(logout())}
                href="/"
                style={{
                  position: 'absolute',
                  top: '40px',
                  right: '25px',
                }}
              >
                <FontAwesomeIcon icon={faRightFromBracket} size="2x" />{' '}
              </a>
            )}
          </li>
        </ul>
        <HamburgerButton
          menuOpen={props.menuOpen}
          changeMenuStatus={props.changeMenuStatus}
        />
        {auth.isAuthenticated && (
          <a
            onClick={() => dispatch(logout())}
            href="/"
            className={styles.logout}
            style={{
              position: 'absolute',
              top: '31px',
              right: '50px',
              color: 'var(--gray-light)',
            }}
          >
            <FontAwesomeIcon icon={faRightFromBracket} size="2x" />{' '}
          </a>
        )}
        <div
          className={
            props.menuOpen
              ? `${styles.sideMenu} ${styles.sideMenuOpen}`
              : styles.sideMenu
          }
        >
          <ul className={styles.menuList}>
            <li key="1" onClick={props.changeMenuStatus}>
              <NavLink to="/">Home</NavLink>
            </li>
            <li key="2" onClick={props.changeMenuStatus}>
              <NavLink to="/mygallery">Gallery</NavLink>
            </li>
            <li key="3" onClick={props.changeMenuStatus}>
              <NavLink to="/pricing">Pricing</NavLink>
            </li>
            <li key="4" onClick={props.changeMenuStatus}>
              <NavLink to="/blog">Blog</NavLink>
            </li>
            <li key="5" onClick={props.changeMenuStatus}>
              <NavLink to="/contact">Contact</NavLink>
            </li>
          </ul>
        </div>
        <div
          className={
            props.menuOpen
              ? `${styles.shadow} ${styles.shadowOpen}`
              : styles.shadow
          }
          onClick={props.changeMenuStatus}
        />
      </div>
    </div>
  );
}

export default Header;

Header.propTypes = {
  menuOpen: PropTypes.bool,
  changeMenuStatus: PropTypes.func,
};
