'use strict'

const log = require('../services/log')
const dbService = require('../services/database/service')
const dbRolesData = require('./data/roles')
const Role = require('../models/role')

const init = async () => {
  try {
    log.info({}, 'Connecting to the dbase...')
    dbService.connect()

    log.info({}, 'Populating the Roles...')
    const rolePromises = []
    const rolesData = dbRolesData.getRolesData()
    rolesData.forEach((currentRoleData) => {

      // @todo
      // Check to see if current Role already exists. If yes, see if it
      // needs to be modified, and modify if necessary. Then proceed to
      // the next Role.
      
      rolePromises.push(new Promise(async (resolve, reject) => {
        try {
          log.info({}, `Populating the ${currentRoleData.name} Role...`)
          await dbService.saveRole(new Role(
            currentRoleData.id,
            currentRoleData.name,
            currentRoleData.createdAt,
            currentRoleData.updatedAt
          ))
          return resolve()
        } catch (err) {
          log.info({ err: err }, `An error occurred populating the ${currentRoleData.name} Role...`)
          return reject(err)
        }
      }))
    })
    await Promise.all(rolePromises)

    log.info({}, 'Disconnecting from the dbase...')
    dbService.disconnect()

  } catch (err) {
    log.info({ err: err }, 'An error occurred during the Roles loading process')
    return reject(err)
  }
}

init()
