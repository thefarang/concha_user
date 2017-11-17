'use strict'

// @todo
// Does not yet support HATEOS

const log = require('./services/log')
const express = require('express')
const bodyParser = require('body-parser')

module.exports = (dbFacade) => {
  const appInstance = express()
  appInstance.set('dbFacade', dbFacade)

  // Middleware to check each client request specifically accepts JSON responses.
  appInstance.use((req, res, next) => {
    const acceptHeader = req.get('accept')
    if ((acceptHeader === undefined) || (acceptHeader.indexOf('application/json') === -1)) {
      const err = new Error()
      err.status = 406
      log.info({ err: err }, 'Client does not accept JSON responses')
      return next(err)
    }
    next()
  })

  appInstance.use(bodyParser.urlencoded({ extended: false }))

  const role = require('./routes/roles')
  const user = require('./routes/users')
  appInstance.use('/api/v1/roles', role)
  appInstance.use('/api/v1/users', user)

  // Default 404 handler, called when no routes match the requested route.
  appInstance.use((req, res, next) => {
    const err = new Error()
    err.status = 404
    log.info({ err: err }, 'An unknown route has been requested')
    next(err)
  })

  // Error handler.
  appInstance.use((err, req, res, next) => {
    log.info({ err: err }, 'Error handled finally by the error handler middleware')
    res.set('Cache-Control', 'private, max-age=0, no-cache')
    res.status(err.status || 500)
    res.json()
  })

  return appInstance
}
