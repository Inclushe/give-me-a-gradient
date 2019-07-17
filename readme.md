# give-me-a-gradient

Gives you a gradient based on the colors of an image. **(browser only for now)**

The function returns a promise with the data URI of the gradient image.

## Install

### Browser

#### UMD

```html
<script src="https://cdn.jsdelivr.net/npm/give-me-a-gradient"></script>
<script>
  renderGradient({
    imagePath: 'https://i.imgur.com/Pk7R8lg.png',
    height: 480,
    width: 640
  })
    .then((imageURI) => {
      document.body.innerHTML += `<img src='${imageURI}' />`
    })
</script>
```

### Node

```npm install give-me-a-gradient```

#### CommonJS

```javascript
const renderGradient = require('give-me-a-gradient')
renderGradient({
  imagePath: 'https://i.imgur.com/Pk7R8lg.png',
  height: 480,
  width: 640
})
  .then((imageURI) => {
    document.body.innerHTML += `<img src='${imageURI}' />`
  })
```

#### Module

```javascript
import renderGradient from 'give-me-a-gradient'
renderGradient({
  imagePath: 'https://i.imgur.com/Pk7R8lg.png',
  height: 480,
  width: 640
})
  .then((imageURI) => {
    document.body.innerHTML += `<img src='${imageURI}' />`
  })
```

## Usage

renderGradient must be passed with options.

### Options

#### imagePath *

  URL of the image you want to make a gradient out of.

#### height *
  
  Height of the desired gradient image.

#### width *

  Width of the desired gradient image.

##### \* Required

### Output

- returns promise resolving with the data URI of the image

## Build

```$ npm run build```

## Test

```$ npm run test```
