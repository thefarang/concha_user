'use strict'

// @todo
// What about ID?

// id: 1
// id: _id // Object('aksdja2873skjsdkf')
// id: null

// _id: 1
// _id: Object('aksdja2873skjsdkf')
// _id: null

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
