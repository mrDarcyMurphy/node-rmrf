var rmrf = require('../index.js')
var fs = require('fs')
var assert = require('assert')

describe('rmrf', function() {

  describe('when target is missing', function() {
    it('does not throw', function() {
      assert.doesNotThrow(function() {
        rmrf(__dirname + '/missing')
      })
    })
  })

  describe('when target exists', function() {
    before(function() {
      fs.mkdirSync(__dirname + '/exists')
      fs.mkdirSync(__dirname + '/exists/nested')
      fs.openSync( __dirname + '/exists/nested/empty.txt', 'w')
    })

    it('does not throw', function() {
      assert.doesNotThrow(function() {
        rmrf(__dirname + '/exists')
      })
    })

    it('removes the folders', function() {
      assert.throws(function() {
        fs.readdirSync(__dirname + '/exists')
      })
    })
  })

  describe('when target is symlinked', function() {
    before(function() {
      fs.mkdirSync(__dirname + '/symlinked')
      fs.openSync( __dirname + '/symlinked/important_file.txt', 'w')
      fs.mkdirSync(__dirname + '/symlink_container')
      fs.symlinkSync(__dirname + '/symlinked', __dirname + '/symlink_container/symlinked')
    })

    after(function() {
      rmrf(__dirname + '/symlinked')
    })

    it('should not remove symlinked folder', function() {
      rmrf(__dirname + '/symlink_container')
      assert.doesNotThrow(function() {
        fs.readdirSync(__dirname + '/symlinked');
      })
      assert.throws(function() {
        fs.readdirSync(__dirname + '/symlink_container');
      })
    })
  })
})
