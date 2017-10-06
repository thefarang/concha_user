'use strict'

const chai = require('chai')
const expect = require('chai').expect
const chaiHttp = require('chai-http')
const testUsersDb = require('../support/db-users')
const app = require('../../app')

chai.use(chaiHttp)

/* eslint-disable no-unused-expressions */
/* eslint-disable handle-callback-err */
describe('Users API Endpoint', () => {
  before(async () => {
    await testUsersDb.connect()
    await testUsersDb.clean()
    await testUsersDb.populate()
  })

  after(async () => {
    await testUsersDb.close()
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
        expect(responseContents._id).to.equal('59d6e8be3c602c051508bd71')
        expect(responseContents.role).to.equal(1)
        expect(responseContents.email).to.equal('no-reply@concha')
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
        expect(responseContents._id).to.equal('59d6e8be3c602c051508bd72')
        expect(responseContents.role).to.equal(2)
        expect(responseContents.email).to.equal('test@test.com')
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

  it('Should return 200 and a non-guest user when requested with a VALID email id and password', (done) => {
    const password = encodeURIComponent('Password_1%')
    chai
      .request(app)
      .get(`/api/v1/users/member/test@test.com/${password}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res).to.have.status(200)
        expect(res).to.be.json

        const responseContents = JSON.parse(res.text)
        expect(responseContents._id).to.equal('59d6e8be3c602c051508bd72')
        expect(responseContents.role).to.equal(2)
        expect(responseContents.email).to.equal('test@test.com')
        done()
      })
  })

  it('Should return 401 when a non-guest user is requested with a VALID email id and an INVALID password', (done) => {
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
})
/* eslint-enable handle-callback-err */
/* eslint-enable no-unused-expressions */
