'use strict'

const User = require('../../models/user')

const guestUserEmail = 'guest@concha'
const getGuestUserEmail = () => guestUserEmail

const getDefaultUsers = () => {
  return [
    new User(
      '507f1f77bcf86cd799439011',
      getGuestUserEmail(),
      'password_not_used',
      1,
      '2017-09-01T12:30:00.000Z',
      '2017-09-01T12:30:00.000Z'
    )
  ]
}

module.exports = {
  getDefaultUsers,
  getGuestUserEmail
}
