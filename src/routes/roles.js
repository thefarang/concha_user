'use strict'

let express = require('express')
let router = express.Router()
let Role = require('../models/role')

// GET all roles
router.get('/', (req, res, next) => {
  Role.find((err, roles) => {
    if (err) {
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
      return next(err)
    }

    res.set('Cache-Control', 'private, max-age=0, no-cache')
    if (role == null) {
      res.status(404)
      res.json()
    } else {
      res.status(200)
      res.json(role)
    }
  })
})

module.exports = router
