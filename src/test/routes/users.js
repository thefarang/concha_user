'use strict'

const chai = require('chai')
const expect = require('chai').expect
const chaiHttp = require('chai-http')
const dbFacade = require('../mocks/database/facade')
const app = require('../../app')
const User = require('../../models/user')

let appInstance = null
chai.use(chaiHttp)

/* eslint-disable no-unused-expressions */
/* eslint-disable handle-callback-err */
describe('Users API Endpoint', () => {
  before(() => {
    // Connect to the database
    dbFacade.connect()

    // Insert a non-guest user into the mock database
    dbFacade.getUserActions().saveUser(new User(
      null,
      'test@test.com',
      'Password_1%',
      2,
      // createdAt: (new Date()).toISOString(),
      // updatedAt: (new Date()).toISOString()
      '2017-11-15T13:23:14.341Z',
      '2017-11-15T13:23:14.341Z'
    ))

    // Insert app dependencies into a new appInstance
    appInstance = app(dbFacade)
  })

  after(() => {
    dbFacade.disconnect()
  })

  it('Should return 200 and the guest user when requested', (done) => {
    chai
      .request(appInstance)
      .get(`/api/v1/users/guest`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res).to.have.status(200)
        expect(res).to.be.json
        
        const responseContents = JSON.parse(res.text)
        expect(responseContents.email).to.equal('guest@concha')
        expect(responseContents.role).to.equal(1)
        expect(responseContents.createdAt).to.equal('2017-09-01T12:30:00.000Z')
        expect(responseContents.updatedAt).to.equal('2017-09-01T12:30:00.000Z')
        done()
      })
  })

  it('Should return 200 and a non-guest user when requested with a VALID email id', (done) => {
    chai
      .request(appInstance)
      .get(`/api/v1/users/member/test@test.com`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res).to.have.status(200)
        expect(res).to.be.json

        const responseContents = JSON.parse(res.text)
        expect(responseContents.email).to.equal('test@test.com')
        expect(responseContents.role).to.equal(2)
        expect(responseContents.createdAt).to.equal('2017-11-15T13:23:14.341Z')
        expect(responseContents.updatedAt).to.equal('2017-11-15T13:23:14.341Z')
        done()
      })
  })

  it('Should return 404 when a non-guest user is requested with an INVALID email id', (done) => {
    chai
      .request(appInstance)
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
      .request(appInstance)
      .get(`/api/v1/users/member/test@test.com/${password}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res).to.have.status(200)
        expect(res).to.be.json

        const responseContents = JSON.parse(res.text)
        expect(responseContents.email).to.equal('test@test.com')
        expect(responseContents.role).to.equal(2)
        expect(responseContents.createdAt).to.equal('2017-11-15T13:23:14.341Z')
        expect(responseContents.updatedAt).to.equal('2017-11-15T13:23:14.341Z')
        done()
      })
  })

  it('Should return 401 when a non-guest user is requested with a VALID email and an INVALID password', (done) => {
    chai
      .request(appInstance)
      .get(`/api/v1/users/member/test@test.com/invalid-password`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res).to.have.status(401)
        expect(res).to.be.json
        expect(res.text).to.be.empty
        done()
      })
  })

  it('Should return 404 when a non-guest user is requested with an INVALID email and an VALID password', (done) => {
    const password = encodeURIComponent('Password_1%')
    chai
      .request(appInstance)
      .get(`/api/v1/users/member/invalid@test.com/${password}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res).to.have.status(404)
        expect(res).to.be.json
        expect(res.text).to.be.empty
        done()
      })
  })
})
/* eslint-enable handle-callback-err */
/* eslint-enable no-unused-expressions */
