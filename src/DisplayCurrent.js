import React, { Fragment, useState, useEffect } from 'react'
import { TilingSprite, Stage } from '@inlet/react-pixi'

import Option from 'muicss/lib/react/option'
import Select from 'muicss/lib/react/select'
import Button from 'muicss/lib/react/button'

import { getTextures, downloadComposite, downloadSeperate } from './spritesheet'

// TODO: generate full spritesheet, or composite-sheets
// TODO: handle gendered clothes better
// TODO: handle color-palettes in clothes

export default ({ values, ...props }) => {
  const [position, setPosition] = useState(0)
  const [animation, setAnimation] = useState([9, 10, 8, 11])

  let interval
  useEffect(() => {
    let x = 0
    interval = setInterval(() => {
      x++
      setPosition(x % 6)
    }, 150)
  }, () => clearInterval(interval))

  const { body, hair, shirt, back, legs, bodyShader, hairShader } = getTextures(values)
  const coords = animation.map(n => [832 - (position * 64), 1344 - (n * 64)])
  return (
    <Fragment>
      <Stage {...props} options={{ backgroundColor: 0xFFFFFF }} >
        <Fragment>
          <TilingSprite texture={body} height={64} width={64} scale={2} position={[-32, 0]} tilePosition={coords[0]} filters={[bodyShader]} />
          <TilingSprite texture={body} height={64} width={64} scale={2} position={[34, 0]} tilePosition={coords[1]} filters={[bodyShader]} />
          <TilingSprite texture={body} height={64} width={64} scale={2} position={[107, 0]} tilePosition={coords[2]} filters={[bodyShader]} />
          <TilingSprite texture={body} height={64} width={64} scale={2} position={[175, 0]} tilePosition={coords[3]} filters={[bodyShader]} />
        </Fragment>
        {hair && (
          <Fragment>
            <TilingSprite texture={hair} height={64} width={64} scale={2} position={[-32, 0]} tilePosition={coords[0]} filters={[hairShader]} />
            <TilingSprite texture={hair} height={64} width={64} scale={2} position={[34, 0]} tilePosition={coords[1]} filters={[hairShader]} />
            <TilingSprite texture={hair} height={64} width={64} scale={2} position={[107, 0]} tilePosition={coords[2]} filters={[hairShader]} />
            <TilingSprite texture={hair} height={64} width={64} scale={2} position={[175, 0]} tilePosition={coords[3]} filters={[hairShader]} />
          </Fragment>
        )}
        {legs && (
          <Fragment>
            <TilingSprite texture={legs} height={64} width={64} scale={2} position={[-32, 0]} tilePosition={coords[0]} />
            <TilingSprite texture={legs} height={64} width={64} scale={2} position={[34, 0]} tilePosition={coords[1]} />
            <TilingSprite texture={legs} height={64} width={64} scale={2} position={[107, 0]} tilePosition={coords[2]} />
            <TilingSprite texture={legs} height={64} width={64} scale={2} position={[175, 0]} tilePosition={coords[3]} />
          </Fragment>
        )}
        {shirt && (
          <Fragment>
            <TilingSprite texture={shirt} height={64} width={64} scale={2} position={[-32, 0]} tilePosition={coords[0]} />
            <TilingSprite texture={shirt} height={64} width={64} scale={2} position={[34, 0]} tilePosition={coords[1]} />
            <TilingSprite texture={shirt} height={64} width={64} scale={2} position={[107, 0]} tilePosition={coords[2]} />
            <TilingSprite texture={shirt} height={64} width={64} scale={2} position={[175, 0]} tilePosition={coords[3]} />
          </Fragment>
        )}
        {back && (
          <Fragment>
            <TilingSprite texture={back} height={64} width={64} scale={2} position={[-32, 0]} tilePosition={coords[0]} />
            <TilingSprite texture={back} height={64} width={64} scale={2} position={[34, 0]} tilePosition={coords[1]} />
            <TilingSprite texture={back} height={64} width={64} scale={2} position={[107, 0]} tilePosition={coords[2]} />
            <TilingSprite texture={back} height={64} width={64} scale={2} position={[175, 0]} tilePosition={coords[3]} />
          </Fragment>
        )}
      </Stage>
      {/* <div style={{ display: 'flex', width: '100%' }}>
        <Button onClick={e => downloadComposite(values)} style={{ flex: 1 }} color='primary'>Composite Spritesheet</Button>
        <Button onClick={e => downloadSeperate(values)} style={{ flex: 1 }} color='accent'>Seperate Spritesheets</Button>
      </div> */}
      <Select name='animation' label='Animation' value={animation.join('|')} onChange={e => setAnimation(e.target.value.split('|'))}>
        <Option value='9|10|8|11' label='Walking' />
        <Option value='1|2|0|3' label='Spell' />
        <Option value='5|6|4|7' label='Thrust' />
        <Option value='13|14|12|15' label='Slash' />
        <Option value='17|18|16|19' label='Shoot' />
        <Option value='21|22|20|23' label='Hurt' />
      </Select>
    </Fragment>
  )
}
