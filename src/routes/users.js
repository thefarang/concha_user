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
    const user = await req.app.get('dbService').findUser({ id: 1 })
    if (user == null) {
      // Delegate to 404 middleware
      log.info({ roleId: req.params.id }, 'Guest user not found')
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
/*
router.get('/member/:email', (req, res, next) => {
  User.findOne({ email: req.params.email }, (err, user) => {
    if (err) {
      return next(err)
    }

    if (user === null) {
      res.set('Cache-Control', 'private, max-age=0, no-cache')
      res.status(404)
      res.json()
      return
    }
    res.json(user)
  })
})

// Retrieve user based on email and password.
router.get('/member/:email/:password', (req, res, next) => {
  User.findOne({ email: req.params.email }, '+password', (err, user) => {
    if (err) {
      return next(err)
    }

    if (user === null) {
      res.set('Cache-Control', 'private, max-age=0, no-cache')
      res.status(404)
      res.json()
      return
    }

    user.comparePassword(req.params.password, (err, isMatch) => {
      if (err) {
        return next(err)
      }

      if (!isMatch) {
        res.set('Cache-Control', 'private, max-age=0, no-cache')
        res.status(401)
        res.json()
        return
      }

      // @todo
      // Move this to a function in User
      const userObj = {
        _id: user._id,
        email: user.email,
        role: user.role,
        created_at: user.created_at,
        updated_at: user.updated_at
      }

      res.set('Cache-Control', 'private, max-age=0, no-cache')
      res.status(200)
      res.json(userObj)
    })
  })
})
*/

module.exports = router
