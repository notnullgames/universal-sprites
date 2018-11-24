/* global Image */

import React, { useRef, useEffect } from 'react'

// TODO: animate sprites
// TODO: do seperate head/face/body and allow all options

// load a sprite onto the canvas
const drawSprite = (ctx, imageName, options = {}) => {
  const { scale = 2, tileCoords = [1, 2], drawCoords = [0, 0], tileSize = [ 64, 64 ] } = options
  const img = new Image()
  img.src = require(`./assets/${imageName}`)
  img.onload = () => {
    const [ sourceWidth, sourceHeight ] = tileSize
    const [ destX, destY ] = drawCoords
    const destWidth = 64 * scale
    const destHeight = 64 * scale
    const [ sourceX, sourceY ] = tileCoords
    ctx.drawImage(img, sourceX * sourceWidth, sourceY * sourceHeight, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight)
  }
}

export default ({ values, ...props }) => {
  const canvas = useRef(null)
  useEffect(() => {
    const ctx = canvas.current.getContext('2d')
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    drawSprite(ctx, `base/${values.base}.png`, { tileCoords: [0, 1], drawCoords: [-32, 0] })
    drawSprite(ctx, `base/${values.base}.png`, { tileCoords: [0, 2], drawCoords: [34, 0] })
    drawSprite(ctx, `base/${values.base}.png`, { tileCoords: [0, 4], drawCoords: [107, 0] })
    drawSprite(ctx, `base/${values.base}.png`, { tileCoords: [0, 3], drawCoords: [175, 0] })
  })
  return (<canvas {...props} ref={canvas} />)
}
