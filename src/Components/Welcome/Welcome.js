import React, { useState, useContext } from 'react';
// import Register from '../Register/Register';
// import Login from '../Login/Login';
import AuthContext from '../../store/auth-context';
import './Welcome.css';

const Welcome = (props) => {
  const [isMember, setIsMember] = useState(true);
  const [input, setInput] = useState({ username: '', email: '', password: '', passwordCheck: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [isErrors, setIsErrors] = useState('');
  const authContext = useContext(AuthContext);

  const handleMemberStateChange = () => {
    setIsMember(!isMember);
    // setInput({ username: '', email: '', password: '', passwordCheck: '' });
    setIsErrors('');
    setIsLoading(false);
  }
  
  const handleInputChange = (event) => {
    setInput({ ...input, [event.target.name]: event.target.value});
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    let route = isMember ? 'login' : 'register';

    const res = await fetch(`http://localhost:4000/auth/${route}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
    });
    const data = await res.json();

    setIsLoading(false);

    if(data.errors) {
      const errors = data.errors[0] || data.errors;
      console.log('Your errors variable = ', errors)
      setIsErrors(errors);
    } else {
      console.log(data.token);
      authContext.login(data.token);
    }
  }

  let usernameInputClass = '';
  let emailInputClass = '';
  let pwInputClass = '';
  if (isErrors && isErrors.param && isErrors.param === 'username') usernameInputClass += 'invalid';
  if (isErrors && isErrors.param && isErrors.param === 'email') emailInputClass += 'invalid';
  if (isErrors && isErrors.param && isErrors.param === 'password') pwInputClass += 'invalid';

  return (
    <main className="welcome">
      <section className="welcome-panel1">
        <h1 className="welcome-logo">Pick-Up</h1>
        <p className="welcome-tag-line">Start a game, do something</p>
      </section>
      
      <section className="welcome-panel2">
        <div className="access-form">
          {isErrors && 
            <div className='error-message'>{isErrors.msg}</div>
          }
          <h2 className='access-form-heading'>{isMember ? 'Login' : 'Register'}</h2>
          <form onSubmit={handleSubmit}>
            {!isMember && <>
              <label for='username' className={input.username || 'placeholder-hidden'}>name</label>
              <input type='text' name='username' placeholder='name' value={input.username} onChange={handleInputChange} className={usernameInputClass} />
            </>}

            <label for='email' className={input.email || 'placeholder-hidden'}>email</label>
            <input type='text' name='email' placeholder='email' value={input.email} onChange={handleInputChange} className={emailInputClass} />

            <label for='password' className={input.password || 'placeholder-hidden'}>password (min 8 characters)</label>
            <input type='password' name='password' placeholder='password' value={input.password} onChange={handleInputChange} className={pwInputClass} />

            {!isMember && <>
              <label for='passwordCheck' className={input.passwordCheck || 'placeholder-hidden'}>confirm password</label>
              <input type='password' name='passwordCheck' placeholder='confirm password' value={input.passwordCheck} onChange={handleInputChange} className={pwInputClass} />
            </>}

            <button type='submit' disabled={isLoading}>{isMember ? 'Sign In' : 'Create an Account'}</button>
            <button type='button' onClick={handleMemberStateChange}>{isMember ? "Don't have an account" : 'Already have an account'}</button>
          </form>
        </div>
      </section>
    </main>
  )
}

export default Welcome;
