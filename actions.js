const parseLinkHeader = require('parse-link-header')

function hasHeaderLink(res) {
  if (!res.headers.has('link')) {
    return false
  }
  const links = parseLinkHeader(res.headers.get('link'))

}

module.exports = {hasHeaderLink}