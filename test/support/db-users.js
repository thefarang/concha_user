'use strict'

const mongoose = require('mongoose')
const User = require('../../src/models/user')

const ObjectId = mongoose.Types.ObjectId

// @todo
// Use the test database and set in config
const connect = () => {
  return new Promise((resolve, reject) => {
    mongoose.Promise = global.Promise
    mongoose.connect('mongodb://mongo:27017/local', { useMongoClient: true }, (err) => {
      if (err) {
        return reject(err)
      }
      return resolve()
    })
  })
}

const clean = () => {
  return new Promise((resolve, reject) => {
    // Clear down the test database
    for (var i in mongoose.connection.collections) {
      mongoose.connection.collections[i].remove(function () {})
    }
    return resolve()
  })
}

const populate = () => {
  return new Promise((resolve, reject) => {
    const user = new User()
    user._id = new ObjectId('59d6e8be3c602c051508bd71')
    user.email = 'no-reply@concha'
    user.password = 'password_not_used'
    user.role = 1
    user.created_at = (new Date()).toISOString()
    user.updated_at = (new Date()).toISOString()
    user.save((err) => {
      if (err) {
        return reject(err)
      }
      return resolve()
    })
  })
  .then(() => {
    return new Promise((resolve, reject) => {
      const user = new User()
      user._id = new ObjectId('59d6e8be3c602c051508bd72')
      user.email = 'test@test.com'
      user.password = 'Password_1%'
      user.role = 2
      user.created_at = (new Date()).toISOString()
      user.updated_at = (new Date()).toISOString()
      user.save((err) => {
        if (err) {
          return reject(err)
        }
        return resolve()
      })
    })
  })
}

const close = () => {
  return new Promise((resolve, reject) => {
    mongoose.connection.close(() => {
      return resolve()
    })
  })
}

module.exports = {
  connect,
  clean,
  populate,
  close
}
