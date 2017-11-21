'use strict'

const User = require('../../models/user')
const roles = require('./roles')

const guestUser = new User(
  '507f1f77bcf86cd799439011', 
  'guest@concha',
  'password_not_used',
  roles.getGuestRole(),
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
