'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')

const SALT_WORK_FACTOR = 10

// @todo
// Support embedding the Role rather than just the Role ID

// @todo
// Create a counter collection separately which is incremented when a new user is added.
// Look online for the pattern for this.

// @todo
// Convert to arrow function notation.

const UserSchema = new Schema({
  email: {
    type: String,
    trim: true,
    required: true,
    index: { unique: true }
  },
  password: {
    type: String,
    trim: true,
    required: true
  },
  role: {
    id: {
      type: Number,
      required: true
    },
    name: {
      type: String,
      trim: true,
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

// @todo
// Ttis should be implemented in the Models/Password, rather than here
// Otherwise we are tightly-coupling the database and password creation/evaluation,
// and these are not related. It will also speed things up elsewhere.
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
