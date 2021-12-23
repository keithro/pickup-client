import React, { useState, useContext } from 'react';
import { Link, Routes, Route, Navigate } from 'react-router-dom';
import AuthContext from './store/auth-context';
import './App.css';
import Nav from './components/Nav/Nav';
import Home from './pages/Home/Home';
import Profile from './pages/Profile/Profile';

function App() {
  // const [user, setUser] = useState({});
  const authContext = useContext(AuthContext);
  
  return (
    <div className="App">
      {/* {authContext.isLoggedIn && <Nav /> } */}
      <Routes>
        {/* DON'T FORGET TO USE /#/ROUTE_NAME */}
        <Route path='/' exact element={<Home />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
