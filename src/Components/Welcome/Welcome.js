import React, { useState } from 'react';
import Register from '../Register/Register';
import Login from '../Login/Login';
import './Welcome.css';

const Welcome = (props) => {
  // State for Login/Register toggle
  const [member, setMember] = useState(true);

  return (
    <main className="welcome">
      <section className="welcome-panel1">
        <h1 className="welcome-logo">Pick-Up</h1>
        <p className="welcome-tag-line">Start a game, do something</p>
      </section>
      <section className="welcome-panel2">
        {member ? <Login setMember={setMember} /> : <Register setMember={setMember} />}
      </section>
    </main>
  )
}

export default Welcome;
