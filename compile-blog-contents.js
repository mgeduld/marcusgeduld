const fs = require('fs')
const path = require('path')
const remark = require('remark')
const strip = require('strip-markdown')

const TEASER_LENGTH = 30 //characters

const readFiles = (dirname, onFileContent) => {
  const filenames = fs.readdirSync(dirname)
  filenames.forEach((filename) => {
    const content = fs.readFileSync(dirname + filename, 'utf-8')
    onFileContent(filename, content)
  })
}

const getTeaser = (post) => {
  let stripped = ''
  remark()
    .use(strip)
    .process(post, function (err, file) {
      if (err) throw err
      stripped = String(file)
    })

  return stripped.substring(0, TEASER_LENGTH).replace(/<[^>]*$/, '')
}

const getPostData = (contents) => {
  const delimeter = '---\n'
  const parts = contents.split(delimeter)
  parts.shift()
  const meta = parts.shift()
  const post = getTeaser(parts.join(delimeter))
  const metaPairs = meta.split('\n')
  const metadata = metaPairs.reduce((data, pair) => {
    if (pair.includes(':')) {
      const [key, value] = pair.split(':')
      data[key.trim()] = value.trim()
    }
    return data
  }, {})
  return [metadata, post]
}

const data = []

readFiles(path.join(__dirname, '/public/blog/'), (filename, contents) => {
  if (filename.includes('.md')) {
    const [metadata, post] = getPostData(contents)
    data.push({
      ...metadata,
      file: filename,
      teaser: post,
    })
  }
})

data.sort((a, b) => {
  return new Date(b.date) - new Date(a.date)
})

fs.writeFileSync(path.join(__dirname, '/public/blog/contents.json'), JSON.stringify(data))
