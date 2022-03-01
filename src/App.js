// import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
// import AuthContext from './store/auth-context';
import './App.css';
import Home from './pages/Home/Home';
import Profile from './pages/Profile/Profile';

function App() {
  // const [user, setUser] = useState({});
  // const authContext = useContext(AuthContext);
  
  return (
    <div className="App">
      {/* {authContext.isLoggedIn && <Nav /> } */}
      <Routes>
        <Route path='/' exact element={<Home />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
