import React, { useState } from 'react';
import './Login.css';

const Login = (props) => {
  const [input, setInput] = useState({ email: '', password: '' })

  const handleClick = () => {
    props.setMember(false)
  }
  
  const handleInputChange = (event) => {
    setInput({ ...input, [event.target.name]: event.target.value})
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log('Event: ', event.type);
    console.log('Input: ', input);

    const res = await fetch('http://localhost:4000/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
    });
    const data = res.json();
    console.log('Returned data: ',data);
  }

  return (
    <div className="login">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label for='email'>email</label>
        <input type='text' name='email' placeholder='email' value={input.email} onChange={handleInputChange} />
        <label for='password'>password</label>
        <input type='text' name='password' placeholder='password' value={input.password} onChange={handleInputChange} />
        <button type='submit' >Submit</button>
      </form>
      <button type='button' onClick={handleClick} >Don't have an account</button>
    </div>
  )
}

export default Login;
