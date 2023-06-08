import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import axios from 'axios'
import moment from 'moment'
import DOMPurify from "dompurify"

import Menu from '../components/Menu'
import Edit from '../images/edit.png'
import Delete from '../images/delete.png'
import { AuthContext } from '../context/authContext'
import { Link } from 'react-router-dom'



const Single = () => {
  const [post, setPost] = useState({})

  const navigate = useNavigate()
  const paramsId = useParams().id

  const { currentUser } = useContext(AuthContext)

  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await axios.get(`/posts/${paramsId}`)
        setPost(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    getPost()
  }, [paramsId])

  const handleDelete = async () => {
    try {
      const res = await axios.delete(`/posts/${paramsId}`, {}, { withCredentials: true })
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div className="single">
      <div className="content">
        <img src={`../../public/upload/${post?.image}`} alt="" />
        <div className="user">
          <img src={post.user_image} alt="" />
          <div className="info">
            <span>{currentUser.username}</span>
            <p>Posted {moment(post.date).fromNow()}</p>
          </div>
          {currentUser.username === post.username && (
            <div className="edit">
              <Link to={`/write?edit=2`} state={post}>
                <img src={Edit} alt="" />
              </Link>
              <img onClick={handleDelete} src={Delete} alt="" />
            </div>
          )}
        </div>
        <h1>{post.title}</h1>
        <p
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(post.content),
          }}
        ></p>
      </div>
      <div className="menu">
        <Menu category={post.category} />
      </div>
    </div>
  )
}

export default Single