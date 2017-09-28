'use strict'

const express = require('express')
const router = express.Router()
const User = require('../models/user')

// GET /users
// GET /users/guest
// GET /users/member/email
// GET /users/member/email/password

// Retrieve all users
router.get('/', (req, res, next) => {
  User.find((err, users) => {
    if (err) {
      next(err)
      return
    }

    if (users.length === 0) {
      res.set('Cache-Control', 'private, max-age=0, no-cache')
      res.status(404).json()
      return
    }
    res.json(users)
  })
})

// Retrieve the Guest user
router.get('/guest', (req, res, next) => {
  User.findOne({ role: 1 }, (err, user) => {
    if (err) {
      return next(err)
    }

    if (user === null) {
      res.set('Cache-Control', 'private, max-age=0, no-cache')
      res.status(404).json({ message: 'Guest User not found' })
      return
    }
    res.json(user)
  })
})

// Retrieve user based on email only
router.get('/member/:email', (req, res, next) => {
  User.findOne({ email: req.params.email }, (err, user) => {
    if (err) {
      next(err)
      return
    }

    if (user === null) {
      res.set('Cache-Control', 'private, max-age=0, no-cache')
      res.status(404).json({ message: 'User not found' })
      return
    }
    res.json(user)
  })
})

// Retrieve user based on email and password.
router.get('/member/:email/:password', (req, res, next) => {
  User.findOne({ email: req.params.email }, '+password', (err, user) => {
    if (err) {
      next(err)
      return
    }

    if (user === null) {
      res.set('Cache-Control', 'private, max-age=0, no-cache')
      res.status(404).json({ message: 'User not found' })
      return
    }

    user.comparePassword(req.params.password, (err, isMatch) => {
      if (err) {
        next(err)
        return
      }

      if (!isMatch) {
        res.set('Cache-Control', 'private, max-age=0, no-cache')
        res.status(401).json({ message: 'Password is incorrect' })
        return
      }

      // @todo
      // Move this to a function in User
      const userObj = {
        email: user.email,
        role: user.role,
        created_at: user.created_at,
        updated_at: user.updated_at
      }

      res.set('Cache-Control', 'private, max-age=0, no-cache')
      res.status(200).json(userObj)
    })
  })
})

module.exports = router
