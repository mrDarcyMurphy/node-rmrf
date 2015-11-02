var fs = require('fs')

var rmrf = module.exports = function(dirPath) {
  if (fs.existsSync(dirPath)) {
    var files = fs.readdirSync(dirPath)
    if (files && files.length > 0) {
      for (var i = 0; i < files.length; i++) {
        var filePath = dirPath + '/' + files[i]
        if (fs.lstatSync(filePath).isDirectory())
          rmrf(filePath)
        else
          fs.unlinkSync(filePath)
      }
    }
    fs.rmdirSync(dirPath)
  }
}
