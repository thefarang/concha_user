'use strict'

// @todo
// How do we store the ID?

// @todo
// We should store Role in this.role, not Role.id

class User {
  constructor(id, email, password, role, createdAt, updatedAt) {
    this.id = id
    this.email = email
    this.password = password
    this.role = role
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }

  // @todo
  // Omit the password?
  toJSON() {
    return {
      id: this.id,
      email: this.email,
      role: this.role,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }
  }
}

module.exports = User
