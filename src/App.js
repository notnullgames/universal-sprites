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
    base: 'male/human',
    skin: skinPalettes.Light,
    hair: hairPalettes.Default,
    hair_style: 'bald',
    shirt: 'none',
    back: 'none',
    legs: 'none'
  })

  const onChange = e => {
    const fixes = {}
    if (e.target.name === 'base') {
      fixes.shirt = 'none'
      fixes.legs = 'none'
    }
    setValues({ ...values, [e.target.name]: e.target.value, ...fixes })
  }

  const gender = values.base.indexOf('female') === -1 ? 'male' : 'female'

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
            <Radio name='base' label='Human Male' value='male/human' onChange={onChange} checked={values.base === 'male/human'} />
            <Radio name='base' label='Human Female' value='female/human' onChange={onChange} checked={values.base === 'female/human'} />
            <Radio name='base' label='Orc Male' value='male/orc' onChange={onChange} checked={values.base === 'male/orc'} />
            <Radio name='base' label='Orc Female' value='female/orc' onChange={onChange} checked={values.base === 'female/orc'} />
            <Radio name='base' label='Skeleton' value='male/skeleton' onChange={onChange} checked={values.base === 'male/skeleton'} />
          </div>
          {values.base !== 'male/skeleton' && (
            <div>
              <h3>Skin</h3>
              <ColorPalette name='skin' options={skinPalettes} value={values.skin} onChange={onChange} />
            </div>
          )}
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
          <div>
            <h3>Shirt</h3>
            <Select name='shirt' label='Style' value={values.shirt} onChange={onChange}>
              <Option value='none' label='None' />
              <Option value='shirts/longsleeve/male/white_longsleeve' label='White Longsleeve' />
              <Option value='shirts/longsleeve/male/brown_longsleeve' label='Brown Longsleeve' />
              <Option value='shirts/longsleeve/male/brown_longsleeve' label='Brown Longsleeve' />
              <Option value='shirts/longsleeve/male/maroon_longsleeve' label='Maroon Longsleeve' />
              <Option value='shirts/longsleeve/male/teal_longsleeve' label='Teal Longsleeve' />
              <Option value='shirts/sleeveless/female/white_pirate' label='White Pirate' />
              <Option value='shirts/sleeveless/female/brown_pirate' label='Brown Pirate' />
              <Option value='shirts/sleeveless/female/maroon_pirate' label='Maroon Pirate' />
              <Option value='shirts/sleeveless/female/teal_pirate' label='Teal Pirate' />
              <Option value='shirts/sleeveless/female/white_sleeveless' label='White Sleeveless' />
              <Option value='shirts/sleeveless/female/brown_sleeveless' label='Brown Sleeveless' />
              <Option value='shirts/sleeveless/female/maroon_sleeveless' label='Maroon Sleeveless' />
              <Option value='shirts/sleeveless/female/teal_sleeveless' label='Teal Sleeveless' />
              <Option value='tunics/female/brown_tunic' label='Brown Tunic' />
              <Option value='tunics/female/maroon_tunic' label='Maroon Tunic' />
              <Option value='tunics/female/teal_tunic' label='Teal Tunic' />
              <Option value='tunics/female/white_tunic' label='White Tunic' />
              <Option value={`chain/mail_${gender}`} label='Chainmail' />
              <Option value={`chain/tabard/jacket_${gender}`} label='Chain Tabard Jacket' />
              <Option value='corset_female/corset_black' label='Black Corset' />
              <Option value='corset_female/corset_brown' label='Brown Corset' />
              <Option value='corset_female/corset_red' label='Red Corset' />
              <Option value='dress_female/blue_vest' label='Dress Blue Vest' />
              <Option value='dress_female/dress_w_sash_female' label='Dress w/ Sash' />
              <Option value='dress_female/overskirt' label='Overskirt' />
              <Option value='dress_female/tightdress_black' label='Tight Dress Black' />
              <Option value='dress_female/tightdress_lightblue' label='Tight Dress Light Blue' />
              <Option value='dress_female/tightdress_red' label='Tight Dress Red' />
              <Option value='dress_female/tightdress_white' label='Tight Dress White' />
              <Option value='dress_female/underdress' label='Under-dress' />
              <Option value='robes_female_no_th-sh/black' label='Black Robes' />
              <Option value='robes_female_no_th-sh/blue' label='Blue Robes' />
              <Option value='robes_female_no_th-sh/brown' label='Brown Robes' />
              <Option value='robes_female_no_th-sh/dark brown' label='Dark Brown Robes' />
              <Option value='robes_female_no_th-sh/dark gray' label='Grey Robes' />
              <Option value='robes_female_no_th-sh/forest green' label='Forest Green Robes' />
              <Option value='robes_female_no_th-sh/light gray' label='Light Grey Robes' />
              <Option value='robes_female_no_th-sh/purple' label='Purple Robes' />
              <Option value='robes_female_no_th-sh/red' label='Red Robes' />
              <Option value='robes_female_no_th-sh/white' label='White Robes' />
            </Select>
          </div>
          <div>
            <h3>Back</h3>
            <Select name='back' label='Style' value={values.back} onChange={onChange}>
              <Option value='none' label='None' />
              <Option value='cape/normal/female/cape_black' label='Black Cape' />
              <Option value='cape/normal/female/cape_blue' label='Blue Cape' />
              <Option value='cape/normal/female/cape_brown' label='Brown Cape' />
              <Option value='cape/normal/female/cape_gray' label='Grey Cape' />
              <Option value='cape/normal/female/cape_green' label='Green Cape' />
              <Option value='cape/normal/female/cape_lavender' label='Lavendar Cape' />
              <Option value='cape/normal/female/cape_maroon' label='Maroon Cape' />
              <Option value='cape/normal/female/cape_pink' label='Pink Cape' />
              <Option value='cape/normal/female/cape_red' label='Red Cape' />
              <Option value='cape/normal/female/cape_white' label='White Cape' />
              <Option value='cape/normal/female/cape_yellow' label='Yellow Cape' />
              <Option value='cape/tattered/female/tattercape_black' label='Black Tattered Cape' />
              <Option value='cape/tattered/female/tattercape_blue' label='Blue Tattered Cape' />
              <Option value='cape/tattered/female/tattercape_brown' label='Brown Tattered Cape' />
              <Option value='cape/tattered/female/tattercape_gray' label='Grey Tattered Cape' />
              <Option value='cape/tattered/female/tattercape_green' label='Green Tattered Cape' />
              <Option value='cape/tattered/female/tattercape_maroon' label='Maroon Tattered Cape' />
              <Option value='cape/tattered/female/tattercape_pink' label='Pink Tattered Cape' />
              <Option value='cape/tattered/female/tattercape_red' label='Red Tattered Cape' />
              <Option value='cape/tattered/female/tattercape_white' label='White Tattered Cape' />
              <Option value='cape/tattered/female/tattercape_yellow' label='Yellow Tattered Cape' />
              <Option value='cape/trimmed/female/trimcape_whiteblue' label='White / Blue Trim Cape' />
              <Option value='wings/wings_no_th-sh' label='Wings' />
            </Select>
          </div>
          <div>
            <h3>Legs</h3>
            <Select name='legs' label='Style' value={values.legs} onChange={onChange}>
              <Option value='none' label='None' />
              <Option value={`armor/${gender}/golden_greaves_${gender}`} label='Golden Greaves' />
              <Option value={`armor/${gender}/metal_pants_${gender}`} label='Metal' />
              <Option value={`pants/${gender}/magenta_pants_${gender}`} label='Magenta' />
              <Option value={`pants/${gender}/white_pants_${gender}`} label='White' />
              <Option value={`pants/${gender}/red_pants_${gender}`} label='Red' />
              <Option value={`pants/${gender}/teal_pants_${gender}`} label='Teal' />
              <Option value={`skirt/${gender}/robe_skirt_${gender}`} label='Robe / Skirt' />
            </Select>
          </div>
        </form>
      </main>
    </Fragment>
  )
}
