var rmrf = require('../index.js')
var fs = require('fs')
var assert = require('assert')
var existingPath = __dirname + '/exists'

before(function(){
  try { fs.readdirSync(__dirname + '/exists') } catch(e){
    fs.mkdirSync(__dirname + '/exists')
    fs.mkdirSync(__dirname + '/exists/nested')
  }
})

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
