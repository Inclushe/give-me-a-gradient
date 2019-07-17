const assert = require('assert')
const runFromBrowser = require('./runFromBrowser')
const generatePaletteFromImage = runFromBrowser('../../temp/generatePaletteFromImage.js').window.generatePaletteFromImage
const fs = require('fs')
const path = require('path')

function base64_encode (file) {
  return fs.readFileSync(path.join(__dirname, file), { encoding: 'base64' }).toString()
}

describe('generatePaletteFromImage', () => {
  it('works', () => {
    assert(typeof generatePaletteFromImage === 'function')
  })

  it('returns array with white colors for a white image', () => {
    return generatePaletteFromImage({
      imagePath: 'data:image/png;base64,' + base64_encode('./images/white.png'),
      maximumPaletteCount: 2
    })
      .then(data => {
        const isRoughlyWhite = (data[0][0] > 250 && data[0][1] > 250 && data[0][2] > 250)
        assert(isRoughlyWhite)
      })
  })

  it('returns array with black colors for a black image', () => {
    return generatePaletteFromImage({
      imagePath: 'data:image/png;base64,' + base64_encode('./images/black.png'),
      maximumPaletteCount: 2
    })
      .then(data => {
        const isRoughlyBlack = (data[0][0] < 5 && data[0][1] < 5 && data[0][2] < 5)
        assert(isRoughlyBlack)
      })
  })

  it('returns array of 4 colors given an image of guy fieri', () => {
    return generatePaletteFromImage({
      imagePath: 'data:image/png;base64,' + base64_encode('./images/guy.png'),
      maximumPaletteCount: 4
    })
      .then(data => {
        assert(data.length === 4)
      })
  })
})
