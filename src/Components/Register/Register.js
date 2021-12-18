
import './Register.css';

const Register = (props) => {

  const handleClick = () => {
    props.setMember(true)
  }

  return (
    <div className="register">
      <h2>Register</h2>

      <button type='button' onClick={handleClick} >Already have an account</button>
    </div>
  )
}

export default Register;
