'use strict'

const log = require('../services/log')
const express = require('express')

const router = express.Router()

// Get all roles
router.get('/', async (req, res, next) => {
  try {
    const roles = await req.app.get('dbFacade').getRoleActions().findRoles()
    res.set('Cache-Control', 'private, max-age=0, no-cache')
    res.status(200)
    res.json(roles)

  } catch (err) {
    log.info({
      err: err.stack
    }, 'An error occurred whilst finding all user roles')
    return next(err)
  }
})

// Get specific role
router.get('/:id', async (req, res, next) => {
  try {
    const roleId = parseInt(req.params.id, 10)
    const role = await req.app.get('dbFacade').getRoleActions().findRoleById(roleId)
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
})

module.exports = router
