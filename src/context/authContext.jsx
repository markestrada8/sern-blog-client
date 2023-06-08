import axios from 'axios'
import { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user') || null))



  const login = async (inputs) => {
    const res = await axios.post('/auth/login', inputs)
    console.log('cookie: ', res.headers)
    setCurrentUser(res.data)
  }

  const logout = async (inputs) => {
    await axios.post('/auth/logout')
    setCurrentUser(null)
  }

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(currentUser))
  }, [currentUser])

  return (
    <AuthContext.Provider
      value={{
        currentUser: currentUser,
        login: login,
        logout: logout,
      }} >
      {children}
    </AuthContext.Provider>
  )
}