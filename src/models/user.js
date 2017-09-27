'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')

const SALT_WORK_FACTOR = 10

// @todo
// Create a counter collection separately which is incremented when a new user is added.
// Look online for the pattern for this.

// @todo
// Convert to arrow function notation.

let UserSchema = new Schema({
  // _id will be created by default
  email: {
    type: String,
    trim: true,
    required: true,
    index: { unique: true }
  },
  password: {
    type: String,
    trim: true,
    required: true,
    select: false
  },
  role: {
    type: Number,
    required: true
  },
  created_at: {
    type: Date,
    required: true
  },
  updated_at: {
    type: Date,
    required: true
  }
}, {
  collection: 'user'
})

// @todo
// The following article uses the function arrow syntax without problems:
// https://scotch.io/tutorials/test-a-node-restful-api-with-mocha-and-chai
UserSchema.pre('save', function (next) {
  let user = this

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next()

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err)

      // hash the password using our new salt
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err)

          // override the cleartext password with the hashed one
      user.password = hash
      next()
    })
  })
})

UserSchema.methods.comparePassword = function (candidatePassword, cb) {
  let user = this
  bcrypt.compare(candidatePassword, user.password, function (err, isMatch) {
    if (err) return cb(err)
    cb(null, isMatch)
  })
}

// Generate a Model from the Schema.
let User = mongoose.model('User', UserSchema)

module.exports = User
