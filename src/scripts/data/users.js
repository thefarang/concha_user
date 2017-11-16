'use strict'

// @todo
// What about ID?

const getUsersData = () => {
  return [
    {
      email: 'guest@concha',
      password: 'password_not_used',
      role: 1,
      // createdAt: (new Date()).toISOString(),
      // updatedAt: (new Date()).toISOString()
      createdAt: '2017-09-01T12:30:00.000Z',
      updatedAt: '2017-09-01T12:30:00.000Z'
    }
  ]
}

module.exports = {
  getUsersData
}
