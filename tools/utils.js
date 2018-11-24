const fs = require('fs')
const { promisify } = require('util')

// save a file, return a promise
module.exports.writeFile = promisify(fs.writeFile)

// save a JSON-object, return a promise
module.exports.writeJSON = (filename, obj) => module.exports.writeFile(filename, JSON.stringify(obj, null, 2))
