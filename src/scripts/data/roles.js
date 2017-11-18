'use strict'

const Role = require('../../models/role')

const guestRole = new Role(1, 'Guest', '2017-09-01T12:30:00.000Z', '2017-09-01T12:30:00.000Z')
const bloggerRole = new Role(2, 'Blogger', '2017-09-01T12:30:00.000Z', '2017-09-01T12:30:00.000Z')
const enhancedBloggerRole = new Role(3, 'Enhanced Blogger', '2017-09-01T12:30:00.000Z', '2017-09-01T12:30:00.000Z')
const serviceProviderRole = new Role(4, 'Service Provider', '2017-09-01T12:30:00.000Z', '2017-09-01T12:30:00.000Z')
const enhancedServiceProviderRole = new Role(5, 'Enhanced Service Provider', '2017-09-01T12:30:00.000Z', '2017-09-01T12:30:00.000Z')

const getGuestRole = () => {
  return guestRole
}

const getBloggerRole = () => {
  return bloggerRole
}

const getEnhancedBloggerRole = () => {
  return enhancedBloggerRole
}

const getServiceProviderRole = () => {
  return serviceProviderRole
}

const getEnhancedServiceProviderRole = () => {
  return enhancedServiceProviderRole
}

const getRoles = () => {
  return [
    guestRole,
    bloggerRole,
    enhancedBloggerRole,
    serviceProviderRole,
    enhancedServiceProviderRole
  ]
}

module.exports = {
  getGuestRole,
  getBloggerRole,
  getEnhancedBloggerRole,
  getServiceProviderRole,
  getEnhancedServiceProviderRole,
  getRoles
}
