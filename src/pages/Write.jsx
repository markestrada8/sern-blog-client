import axios from 'axios'
import moment from 'moment'
import React, { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useLocation, useNavigate } from 'react-router'

const Write = () => {
  const post = useLocation().state
  const [title, setTitle] = useState(post?.title || '')
  const [content, setContent] = useState(post?.content || '')
  const [file, setFile] = useState(null)
  const [category, setCategory] = useState(post?.category | '')

  const navigate = useNavigate()

  const uploadFile = async () => {
    try {
      const formData = new FormData()
      formData.append('file', file)
      const res = await axios.post('/upload', formData)
      console.log('upload response: ', res.data)
      return res.data
    } catch (error) {
      console.log('upload error: ', error)
    }
  }

  const handleClick = async (e) => {
    e.preventDefault()
    const imageURL = await uploadFile()
    try {
      post ? await axios.put(`/posts/${post.post_id}`, {
        title: title,
        content: content,
        category: category,
        image: file ? imageURL : null
      }) :
        await axios.post(`/posts/`, {
          title: title,
          content: content,
          category: category,
          image: file ? imageURL : null,
          date: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
        })
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='add'>
      <div className='content'>
        <input type='text' placeholder='title' value={title} onChange={e => setTitle(e.target.value)} />
        <div className="editorContainer">
          <ReactQuill theme="snow" value={content} onChange={setContent} />
        </div>
      </div>
      <div className='menu'>
        <div className='item'>
          <h1>Publish</h1>
          <span>
            <b>Status: </b> Draft
          </span>
          <span>
            <b>Visibility: </b> Public
          </span>
          <input type="file" id='file' onChange={e => setFile(e.target.files[0])} />
          <label htmlFor="file"></label>
          <div className="buttons">
            <button>Save as a draft</button>
            <button onClick={handleClick}>Publish</button>
          </div>
        </div>
        <div className='item'>
          <h1>Category</h1>
          <div className="cat">
            <input type="radio" checked={category === 'art'} name='cat' value='art' id='art' onChange={e => setCategory(e.target.value)} />
            <label htmlFor="art">Art</label>
          </div>
          <div className="cat">
            <input type="radio" checked={category === 'art'} name='cat' value='science' id='science' onChange={e => setCategory(e.target.value)} />
            <label htmlFor="art">Science</label>
          </div>
          <div className="cat">
            <input type="radio" checked={category === 'technology'} name='cat' value='technology' id='technology' onChange={e => setCategory(e.target.value)} />
            <label htmlFor="technology">Technology</label>
          </div>
          <div className="cat">
            <input type="radio" checked={category === 'cinema'} name='cat' value='cinema' id='cinema' onChange={e => setCategory(e.target.value)} />
            <label htmlFor="cinema">Cinema</label>
          </div>
          <div className="cat">
            <input type="radio" checked={category === 'design'} name='cat' value='design' id='design' onChange={e => setCategory(e.target.value)} />
            <label htmlFor="design">Design</label>
          </div>
          <div className="cat">
            <input type="radio" checked={category === 'food'} name='cat' value='food' id='food' onChange={e => setCategory(e.target.value)} />
            <label htmlFor="food">Food</label>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Write