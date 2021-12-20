import React, { useState } from 'react';
import './Login.css';

const Login = (props) => {
  const [input, setInput] = useState({ email: '', password: '' });
  // const [isLoading, setIsLoading] = useState(false);
  // const [isErrors, setIsErrors] = useState('');

  const handleClick = () => {
    props.setMember(false)
  }
  
  const handleInputChange = (event) => {
    setInput({ ...input, [event.target.name]: event.target.value})
  }

  const handleLogin = async (event) => {
    event.preventDefault();

    // TODO: DELETE
    // console.log('Event: ', event.type);
    // console.log('Input: ', input);

    const res = await fetch('http://localhost:4000/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
    });
    const data = await res.json();

    if(data.errors) {
      // TODO: DELETE
      console.log('data.errors: ', data.errors);
      // console.log('data.errors[0].msg: ', data.errors[0].msg);
      // console.log('data.errors.msg: ', data.errors.msg);

      const errors = data.errors.msg || data.errors[0].msg;
      console.log('Your errors variable = ', errors)
      // setIsErrors(errors);
    } else {
      console.log('Success data: ',data);

    }
  }

  return (
    <div className="login">
      <h2 className='login-heading'>Login</h2>
      <form onSubmit={handleLogin}>
        <label for='email' className={input.email || 'placeholder-hidden'}>email</label>
        <input type='text' name='email' placeholder='email' value={input.email} onChange={handleInputChange} />
        <label for='password' className={input.password || 'placeholder-hidden'}>password (min 8 characters)</label>
        <input type='password' name='password' placeholder='password' value={input.password} onChange={handleInputChange} />
        <button type='submit'>Login to Account</button>
        <button type='button' onClick={handleClick}>Don't have an account</button>
      </form>
    </div>
  )
}

export default Login;
