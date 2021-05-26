#!/usr/bin/env node
const parseArgs = require('minimist')
const fetch = require('node-fetch')

async function main () {
  const args = parseArgs(process.argv.slice(2))
  if (args._.length !== 1) {
    console.log('Usage: walint <url>')
    process.exit(1)
  }

  const [containerUrl] = args._

  // TODO validate URL
  for (const method of ['GET', 'HEAD', 'OPTIONS']) {
    const headers = new fetch.Headers()
    const res = await fetch(containerUrl, {
      method,
      headers,
    })
    console.log('Link headers:', parseLinkHeader(res.headers.get('link')))
  }

  for (const method of ['GET', 'HEAD']) {
    const headers = new fetch.Headers()
    const res = await fetch(containerUrl, {
      method,
      headers,
    })

    if (!res.headers.has('etag')) {
      console.log(`HTTP ${method} ${containerUrl}
> Missing header \`ETag\``)
      process.exit(1)
    }
  }
}

main()
