'use strict'

// @todo
// Consider moving this to a library

const log = require('../../log')
const roles = require('../../../scripts/data/roles')

const findRoleById = (id) => {
  switch(id) {
    case 1: return roles.getGuestRole(); break;
    case 2: return roles.getBloggerRole(); break;
    case 3: return roles.getEnhancedBloggerRole(); break;
    case 4: return roles.getServiceProviderRole(); break;
    case 5: return roles.getEnhancedServiceProviderRole(); break;
    default:
      const message = 'Received unknown Role ID'
      log.info({ id: id }, message)
      throw new Error(message)
  }
}

const findRoles = () => roles.getRoles()

module.exports = {
  findRoleById,
  findRoles
}
