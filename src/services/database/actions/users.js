'use strict'

const log = require('../../log')
const UserSchema = require('../schema/user-schema')
const User = require('../../../models/user')
const mongoose = require('mongoose')

const ObjectId = mongoose.Types.ObjectId

// @todo
// What about if the user is already saved?
const saveUser = (user) => {
  return new Promise((resolve, reject) => {
    const userSchema = new UserSchema()

    if (user.id) {
      userSchema._id = new ObjectId(user.id)
    }

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

      // Allocate the newly created UserSchema._id to User.id
      user.id = userSchema._id.valueOf()
      return user
    })
  })
}

// @todo
const findUserById = (id) => {
  console.log('findUserById() - Not yet implemented')
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
          userSchema.password,
          userSchema.role,
          userSchema.created_at,
          userSchema.updated_at
        )
      }
      return resolve(user)
    })
  })
}

// @todo
const removeUser = (user) => {
  console.log('removeUser() - Not yet implemented')
  /*
  return new Promise((resolve, reject) => {
    UserSchema.remove({ _id: user.id }, (err) => {
      if (err) {
        log.info({
          err: err,
          user: user
        }, 'An error occurred whilst deleting UserSchema')
        return reject(err)
      }
      return resolve()
    })
  })
  */
}

// @todo
// Should force the client code to pass in the retrieved user and the
// password submitted, right?
const isPasswordCorrect = (email, password) => {
  return new Promise((resolve, reject) => {
    UserSchema.findOne({ email: email }, (err, userSchema) => {
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
  
      // @todo
      // Implement this in a Password model, rather than the schema
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
          log.info({ email: email, password: password }, 'User passwords do not match')
          return resolve(false)
        }

        log.info({ email: email }, 'User password is correct')
        return resolve(true)
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
