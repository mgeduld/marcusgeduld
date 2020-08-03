import React, { useEffect, useState } from 'react'

export const Blog = () => {
  const [contents, setContents] = useState([])  

  useEffect(() => {
    ;(async () => {
      const response = await fetch('/marcusgeduld/blog/contents.json')
      const json = await response.json()
      setContents(json)
    })()
  }, [setContents])

  return (
    <div className="page">
      <h2>Blog</h2>
      {contents.map(({title}) => {
          return <div key={title}>{title}</div>
      })}
    </div>
  )
}
