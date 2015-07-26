
# assetify

[ ![Codeship Status for themang/assetify](https://img.shields.io/codeship/dd1bd530-1568-0133-795a-662e297fd73a/master.svg)](https://codeship.com/projects/93186) [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

Copies &quot;required&quot; assets to an &#x60;output&#x60; dir.

## Installation

    $ npm install @themang/assetify


## Example

```js
var avatar = require('./themang.png')
var style {
  backgroundUrl: avatar
}
```

Bundle using the assetify plugin like so:

```
browserify -p [ @themang/assetify ] index.js > build.js
```

`themang.png` will be copied to the `assets` dir by default and the url returned by requiring it will be `/assets/[hash].png`.

## Options

* **output** - output dir (defaults to `./assets`)
* **base** - base url (defaults to `/assets/`)

## License

The MIT License

Copyright &copy; 2015, Weo.io &lt;info@weo.io&gt;

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
