'use strict'

const mongoose = require('mongoose')
const Role = require('../../src/models/role')

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
    const userRole = new Role()
    userRole.id = 1
    userRole.name = 'Guest'
    userRole.created_at = (new Date()).toISOString()
    userRole.updated_at = (new Date()).toISOString()
    userRole.save((err) => {
      if (err) {
        return reject(err)
      }
      return resolve()
    })
  })
  .then(() => {
    return new Promise((resolve, reject) => {
      const userRole = new Role()
      userRole.id = 2
      userRole.name = 'Blogger'
      userRole.created_at = (new Date()).toISOString()
      userRole.updated_at = (new Date()).toISOString()
      userRole.save((err) => {
        if (err) {
          return reject(err)
        }
        return resolve()
      })
    })
  })
  .then(() => {
    return new Promise((resolve, reject) => {
      const userRole = new Role()
      userRole.id = 3
      userRole.name = 'Enhanced Blogger'
      userRole.created_at = (new Date()).toISOString()
      userRole.updated_at = (new Date()).toISOString()
      userRole.save((err) => {
        if (err) {
          return reject(err)
        }
        return resolve()
      })
    })
  })
  .then(() => {
    return new Promise((resolve, reject) => {
      const userRole = new Role()
      userRole.id = 4
      userRole.name = 'Service Provider'
      userRole.created_at = (new Date()).toISOString()
      userRole.updated_at = (new Date()).toISOString()
      userRole.save((err) => {
        if (err) {
          return reject(err)
        }
        return resolve()
      })
    })
  })
  .then(() => {
    return new Promise((resolve, reject) => {
      const userRole = new Role()
      userRole.id = 5
      userRole.name = 'Enhanced Service Provider'
      userRole.created_at = (new Date()).toISOString()
      userRole.updated_at = (new Date()).toISOString()
      userRole.save((err) => {
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
