
import './Login.css';

const Login = (props) => {

  const handleClick = () => {
    props.setMember(false)
  }

  return (
    <div className="login">
      <h2>Login</h2>

      <button type='button' onClick={handleClick} >Don't have an account</button>
    </div>
  )
}

export default Login;
