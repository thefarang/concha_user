'use strict'

const log = require('../services/log')
const dbService = require('../services/database/service')

const init = () => {
  return new Promise((resolve, reject) => {
    try {
      log.info({}, 'Connecting to the dbase...')
      dbService.connect()
      return resolve()
    } catch (err) {
      log.info({ err: err }, 'Unable to connect to the dbase')
      return reject(err)
    }
  })
  .then(() => {
    return new Promise(async (resolve, reject) => {
      try {
        log.info({}, 'Cleansing the users collection...')
        await dbService.removeAllUsers()
        return resolve()
      } catch (err) {
        log.info({ err: err }, 'Unable to cleanse the collection')
        return reject(err)
      }
    })
  })
  .then(() => {
    return new Promise(async (resolve, reject) => {
      try {
        log.info({}, 'Populating the Guest user...')
        await dbService.saveUser({
          email: 'no-reply@concha',
          password: 'password_not_used',
          role: 1,
          created_at: (new Date()).toISOString(),
          updated_at: (new Date()).toISOString()
        })
        return resolve()
      } catch (err) {
        log.info({ err: err }, 'An error occurred populating the Guest user')
        return reject(err)
      }
    })
  })
  .then(() => {
    return new Promise((resolve, reject) => {
      log.info({}, 'Disconnecting from the dbase...')
      dbService.disconnect()
      return resolve()
    })
  })
  .catch((err) => {
    log.info({ err: err }, 'An error occurred during the initial Users loading process')
    process.exit(0)
  })
}

init()
