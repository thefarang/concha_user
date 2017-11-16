'use strict'

const dbRolesData = require('../../../scripts/data/roles')
const dbUsersData = require('../../../scripts/data/users')
const Role = require('../../../models/role')
const User = require('../../../models/user')

let roles = null
let users = null

// @todo
// Implement this as a class, adding the connect() and disconnect() to
// the constructor. This means that all client code needs to do is
// instantiate the class.

const connect = () => {
  // Reset
  roles = []
  users = []

  // Insert the Roles into the mock database service
  const rolesData = dbRolesData.getRolesData()
  rolesData.forEach((currentRoleData) => {
    roles.push(new Role(
      currentRoleData.id,
      currentRoleData.name,
      currentRoleData.createdAt,
      currentRoleData.updatedAt
    ))
  })

  // Insert the default Users into the mock database service
  const usersData = dbUsersData.getUsersData()
  usersData.forEach((currentUserData) => {
    users.push(new User(
      currentUserData.id,
      currentUserData.email,
      currentUserData.password,
      currentUserData.role,
      currentUserData.createdAt,
      currentUserData.updatedAt
    ))
  })
}

const disconnect = () => {
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

module.exports = {
  connect,
  disconnect,
  saveRole,
  findRoleById,
  findRoles,
  saveUser,
  findUserByEmail,
  removeUser,
  isPasswordCorrect
}
