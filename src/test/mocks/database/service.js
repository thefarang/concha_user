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

const findRoleById = (id) => {
  return roles.find(role => role.id === id)
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

const findUserByEmail = (email) => {
  return users.find(user => user.email === email) || null
}

const isPasswordCorrect = (email, password) => {
  const user = findUserByEmail(email)
  return (user.password === password) ? true : false
}

module.exports = {
  connect,
  disconnect,
  removeAllRoles,
  getRoleDefinitions,
  saveRole,
  findRoleById,
  findRoles,
  removeAllUsers,
  saveUser,
  findUserByEmail,
  isPasswordCorrect
}
