const generatePaletteFromImage = require('./generatePaletteFromImage')

/**
 * @param {object} options
 * @param {string} options.imagePath
 * @param {number} options.height
 * @param {number} options.width
 * @returns {promise} - Returns promise with data URL of the gradient
 */
module.exports = function (options) {
  return new Promise((resolve, reject) => {
    generatePaletteFromImage({
      imagePath: options.imagePath,
      maximumPaletteCount: 5
    }, 5)
      .then((palette) => {
        const canvas = document.createElement('canvas')
        canvas.width = options.width
        canvas.height = options.height
        const ctx = canvas.getContext('2d')
        const startCircleRadius = 0
        const endCircleRadius = canvas.width
        const offset = 1

        var gradient = ctx.createRadialGradient(0, 0, startCircleRadius, 0, 0, endCircleRadius)
        gradient.addColorStop(0, `rgb(${palette[0 + offset].join(', ')})`)
        gradient.addColorStop(1, 'transparent')
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        gradient = ctx.createRadialGradient(canvas.width, 0, startCircleRadius, canvas.width, 0, endCircleRadius)
        gradient.addColorStop(0, `rgb(${palette[1 + offset].join(', ')})`)
        gradient.addColorStop(1, 'transparent')
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        gradient = ctx.createRadialGradient(0, canvas.height, startCircleRadius, 0, canvas.height, endCircleRadius)
        gradient.addColorStop(0, `rgb(${palette[2 + offset].join(', ')})`)
        gradient.addColorStop(1, 'transparent')
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        gradient = ctx.createRadialGradient(canvas.width, canvas.height, startCircleRadius, canvas.width, canvas.height, endCircleRadius)
        gradient.addColorStop(0, `rgb(${palette[3 + offset].join(', ')})`)
        gradient.addColorStop(1, 'transparent')
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        resolve(canvas.toDataURL())
      })
  })
}
