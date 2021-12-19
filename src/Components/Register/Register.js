import React, { useState } from 'react';
import './Register.css';

const Register = (props) => {
  const [input, setInput] = useState({ username: '', email: '', password: '' })

  const handleClick = () => {
    props.setMember(true)
  }
  
  const handleInputChange = (event) => {
    setInput({ ...input, [event.target.name]: event.target.value})
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log('Event: ', event.type);
    console.log('Input: ', input);

    const res = await fetch('http://localhost:4000/users/register', {
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
    <div className="register">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <label for='username'>username</label>
        <input type='text' name='username' placeholder='username' value={input.username} onChange={handleInputChange} />
        <label for='email'>email</label>
        <input type='text' name='email' placeholder='email' value={input.email} onChange={handleInputChange} />
        <label for='password'>password</label>
        <input type='text' name='password' placeholder='password' value={input.password} onChange={handleInputChange} />
        <button type='submit' >Submit</button>
      </form>
      <button type='button' onClick={handleClick} >Already have an account</button>
    </div>
  )
}

export default Register;
