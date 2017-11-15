'use strict'

// @todo
// Rationalise this and the mocks.database to ensure consistency

const config = require('config')
const log = require('../log')
const mongoose = require('mongoose')
const RoleSchema = require('./schema/role-schema')
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
    RoleSchema.remove({}, (err) => {
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

const saveRole = (role) => {
  return new Promise((resolve, reject) => {
    const roleSchema = new RoleSchema()
    roleSchema.id = role.id
    roleSchema.name = role.name
    roleSchema.created_at = role.createdAt
    roleSchema.updated_at = role.updatedAt
    roleSchema.save((err) => {
      if (err) {
        log.info({ err: err, role: role }, 'Unable to create RoleSchema')
        return reject(err)
      }

      log.info({ role: role }, 'Populated RoleSchema successfully')
      resolve()
    })
  })
}

// @todo
// I dont like this, passing in a query. Change it, and update the mock
const findRole = (query) => {
  return new Promise((resolve, reject) => {
    RoleSchema.find(query, (err, roleSchema) => {
      if (err) {
        log.info({
          err: err,
          query: query
        }, 'An error occurred whilst finding specific RoleSchema')
        return reject(err)
      }

      // Transform the mongo RoleSchema object into a Role object
      const role = {
        id: roleSchema.id,
        name: roleSchema.name,
        createdAt: roleSchema.created_at,
        updatedAt: roleSchema.updated_at
      }
      return resolve(role)
    })
  })
}

const findRoles = () => {
  return new Promise((resolve, reject) => {
    RoleSchema.find((err, roleSchemas) => {
      if (err) {
        log.info({
          err: err
        }, 'An error occurred whilst finding all RoleSchemas')
        return reject(err)
      }

      // Transform the mongo RoleSchema objects into Role objects
      const roles = []
      roleSchemas.forEach(roleSchema => {
        roles.push({
          id: roleSchema.id,
          name: roleSchema.name,
          createdAt: roleSchema.created_at,
          updatedAt: roleSchema.updated_at
        })
      })
      return resolve(roles)
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
        }, 'An error occurred whilst deleting all UserSchemas')
        return reject(err)
      }
      return resolve()
    })
  })
}

// @todo
// Do we need a getGuestUserDefinition()?

const saveUser = (user) => {
  return new Promise((resolve, reject) => {
    const userSchema = new UserSchema()
    userSchema.email = user.email
    userSchema.password = user.password
    userSchema.role = user.role
    userSchema.created_at = user.createdAt
    userSchema.updated_at = user.updatedAt
    userSchema.save((err) => {
      if (err) {
        log.info({
          err: err,
          user: user
        }, 'An error occurred saving the UserSchema')
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
        }, `An error occurred locating UserSchema`)
        return reject(err)
      }

      let user = null
      if (userSchema !== null) {
        // Transform the mongo UserSchema object into a User object
        user = {
          _id: userSchema._id,
          email: userSchema.email,
          role: userSchema.role,
          createdAt: userSchema.created_at,
          updatedAt: userSchema.updated_at
        }
      }
      return resolve(user)
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
        }, 'An error occurred locating UserSchema, pre-password check')
        return reject(err)
      }
  
      if (userSchema === null) {
        // A password check has been requested on a User that does not exist.
        // This should be treated as an error.
        const err = new Error(message)
        err.status = 500
        return reject(err)
      }
  
      userSchema.comparePassword(password, (err, isMatch) => {
        if (err) {
          log.info({
            err: err,
            email: email,
            password: password
          }, 'Error occurred validating a UserSchema password')
          return reject(err)
        }

        if (!isMatch) {
          const message = 'User passwords do not match'
          const err = new Error(message)
          err.status = 401
          log.info({ email: email, password: password }, message)
          return reject(err)
        }
        
        // Transform the mongo UserSchema object into a User object
        const user = {
          _id: userSchema._id,
          email: userSchema.email,
          role: userSchema.role,
          createdAt: userSchema.created_at,
          updatedAt: userSchema.updated_at
        }
        return resolve(user)
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
