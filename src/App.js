import React, { Fragment, useState } from 'react'
import Appbar from 'muicss/lib/react/appbar'
import Radio from 'muicss/lib/react/radio'

import DisplayCurrent from './DisplayCurrent'
import ColorPallette from './ColorPallette'

const skinPalletes = {}

const hairPalletes = {
  Bald: ''
}

export default () => {
  const [ values, setValues ] = useState({
    base: 'human_male',
    skin: 'Caucasian',
    hair: 'Bald'
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
            <Radio name='base' label='Human Male' value='human_male' onChange={onChange} checked={values.base === 'human_male'} />
            <Radio name='base' label='Human Female' value='human_female' onChange={onChange} checked={values.base === 'human_female'} />
            <Radio name='base' label='Orc' value='orc_male' onChange={onChange} checked={values.base === 'orc_male'} />
            <Radio name='base' label='Nosferatu' value='orc_female' onChange={onChange} checked={values.base === 'orc_female'} />
            <Radio name='base' label='Skeleton' value='skeleton' onChange={onChange} checked={values.base === 'skeleton'} />
          </div>
          {values.base !== 'skeleton' && (
            <Fragment>
              <div>
                <h3>Skin Color</h3>
                <ColorPallette name='skin' options={skinPalletes} value={values.skin} onChange={onChange} />
              </div>
              <div>
                <h3>Hair</h3>
                <ColorPallette name='hair' options={hairPalletes} value={values.hair} onChange={onChange} />
              </div>
            </Fragment>
          )}
        </form>
      </main>
    </Fragment>
  )
}
