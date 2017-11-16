'use strict'

const log = require('../services/log')
const dbService = require('../services/database/service')
const dbUsersData = require('./data/users')
const User = require('../models/user')

const init = async () => {
  try {
    log.info({}, 'Connecting to the dbase...')
    dbService.connect()

    const userPromises = []
    const usersData = dbUsersData.getUsersData()
    usersData.forEach((currentUserData) => {
      
      // @todo
      // Check to see if current User already exists. If yes, see if it
      // needs to be modified, and modify if necessary. Then proceed to
      // the next User.
      
      userPromises.push(new Promise(async (resolve, reject) => {
        try {
          log.info({}, `Populating the User ${currentUserData.email}...`)
          await dbService.saveUser(new User(
            null,
            currentUserData.email,
            currentUserData.password,
            currentUserData.role,
            currentUserData.createdAt,
            currentUserData.updatedAt
          ))
          return resolve()
        } catch (err) {
          log.info({ err: err }, `An error occurred populating the User ${currentUserData.email}...`)
          return reject(err)
        }
      }))
    })
    await Promise.all(userPromises)

    log.info({}, 'Disconnecting from the dbase...')
    dbService.disconnect()

  } catch (err) {
    log.info({ err: err }, 'An error occurred during the Users loading process')
    return reject(err)
  }
}

init()
