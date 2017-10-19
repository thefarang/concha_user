'use strict'

const log = require('../lib/log')
const config = require('config')
const mongoose = require('mongoose')
let User = require('../models/user')

mongoose.connect(config.get('mongoConn'))

new Promise((resolve, reject) => {
  User.find().remove((err) => {
    if (err) {
      log.info({ err: err }, 'Unable to find and remove all users')
      return reject(err)
    }
    resolve()
  })
})
.then(() => {
  return new Promise((resolve, reject) => {
    const user = new User()
    user.email = 'no-reply@concha'
    user.password = 'password_not_used'
    user.role = 1
    user.created_at = (new Date()).toISOString()
    user.updated_at = (new Date()).toISOString()
    user.save((err) => {
      if (err) {
        log.info({ err: err }, 'Unable to create Guest user')
        return reject(err)
      }

      log.info({ userId: user._id }, 'Populated Guest user')
      resolve()
    })
  })
})
.then(() => {
  process.exit(0)
})
.catch((err) => {
  log.info({ err: err }, 'An error occurred populating the users collection')
  process.exit(0)
})
