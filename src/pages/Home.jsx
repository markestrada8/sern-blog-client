import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

// const posts = [
//   {
//     id: 1,
//     title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
//     desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
//     image: "https://farm4.staticflickr.com/3938/32764888973_688597f9b9_k.jpg?momo_cache_bg_uuid=095c8934-2a23-401e-895a-bf166a205aea",

//   },
//   {
//     id: 2,
//     title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
//     desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
//     image: "https://farm4.staticflickr.com/3938/32764888973_688597f9b9_k.jpg?momo_cache_bg_uuid=095c8934-2a23-401e-895a-bf166a205aea",
//   },
//   {
//     id: 3,
//     title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
//     desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
//     image: "https://farm4.staticflickr.com/3938/32764888973_688597f9b9_k.jpg?momo_cache_bg_uuid=095c8934-2a23-401e-895a-bf166a205aea",
//   },
//   {
//     id: 4,
//     title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
//     desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
//     image: "https://farm4.staticflickr.com/3938/32764888973_688597f9b9_k.jpg?momo_cache_bg_uuid=095c8934-2a23-401e-895a-bf166a205aea",
//   },
// ]

const Home = () => {
  const [posts, setPosts] = useState([])

  const categoryParam = useLocation().search

  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await axios.get(`/posts${categoryParam}`)
        setPosts(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    getPosts()
  }, [categoryParam])

  const formatText = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html')
    return doc.body.textContent
  }


  return (
    <div className="home">
      <div className="posts">
        {posts.length ? posts.map(post => {
          return (
            <div className="post" key={post.post_id}>
              <div className="img">
                <img src={`../../public/upload/${post.image}`} />
              </div>
              <div className="content">
                <Link to={`/post/${post.post_id}`}>
                  <h1>{post.title}</h1>
                  <p>{formatText(post.content)}</p>
                  <button>Read More</button>
                </Link>
              </div>
            </div>
          )
        }) : null}
      </div>
    </div>
  )
}

export default Home