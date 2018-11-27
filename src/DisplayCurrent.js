import React, { Fragment, useState, useEffect } from 'react'
import { TilingSprite, Stage, AppConsumer } from '@inlet/react-pixi'

import Option from 'muicss/lib/react/option'
import Select from 'muicss/lib/react/select'

import { downloadComposite, createComposite } from './spritesheet'

// this wasn't exported...
const withPixiApp = (Component) => props => (<AppConsumer>{app => <Component {...props} app={app} />}</AppConsumer>)

const GraphicalPart = withPixiApp(({ app, values, coords }) => {
  // reuse composite function to get spritesheet
  const spritesheet = app.renderer.generateTexture(createComposite(values))
  return (
    <Fragment>
      <TilingSprite texture={spritesheet} height={64} width={64} scale={2} position={[-32, 0]} tilePosition={coords[0]} />
      <TilingSprite texture={spritesheet} height={64} width={64} scale={2} position={[34, 0]} tilePosition={coords[1]} />
      <TilingSprite texture={spritesheet} height={64} width={64} scale={2} position={[107, 0]} tilePosition={coords[2]} />
      <TilingSprite texture={spritesheet} height={64} width={64} scale={2} position={[175, 0]} tilePosition={coords[3]} />
    </Fragment>
  )
})

export default ({ values, ...props }) => {
  const [position, setPosition] = useState(0)
  const [animation, setAnimation] = useState([9, 10, 8, 11])

  let interval
  useEffect(() => {
    let x = 0
    interval = setInterval(() => {
      x++
      setPosition(x % animation.length + 1)
    }, 150)
  }, () => clearInterval(interval))

  const coords = animation.map(n => [832 - (position * 64), 1344 - (n * 64)])

  return (
    <Fragment>
      <Stage {...props} options={{ backgroundColor: 0xFFFFFF }} >
        <GraphicalPart values={values} coords={coords} {...props} />
      </Stage>
      <div>
        <a href='sprites.png' download='sprites.png' className='mui-btn mui-btn--primary' onClick={downloadComposite(values)}>Download</a>
      </div>
      <Select name='animation' label='Animation' value={animation.join('|')} onChange={e => setAnimation(e.target.value.split('|'))}>
        <Option value='9|10|8|11' label='Walking' />
        <Option value='1|2|0|3' label='Spell' />
        <Option value='5|6|4|7' label='Thrust' />
        <Option value='13|14|12|15' label='Slash' />
        <Option value='17|18|16|19' label='Shoot' />
      </Select>
    </Fragment>
  )
}
