import { Link } from 'react-router-dom';
import './Nav.css';

const Nav = (props) => {
  

  return (
    <header className="header">
      <div className='header-container'>
        <Link to='/'>
          <div className="logo">Pick-Up</div>
        </Link>
        <nav className='nav-links'>
          <ul>
            <li>
              <Link to='/profile'>Profile</Link>
            </li>
            <li>
              <button>Logout</button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Nav;
