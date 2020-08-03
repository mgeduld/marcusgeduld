import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export const Blog = () => {
  const [contents, setContents] = useState([])  

  useEffect(() => {
    ;(async () => {
      const response = await fetch('/marcusgeduld/blog-posts/contents.json')
      const json = await response.json()
      setContents(json)
    })()
  }, [setContents])

  return (
    <div className="page">
      <h2>Blog</h2>
      {contents.map(({title, file}) => {
          return <div key={title}><Link to={`/marcusgeduld/blog/${file}`}>{title}</Link></div>
      })}
    </div>
  )
}
