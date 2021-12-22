import React, { useState, useContext } from 'react';
import { Link, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
// import Welcome from './pages/Welcome/Welcome';
import Home from './pages/Home/Home';
import Profile from './pages/Profile/Profile';

function App() {
  const [user, setUser] = useState({});
  
  return (
    <div className="App">
      <Routes>
        {/* DON'T FORGET TO USE /#/ROUTE_NAME */}
        <Route path='/' exact element={<Home user={user} setUser={setUser} />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
