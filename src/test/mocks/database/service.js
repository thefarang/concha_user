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

const findRole = (query) => {
  const matchingRoles = roles.filter(role => role.id === query.id)
  return matchingRoles[0]
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

const findUser = (query) => {
  const matchingUsers = users.filter(user => user.id === user.id)
  return matchingUsers[0]
}

const findUsers = () => {
  return users
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
  findUser,
  findUsers
}
