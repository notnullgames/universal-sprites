import React, { useState } from 'react'
import Option from 'muicss/lib/react/option'
import Select from 'muicss/lib/react/select'

export default ({ options, value, name, onChange }) => {
  const [ colors, setColors ] = useState(value)
  const [ label, setLabel ] = useState(false)

  const onColorChange = e => {
    setLabel('Custom')
    const value = colors.slice()
    value[e.target.name.replace('color', '')] = e.target.value
    setColors(value)
    onChange({
      target: {
        name,
        value
      }
    })
  }

  const onChangePreset = e => {
    setLabel(e.target.value)
    if (e.target.value !== 'Custom') {
      setColors(options[e.target.value])
      onChange({
        target: {
          name,
          value: options[e.target.value]
        }
      })
    }
  }
  return (
    <div>
      <Select name={name} label='Color' onChange={onChangePreset} value={label}>
        {Object.keys(options).map(o => <Option key={o} value={o} label={o} />)}
        <Option value='Custom' label='Custom' />
      </Select>
      <div>
        {colors.map((v, i) => (
          <input key={i} type='color' name={`color${i}`} value={v} onChange={onColorChange} />
        ))}
      </div>
    </div>
  )
}
