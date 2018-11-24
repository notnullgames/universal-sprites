/**
 * Internal tool used to create normalized base images
 * You shouldn't need to run this
 */

const { Image, createCanvas } = require('canvas')
const fs = require('fs')
const skin = require('../src/palettes/skin.json')
const chroma = require('chroma-js')

const unHandledColor = new Set()

// get the mapped color for a given color and 2 palettes
const findColor = (newColor, inPalette, outPalette, sharedPalette) => {
  const testColor = chroma(newColor).hex()
  const ix = inPalette.indexOf(testColor)
  if (ix !== -1) {
    return outPalette[ix]
  } else {
    if (sharedPalette.indexOf(testColor) === -1) {
      // TODO: there are too many of these, need to figure out a better map
      unHandledColor.add(testColor)
    }
    return testColor
  }
}

// map image from one palette to another
const transposeImagePalette = (inName, outName, inPalette, outPalette, sharedPalette) => {
  const img = new Image()
  return new Promise((resolve, reject) => {
    img.onload = () => {
      const ctx = createCanvas(img.width, img.height).getContext('2d')
      const ctxOut = createCanvas(img.width, img.height).getContext('2d')
      ctx.drawImage(img, 0, 0)
      for (let x = 0; x < img.width; x++) {
        for (let y = 0; y < img.height; y++) {
          let [r, g, b, a] = ctx.getImageData(x, y, 1, 1).data
          a = a > 0 ? 1 : 0
          ctxOut.fillStyle = findColor([r, g, b, a], inPalette, outPalette, sharedPalette)
          ctxOut.fillRect(x, y, 1, 1)
        }
      }
      const out = fs.createWriteStream(outName)
      const stream = ctxOut.canvas.createPNGStream()
      stream.pipe(out)
      out.on('finish', () => { resolve() })
    }
    img.src = inName
  })
}

const run = async () => {
  // turn orcs into light-human palette
  await transposeImagePalette(
    `${__dirname}/../Universal-LPC-spritesheet/body/male/orc.png`,
    `${__dirname}/../src/images/orc_male.png`,
    skin.Orc,
    skin.Light,
    skin.shared
  )

  await transposeImagePalette(
    `${__dirname}/../Universal-LPC-spritesheet/body/female/orc.png`,
    `${__dirname}/../src/images/orc_female.png`,
    skin.Orc,
    skin.Light,
    skin.shared
  )

  // console.log('unhandled colors', unHandledColor)
}
run()
