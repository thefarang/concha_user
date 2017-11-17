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
    const email = 'guest@concha'
    const user = await req.app.get('dbFacade').getUserActions().findUserByEmail(email)
    if (user == null) {
      // Delegate to 404 middleware
      log.info({}, 'Guest user not found')
      return next()
    }
    res.json(user.toJSON())
  } catch (err) {
    log.info({
      err: err.stack,
      email: email
    }, 'An error occurred whilst retrieving the Guest user')

    // Delegate to 500 middleware
    return next(err)
  }
})

// Retrieve user based on email only
router.get('/member/:email', async (req, res, next) => {
  try {
    const user = await req.app.get('dbFacade').getUserActions().findUserByEmail(req.params.email)
    if (user == null) {
      // Delegate to 404 middleware
      log.info({ email: req.params.email }, 'User not found based on email search')
      return next()
    }
    res.json(user.toJSON())
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
    const dbFacade = req.app.get('dbFacade')
    const user = await dbFacade.getUserActions().findUserByEmail(req.params.email)
    if (user === null) {
      // Delegate to 404 middleware. We can't find the user.
      log.info({ 
        email: req.params.email,
        password:  req.params.password 
      }, 'User not found based on email and password search')
      return next()
    }

    const isPasswordCorrect = 
      dbFacade
        .getUserActions()
        .isPasswordCorrect(req.params.email, req.params.password)

    if (!isPasswordCorrect) {
      // Delegate to error-handler middleware.
      const message = 'User password is incorrect'
      const err = new Error(message)
      err.status = 401
      log.info({ 
        email: req.params.email,
        password:  req.params.password 
      }, message)
      return next(err)
    }

    // Authentication was successful.
    res.json(user.toJSON())
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
