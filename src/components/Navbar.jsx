import React, { useContext } from 'react'
import Logo from '../images//logo-dark-circle.jpg'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/authContext'

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext)

  const navigate = useNavigate()
  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className='navbar'>
      <div className='container'>
        <div className='logo'>
          <Link to='/'>
            <img src={Logo} alt='' />
          </Link>
        </div>
        <div className='links'>
          <Link className='link' to='/?category=art'>
            <h6>ART</h6>
          </Link>
          <Link className='link' to='/?category=science'>
            <h6>SCIENCE</h6>
          </Link>
          <Link className='link' to='/?category=technology'>
            <h6>TECHNOLOGY</h6>
          </Link>
          <Link className='link' to='/?category=cinema'>
            <h6>CINEMA</h6>
          </Link>
          <Link className='link' to='/?category=design'>
            <h6>DESIGN</h6>
          </Link>
          <Link className='link' to='/?category=food'>
            <h6>FOOD</h6>
          </Link>
          <span>{currentUser?.username}</span>
          <span>{currentUser ?
            (<span onClick={handleLogout}>LOGOUT</span>)
            :
            <Link to='/login' className='link'>LOGIN</Link>
          }</span>
          <span className='write'>
            <Link className='link' to='/write'>Write</Link>
          </span>
        </div>
      </div>
    </div>
  )
}

export default Navbar