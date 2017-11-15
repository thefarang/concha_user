'use strict'

const log = require('../services/log')
const dbService = require('../services/database/service')

const init = async () => {
  try {
    log.info({}, 'Connecting to the dbase...')
    dbService.connect()

    log.info({}, 'Cleansing the Users collection...')
    await dbService.removeAllUsers()

    const roleDefinitions = dbService.getRoleDefinitions()
    const guestRole = roleDefinitions.find(currentRole => currentRole.id === 1)
    log.info({}, `Populating the ${guestRole.name} User...`)
    await dbService.saveUser({
      email: 'guest@concha',
      password: 'password_not_used',
      role: guestRole.id,
      created_at: (new Date()).toISOString(),
      updated_at: (new Date()).toISOString()
    })

    log.info({}, 'Disconnecting from the dbase...')
    dbService.disconnect()

  } catch (err) {
    log.info({ err: err }, 'An error occurred during the Users loading process')
    return reject(err)
  }
}

init()
