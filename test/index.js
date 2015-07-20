var assetify = require('..')
var assert = require('assert')
var browserify = require('browserify')
var vm = require('vm')
var hash = require('hasha')
var rimraf = require('rimraf')
var fs = require('fs')

describe('assetify', function () {
  var c = {};
  before(function(done) {
    rimraf.sync(__dirname + '/assets')

    var b = browserify(__dirname + '/bundle/index.js');
    b.plugin(assetify, {output: __dirname + '/assets'})
    b.require(__dirname + '/bundle/index.js', {expose: 'bundle'})
    b.bundle(function (err, s) {
      if (err) {
        console.error
        return done(err)
      }
      vm.runInNewContext(s, c);
      done()
    })
  })

  it('should hash css', function() {
    var hashFile = hash.fromFileSync(__dirname + '/bundle/file.css')
    assert.equal(c.require('bundle').file, hashFile + '.css');
    assert(fs.existsSync(__dirname + '/assets/' + hashFile + '.css'))
  })

  it('should hash png', function() {
    var hashFile = hash.fromFileSync(__dirname + '/bundle/themang.png')
    assert.equal(c.require('bundle').themang, hashFile + '.png');
    assert(fs.existsSync(__dirname + '/assets/' + hashFile + '.png'))
  })

  it('should hash png in node_module', function() {
    var hashFile = hash.fromFileSync(__dirname + '/bundle/node_modules/deku/Deku_Royal_Family.png')
    assert.equal(c.require('bundle').scrubs, hashFile + '.png');
    assert(fs.existsSync(__dirname + '/assets/' + hashFile + '.png'))
  })

  after(function () {
    rimraf.sync(__dirname + '/assets')
  })

})
