import * as PIXI from 'pixi.js'
import chroma from 'chroma-js'
import { MultiColorReplaceFilter } from '@pixi/filter-multi-color-replace'
import memoize from 'fast-memoize'

import skinPalettes from './palettes/skin.json'
import hairPalettes from './palettes/hair.json'

// TODO: generate full spritesheet, or composite-sheets
// TODO: handle gendered clothes better
// TODO: handle color-palettes in clothes

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
  const beard = values.beard_style !== 'bald' && PIXI.Texture.fromImage(require(`./images/facial/${gender}/${values.beard_style}.png`))
  const shirt = values.shirt !== 'none' && PIXI.Texture.fromImage(require(`./images/${values.shirt.replace(/GENDER/g, gender)}.png`))
  const back = values.back !== 'none' && PIXI.Texture.fromImage(require(`./images/${values.back}.png`))
  const legs = values.legs !== 'none' && PIXI.Texture.fromImage(require(`./images/${values.legs.replace(/GENDER/g, gender)}.png`))
  const bodyShader = values.base !== 'male/skeleton' && swapPaletteFrag(lightSkinPalette, colorMap(values.skin))
  const hairShader = hair && swapPaletteFrag(defaultHairPalette, colorMap(values.hair))
  const beardShader = beard && swapPaletteFrag(defaultHairPalette, colorMap(values.beard))
  return { gender, body, hair, beard, shirt, back, legs, bodyShader, hairShader, beardShader }
})

// core drawing function that combines all layers into a full spritesheet
export const createComposite = (values) => {
  const { body, hair, shirt, back, legs, bodyShader, hairShader, beard, beardShader } = getTextures(values)
  const stage = new PIXI.Container()
  const bodySprite = new PIXI.Sprite(body)
  bodySprite.filters = [bodyShader]
  stage.addChild(bodySprite)
  if (hair) {
    const hairSprite = new PIXI.Sprite(hair)
    hairSprite.filters = [hairShader]
    stage.addChild(hairSprite)
  }
  if (beard) {
    const beardSprite = new PIXI.Sprite(beard)
    beardSprite.filters = [beardShader]
    stage.addChild(beardSprite)
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
  return stage
}

// createComposite wrapper for a[download] link
export const downloadComposite = values => e => {
  const renderer = new PIXI.WebGLRenderer(832, 1344, { transparent: true, preserveDrawingBuffer: true })
  const stage = createComposite(values)
  renderer.render(stage)
  e.target.href = renderer.view.toDataURL('image/png')
}

export const downloadSeperate = values => {

}
