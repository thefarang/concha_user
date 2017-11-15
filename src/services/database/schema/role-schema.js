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

// Generate a mongo Model from the Schema.
module.exports = mongoose.model('RoleSchema', RoleSchema)
