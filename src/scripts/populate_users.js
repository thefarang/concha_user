'use strict'

const mongoose = require('mongoose')
let User = require('../models/user')

mongoose.connect('mongodb://mongo:27017/local')  // @todo

new Promise((resolve, reject) => {
  User.find().remove((err) => {
    if (err) {
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
        return reject(err)
      }

      console.log('Populated Guest User')
      console.log(user._id)
      resolve()
    })
  })
})
.then(() => {
  return new Promise((resolve, reject) => {
    const user = new User()
    user.email = 'test@test.com'
    user.password = '12345'
    user.role = 2
    user.created_at = (new Date()).toISOString()
    user.updated_at = (new Date()).toISOString()
    user.save((err) => {
      if (err) {
        return reject(err)
      }

      console.log('Populated User')
      console.log(user._id)
      resolve()
    })
  })
})
.then(() => {
  process.exit(0)
})
.catch((err) => {
  console.log('An error occurred populating the users table.')
  console.log(err)
  process.exit(0)
})
