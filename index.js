var pidtree = require('pidtree')
var pidusage = require('pidusage')

module.exports = function (pid, options, cb) {
  if (typeof options === 'function') {
    callback = options
    options = {}
  }

  return new Promise(function (resolve, reject) {
    pidtree(pid, {root: true}, function (err, pids) {
      if (err) {
        cb && cb(err)
        reject(err)
        return
      }

      pidusage(pids, options, function (err, stats) {
        if (err) {
          cb && cb(err)
          reject(err)
          return
        }

        cb && cb(null, stats)
        resolve(stats)
      })
    })
  })
}
