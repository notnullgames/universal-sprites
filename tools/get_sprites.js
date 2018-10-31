// Tools I used to make images

const { Image, createCanvas } = require('canvas')
const fs = require('fs')

// load a pallette from a pallette-image
const getPalette = async (src) => {
  const img = new Image()
  return new Promise((resolve, reject) => {
    img.onload = () => {
      const cnv = createCanvas(img.width, img.height)
      const ctx = cnv.getContext('2d')
      ctx.drawImage(img, 0, 0)
      const colors = []
      for (let y = 0; y < img.height; y++) {
        colors[y] = colors[y] || []
        for (let x = 0; x < img.width; x++) {
          const [r, g, b, a] = ctx.getImageData(x, y, 1, 1).data
          colors[y].push([r, g, b, a])
        }
      }
      resolve(colors)
    }
    img.src = src
  })
}

// is a color (rgba-array) in a palette (array of rgba-arrays)?
const findColor = (color, palette) => {
  let ix = -1
  palette.forEach((p, i) => {
    if (p[0] === color[0] && p[1] === color[1] && p[2] === color[2] && p[3] === color[3]) {
      ix = i
    }
  })
  return ix
}

// take colors from one palette in an image, transpose to another palette
const transposeImage = (inSrc, paletteOut, paletteIn, outSrc) => {
  const img = new Image()
  return new Promise((resolve, reject) => {
    img.onload = () => {
      const cnv = createCanvas(img.width, img.height)
      const ctx = cnv.getContext('2d')
      const cnvOut = createCanvas(img.width, img.height)
      const ctxOut = cnvOut.getContext('2d')
      ctx.drawImage(img, 0, 0)
      for (let x = 0; x < img.width; x++) {
        for (let y = 0; y < img.height; y++) {
          const [r, g, b, a] = ctx.getImageData(x, y, 1, 1).data
          const ix = findColor([r, g, b, a], paletteIn)
          const newColor = (ix !== -1) ? paletteOut[ix] : [r, g, b, a]
          ctxOut.fillStyle = `rgba( ${newColor[0]}, ${newColor[1]}, ${newColor[2]}, ${newColor[3] / 255})`
          ctxOut.fillRect(x, y, 1, 1)
        }
      }
      const out = fs.createWriteStream(outSrc)
      const stream = cnvOut.createPNGStream()
      stream.pipe(out)
      out.on('finish', () => { resolve() })
    }
    img.src = inSrc
  })
}

const run = async () => {
  const palettes = {
    skin: await getPalette(`${__dirname}/palette_skin.png`),
    hair: await getPalette(`${__dirname}/palette_hair.png`)
  }

  // turn orcs into light-human palette
  await transposeImage(
    `${__dirname}/../src/assets/Universal-LPC-spritesheet/body/male/orc.png`,
    palettes.skin[0],
    palettes.skin[9],
    `${__dirname}/../src/assets/base/orc_male.png`
  )
  await transposeImage(
    `${__dirname}/../src/assets/Universal-LPC-spritesheet/body/female/orc.png`,
    palettes.skin[0],
    palettes.skin[9],
    `${__dirname}/../src/assets/base/orc_female.png`
  )
}
run()
