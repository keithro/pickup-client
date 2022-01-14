import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../store/auth-context';
import './Nav.css';

const Nav = (props) => {
  const authContext = useContext(AuthContext);
  
  const handleLogout = () => {
    authContext.logout();
  }

  return (
    <header className="header">
      <div className='header-container'>
        <Link className="logo" to='/'>
          {/* <div>Pick-Up</div> */}
          <span className='logo-pick'>Pick</span>
          <span className='logo-up'>Up</span>
        </Link>
        <nav className='nav-links'>
          <ul>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/profile'>Profile</Link>
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Nav;
