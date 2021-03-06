import ColorThief from 'colorthief'
const loadImage = require('./loadImage')
const colorThief = new ColorThief()

/**
 * @param {object} options
 * @param {string} options.imagePath
 * @param {number} options.maximumPaletteCount
 * will not output enough colors
 * @param {number} options.quality
 * @returns {promise} - Returns promise with array of palettes consisting of RGB values
 */
module.exports = function (options) {
  return new Promise((resolve, reject) => {
    loadImage(options.imagePath)
      .then(image => {
        resolve(colorThief.getPalette(image, options.maximumPaletteCount, options.quality))
      })
  })
}
