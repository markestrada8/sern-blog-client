import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Register = () => {
  const [error, setError] = useState('')
  const [inputs, setInputs] = useState({
    username: '',
    email: '',
    password: '',
  })

  const navigate = useNavigate()

  const handleChange = (e) => {
    setInputs(prevState => ({ ...prevState, [e.target.name]: e.target.value })
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('/auth/register', inputs)
      navigate('/login')
    } catch (error) {
      setError(error.response.data)
    }
  }

  return (
    <div className='auth'>
      <h1>Register</h1>
      <form>
        <input required type='text' placeholder='username' onChange={handleChange} name='username' />
        <input required type='email' placeholder='email' onChange={handleChange} name='email' />
        <input required type='password' placeholder='password' onChange={handleChange} name='password' />
        <button onClick={handleSubmit}>Register</button>
        {error && <p>{error}</p>}
        <span>Already have an account? <Link to='/login'>Login</Link></span>
      </form>
    </div>
  )
}

export default Register