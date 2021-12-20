import React, { useState } from 'react';
import './Register.css';

const Register = (props) => {
  const [input, setInput] = useState({ username: '', email: '', password: '', passwordCheck: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [isErrors, setIsErrors] = useState('');

  // TODO: HANDLE PASSWORD CHECK
  // Can have a state = password === passwordCheck
  // Maybe add to handleInputChange function before setInput()...

  const handleClick = () => {
    props.setMember(true)
  }
  
  const handleInputChange = (event) => {
    setInput({ ...input, [event.target.name]: event.target.value})
  }

  const handleRegister = async (event) => {
    event.preventDefault();

    // console.log('Event: ', event.type);
    // console.log('Input: ', input);

    const res = await fetch('http://localhost:4000/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
    });
    const data = await res.json();

    if(data.errors) {
      console.log('DATA.ERRORS: ', data.errors)
      const errors = data.errors.msg || data.errors[0].msg;
      // TODO: DELETE
      console.log('Your errors variable = ', errors)
      setIsErrors(errors);
    } else {
      console.log('Success data: ',data);

    }

  }

  return (
    <div className="register">
      <h2 className='register-heading'>Register</h2>
      <form onSubmit={handleRegister}>
        <label for='username' className={input.username || 'placeholder-hidden'}>username</label>
        <input type='text' name='username' placeholder='username' value={input.username} onChange={handleInputChange} />
        <label for='email' className={input.email || 'placeholder-hidden'}>email</label>
        <input type='text' name='email' placeholder='email' value={input.email} onChange={handleInputChange} />
        <label for='password' className={input.password || 'placeholder-hidden'}>password (min 8 characters)</label>
        <input type='password' name='password' placeholder='password' value={input.password} onChange={handleInputChange} />
        <label for='passwordCheck' className={input.passwordCheck || 'placeholder-hidden'}>confirm password</label>
        <input type='password' name='passwordCheck' placeholder='confirm password' value={input.passwordCheck} onChange={handleInputChange} />
        <button type='submit'>Sign Up</button>
        <button type='button' onClick={handleClick}>Already have an account</button>
      </form>
    </div>
  )
}

export default Register;
