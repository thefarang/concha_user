'use strict'

const log = require('../services/log')
const express = require('express')

const router = express.Router()

// GET /users/guest
// GET /users/member/email
// GET /users/member/email/password

// Retrieve the Guest user
router.get('/guest', async (req, res, next) => {
  try {
    // @todo
    // 'guest@concha' needs to be defined somewhere formally
    const user = await req.app.get('dbService').findUserByEmail('guest@concha')
    if (user == null) {
      // Delegate to 404 middleware
      log.info({}, 'Guest user not found')
      return next()
    }
    res.json(user)
  } catch (err) {
    log.info({
      err: err.stack
    }, 'An error occurred whilst retrieving the Guest user')
    return next(err)
  }
})

// Retrieve user based on email only
router.get('/member/:email', async (req, res, next) => {
  try {
    const user = await req.app.get('dbService').findUserByEmail(req.params.email)
    if (user == null) {
      // Delegate to 404 middleware
      log.info({ email: req.params.email }, 'User not found based on email search')
      return next()
    }
    res.json(user)
  } catch (err) {
    log.info({
      err: err.stack,
      email: req.params.email
    }, 'An error occurred whilst retrieving the User based on email search')
    
    // Delegate to 500 middleware
    return next(err)
  }
})

// Retrieve user based on email and password.
router.get('/member/:email/:password', async (req, res, next) => {
  try {
    const user =
      await req.app
        .get('dbService')
        .findUserByEmailAndPassword(req.params.email, req.params.password)
    
    if (user == null) {
      // Delegate to 404 middleware
      log.info({ 
        email: req.params.email,
        password:  req.params.password 
      }, 'User not found based on email and password search')
      return next()
    }

    res.json(user)
  } catch (err) {
    log.info({
      err: err.stack,
      email: req.params.email,
      password: req.params.password
    }, 'An error occurred whilst retrieving the User based on email and password search')
    
    // Delegate to the 500 middleware
    return next(err)
  }
})

module.exports = router
