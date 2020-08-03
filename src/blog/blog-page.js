import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'

export const BlogPage = () => {
  const [markdown, setMarkdown] = useState('')
  const { postId } = useParams()

  useEffect(() => {
    (async () => {
        const delimiter = '---\n'
        const response = await fetch(`/marcusgeduld/blog-posts/${postId}`)
        const text = await response.text()
        const parts = text.split(delimiter)
        parts.shift()
        parts.shift()
        setMarkdown(parts.join(delimiter))
    })()
  }, [postId, setMarkdown])

  return (
    <div className="page">
      <ReactMarkdown source={markdown} />
    </div>
  )
}
