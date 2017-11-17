'use strict'

const log = require('../../log')
const RoleSchema = require('../schema/role-schema')
const Role = require('../../../models/role')

const saveRole = (role) => {
  return new Promise((resolve, reject) => {
    const roleSchema = new RoleSchema()
    roleSchema.id = role.id
    roleSchema.name = role.name
    roleSchema.created_at = role.createdAt
    roleSchema.updated_at = role.updatedAt
    roleSchema.save((err) => {
      if (err) {
        log.info({ err: err, role: role }, 'Unable to create RoleSchema')
        return reject(err)
      }

      log.info({ role: role }, 'Populated RoleSchema successfully')
      resolve()
    })
  })
}

const findRoleById = (id) => {
  return new Promise((resolve, reject) => {
    RoleSchema.find({ id: id }, (err, roleSchema) => {
      if (err) {
        log.info({
          err: err,
          id: id
        }, 'An error occurred whilst finding specific RoleSchema')
        return reject(err)
      }

      // Transform the mongo RoleSchema object into a Role object
      const role = new Role(
        roleSchema.id,
        roleSchema.name,
        roleSchema.created_at,
        roleSchema.updated_at
      )
      return resolve(role)
    })
  })
}

const findRoles = () => {
  return new Promise((resolve, reject) => {
    RoleSchema.find((err, roleSchemas) => {
      if (err) {
        log.info({
          err: err
        }, 'An error occurred whilst finding all RoleSchemas')
        return reject(err)
      }

      // Transform the mongo RoleSchema objects into Role objects
      const roles = []
      roleSchemas.forEach(roleSchema => {
        roles.push(new Role(
          roleSchema.id,
          roleSchema.name,
          roleSchema.created_at,
          roleSchema.updated_at
        ))
      })
      return resolve(roles)
    })
  })
}

module.exports = {
  saveRole,
  findRoleById,
  findRoles
}
