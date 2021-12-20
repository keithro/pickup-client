import React, { useState } from 'react';
import { Link, Routes, Route, Navigate } from 'react-router-dom';

import Welcome from './Components/Welcome/Welcome';
import Home from './Components/Home/Home';

// import logo from './logo.svg';
import './App.css';

function App() {
  const [user, setUser] = useState({});
  
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Welcome user={user} setUser={setUser} />} />
        <Route path='/home' element={<Home user={user} />} />
        {/* <Route path='/register' element={<Register />} /> */}
      </Routes>
    </div>

  );
}

export default App;
