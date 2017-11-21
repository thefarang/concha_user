'use strict'

const log = require('../services/log')
const dbFacade = require('../services/database/facade')
const dbUsers = require('./data/users')
const User = require('../models/user')

const init = async () => {
  try {
    log.info({}, 'Connecting to the dbase...')
    dbFacade.connect()

    const userPromises = []
    dbUsers.getUsers().forEach((currentUser) => {
      userPromises.push(new Promise(async (resolve, reject) => {
        try {
          log.info({}, `Populating the User ${currentUser.id}:${currentUser.email}...`)
          await dbFacade.getUserActions().saveUser(currentUser)
          return resolve()
        } catch (err) {
          log.info(
            { err: err }, 
            `An error occurred populating User ${currentUser.id}:${currentUser.email}`)
          return reject(err)
        }
      }))
    })
    await Promise.all(userPromises)

    log.info({}, 'Disconnecting from the dbase...')
    dbFacade.disconnect()

  } catch (err) {
    log.info({ err: err }, 'An error occurred during the default Users loading process')
    return reject(err)
  }
}

init()
