'use strict'

const chai = require('chai')
const expect = require('chai').expect
const chaiHttp = require('chai-http')

const dbFacade = require('../mocks/database/facade')
const app = require('../../app')

let appInstance = null
chai.use(chaiHttp)

const isValidRole = (role) => {
  if ((role.id === 1) && (role.name === 'Guest')) {
    return true
  }
  if ((role.id === 2) && (role.name === 'Blogger')) {
    return true
  }
  if ((role.id === 3) && (role.name === 'Enhanced Blogger')) {
    return true
  }
  if ((role.id === 4) && (role.name === 'Service Provider')) {
    return true
  }
  if ((role.id === 5) && (role.name === 'Enhanced Service Provider')) {
    return true
  }
  return false
}

/* eslint-disable no-unused-expressions */
/* eslint-disable handle-callback-err */
describe('User Role API Endpoint', () => {
  before(() => {
    // Connect to the database
    dbFacade.connect()

    // Insert app dependencies into a new appInstance
    appInstance = app(dbFacade)
  })

  after(() => {
    dbFacade.disconnect()
  })

  it('Should return 404 if an invalid user role id is passed in', (done) => {
    chai
      .request(appInstance)
      .get(`/api/v1/roles/100`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res).to.have.status(404)
        expect(res).to.be.json
        expect(res.text).to.be.empty
        done()
      })
  })

  it('Should return 200 and a single user role matching the valid user role id passed in', (done) => {
    chai
      .request(appInstance)
      .get(`/api/v1/roles/1`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        const responseContents = JSON.parse(res.text)
        expect(res).to.have.status(200)
        expect(res).to.be.json
        expect(responseContents.id).to.equal(1)
        expect(responseContents.name).to.equal('Guest')
        done()
      })
  })

  it('Should return 200 and the full set of user roles when all roles are requested', (done) => {
    chai
      .request(appInstance)
      .get(`/api/v1/roles`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res).to.have.status(200)
        expect(res).to.be.json

        const responseContents = JSON.parse(res.text)
        responseContents.forEach((role, index) => {
          const isValid = isValidRole(role)
          expect(isValid).to.be.true
        })
        done()
      })
  })
})
/* eslint-enable handle-callback-err */
/* eslint-enable no-unused-expressions */
