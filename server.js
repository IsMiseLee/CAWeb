const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
.then(() => {
  const server = express()

  server.get('/p/:id', (req, res) => {
    const actualPage = '/post'
    const queryParams = { title: req.params.id }
    app.render(req, res, actualPage, queryParams)
})

server.get('/businessarticle/:title', (req, res) => {
  const actualPage = '/businessarticle'
  const queryParams = { id: req.params.index }
  app.render(req, res, actualPage, queryParams)
})

server.get('/gamingarticle/:index', (req, res) => {
  const actualPage = '/gamingPost'
  const queryParams = { id: req.params.index }
  app.render(req, res, actualPage, queryParams)
})

server.get('/sportarticle/:index', (req, res) => {
  const actualPage = '/sportPost'
  const queryParams = { id: req.params.index }
  app.render(req, res, actualPage, queryParams)
})


  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})