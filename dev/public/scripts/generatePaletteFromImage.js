const quantize = require('quantize')
const loadImage = require('./loadImage')

/**
 * @param {object} options
 * @param {string} options.imagePath
 * @param {number} options.maximumPaletteCount - Images that aren't colorful enough
 * will not output enough colors
 * @returns {promise} - Returns promise with array of palettes consisting of RGB values
 */
module.exports = function (options) {
  return new Promise((resolve, reject) => {
    const imageCanvas = document.createElement('canvas')
    const imageCanvasCtx = imageCanvas.getContext('2d')
    loadImage(options.imagePath)
      .then(image => {
        imageCanvas.width = image.width
        imageCanvas.height = image.height
        imageCanvasCtx.drawImage(image, 0, 0)

        const imageCanvasData = imageCanvasCtx.getImageData(0, 0, imageCanvas.width, imageCanvas.height).data
        const imageCanvasRGB = []
        for (let pixel = 0; pixel < imageCanvasData.length; pixel += 4) {
          imageCanvasRGB.push([imageCanvasData[pixel], imageCanvasData[pixel + 1], imageCanvasData[pixel + 2]])
        }
        // There is a bug where quantize breaks when maximumPaletteCount is 1
        const colorMap = quantize(imageCanvasRGB, options.maximumPaletteCount)
        resolve(colorMap.palette())
      })
  })
}
