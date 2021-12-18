import React, { useState } from 'react';

import Register from '../Register/Register';
import Login from '../Login/Login';

import './Welcome.css';

const Welcome = (props) => {
  const [member, setMember] = useState(false);

  return (
    <main className="welcome">
      <section className="welcome-pane pane1">
        <h1 className="welcome-logo">Pick-Up</h1>
        <p className="welcome-tag-line">Start a game, do something</p>
      </section>
      <section className="welcome-pane pane2">
        {member ? <Login setMember={setMember} /> : <Register setMember={setMember} />}
      </section>
    </main>
  )
}

export default Welcome;
