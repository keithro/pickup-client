import React, { useEffect, useState, useContext } from 'react';
import { Link, Routes, Route, Navigate } from 'react-router-dom';

import AuthContext from '../../store/auth-context';
import Feed from '../../components/Feed/Feed';
import Welcome from '../../components/Welcome/Welcome';
// import AuthContext from '../../store/auth-context';

import './Home.css';

const Home = (props) => {
  const authContext = useContext(AuthContext);

  return (
    <div className='home'>
      {authContext.isLoggedIn || <Welcome />}
      {authContext.isLoggedIn && <>
        <h1>Welcome to the Home Page</h1>
        <Feed />
      </> }
    </div>
  )
}

export default Home;
