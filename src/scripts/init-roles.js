'use strict'

const log = require('../services/log')
const dbService = require('../services/database/service')

const init = async () => {
  try {
    log.info({}, 'Connecting to the dbase...')
    dbService.connect()

    log.info({}, 'Cleansing the Roles collection...')
    await dbService.removeAllRoles()

    log.info({}, 'Populating the Roles...')
    const rolePromises = []
    const roleDefinitions = dbService.getRoleDefinitions()
    roleDefinitions.forEach((currentRoleDefinition) => {
      rolePromises.push(new Promise(async (resolve, reject) => {
        try {
          log.info({}, `Populating the ${currentRoleDefinition.name} Role...`)
          await dbService.saveRole({
            id: currentRoleDefinition.id,
            name: currentRoleDefinition.name,
            createdAt: currentRoleDefinition.createdAt,
            updatedAt: currentRoleDefinition.updatedAt
          })
          return resolve()
        } catch (err) {
          log.info({ err: err }, `An error occurred populating the ${currentRoleDefinition.name} Role...`)
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
