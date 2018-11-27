import React, { Fragment } from 'react'
import * as PIXI from 'pixi.js'
import { MultiColorReplaceFilter } from '@pixi/filter-multi-color-replace'
import { TilingSprite, Stage } from '@inlet/react-pixi'
import chroma from 'chroma-js'

import skinPalettes from './palettes/skin.json'
import hairPalettes from './palettes/hair.json'

// generate a palette-swapping shader from 2 palettes (array of arrays RGB)
const swapPaletteFrag = (paletteIn, paletteOut) => new MultiColorReplaceFilter(paletteIn.map((v, i) => [v, paletteOut[i]]), 0.18)

// get array of numeric colors for array of hex-colors
const colorMap = palette => palette.map(c => chroma(c).num())

// pre-compute replacement palettes
const lightSkinPalette = colorMap(skinPalettes.Light)
const defaultHairPalette = colorMap(hairPalettes.Default)

// TODO: generate full spritesheet, or composite-sheets
// TODO: handle gendered clothes better
// TODO: handle color-palettes in clothes
// TODO: figure out basic adjustments of male->female & female->male, and only include one set

export default ({ values, ...props }) => {
  const gender = values.base.indexOf('female') === -1 ? 'male' : 'female'
  const body = PIXI.Texture.fromImage(require(`./images/body/${values.base}.png`))
  const hair = values.hair_style !== 'bald' && PIXI.Texture.fromImage(require(`./images/hair/${gender}/${values.hair_style}.png`))
  const shirt = values.shirt !== 'none' && PIXI.Texture.fromImage(require(`./images/torso/${values.shirt}.png`))
  const back = values.back !== 'none' && PIXI.Texture.fromImage(require(`./images/torso/back/${values.back}.png`))
  const legs = values.legs !== 'none' && PIXI.Texture.fromImage(require(`./images/legs/${values.legs}.png`))
  const bodyShader = values.base !== 'male/skeleton' && swapPaletteFrag(lightSkinPalette, colorMap(values.skin))
  const hairShader = hair && swapPaletteFrag(defaultHairPalette, colorMap(values.hair))
  return (
    <Stage {...props} options={{ backgroundColor: 0xFFFFFF }} >
      <Fragment>
        <TilingSprite texture={body} height={64} width={64} scale={2} position={[-32, 0]} tilePosition={[0, 256]} filters={[bodyShader]} />
        <TilingSprite texture={body} height={64} width={64} scale={2} position={[34, 0]} tilePosition={[0, 192]} filters={[bodyShader]} />
        <TilingSprite texture={body} height={64} width={64} scale={2} position={[107, 0]} tilePosition={[0, 0]} filters={[bodyShader]} />
        <TilingSprite texture={body} height={64} width={64} scale={2} position={[175, 0]} tilePosition={[0, 128]} filters={[bodyShader]} />
      </Fragment>
      {hair && (
        <Fragment>
          <TilingSprite texture={hair} height={64} width={64} scale={2} position={[-32, 0]} tilePosition={[0, 256]} filters={[hairShader]} />
          <TilingSprite texture={hair} height={64} width={64} scale={2} position={[34, 0]} tilePosition={[0, 192]} filters={[hairShader]} />
          <TilingSprite texture={hair} height={64} width={64} scale={2} position={[107, 0]} tilePosition={[0, 0]} filters={[hairShader]} />
          <TilingSprite texture={hair} height={64} width={64} scale={2} position={[175, 0]} tilePosition={[0, 128]} filters={[hairShader]} />
        </Fragment>
      )}
      {shirt && (
        <Fragment>
          <TilingSprite texture={shirt} height={64} width={64} scale={2} position={[-32, 0]} tilePosition={[0, 256]} />
          <TilingSprite texture={shirt} height={64} width={64} scale={2} position={[34, 0]} tilePosition={[0, 192]} />
          <TilingSprite texture={shirt} height={64} width={64} scale={2} position={[107, 0]} tilePosition={[0, 0]} />
          <TilingSprite texture={shirt} height={64} width={64} scale={2} position={[175, 0]} tilePosition={[0, 128]} />
        </Fragment>
      )}
      {legs && (
        <Fragment>
          <TilingSprite texture={legs} height={64} width={64} scale={2} position={[-32, 0]} tilePosition={[0, 256]} />
          <TilingSprite texture={legs} height={64} width={64} scale={2} position={[34, 0]} tilePosition={[0, 192]} />
          <TilingSprite texture={legs} height={64} width={64} scale={2} position={[107, 0]} tilePosition={[0, 0]} />
          <TilingSprite texture={legs} height={64} width={64} scale={2} position={[175, 0]} tilePosition={[0, 128]} />
        </Fragment>
      )}
      {back && (
        <Fragment>
          <TilingSprite texture={back} height={64} width={64} scale={2} position={[-32, 0]} tilePosition={[0, 256]} />
          <TilingSprite texture={back} height={64} width={64} scale={2} position={[34, 0]} tilePosition={[0, 192]} />
          <TilingSprite texture={back} height={64} width={64} scale={2} position={[107, 0]} tilePosition={[0, 0]} />
          <TilingSprite texture={back} height={64} width={64} scale={2} position={[175, 0]} tilePosition={[0, 128]} />
        </Fragment>
      )}
    </Stage>
  )
}
