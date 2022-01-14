import React, { useContext } from 'react';
import AuthContext from '../../store/auth-context';
import './Home.css';
import HomeContent from '../../components/HomeContent/HomeContent';
import Welcome from '../../components/Welcome/Welcome';


const Home = () => {
  const authContext = useContext(AuthContext);

  return (
    <div className='home'>
      {authContext.isLoggedIn || <Welcome />}
      {authContext.isLoggedIn && <HomeContent /> }
    </div>
  )
}

export default Home;
