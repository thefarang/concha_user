'use strict'

const log = require('../services/log')
const express = require('express')

const router = express.Router()

// GET all roles
router.get('/', async (req, res, next) => {
  try {
    const roles = await req.app.get('dbService').findRoles()
    if (roles.length === 0) {
      // We must have roles in the database. To not have them is an error.
      // Flow into the error handler.
      const err = new Error('No roles exist in the database')
      log.info({}, err.message)
      return next(err)
    }

    res.set('Cache-Control', 'private, max-age=0, no-cache')
    res.status(200)
    res.json(roles)

  } catch (err) {
    log.info({
      err: err.stack
    }, 'An error occurred whilst finding all user roles')
    return next(err)
  }

  /*
  Role.find((err, roles) => {
    if (err) {
      log.info({
        err: err
      }, 'An error occurred whilst finding all user roles')
      return next(err)
    }

    res.set('Cache-Control', 'private, max-age=0, no-cache')
    res.status(200)
    res.json(roles)
  })
  */
})

// Get specific role
router.get('/:id', async (req, res, next) => {
  try {
    const role = await req.app.get('dbService').findRole({ id: parseInt(req.params.id, 10)})
    if (role == null) {
      // Delegate to 404 middleware
      log.info({ roleId: req.params.id }, 'Role ID not found')
      return next()
    }

    res.set('Cache-Control', 'private, max-age=0, no-cache')
    res.status(200)
    res.json(role)
  } catch (err) {
    log.info({
      err: err,
      roleId: req.params.id
    }, 'An error occurred whilst locating user role')
    return next(err)
  }

  /*
  Role.findOne({ id: req.params.id }, (err, role) => {
    if (err) {
      log.info({
        err: err,
        roleId: req.params.id
      }, 'An error occurred whilst locating user role')
      return next(err)
    }

    res.set('Cache-Control', 'private, max-age=0, no-cache')
    if (role == null) {
      // @todo
      // This should be delegated to the 404 middleware
      res.status(404)
      res.json()
    } else {
      res.status(200)
      res.json(role)
    }
  })
  */
})

module.exports = router
