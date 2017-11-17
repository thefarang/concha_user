'use strict'

const log = require('../../log')
const UserSchema = require('../schema/user-schema')
const User = require('../../../models/user')

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

      return resolve(new User(
        userSchema._id,
        userSchema.email,
        userSchema.password,
        userSchema.role,
        userSchema.created_at,
        userSchema.updated_at
      ))
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
        user = new User(
          userSchema._id,
          userSchema.email,
          userSchema.role,
          userSchema.created_at,
          userSchema.updated_at
        )
      }
      return resolve(user)
    })
  })
}

const removeUser = (email) => {
  console.log('removeUser() - Not yet implemented')
  /*
  return new Promise((resolve, reject) => {
    UserSchema.remove({ email: email }, (err) => {
      if (err) {
        log.info({
          err: err,
          email: email
        }, 'An error occurred whilst deleting UserSchema')
        return reject(err)
      }
      return resolve()
    })
  })
  */
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
        const user = new User(
          userSchema._id,
          userSchema.email,
          userSchema.role,
          userSchema.created_at,
          userSchema.updated_at
        )
        return resolve(user)
      })
    })
  })
}

module.exports = {
  saveUser,
  findUserByEmail,
  removeUser,
  isPasswordCorrect
}
