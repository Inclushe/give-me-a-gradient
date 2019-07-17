const assert = require('assert')
const runFromBrowser = require('./runFromBrowser')
const renderGradient = runFromBrowser('../../temp/renderGradient.js').window.renderGradient
const loadImage = runFromBrowser('../../temp/loadImage.js').window.loadImage
const fs = require('fs')
const path = require('path')
let gradientImage

function encodeInBase64 (file) {
  return fs.readFileSync(path.join(__dirname, file), { encoding: 'base64' }).toString()
}

beforeEach(() => {
  return renderGradient({
    imagePath: 'data:image/png;base64,' + encodeInBase64('./images/guy.png'),
    height: 16,
    width: 32
  })
    .then((dataURL) => {
      return loadImage(dataURL)
    })
    .then((image) => {
      gradientImage = image
    })
})

describe('renderGradient', () => {
  it('works', () => {
    assert(typeof renderGradient === 'function')
  })

  describe('sample image', function () {
    it('has the specified height', () => {
      assert.strictEqual(gradientImage.height, 16)
    })

    it('has the specified width', () => {
      assert.strictEqual(gradientImage.width, 32)
    })

    it('has data', () => {
      assert(gradientImage.src.length > 64)
    })
  })
})
