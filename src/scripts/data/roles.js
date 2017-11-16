'use strict'

const getRolesData = () => {
  return [
    {
      id: 1,
      name: 'Guest',
      // createdAt: (new Date()).toISOString(),
      // updatedAt: (new Date()).toISOString()
      createdAt: '2017-09-01T12:30:00.000Z',
      updatedAt: '2017-09-01T12:30:00.000Z'
    },
    {
      id: 2,
      name: 'Blogger',
      createdAt: '2017-09-01T12:30:00.000Z',
      updatedAt: '2017-09-01T12:30:00.000Z'
    },
    {
      id: 3,
      name: 'Enhanced Blogger',
      createdAt: '2017-09-01T12:30:00.000Z',
      updatedAt: '2017-09-01T12:30:00.000Z'
    },
    {
      id: 4,
      name: 'Service Provider',
      createdAt: '2017-09-01T12:30:00.000Z',
      updatedAt: '2017-09-01T12:30:00.000Z'
    },
    {
      id: 5,
      name: 'Enhanced Service Provider',
      createdAt: '2017-09-01T12:30:00.000Z',
      updatedAt: '2017-09-01T12:30:00.000Z'
    },
  ]
}

module.exports = {
  getRolesData
}
