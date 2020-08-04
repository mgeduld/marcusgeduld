/** @jsx jsx */
import { jsx } from '@emotion/core'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'

import { getPostData, getDisplayDate } from './utils'
import { styles } from './styles'

export const BlogPage = () => {
  const [markdown, setMarkdown] = useState('')
  const [metadata, setMetadata] = useState()
  const { postId } = useParams()

  useEffect(() => {
    ;(async () => {
      const response = await fetch(`/marcusgeduld/blog-posts/${postId}`)
      const text = await response.text()
      const [metadata, post] = getPostData(text)
      setMarkdown(post)
      setMetadata(metadata)
    })()
  }, [postId, setMarkdown])

  return (
    <div className="page" css={styles}>
      {metadata && (
        <header>
          <div>{getDisplayDate(metadata.date)}</div>
          <h1>{metadata.title}</h1>
        </header>
      )}
      <ReactMarkdown source={markdown} />
    </div>
  )
}
