'use strict'

// @todo
// Rationalise this and the database.service to ensure consistency

const dbService = require('../../../services/database/service')

let roles = []
let users = []

// @todo
// Implement this as a class, adding the connect() and disconnect() to
// the constructor. This means that all client code needs to do is
// instantiate the class.
const connect = () => {
}

const disconnect = () => {
}

const removeAllRoles = () => {
  roles = []
}

const getRoleDefinitions = () => {
  return dbService.getRoleDefinitions()
}

const saveRole = (role) => {
  roles.push(role)
}

// @todo
// I dont like this, passing in a query. Change it
const findRole = (query) => {
  return roles.find(role => role.id === query.id)
}

const findRoles = () => {
  return roles
}

const removeAllUsers = () => {
  users = []
}

const saveUser = (user) => {
  users.push(user)
}

const findUser = (email) => {
  return users.find(user => user.email === email)
}

module.exports = {
  connect,
  disconnect,
  removeAllRoles,
  getRoleDefinitions,
  saveRole,
  findRole,
  findRoles,
  removeAllUsers,
  saveUser,
  findUser
}
