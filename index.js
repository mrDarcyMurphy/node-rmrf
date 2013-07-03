var fs = require('fs')

var rmrf = module.exports = function(dirPath) {
  var files
  try { files = fs.readdirSync(dirPath) } catch(e) {}
  if (files) {
    if (files.length > 0)
      for (var i = 0; i < files.length; i++) {
        var filePath = dirPath + '/' + files[i]
        if (fs.statSync(filePath).isFile())
          fs.unlinkSync(filePath)
        else
          rmrf(filePath)
      }
    fs.rmdirSync(dirPath)
  }
}
