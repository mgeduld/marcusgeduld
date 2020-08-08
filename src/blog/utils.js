import jsYAML from 'js-yaml'

export const getPostData = (contents) => {
  const delimeter = '---\n'
  const parts = contents.split(delimeter)
  parts.shift()
  const metadata = jsYAML.load(parts.shift())
  const post = parts.join(delimeter)
  return [metadata, post]
}

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export const getDisplayDate = (dateString) => {
  const date = new Date(dateString)
  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
}

export const getPostsGroupedByDate = (list) => {
  return list.reduce((grouped, { date: dateString, title, file }) => {
    const date = new Date(dateString)
    const year = date.getFullYear()
    const month = months[date.getMonth()]
    const day = date.getDate()
    grouped[year] = grouped[year] || {}
    grouped[year][month] = grouped[year][month] || []
    grouped[year][month].push({ title: `${title} (${month} ${day})`, file })
    return grouped
  }, {})
}

export const getPostsGroupedByTag = (list) => {
  return list.reduce((grouped, { tags = [], title, file, date }) => {
    tags.forEach((tag) => {
      grouped[tag] = grouped[tag] || []
      grouped[tag].push({ title, file, date })
    })
    return grouped
  }, {})
}
