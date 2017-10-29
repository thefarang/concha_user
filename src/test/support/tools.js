'use strict'

const dbService = require('../../services/database/service')

const getRoleDefinitions = () => {
  return dbService.getRoleDefinitions()
}

module.exports = {
  getRoleDefinitions
}
