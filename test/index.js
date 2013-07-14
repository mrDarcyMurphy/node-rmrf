var rmrf = require('../index.js')
var fs = require('fs')
var assert = require('assert')
var existingPath = __dirname + '/exists'

// not bothering with 'before' as it was unreliable
if (!fs.existsSync(__dirname + '/exists')) {
  fs.mkdirSync(__dirname + '/exists')
  fs.mkdirSync(__dirname + '/exists/nested')
  fs.openSync( __dirname + '/exists/nested/empty.txt', 'w')
}

describe('rmrf', function(){
  describe('when target is missing', function(){
    it('does not throw', function(){
      assert.doesNotThrow(function(){
        rmrf(__dirname + '/missing')
      })
    })
  })
  describe('when target exists', function(){
    it('does not throw', function(){
      assert.doesNotThrow(function(){
        rmrf(__dirname + '/exists')
      })
    })
    it('removes the folders', function(){
      assert.throws(function(){
        fs.readdirSync(__dirname + '/exists')
      })
    })
  })
})
