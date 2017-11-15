'use strict'

// @todo
// Rationalise this and the mocks.database to ensure consistency

const config = require('config')
const log = require('../log')
const mongoose = require('mongoose')
const Role = require('./schema/role')
const UserSchema = require('./schema/user-schema')

const ObjectId = mongoose.Types.ObjectId
let isConnected = false

const connect = () => {
  if (!isConnected) {
    mongoose.Promise = global.Promise
    mongoose.connect(config.get('dbConn'), {
      useMongoClient: true
    })
    isConnected = true
  }
}

const disconnect = () => {
  mongoose.connection.close(() => {
    log.info({}, 'Closed Mongo connection successfully. Exiting...')
    process.exit(0)
  })
}

const removeAllRoles = () => {
  return new Promise((resolve, reject) => {
    Role.remove({}, (err) => {
      if (err) {
        log.info({
          err: err
        }, 'An error occurred whilst deleting all roles')
        return reject(err)
      }
      return resolve()
    })
  })
}

// @todo
// Extract all this to a library?
const getRoleDefinitions = () => {
  return [
    {
      id: 1,
      name: 'Guest',
      createdAt: (new Date()).toISOString(),
      updatedAt: (new Date()).toISOString()
    },
    {
      id: 2,
      name: 'Blogger',
      createdAt: (new Date()).toISOString(),
      updatedAt: (new Date()).toISOString()
    },
    {
      id: 3,
      name: 'Enhanced Blogger',
      createdAt: (new Date()).toISOString(),
      updatedAt: (new Date()).toISOString()
    },
    {
      id: 4,
      name: 'Service Provider',
      createdAt: (new Date()).toISOString(),
      updatedAt: (new Date()).toISOString()
    },
    {
      id: 5,
      name: 'Enhanced Service Provider',
      createdAt: (new Date()).toISOString(),
      updatedAt: (new Date()).toISOString()
    },
  ]
}

const saveRole = (roleIn) => {
  return new Promise((resolve, reject) => {
    const role = new Role()
    role.id = roleIn.id
    role.name = roleIn.name
    role.created_at = roleIn.createdAt
    role.updated_at = roleIn.updatedAt
    role.save((err) => {
      if (err) {
        log.info({ err: err, role: roleIn }, 'Unable to create role')
        return reject(err)
      }

      log.info({ role: roleIn }, 'Populated role successfully')
      resolve()
    })
  })
}

// @todo
// I dont like this, passing in a query. Change it, and update the mock
const findRole = (query) => {
  return new Promise((resolve, reject) => {
    Role.find(query, (err, role) => {
      if (err) {
        log.info({
          err: err,
          query: query
        }, 'An error occurred whilst finding specific user role')
        return reject(err)
      }

      // Transform the mongo Role schema object into a generic JSON object
      const transformedRole = {
        id: role.id,
        name: role.name,
        createdAt: role.createdAt,
        updatedAt: role.updatedAt
      }
      return resolve(transformedRole)
    })
  })
}

const findRoles = () => {
  return new Promise((resolve, reject) => {
    Role.find((err, roles) => {
      if (err) {
        log.info({
          err: err
        }, 'An error occurred whilst finding all user roles')
        return reject(err)
      }

      // Transform the mongo Role schema objects into generic JSON objects
      const transformedRoles = []
      roles.forEach(role => {
        transformedRoles.push({
          id: role.id,
          name: role.name,
          createdAt: role.createdAt,
          updatedAt: role.updatedAt
        })
      })
      return resolve(transformedRoles)
    })
  })
}

// @todo
// Should this really be exposed?
const removeAllUsers = () => {
  return new Promise((resolve, reject) => {
    UserSchema.remove({}, (err) => {
      if (err) {
        log.info({
          err: err
        }, 'An error occurred whilst deleting all users')
        return reject(err)
      }
      return resolve()
    })
  })
}

// @todo
// Do we need a getGuestUserDefinition()?

const saveUser = (document) => {
  return new Promise((resolve, reject) => {
    const userSchema = new UserSchema()
    userSchema.email = document.email
    userSchema.password = document.password
    userSchema.role = document.role
    userSchema.created_at = document.created_at
    userSchema.updated_at = document.updated_at
    userSchema.save((err) => {
      if (err) {
        log.info({
          err: err,
          document: document
        }, 'An error occurred saving the User document')
        return reject(err)
      }
      return resolve({
        _id: userSchema._id,
        email: userSchema.email,
        role: userSchema.role,
        createdAt: userSchema.created_at,
        updatedAt: userSchema.updated_at
      })
    })
  })
}

const findUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    UserSchema.findOne({ email: email }, (err, userSchema) => {
      if (err) {
        log.info({
          err: err,
          email: email
        }, `An error occurred during User email search`)
        return reject(err)
      }

      let transformedUser = null
      if (userSchema !== null) {
        // Transform the mongo User schema object into a generic JSON object
        transformedUser = {
          _id: userSchema._id,
          email: userSchema.email,
          role: userSchema.role,
          createdAt: userSchema.created_at,
          updatedAt: userSchema.updated_at
        }
      }
      return resolve(transformedUser)
    })
  })
}

const isPasswordCorrect = (email, password) => {
  return new Promise((resolve, reject) => {
    UserSchema.findOne({ email: email }, '+password', (err, userSchema) => {
      if (err) {
        log.info({
          err: err,
          email: email
        }, 'Error occurred finding a User with email address, pre-password check')
        return reject(err)
      }
  
      if (userSchema === null) {
        // A password check has been requested on a User that does not exist.
        // This should be treated as an error.
        const err = new Error(message)
        err.status = 500
        return reject(err)
      }
  
      user.comparePassword(password, (err, isMatch) => {
        if (err) {
          log.info({
            err: err,
            email: email,
            password: password
          }, 'Error occurred validating a User password')
          return reject(err)
        }

        if (!isMatch) {
          const message = 'User passwords do not match'
          const err = new Error(message)
          err.status = 401
          log.info({ email: email, password: password }, message)
          return reject(err)
        }
        
        // Transform the mongo User schema object into a generic JSON object
        const transformedUser = {
          _id: userSchema._id,
          email: userSchema.email,
          role: userSchema.role,
          createdAt: userSchema.created_at,
          updatedAt: userSchema.updated_at
        }
        return resolve(transformedUser)
      })
    })
  })
}

module.exports = {
  connect,
  disconnect,
  removeAllRoles,
  getRoleDefinitions,
  saveRole,
  findRole,
  findRoles,
  removeAllUsers,
  saveUser,
  findUserByEmail,
  isPasswordCorrect
}
