var should = require('should');
var AccountCouch = require('account-couch')
var AccountLogger = require('..')
var db = {
  foo: 'bar'
}
describe('Prototype test', function () {
  it('should have correct functions on prototype', function () {
    var logger = {
      info: function (msg, data) {
      },
      error: function (msg, data) {
      }
    }
    var db = { foo: 'bar' }
    var accountCouch = new AccountCouch(db)
    var accountLogger = new AccountLogger(accountCouch, logger)
    should.exist(accountLogger.login)
    should.exist(accountLogger.register)
    should.exist(accountLogger.removeUser)
    should.exist(accountLogger.serializeUser)
    should.exist(accountLogger.deserializeUser)
  })
})
