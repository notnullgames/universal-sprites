import React, { Fragment } from 'react'
import * as PIXI from 'pixi.js'
import { TilingSprite, Stage } from '@inlet/react-pixi'

// TODO: make a shader that handles colors

export default ({ values, ...props }) => {
  const gender = values.base.indexOf('female') === -1 ? 'male' : 'female'
  const body = PIXI.Texture.fromImage(require(`./images/body/${values.base}.png`))
  const hair = values.hair_style !== 'bald' && PIXI.Texture.fromImage(require(`./images/hair/${gender}/${values.hair_style}.png`))
  return (
    <Stage {...props} options={{ backgroundColor: 0xFFFFFF }} >
      <Fragment>
        <TilingSprite texture={body} height={64} width={64} scale={2} position={[-32, 0]} tilePosition={[0, 256]} />
        <TilingSprite texture={body} height={64} width={64} scale={2} position={[34, 0]} tilePosition={[0, 192]} />
        <TilingSprite texture={body} height={64} width={64} scale={2} position={[107, 0]} tilePosition={[0, 0]} />
        <TilingSprite texture={body} height={64} width={64} scale={2} position={[175, 0]} tilePosition={[0, 128]} />
      </Fragment>
      {hair && (
        <Fragment>
          <TilingSprite texture={hair} height={64} width={64} scale={2} position={[-32, 0]} tilePosition={[0, 256]} />
          <TilingSprite texture={hair} height={64} width={64} scale={2} position={[34, 0]} tilePosition={[0, 192]} />
          <TilingSprite texture={hair} height={64} width={64} scale={2} position={[107, 0]} tilePosition={[0, 0]} />
          <TilingSprite texture={hair} height={64} width={64} scale={2} position={[175, 0]} tilePosition={[0, 128]} />
        </Fragment>
      )}
    </Stage>
  )
}
