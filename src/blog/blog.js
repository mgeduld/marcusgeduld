/** @jsx jsx */
import { jsx } from '@emotion/core'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import {
  getDisplayDate,
  getPostsGroupedByDate,
  getPostsGroupedByTag,
} from './utils'
import { styles } from './styles'

const POSTS_PER_PAGE = 3

export const Blog = () => {
  const [contents, setContents] = useState([])
  const [currentPage, setCurrentPage] = useState(0)
  const [postsForThisPage, setPostsForThisPage] = useState([])
  const [numberOfPages, setNumberOfPages] = useState(0)
  const [postGroupedByDate, setPostsGroupedByDate] = useState({})
  const [postsGroupedByTag, setPostsGroupedByTag] = useState({})

  useEffect(() => {
    ;(async () => {
      const response = await fetch('/marcusgeduld/blog-posts/contents.json')
      const json = await response.json()
      setContents(json)
      setNumberOfPages(Math.ceil(json.length / POSTS_PER_PAGE))
      setPostsGroupedByDate(getPostsGroupedByDate(json))
      setPostsGroupedByTag(getPostsGroupedByTag(json))
    })()
  }, [setContents])

  useEffect(() => {
    const start = currentPage * POSTS_PER_PAGE
    const end = start + POSTS_PER_PAGE
    setPostsForThisPage(contents.slice(start, end))
  }, [contents, currentPage])

  return (
    <div className="page" css={styles}>
      <h2>Blog</h2>
      <main>
        {postsForThisPage.map(({ title, date, file, teaser, image }) => {
          return (
            <div className="post-listing" key={title}>
              <Link to={`/marcusgeduld/blog/${file}`}>
                {getDisplayDate(date)} {title}
              </Link>
              <div>
                {image && (
                  <img
                    style={{
                      maxWidth: '200px',
                      float: 'left',
                      border: '2px solid white',
                      marginRight: '1em',
                      marginBottom: '1em',
                    }}
                    src={`/marcusgeduld/${image}`}
                    alt="blog-post pic"
                  />
                )}
                {teaser}
                <Link to={`/marcusgeduld/blog/${file}`}>...</Link>
              </div>
            </div>
          )
        })}
      </main>
      <nav>
        <div className="blog-page-nav">
          {[...Array(numberOfPages).keys()].map((pageNum) => (
            <span
              key={pageNum}
              className={`blog-page-number ${
                pageNum === currentPage ? 'blog-page-number-current' : ''
              }`}
              onClick={() => setCurrentPage(pageNum)}
            >
              {pageNum + 1}{' '}
            </span>
          ))}
        </div>
        <div className="blog-date-nav">
          <ul>
            {Object.keys(postGroupedByDate)
              .reverse()
              .map((year) => {
                return (
                  <li key={year}>
                    <div>{year}</div>
                    <ul>
                      {Object.keys(postGroupedByDate[year]).map((month) => {
                        return (
                          <li key={`${year}-${month}`}>
                            <div>{month}</div>
                            <ul>
                              {postGroupedByDate[year][month].map(
                                ({ title, file }) => {
                                  return (
                                    <li key={file}>
                                      <Link to={`/marcusgeduld/blog/${file}`}>
                                        {title}
                                      </Link>
                                    </li>
                                  )
                                }
                              )}
                            </ul>
                          </li>
                        )
                      })}
                    </ul>
                  </li>
                )
              })}
          </ul>
        </div>
        <div className="blog-tags-nav">
          {Object.keys(postsGroupedByTag).map((tag) => {
            const list = postsGroupedByTag[tag]
            return (
              <div key={tag}>
                <div>{tag}</div>
                <ul>
                  {list.map(({ title, file }) => {
                    return (
                      <li key={title}>
                        <Link to={`/marcusgeduld/blog/${file}`}>{title}</Link>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
