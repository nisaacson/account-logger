var ce = require('cloneextend')
var mixin = require('simple-mixin')
var AccountLogger = function (account, logger) {
  this.innerAccount = account
  this.logger = logger
  mixin(account, this)
}
AccountLogger.prototype.register = function (data, cb) {
  var logger = this.logger
  var logData = ce.clone(data)
  logData.password = '****'
  logger.info('begin registering new account', {
    data: logData,
    section: 'registerAccount'
  })
  return this.innerAccount.register(data, function (err, reply) {
    if (err) {
      logger.error('register account failed to complete correctly', {
        data: logData,
        error: err,
        section: 'registerAccount'
      })
    }
    else {
      logger.info('registered new account correctly', {
        data: logData,
        section: 'registerAccount'
      })

    }
    return cb(err, reply)
  })
}

AccountLogger.prototype.login = function (data, cb) {
  var logger = this.logger
  return this.innerAccount.login(data, function (err, reply) {
    if (err) {
      logger.error('error for login account', {
        data: data,
        error: err,
        section: 'loginAccount'
      })
    }
    else if (!reply) {
      logger.info('login account failed to complete correctly', {
        data: data,
        reply: reply,
        section: 'loginAccount'
      })
    }
    else {
      data.password = '****'
      reply.hash = '****'
      logger.info('login account completed correctly', {
        data: data,
        reply: reply,
        section: 'loginAccount'
      })
    }
    return cb(err, reply)
  })
}

module.exports = AccountLogger
