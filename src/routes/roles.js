'use strict'

const log = require('../lib/log')
const express = require('express')
const router = express.Router()
let Role = require('../models/role')

// GET all roles
router.get('/', (req, res, next) => {
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
})

// Get specific role
router.get('/:id', (req, res, next) => {
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
})

module.exports = router
