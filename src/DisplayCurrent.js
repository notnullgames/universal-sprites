/* global Image */

import React, { useRef, useEffect } from 'react'
import chroma from 'chroma-js'
import { isEqual } from 'lodash'

import skinPalettes from './palettes/skin.json'

// TODO: animate sprites
// TODO: do seperate head/face/body and allow all options

// get the mapped color for a given color and 2 palettes
const findColor = (newColor, inPalette, outPalette, sharedPalette) => {
  const testColor = chroma(newColor).hex()
  const ix = inPalette.indexOf(testColor)
  if (ix !== -1) {
    return outPalette[ix]
  } else {
    return testColor
  }
}

// load a sprite onto the canvas
// TODO: use a shader to improve performance?
const drawSprite = (ctx, imageName, options = {}, palette) => {
  const { scale = 2, tileCoords = [1, 2], drawCoords = [0, 0], tileSize = [ 64, 64 ] } = options
  let img = new Image()
  img.src = require(`./images/${imageName}.png`)
  img.onload = () => {
    const [ sourceX, sourceY ] = tileCoords
    const [ sourceWidth, sourceHeight ] = tileSize
    const [ destX, destY ] = drawCoords
    const destWidth = tileSize[0] * scale
    const destHeight = tileSize[1] * scale
    if (palette && !isEqual(skinPalettes.Light, palette)) {
      const cnv = document.createElement('canvas')
      cnv.width = sourceWidth
      cnv.height = sourceHeight
      const ctxTemp = cnv.getContext('2d')
      ctxTemp.drawImage(img, sourceX * sourceWidth, sourceY * sourceHeight, sourceWidth, sourceHeight, 0, 0, sourceWidth, sourceHeight)
      for (let x = 0; x < sourceWidth; x++) {
        for (let y = 0; y < sourceHeight; y++) {
          let [r, g, b, a] = ctxTemp.getImageData(x, y, 1, 1).data
          a = a > 0 ? 1 : 0
          ctxTemp.fillStyle = findColor([r, g, b, a], skinPalettes.Light, palette)
          ctxTemp.fillRect(x, y, 1, 1)
        }
      }
      ctx.drawImage(ctxTemp.canvas, 0, 0, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight)
    } else {
      ctx.drawImage(img, sourceX * sourceWidth, sourceY * sourceHeight, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight)
    }
  }
}

export default ({ values, ...props }) => {
  const canvas = useRef(null)
  useEffect(() => {
    const ctx = canvas.current.getContext('2d')
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    drawSprite(ctx, values.base, { tileCoords: [0, 1], drawCoords: [-32, 0] }, values.skin)
    drawSprite(ctx, values.base, { tileCoords: [0, 2], drawCoords: [34, 0] }, values.skin)
    drawSprite(ctx, values.base, { tileCoords: [0, 4], drawCoords: [107, 0] }, values.skin)
    drawSprite(ctx, values.base, { tileCoords: [0, 3], drawCoords: [175, 0] }, values.skin)
  })
  return (<canvas {...props} ref={canvas} />)
}
