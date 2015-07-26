/**
 * Modules
 */

var path = require('path')
var through = require('through2')
var isAsset = require('@themang/is-asset')
var hash = require('hasha')
var mkdirp = require('mkdirp')
var fs = require('fs')

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
  opt.output = opt.output || opt.o || path.join(process.cwd(), 'assets')
  opt.base = opt.base || opt.b || '/assets/'

  browserify.on('bundle', function(bundle) {
    mkdirp.sync(opt.output)
  })

  browserify.transform(function(file) {
    return transform(file, opt)
  }, { global: true })
 }

function transform(file, opt) {
  opt = opt || {}

  if (!isAsset(file)) return through()
  var buffers = []
  return through(write, end)


  function write(buf, enc, cb) {
    buffers.push(buf)
    cb()
  }

  function end(cb) {
    this.push(urify(Buffer.concat(buffers)))
    cb()
  }

  function urify (content) {
    var basename = hash(content, {algorithm: 'sha1'}) + path.extname(file)
    fs.writeFileSync(path.join(opt.output, basename), content)
    return "module.exports = '" + opt.base + basename + "'"
  }
}
