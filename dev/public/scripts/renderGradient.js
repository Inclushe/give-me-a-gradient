const generatePaletteFromImage = require('./generatePaletteFromImage')

/**
 * @param {object} options
 * @param {string} options.imagePath
 * @param {number} options.height
 * @param {number} options.width
 * @param {number} options.quality
 * @returns {promise} - Returns promise with data URL of the gradient
 */
module.exports = function (options) {
  return new Promise((resolve, reject) => {
    generatePaletteFromImage({
      imagePath: options.imagePath,
      maximumPaletteCount: 4,
      quality: options.quality || 20
    })
      .then((palette) => {
        if (palette === null) {
          palette = [[255, 255, 255], [255, 255, 255], [255, 255, 255], [255, 255, 255]]
        }
        const canvas = document.createElement('canvas')
        canvas.width = options.width
        canvas.height = options.height
        const ctx = canvas.getContext('2d')
        const startCircleRadius = 0
        const endCircleRadius = Math.sqrt(Math.pow(canvas.width, 2) + Math.pow(canvas.height, 2))
        const colorOffset = 0

        ctx.fillStyle = 'white'
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        var gradient = ctx.createRadialGradient(0, 0, startCircleRadius, 0, 0, endCircleRadius)
        gradient.addColorStop(0, `rgba(${palette[0 + colorOffset].join(', ')}, 1)`)
        gradient.addColorStop(1, `rgba(${palette[0 + colorOffset].join(', ')}, 0)`)
        ctx.beginPath()
        ctx.fillStyle = gradient
        ctx.arc(0, 0, endCircleRadius, 0, Math.PI * 2, false)
        ctx.fill()

        gradient = ctx.createRadialGradient(canvas.width, 0, startCircleRadius, canvas.width, 0, endCircleRadius)
        gradient.addColorStop(0, `rgba(${palette[1 + colorOffset].join(', ')}, 1)`)
        gradient.addColorStop(1, `rgba(${palette[1 + colorOffset].join(', ')}, 0)`)
        ctx.beginPath()
        ctx.fillStyle = gradient
        ctx.arc(canvas.width, 0, endCircleRadius, 0, Math.PI * 2, false)
        ctx.fill()

        gradient = ctx.createRadialGradient(0, canvas.height, startCircleRadius, 0, canvas.height, endCircleRadius)
        gradient.addColorStop(0, `rgba(${palette[2 + colorOffset].join(', ')}, 1)`)
        gradient.addColorStop(1, `rgba(${palette[2 + colorOffset].join(', ')}, 0)`)
        ctx.beginPath()
        ctx.fillStyle = gradient
        ctx.arc(0, canvas.height, endCircleRadius, 0, Math.PI * 2, false)
        ctx.fill()

        gradient = ctx.createRadialGradient(canvas.width, canvas.height, startCircleRadius, canvas.width, canvas.height, endCircleRadius)
        gradient.addColorStop(0, `rgba(${palette[3 + colorOffset].join(', ')}, 1)`)
        gradient.addColorStop(1, `rgba(${palette[3 + colorOffset].join(', ')}, 0)`)
        ctx.beginPath()
        ctx.fillStyle = gradient
        ctx.arc(canvas.width, canvas.height, endCircleRadius, 0, Math.PI * 2, false)
        ctx.fill()

        resolve(canvas.toDataURL())
      })
  })
}
