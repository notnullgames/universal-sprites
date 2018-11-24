/**
 * Internal tool used to setup palettes
 * You shouldn't need to run this
 */

const { Image, createCanvas } = require('canvas')
const { zipObject } = require('lodash')
const { writeJSON } = require('./utils')
const chroma = require('chroma-js')

// load a palette from a palette-image
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
          const [r, g, b] = ctx.getImageData(x, y, 1, 1).data
          colors[y].push(chroma(r, g, b).hex())
        }
      }
      resolve(colors)
    }
    img.src = src
  })
}

const getSharedPalette = (src, palette) => {
  const img = new Image()
  return new Promise((resolve, reject) => {
    img.onload = () => {
      const ctx = createCanvas(img.width, img.height).getContext('2d')
      ctx.drawImage(img, 0, 0)
      const imagePalette = new Set()
      for (let x = 0; x < img.width; x++) {
        for (let y = 0; y < img.height; y++) {
          let [ r, g, b, a ] = ctx.getImageData(x, y, 1, 1).data
          a = a > 0 ? 1 : 0
          const hex = chroma([r, g, b, a]).hex()
          if (palette.indexOf(hex) === -1) {
            imagePalette.add(hex)
          }
        }
      }
      resolve([...imagePalette])
    }
    img.src = src
  })
}

const run = async () => {
  const palettes = {
    skin: zipObject(
      ['Light', 'Tan', 'Tan 2', 'Dark', 'Dark 2', 'Dark Elf', 'Dark Elf 2', 'Albino', 'Albino 2', 'Orc', 'Red Orc'],
      await getPalette(`${__dirname}/palette_skin.png`)
    ),
    hair: zipObject(
      ['Default', 'Black', 'Blonde', 'Blonde 2', 'Blue', 'Blue 2', 'Brown', 'Brunette', 'Brunette 2', 'Dark Blonde', 'Grey', 'Green', 'Green 2'],
      await getPalette(`${__dirname}/palette_hair.png`)
    )
  }
  palettes.skin.shared = await getSharedPalette(`${__dirname}/../Universal-LPC-spritesheet/body/male/light.png`, palettes.skin.Light)

  await writeJSON(`${__dirname}/../src/palettes/skin.json`, palettes.skin)
  await writeJSON(`${__dirname}/../src/palettes/hair.json`, palettes.hair)
}
run()
