'use strict'

const dbRoles = require('../../../scripts/data/roles')
const dbUsers = require('../../../scripts/data/users')
const Role = require('../../../models/role')
const User = require('../../../models/user')

let roles = null
let users = null

const connect = () => {
  // Reset
  roles = []
  users = []

  // Insert the Roles into the mock database service
  roles = dbRoles.getRoles()

  // Insert the default Users into the mock database service
  users = dbUsers.getDefaultUsers()
}

const disconnect = () => {
}

const getRoleActions = () => {
  const saveRole = (role) => {
    roles.push(role)
  }

  const findRoleById = (id) => {
    return roles.find(role => role.id === id)
  }
  
  const findRoles = () => {
    return roles
  }

  return {
    saveRole,
    findRoleById,
    findRoles
  }
}

const getUserActions = () => {
  const saveUser = (user) => {
    users.push(user)
  }
  
  const findUserByEmail = (email) => {
    return users.find(user => user.email === email) || null
  }
  
  const removeUser = (email) => {
    console.log('removeUser() - Not yet implemented')
  }

  const isPasswordCorrect = (email, password) => {
    const user = findUserByEmail(email)
    return (user.password === password) ? true : false
  }

  return {
    saveUser,
    findUserByEmail,
    removeUser,
    isPasswordCorrect
  }
}

module.exports = {
  connect,
  disconnect,
  getRoleActions,
  getUserActions
}
