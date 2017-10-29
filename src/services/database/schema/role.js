'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

var RoleSchema = new Schema({
  // _id will be created by default
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
}, {
  collection: 'role'
})

// Generate a Model from the Schema.
var Role = mongoose.model('Role', RoleSchema)

module.exports = Role
