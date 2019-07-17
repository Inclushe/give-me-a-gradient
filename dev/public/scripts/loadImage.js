module.exports = (path) => {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.crossOrigin = 'anonymous'
    image.src = path
    image.onload = () => {
      resolve(image)
    }
    image.onerror = (e) => {
      reject(e)
    }
  })
}
