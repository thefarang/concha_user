'use strict'

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

  // Note that the password is omitted for security purposes.
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
