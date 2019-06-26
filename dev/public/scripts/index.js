import images from '../images/*.jfif'
const quantize = require('quantize')

if (module.hot) {
  module.hot.dispose(() => {
    window.location.reload()
  })
}

/**
 * Generates palette from image (requires canvas)
 * @param {string} imagePath - URL path to the image
 * @param {number} maximumColorCount - Maximum number of palettes
 * @returns {promise} - Returns promise with array of palettes consisting of RGB values
 */
function generatePaletteFromImage (imagePath, maximumColorCount) {
  return new Promise((resolve, reject) => {
    const imageCanvas = document.createElement('canvas')
    const imageCanvasCtx = imageCanvas.getContext('2d')
    const image = new Image()
    image.src = imagePath
    image.onload = () => {
      imageCanvas.width = image.width
      imageCanvas.height = image.height
      imageCanvasCtx.drawImage(image, 0, 0)
      let imageCanvasData = imageCanvasCtx.getImageData(0, 0, imageCanvas.width, imageCanvas.height).data
      let imageCanvasRGB = []
      // console.log(imageCanvasData)
      for (let pixel = 0; pixel < imageCanvasData.length; pixel += 4) {
        imageCanvasRGB.push([imageCanvasData[pixel], imageCanvasData[pixel + 1], imageCanvasData[pixel + 2]])
      }
      let colorMap = quantize(imageCanvasRGB, maximumColorCount)
      resolve(colorMap.palette())
    }
    image.onerror = (e) => {
      reject(e)
    }
  })
}

function renderCanvas (imagePath) {
  generatePaletteFromImage(imagePath, 4)
    .then((palette) => {
      // img
      
      // analyze(frog)
      //   .then((result) => {
      //     console.log(result)
      //   })
      //   .catch((e) => {
      //     console.log('e')
      //     console.error(e)
      //   })
      
      // Vue.config.productionTip = false
      const canvas = document.createElement('canvas')
      canvas.width = 100
      canvas.height = 100
      const ctx = canvas.getContext('2d')
      // ctx.globalCompositeOperation = 'lighten'
      
      let startCircleRadius = 0
      let endCircleRadius = canvas.width
      
      var gradient = ctx.createRadialGradient(0, 0, startCircleRadius, 0, 0, endCircleRadius)
      // Add three color stops
      gradient.addColorStop(0, `rgb(${palette[0].join(', ')})`)
      gradient.addColorStop(1, 'transparent')
      
      // Set the fill style and draw a rectangle
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      gradient = ctx.createRadialGradient(canvas.width, 0, startCircleRadius, canvas.width, 0, endCircleRadius)
      
      // Add three color stops
      gradient.addColorStop(0, `rgb(${palette[1].join(', ')})`)
      gradient.addColorStop(1, 'transparent')
      
      // Set the fill style and draw a rectangle
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      gradient = ctx.createRadialGradient(0, canvas.height, startCircleRadius, 0, canvas.height, endCircleRadius)
      
      // Add three color stops
      gradient.addColorStop(0, `rgb(${palette[2].join(', ')})`)
      gradient.addColorStop(1, 'transparent')
      
      // Set the fill style and draw a rectangle
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      gradient = ctx.createRadialGradient(canvas.width, canvas.height, startCircleRadius, canvas.width, canvas.height, endCircleRadius)
      
      // Add three color stops
      gradient.addColorStop(0, `rgb(${palette[3].join(', ')})`)
      gradient.addColorStop(1, 'transparent')
      
      // Set the fill style and draw a rectangle
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      document.body.appendChild(canvas)
      // gradient = ctx.createRadialGradient(100, 100, 0, 100, 100, canvas.width)
      
      // // Add three color stops
      // gradient.addColorStop(0, '#0d0d0d')
      // gradient.addColorStop(1, 'transparent')
      
      // // Set the fill style and draw a rectangle
      // ctx.fillStyle = gradient
      // ctx.fillRect(0, 0, canvas.width, canvas.height)
    })
}

// renderCanvas(frog)

Array.from(Object.keys(images)).forEach((key) => {
  renderCanvas(images[key])
})