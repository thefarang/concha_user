'use strict'

const chai = require('chai')
const expect = require('chai').expect
const chaiHttp = require('chai-http')

const dbService = require('../mocks/database/service')
const bootApp = require('../../app')

let app = null
chai.use(chaiHttp)

/* eslint-disable no-unused-expressions */
/* eslint-disable handle-callback-err */
describe('Users API Endpoint', () => {
  before(() => {
    // Connect to the database
    dbService.connect()

    // Insert app dependencies
    app = bootApp(dbService)

    // Cleanse the database
    dbService.removeAllRoles()
    dbService.removeAllUsers()

    // Insert the full set of roles into the mock database
    const roles = dbService.getRoleDefinitions()
    roles.forEach((currentRole) => {
      dbService.saveRole(currentRole)
    })

    // Insert the Guest user into the mock database
    dbService.saveUser({
      email: 'guest@concha',
      password: 'password_not_used',
      role: 1,
      created_at: (new Date()).toISOString(),
      updated_at: (new Date()).toISOString()
    })

    // Insert a non-guest user into the mock database
    dbService.saveUser({
      email: 'test@test.com',
      password: 'Password_1%',
      role: 2,
      created_at: (new Date()).toISOString(),
      updated_at: (new Date()).toISOString()
    })
  })

  after(() => {
    dbService.disconnect()
  })

  it('Should return 200 and the guest user when requested', (done) => {
    chai
      .request(app)
      .get(`/api/v1/users/guest`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res).to.have.status(200)
        expect(res).to.be.json
        
        const responseContents = JSON.parse(res.text)
        expect(responseContents.email).to.equal('guest@concha')
        expect(responseContents.role).to.equal(1)
        // @todo
        // test the createdAt??
        done()
      })
  })

  it('Should return 200 and a non-guest user when requested with a VALID email id', (done) => {
    chai
      .request(app)
      .get(`/api/v1/users/member/test@test.com`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res).to.have.status(200)
        expect(res).to.be.json

        const responseContents = JSON.parse(res.text)
        expect(responseContents.email).to.equal('test@test.com')
        expect(responseContents.role).to.equal(2)
        // @todo
        // test the createdAt??
        done()
      })
  })

  it('Should return 404 when a non-guest user is requested with an INVALID email id', (done) => {
    chai
      .request(app)
      .get(`/api/v1/users/member/invalid@test.com`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res).to.have.status(404)
        expect(res).to.be.json
        expect(res.text).to.be.empty
        done()
      })
  })

  it('Should return 200 and a non-guest user when requested with a VALID email and password', (done) => {
    const password = encodeURIComponent('Password_1%')
    chai
      .request(app)
      .get(`/api/v1/users/member/test@test.com/${password}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res).to.have.status(200)
        expect(res).to.be.json

        const responseContents = JSON.parse(res.text)
        expect(responseContents.email).to.equal('test@test.com')
        expect(responseContents.role).to.equal(2)
        // @todo
        // test the createdAt??
        done()
      })
  })

  it('Should return 401 when a non-guest user is requested with a VALID email and an INVALID password', (done) => {
    chai
      .request(app)
      .get(`/api/v1/users/member/test@test.com/invalid-password`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res).to.have.status(401)
        expect(res).to.be.json
        expect(res.text).to.be.empty
        done()
      })
  })

  /*
  it('Should return 404 when a non-guest user is requested with an INVALID email id and an VALID password', (done) => {
    const password = encodeURIComponent('Password_1%')
    chai
      .request(app)
      .get(`/api/v1/users/member/invalid@test.com/${password}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res).to.have.status(404)
        expect(res).to.be.json
        expect(res.text).to.be.empty
        done()
      })
  })
  */
})
/* eslint-enable handle-callback-err */
/* eslint-enable no-unused-expressions */
