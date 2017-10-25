'use strict'

const log = require('../services/log')
const config = require('config')
const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')
mongoose.connect(config.get('dbConn'))

let Role = require('../models/role')

new Promise((resolve, reject) => {
  Role.find().remove((err) => {
    if (err) {
      log.info({ err: err }, 'Unable to find and remove all roles')
      return reject(err)
    }
    resolve()
  })
})
.then(() => {
  return new Promise((resolve, reject) => {
    const userRole = new Role()
    userRole.id = 1
    userRole.name = 'Guest'
    userRole.created_at = (new Date()).toISOString()
    userRole.updated_at = (new Date()).toISOString()
    userRole.save((err) => {
      if (err) {
        log.info({ err: err }, 'Unable to create Guest role')
        return reject(err)
      }

      log.info({ userRoleId: userRole._id }, 'Populated Guest role')
      resolve()
    })
  })
})
.then(() => {
  return new Promise((resolve, reject) => {
    const userRole = new Role()
    userRole.id = 2
    userRole.name = 'Blogger'
    userRole.created_at = (new Date()).toISOString()
    userRole.updated_at = (new Date()).toISOString()
    userRole.save((err) => {
      if (err) {
        log.info({ err: err }, 'Unable to create Blogger role')
        return reject(err)
      }

      log.info({ userRoleId: userRole._id }, 'Populated Blogger role')
      resolve()
    })
  })
})
.then(() => {
  return new Promise((resolve, reject) => {
    const userRole = new Role()
    userRole.id = 3
    userRole.name = 'Enhanced Blogger'
    userRole.created_at = (new Date()).toISOString()
    userRole.updated_at = (new Date()).toISOString()
    userRole.save((err) => {
      if (err) {
        log.info({ err: err }, 'Unable to create Enhanced Blogger role')
        return reject(err)
      }

      log.info({ userRoleId: userRole._id }, 'Populated Enhanced Blogger role')
      resolve()
    })
  })
})
.then(() => {
  return new Promise((resolve, reject) => {
    const userRole = new Role()
    userRole.id = 4
    userRole.name = 'Service Provider'
    userRole.created_at = (new Date()).toISOString()
    userRole.updated_at = (new Date()).toISOString()
    userRole.save((err) => {
      if (err) {
        log.info({ err: err }, 'Unable to create Service Provider role')
        return reject(err)
      }

      log.info({ userRoleId: userRole._id }, 'Populated Service Provider role')
      resolve()
    })
  })
})
.then(() => {
  return new Promise((resolve, reject) => {
    const userRole = new Role()
    userRole.id = 5
    userRole.name = 'Enhanced Service Provider'
    userRole.created_at = (new Date()).toISOString()
    userRole.updated_at = (new Date()).toISOString()
    userRole.save((err) => {
      if (err) {
        log.info({ err: err }, 'Unable to create Enhanced Service Provider role')
        return reject(err)
      }

      log.info({ userRoleId: userRole._id }, 'Populated Enhanced Service Provider role')
      resolve()
    })
  })
})
.then(() => {
  process.exit(0)
})
.catch((err) => {
  log.info({ err: err }, 'An error occurred populating the roles collection')
  process.exit(0)
})

module.exports = router
