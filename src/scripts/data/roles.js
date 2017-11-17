'use strict'

const Role = require('../../models/role')

const getRoles = () => {
  return [
    new Role(1, 'Guest', '2017-09-01T12:30:00.000Z', '2017-09-01T12:30:00.000Z'),
    new Role(2, 'Blogger', '2017-09-01T12:30:00.000Z', '2017-09-01T12:30:00.000Z'),
    new Role(3, 'Enhanced Blogger', '2017-09-01T12:30:00.000Z', '2017-09-01T12:30:00.000Z'),
    new Role(4, 'Service Provider', '2017-09-01T12:30:00.000Z', '2017-09-01T12:30:00.000Z'),
    new Role(5, 'Enhanced Service Provider', '2017-09-01T12:30:00.000Z', '2017-09-01T12:30:00.000Z')
  ]
}

module.exports = {
  getRoles
}
