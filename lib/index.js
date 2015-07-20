/**
 * Modules
 */

var path = require('path')
var through = require('through2')
var isAsset = require('@themang/is-asset')
var hash = require('hasha')
var mkdirp = require('mkdirp')
var fs = require('fs')
var staticModule = require('static-module')

/**
 * Vars
 */

/**
 * Expose assetify
 */

module.exports = assetify

/**
 * assetify
 */

function assetify(browserify, opt) {
  opt = opt || {}
  opt.output = opt.output || opt.o || ''
  opt.base = opt.base || opt.b || './'

  browserify.on('bundle', function(bundle) {
    mkdirp.sync(opt.output)
  })

  browserify.transform(function(file) {
    return transform(file, opt)
  }, { global: true })
 }

var jsReg = /\.js$/
function transform(file, opt) {
  opt = opt || {}

  if (!jsReg.test(file)) return through()

  return staticModule({'asset-uri': urify})

  function urify (relative) {
    var asset = path.resolve(path.dirname(file), relative)
    var content = fs.readFileSync(asset)
    var basename = hash(content) + path.extname(asset)
    fs.writeFileSync(path.join(opt.output, basename), content)
    var escapedUri = "'" + escape(path.join(opt.base, basename)) + "'"
    return escapedUri
  }
}
