import React, { useState } from 'react';
import './Login.css';

const Login = (props) => {
  const [input, setInput] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [isErrors, setIsErrors] = useState('');

  const handleClick = () => {
    props.setMember(false)
  }
  
  const handleInputChange = (event) => {
    setInput({ ...input, [event.target.name]: event.target.value})
  }

  const handleLogin = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const res = await fetch('http://localhost:4000/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
    });
    const data = await res.json();

    setIsLoading(false);

    if(data.errors) {
      // TODO: DELETE
      console.log('data.errors: ', data.errors);
      // console.log('data.errors[0].msg: ', data.errors[0].msg);
      // console.log('data.errors.msg: ', data.errors.msg);

      const errors = data.errors[0] || data.errors;
      console.log('Your errors variable = ', errors)
      setIsErrors(errors);
    } else {
      console.log('Success data: ',data);

    }
  }

  const emailInputClasses = [];
  if (isErrors && isErrors.param && isErrors.param === 'email') emailInputClasses.push('invalid');
  
  const pwInputClasses = [];
  if (isErrors && isErrors.param && isErrors.param === 'password') pwInputClasses.push('invalid');

  // PREVIOUS VERSION WITHOUT DYNAMIC CLASS NAMES
  return (
    <div className="login">
      <h2 className='login-heading'>Login</h2>
      <form onSubmit={handleLogin}>
        <label for='email' className={input.email || 'placeholder-hidden'}>email</label>
        <input type='text' name='email' placeholder='email' value={input.email} onChange={handleInputChange} className={emailInputClasses.join(' ')} />

        <label for='password' className={input.password || 'placeholder-hidden'}>password (min 8 characters)</label>
        <input type='password' name='password' placeholder='password' value={input.password} onChange={handleInputChange} className={pwInputClasses.join(' ')}/>

        <button type='submit' disabled={isLoading}>Login to Account</button>
        <button type='button' onClick={handleClick} disabled={isLoading}>Don't have an account</button>
      </form>
    </div>
  )

}

export default Login;
