const getKeyAndValue = (pair) => {
  // foo: 'bar:baz'
  const delimeter = ':'
  const parts = pair.split(delimeter)
  const key = parts.shift().trim()
  // parts = ["foo ", "'bar", "baz'"]
  const value = parts.join(delimeter).trim()
  return [key, value]
}

export const getPostData = (contents) => {
  const delimeter = '---\n'
  const parts = contents.split(delimeter)
  parts.shift()
  const meta = parts.shift()
  const post = parts.join(delimeter)
  const metaPairs = meta.split('\n')
  const metadata = metaPairs.reduce((data, pair) => {
    if (pair.includes(':')) {
      const [key, value] = getKeyAndValue(pair)
      data[key] = value
    }
    return data
  }, {})
  return [metadata, post]
}

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

export const getDisplayDate = (dateString) => {
  console.log('dateString', dateString)
  const date = new Date(dateString)
  console.log('date', date)
  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
}