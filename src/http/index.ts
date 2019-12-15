import express from 'express'
import { createServer as createInsecure } from 'http'
import { createServer as createSecure } from 'https'
import { readFileSync } from 'fs'
import { argv } from '../cli'
import { packageJson } from '../shared/package'

const app = express()

app.get('/', (_req, res) => {
  res.json(packageJson)
})

function createServer () {
  if (argv.https) {
    const options = {
      key: readFileSync(argv.key!),
      cert: readFileSync(argv.cert!)
    }
    return createSecure(options, app)
  } else {
    return createInsecure(app)
  }
}

export const server = createServer()
