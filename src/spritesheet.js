import * as PIXI from 'pixi.js'
import chroma from 'chroma-js'
import { MultiColorReplaceFilter } from '@pixi/filter-multi-color-replace'
import memoize from 'fast-memoize'

import skinPalettes from './palettes/skin.json'
import hairPalettes from './palettes/hair.json'

// generate a palette-swapping shader from 2 palettes (array of arrays RGB)
const swapPaletteFrag = (paletteIn, paletteOut) => new MultiColorReplaceFilter(paletteIn.map((v, i) => [v, paletteOut[i]]), 0.18)

// get array of numeric colors for array of hex-colors
const colorMap = palette => palette.map(c => chroma(c).num())

// pre-compute replacement palettes
const lightSkinPalette = colorMap(skinPalettes.Light)
const defaultHairPalette = colorMap(hairPalettes.Default)

export const getTextures = memoize(values => {
  const gender = values.base.indexOf('female') === -1 ? 'male' : 'female'
  const body = PIXI.Texture.fromImage(require(`./images/body/${values.base}.png`))
  const hair = values.hair_style !== 'bald' && PIXI.Texture.fromImage(require(`./images/hair/${gender}/${values.hair_style}.png`))
  const shirt = values.shirt !== 'none' && PIXI.Texture.fromImage(require(`./images/torso/${values.shirt.replace(/GENDER/g, gender)}.png`))
  const back = values.back !== 'none' && PIXI.Texture.fromImage(require(`./images/torso/back/${values.back}.png`))
  const legs = values.legs !== 'none' && PIXI.Texture.fromImage(require(`./images/legs/${values.legs.replace(/GENDER/g, gender)}.png`))
  const bodyShader = values.base !== 'male/skeleton' && swapPaletteFrag(lightSkinPalette, colorMap(values.skin))
  const hairShader = hair && swapPaletteFrag(defaultHairPalette, colorMap(values.hair))
  return { gender, body, hair, shirt, back, legs, bodyShader, hairShader }
})

export const downloadComposite = values => e => {
  const renderer = new PIXI.WebGLRenderer(832, 1344, { transparent: true, preserveDrawingBuffer: true })
  const stage = new PIXI.Container()
  const { body, hair, shirt, back, legs, bodyShader, hairShader } = getTextures(values)
  const bodySprite = new PIXI.Sprite(body)
  bodySprite.filters = [bodyShader]
  stage.addChild(bodySprite)
  if (hair) {
    const hairSprite = new PIXI.Sprite(hair)
    hairSprite.filters = [hairShader]
    stage.addChild(hairSprite)
  }
  if (legs) {
    stage.addChild(new PIXI.Sprite(legs))
  }
  if (shirt) {
    stage.addChild(new PIXI.Sprite(shirt))
  }
  if (back) {
    stage.addChild(new PIXI.Sprite(back))
  }
  renderer.render(stage)
  e.target.href = renderer.view.toDataURL('image/png')
}

export const downloadSeperate = values => {

}
