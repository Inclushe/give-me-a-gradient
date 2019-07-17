import images from '../../tests/images/*.png'
import renderGradientModule from '../../../index'
const renderGradientCommon = require('../../../index')

if (module.hot) {
  module.hot.dispose(() => {
    window.location.reload()
  })
}

Array.from(Object.keys(images)).forEach((key) => {
  renderGradientModule({
    imagePath: images[key],
    height: 200,
    width: 200
  })
    .then((dataURL) => {
      document.body.innerHTML += `<img src='${dataURL}'/>`
    })
})

Array.from(Object.keys(images)).forEach((key) => {
  renderGradientCommon({
    imagePath: images[key],
    height: 200,
    width: 200
  })
    .then((dataURL) => {
      document.body.innerHTML += `<img src='${dataURL}'/>`
    })
})
