'use strict'

const User = require('../../models/user')
const dbRoles = require('./roles')

const guestUser = new User(
  '507f1f77bcf86cd799439011', 
  'guest@concha',
  'password_not_used',
  dbRoles.getGuestRole(),
  '2017-09-01T12:30:00.000Z',
  '2017-09-01T12:30:00.000Z'
)

const getGuestUser = () => {
  return guestUser
}

const getUsers = () => {
  return [
    guestUser
  ]
}

module.exports = {
  getGuestUser,
  getUsers
}
