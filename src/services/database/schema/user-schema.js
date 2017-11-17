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
  // id holds the string value of _id. This provides for a unique ID, whilst being database
  // agnostic. This value can be used across microservices.
  id: {
    type: String,
    trim: true,
    required: true,
    index: { unique: true }
  },
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
  let userSchema = this

  // Only hash the password if it has been modified (or is new)
  if (!userSchema.isModified('password')) return next()

  // Generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err)

    // Hash the password using our new salt
    bcrypt.hash(userSchema.password, salt, function (err, hash) {
      if (err) return next(err)

      // Override the cleartext password with the hashed one
      userSchema.password = hash
      next()
    })
  })
})

UserSchema.methods.comparePassword = function (candidatePassword, cb) {
  let userSchema = this
  bcrypt.compare(candidatePassword, userSchema.password, function (err, isMatch) {
    if (err) return cb(err)
    cb(null, isMatch)
  })
}

// Generate a mongo Model from the Schema.
module.exports = mongoose.model('UserSchema', UserSchema)
