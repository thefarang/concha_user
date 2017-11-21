'use strict'

const log = require('../services/log')
const express = require('express')
const dbUsers = require('../scripts/data/users')

const router = express.Router()

// Retrieve the Guest user
router.get('/guest', async (req, res, next) => {
  try {
    const user =
      await req.app.get('dbFacade')
        .getUserActions()
        .findUserByEmail(dbUsers.getGuestUser().email)

    if (user == null) {
      // If the Guest user does not exist then this is a serious issue.
      // Delegate to 500 middleware
      const err = new Error('Guest user not found')
      return next(err)
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
    const user = 
      await dbFacade
        .getUserActions()
        .findUserByEmail(req.params.email)

    if (user === null) {
      // Delegate to 404 middleware. We can't find the user.
      log.info({ 
        email: req.params.email,
        password:  req.params.password 
      }, 'User not found based on email and password search')
      return next()
    }

    const isPasswordCorrect =
      await dbFacade
        .getUserActions()
        .isPasswordCorrect(req.params.email, req.params.password)

    if (!isPasswordCorrect) {
      // We have found the user, but the password is incorrect.
      // Delegate to error-handler middleware.
      const err = new Error('User password is incorrect')
      err.status = 401
      log.info({ 
        email: req.params.email,
        password:  req.params.password 
      }, err.message)
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
