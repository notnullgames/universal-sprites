import React, { Fragment, useState } from 'react'
import Appbar from 'muicss/lib/react/appbar'
import Radio from 'muicss/lib/react/radio'
import Option from 'muicss/lib/react/option'
import Select from 'muicss/lib/react/select'

import DisplayCurrent from './DisplayCurrent'
import ColorPalette from './ColorPalette'

import skinPalettes from './palettes/skin.json'
import hairPalettes from './palettes/hair.json'

export default () => {
  const [ values, setValues ] = useState({
    base: 'body/male/human',
    skin: skinPalettes.Light,
    hair: hairPalettes.Blonde,
    hair_style: 'bald'
  })

  const onChange = e => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  return (
    <Fragment>
      <header>
        <Appbar>
          <h1>Universal Sprite Editor</h1>
        </Appbar>
      </header>
      <main>
        <DisplayCurrent values={values} width={275} height={150} />
        <form>
          <div>
            <h3>Base Model</h3>
            <Radio name='base' label='Human Male' value='body/male/human' onChange={onChange} checked={values.base === 'body/male/human'} />
            <Radio name='base' label='Human Female' value='body/female/human' onChange={onChange} checked={values.base === 'body/female/human'} />
            <Radio name='base' label='Orc Male' value='body/male/orc' onChange={onChange} checked={values.base === 'body/male/orc'} />
            <Radio name='base' label='Orc Female' value='body/female/orc' onChange={onChange} checked={values.base === 'body/female/orc'} />
            <Radio name='base' label='Skeleton' value='body/male/skeleton' onChange={onChange} checked={values.base === 'body/male/skeleton'} />
          </div>
          {values.base !== 'body/male/skeleton' && (
            <Fragment>
              <div>
                <h3>Skin Color</h3>
                <ColorPalette name='skin' options={skinPalettes} value={values.skin} onChange={onChange} />
              </div>
              <div>
                <h3>Hair</h3>
                <Select name='hair_style' label='Style' value={values.hair_style} onChange={onChange}>
                  <Option value='bald' label='Bald' />
                  <Option value='bangs' label='Bangs' />
                  <Option value='bangslong' label='Long Bangs' />
                  <Option value='bangslong2' label='Long Bangs 2' />
                  <Option value='bangsshort' label='Short Bangs' />
                  <Option value='bedhead' label='Bead-head' />
                  <Option value='bunches' label='Bunches' />
                  <Option value='jewfro' label='Curly' />
                  <Option value='long' label='Long' />
                  <Option value='longhawk' label='Long Mohawk' />
                  <Option value='longknot' label='Long Knot' />
                  <Option value='loose' label='Loose' />
                  <Option value='messy1' label='Messy' />
                  <Option value='messy2' label='Messy 2' />
                  <Option value='mohawk' label='Mohawk' />
                  <Option value='page' label='Page' />
                  <Option value='page2' label='Page 2' />
                  <Option value='parted' label='Parted' />
                  <Option value='pixie' label='Pixie' />
                  <Option value='plain' label='Plain' />
                  <Option value='ponytail' label='Ponytail' />
                  <Option value='ponytail2' label='Ponytail 2' />
                  <Option value='princess' label='Princess' />
                  <Option value='shorthawk' label='Short Mohawk' />
                  <Option value='shortknot' label='Short Knot' />
                  <Option value='shoulderl' label='Shoulder Left' />
                  <Option value='shoulderr' label='Shoulder Right' />
                  <Option value='swoop' label='Swoop' />
                  <Option value='unkempt' label='Unkempt' />
                  <Option value='xlong' label='Extra Long' />
                  <Option value='xlongknot' label='Extra Long Knot' />
                </Select>
                {values.hair_style !== 'bald' && <ColorPalette name='hair' options={hairPalettes} value={values.hair} onChange={onChange} /> }
              </div>
            </Fragment>
          )}
        </form>
      </main>
    </Fragment>
  )
}
