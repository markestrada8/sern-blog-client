import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Menu = ({ category }) => {

  const [posts, setPosts] = useState([])

  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await axios.get(`/posts/?category=${category}`)
        setPosts(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    getPosts()
  }, [category])

  return (
    <div>
      <div className="menu">
        <h1>Other posts you may like</h1>
        {posts.map(post => (
          <div className="post" key={post.post_id}>
            <img src={post.image} />
            <h2>{post.title}</h2>
            <button>Read More</button>
          </div>)
        )}
      </div>
    </div>
  )
}

export default Menu