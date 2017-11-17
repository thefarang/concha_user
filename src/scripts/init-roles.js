'use strict'

const log = require('../services/log')
const dbFacade = require('../services/database/facade')
const dbRoles = require('./data/roles')
const Role = require('../models/role')

const init = async () => {
  try {
    log.info({}, 'Connecting to the dbase...')
    dbFacade.connect()

    log.info({}, 'Populating the Roles...')
    const rolePromises = []
    const roles = dbRoles.getRoles()
    roles.forEach((currentRole) => {

      // @todo
      // Check to see if current Role already exists. If yes, see if it
      // needs to be modified, and modify if necessary. Then proceed to
      // the next Role.
      
      rolePromises.push(new Promise(async (resolve, reject) => {
        try {
          log.info({}, `Populating the ${currentRole.id}:${currentRole.name} Role...`)
          await dbFacade.getRoleActions().saveRole(currentRole)
          return resolve()
        } catch (err) {
          log.info(
            { err: err }, 
            `Error occurred populating ${currentRole.id}:${currentRoleData.name} Role`)
          return reject(err)
        }
      }))
    })
    await Promise.all(rolePromises)

    log.info({}, 'Disconnecting from the dbase...')
    dbFacade.disconnect()

  } catch (err) {
    log.info({ err: err }, 'An error occurred during the Roles loading process')
    return reject(err)
  }
}

init()
