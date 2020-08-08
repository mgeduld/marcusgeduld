const fs = require('fs')
const path = require('path')
const remark = require('remark')
const strip = require('strip-markdown')
const jsYAML = require('js-yaml')

const TEASER_LENGTH = 1000 //characters

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
  const metadata = jsYAML.load(parts.shift())
  const post = getTeaser(parts.join(delimeter))
  return [metadata, post]
}

const data = []

readFiles(path.join(__dirname, '/public/blog-posts/'), (filename, contents) => {
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

fs.writeFileSync(path.join(__dirname, '/public/blog-posts/contents.json'), JSON.stringify(data))
