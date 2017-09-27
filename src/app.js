'use strict'

// @todo
// Does not yet support HATEOS

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express()

// Middleware to check each client request specifically accepts JSON responses.
app.use((req, res, next) => {
  const acceptHeader = req.get('accept')
  if ((acceptHeader === undefined) || (acceptHeader.indexOf('application/json') === -1)) {
    res.set('Cache-Control', 'private, max-age=0, no-cache')
    res.status(406)
    res.json()
    return
  }
  next()
})

// Database connection
// @todo replace this with config
mongoose.connect('mongodb://mongo:27017/local', {
  useMongoClient: true
})

// Close the database connection when Node process ends.
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    // @todo add logging here.
    process.exit(0)
  })
})

app.use(bodyParser.urlencoded({ extended: false }))

const role = require('./routes/roles')
const user = require('./routes/users')
app.use('/api/v1/roles', role)
app.use('/api/v1/users', user)

// Default 404 handler, called when no routes match the requested route.
app.use((req, res, next) => {
  const err = new Error()
  err.status = 404
  next(err)
})

// Error handler.
app.use((err, req, res, next) => {
  res.set('Cache-Control', 'private, max-age=0, no-cache')
  res.status(err.status || 500)
  res.json()
})

module.exports = app
