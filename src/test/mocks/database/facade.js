'use strict'

const roles = require('../../../scripts/data/roles')
const dbUsers = require('../../../scripts/data/users')
const roleActions = require('../../../services/database/actions/roles')
const User = require('../../../models/user')

let users = null

const connect = () => {
  // Reset the default Users in the mock database service
  users = dbUsers.getUsers()
}

const disconnect = () => {
}

const getRoleActions = () => roleActions

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
