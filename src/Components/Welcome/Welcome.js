import React, { useState, useContext } from 'react';
import AuthContext from '../../store/auth-context';
import './Welcome.css';
import background from '../../img/pick-up-game.jpg';

const Welcome = (props) => {
  const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;
  const emptyInputVal = {
    name: "",
    email: "",
    password: "",
    passwordCheck: "",
  };
  const [isMember, setIsMember] = useState(true);
  const [input, setInput] = useState(emptyInputVal);
  const [isLoading, setIsLoading] = useState(false);
  const [isErrors, setIsErrors] = useState('');
  const authContext = useContext(AuthContext);

  const handleMemberStatusChange = () => {
    setIsMember(!isMember);
    setInput(emptyInputVal);
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

    const res = await fetch(`${API_ENDPOINT}/auth/${route}`, {
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
      console.log('Your errors variable = ', errors);
      setIsErrors(errors);
    } else {
      console.log(data);
      authContext.login(data.token);
    }
  }

  // Conditional Classes
  let nameInputClass = '';
  let emailInputClass = '';
  let pwInputClass = '';
  if (isErrors && isErrors.param && isErrors.param === 'name') nameInputClass += 'invalid';
  if (isErrors && isErrors.param && isErrors.param === 'email') emailInputClass += 'invalid';
  if (isErrors && isErrors.param && isErrors.param === 'password') pwInputClass += 'invalid';

  return (
    <main className="welcome" style={{ backgroundImage: `url(${background})` }} >
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
              <label for='name' className={input.name || 'placeholder-hidden'}>name</label>
              <input type='text' name='name' placeholder='name' value={input.name} onChange={handleInputChange} className={nameInputClass} />
            </>}

            <label for='email' className={input.email || 'placeholder-hidden'}>email</label>
            <input type='email' name='email' placeholder='email' value={input.email} onChange={handleInputChange} className={emailInputClass} />

            <label for='password' className={input.password || 'placeholder-hidden'}>password (min 8 characters)</label>
            <input type='password' name='password' placeholder='password' value={input.password} onChange={handleInputChange} className={pwInputClass} />

            {!isMember && <>
              <label for='passwordCheck' className={input.passwordCheck || 'placeholder-hidden'}>confirm password</label>
              <input type='password' name='passwordCheck' placeholder='confirm password' value={input.passwordCheck} onChange={handleInputChange} className={pwInputClass} />
            </>}

            <button type='submit' className='submit-btn' disabled={isLoading}>{isMember ? 'Sign In' : 'Create an Account'}</button>
            <button type='button' className='member-btn' onClick={handleMemberStatusChange}>{isMember ? "Don't have an account" : 'Already have an account'}</button>
          </form>
        </div>
      </section>
    </main>
  )
}

export default Welcome;
