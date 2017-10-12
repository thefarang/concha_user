'use strict'

const config = require('config')
const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')
mongoose.connect(config.get('mongoConn'))

let Role = require('../models/role')

new Promise((resolve, reject) => {
  Role.find().remove((err) => {
    if (err) {
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
        return reject(err)
      }

      console.log('Populated Guest Role')
      console.log(userRole._id)
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
        return reject(err)
      }

      console.log('Populated Blogger Role')
      console.log(userRole._id)
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
        return reject(err)
      }

      console.log('Populated Enhanced Blogger Role')
      console.log(userRole._id)
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
        return reject(err)
      }

      console.log('Populated Service Provider Role')
      console.log(userRole._id)
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
        return reject(err)
      }

      console.log('Populated Enhanced Service Provider Role')
      console.log(userRole._id)
      resolve()
    })
  })
})
.then(() => {
  process.exit(0)
})
.catch((err) => {
  console.log('An error occurred')
  console.log(err)
  process.exit(0)
})

module.exports = router
