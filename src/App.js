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
    legs: 'none',
    headwear: 'none',
    belt: 'none',
    beard_style: 'bald',
    beard: hairPalettes.Default,
    shoes: 'barefoot',
    quiver: false
  })

  const onChange = e => {
    if (e.target.type === 'checkbox') {
      setValues({ ...values, [e.target.name]: !values[[e.target.name]] })
    } else {
      setValues({ ...values, [e.target.name]: e.target.value })
    }
  }

  return (
    <Fragment>
      <header>
        <Appbar>
          <h1>Universal Sprite Editor</h1>
        </Appbar>
      </header>
      <main>
        <p>All art is dual licensed: GPL3 and CC-BY-SA3</p>
        <a href='https://github.com/notnullgames/universal-sprites'><img style={{ position: 'absolute', top: 0, right: 0, border: 0 }} src='https://s3.amazonaws.com/github/ribbons/forkme_right_darkblue_121621.png' alt='Fork me on GitHub' /></a>
        <DisplayCurrent values={values} width={275} height={120} />
        <form>
          <h3>Body</h3>
          <article>
            <div className='mui-select'>
              <label htmlFor='base'>Body Type</label>
              <Radio name='base' label='Human Male' value='male/human' onChange={onChange} checked={values.base === 'male/human'} />
              <Radio name='base' label='Human Female' value='female/human' onChange={onChange} checked={values.base === 'female/human'} />
              <Radio name='base' label='Orc Male' value='male/orc' onChange={onChange} checked={values.base === 'male/orc'} />
              <Radio name='base' label='Orc Female' value='female/orc' onChange={onChange} checked={values.base === 'female/orc'} />
              <Radio name='base' label='Skeleton' value='male/skeleton' onChange={onChange} checked={values.base === 'male/skeleton'} />
            </div>
            {values.base !== 'male/skeleton' && (
              <div>
                <ColorPalette label='Skin Color' name='skin' options={skinPalettes} value={values.skin} onChange={onChange} />
              </div>
            )}
          </article>

          <h3>Head</h3>
          <article>
            <div>
              <Select name='hair_style' label='Hair' value={values.hair_style} onChange={onChange}>
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
              {values.hair_style !== 'bald' && <ColorPalette label='Hair Color' name='hair' options={hairPalettes} value={values.hair} onChange={onChange} /> }
            </div>
            <div>
              <Select name='beard_style' label='Facial Hair' value={values.beard_style} onChange={onChange}>
                <Option value='bald' label='None' />
                <Option value='beard' label='Beard' />
                <Option value='bigstache' label='Big Stache' />
                <Option value='fiveoclock' label="5 O'clock Shadow" />
                <Option value='frenchstache' label='French Stache' />
                <Option value='mustache' label='Mustache' />
              </Select>
              {values.beard_style !== 'bald' && <ColorPalette label='Facial Hair Color' name='beard' options={hairPalettes} value={values.beard} onChange={onChange} /> }
            </div>
            <div>
              <Select name='headwear' label='Headwear' value={values.headwear} onChange={onChange}>
                <Option value='none' label='None' />
                <Option value='head/bandanas/GENDER/red' label='Bandana' />
                <Option value='head/caps/GENDER/leather_cap_GENDER' label='Leather Cap' />
                <Option value='head/helms/GENDER/chainhat_GENDER' label='Chain Hat' />
                <Option value='head/helms/GENDER/golden_helm_GENDER' label='Golden Helm' />
                <Option value='head/helms/GENDER/metal_helm_GENDER' label='Metal Helm' />
                <Option value='head/hoods/GENDER/chain_hood_GENDER' label='Chain Hood' />
                <Option value='head/hoods/GENDER/cloth_hood_GENDER' label='Cloth Hood' />
                <Option value='head/tiaras_female/bronze' label='Bronze Tiara' />
                <Option value='head/tiaras_female/gold' label='Gold Tiara' />
                <Option value='head/tiaras_female/iron' label='Iron Tiara' />
                <Option value='head/tiaras_female/purple' label='Purple Tiara' />
                <Option value='head/tiaras_female/silver' label='Silver Tiara' />
              </Select>
            </div>
          </article>

          <h3>Torso</h3>
          <article>
            <div className='mui-checkbox'>
              <label><input value type='checkbox' onChange={onChange} name='quiver' checked={values.quiver} />Arrow quiver</label>
            </div>
          </article>
          <article>
            <div>
              <Select name='shirt' label='Shirt' value={values.shirt} onChange={onChange}>
                <Option value='none' label='None' />
                <Option value='torso/shirts/longsleeve/male/white_longsleeve' label='White Longsleeve' />
                <Option value='torso/shirts/longsleeve/male/brown_longsleeve' label='Brown Longsleeve' />
                <Option value='torso/shirts/longsleeve/male/brown_longsleeve' label='Brown Longsleeve' />
                <Option value='torso/shirts/longsleeve/male/maroon_longsleeve' label='Maroon Longsleeve' />
                <Option value='torso/shirts/longsleeve/male/teal_longsleeve' label='Teal Longsleeve' />
                <Option value='torso/shirts/sleeveless/female/white_pirate' label='White Pirate' />
                <Option value='torso/shirts/sleeveless/female/brown_pirate' label='Brown Pirate' />
                <Option value='torso/shirts/sleeveless/female/maroon_pirate' label='Maroon Pirate' />
                <Option value='torso/shirts/sleeveless/female/teal_pirate' label='Teal Pirate' />
                <Option value='torso/shirts/sleeveless/female/white_sleeveless' label='White Sleeveless' />
                <Option value='torso/shirts/sleeveless/female/brown_sleeveless' label='Brown Sleeveless' />
                <Option value='torso/shirts/sleeveless/female/maroon_sleeveless' label='Maroon Sleeveless' />
                <Option value='torso/shirts/sleeveless/female/teal_sleeveless' label='Teal Sleeveless' />
                <Option value='torso/tunics/female/brown_tunic' label='Brown Tunic' />
                <Option value='torso/tunics/female/maroon_tunic' label='Maroon Tunic' />
                <Option value='torso/tunics/female/teal_tunic' label='Teal Tunic' />
                <Option value='torso/tunics/female/white_tunic' label='White Tunic' />
                <Option value='torso/chain/mail_GENDER' label='Chainmail' />
                <Option value='torso/chain/tabard/jacket_GENDER' label='Chain Tabard Jacket' />
                <Option value='torso/corset_female/corset_black' label='Black Corset' />
                <Option value='torso/corset_female/corset_brown' label='Brown Corset' />
                <Option value='torso/corset_female/corset_red' label='Red Corset' />
                <Option value='torso/dress_female/blue_vest' label='Dress Blue Vest' />
                <Option value='torso/dress_female/dress_w_sash_female' label='Dress w/ Sash' />
                <Option value='torso/dress_female/overskirt' label='Overskirt' />
                <Option value='torso/dress_female/tightdress_black' label='Tight Dress Black' />
                <Option value='torso/dress_female/tightdress_lightblue' label='Tight Dress Light Blue' />
                <Option value='torso/dress_female/tightdress_red' label='Tight Dress Red' />
                <Option value='torso/dress_female/tightdress_white' label='Tight Dress White' />
                <Option value='torso/dress_female/underdress' label='Under-dress' />
                <Option value='torso/robes_female_no_th-sh/black' label='Black Robes' />
                <Option value='torso/robes_female_no_th-sh/blue' label='Blue Robes' />
                <Option value='torso/robes_female_no_th-sh/brown' label='Brown Robes' />
                <Option value='torso/robes_female_no_th-sh/dark brown' label='Dark Brown Robes' />
                <Option value='torso/robes_female_no_th-sh/dark gray' label='Grey Robes' />
                <Option value='torso/robes_female_no_th-sh/forest green' label='Forest Green Robes' />
                <Option value='torso/robes_female_no_th-sh/light gray' label='Light Grey Robes' />
                <Option value='torso/robes_female_no_th-sh/purple' label='Purple Robes' />
                <Option value='torso/robes_female_no_th-sh/red' label='Red Robes' />
                <Option value='torso/robes_female_no_th-sh/white' label='White Robes' />
                <Option value='formal/male/formal_male_no_th-sh/shirt' label='Formal' />
              </Select>
            </div>
            <div>
              <Select name='back' label='Back' value={values.back} onChange={onChange}>
                <Option value='none' label='None' />
                <Option value='torso/back/cape/normal/female/cape_black' label='Black Cape' />
                <Option value='torso/back/cape/normal/female/cape_blue' label='Blue Cape' />
                <Option value='torso/back/cape/normal/female/cape_brown' label='Brown Cape' />
                <Option value='torso/back/cape/normal/female/cape_gray' label='Grey Cape' />
                <Option value='torso/back/cape/normal/female/cape_green' label='Green Cape' />
                <Option value='torso/back/cape/normal/female/cape_lavender' label='Lavendar Cape' />
                <Option value='torso/back/cape/normal/female/cape_maroon' label='Maroon Cape' />
                <Option value='torso/back/cape/normal/female/cape_pink' label='Pink Cape' />
                <Option value='torso/back/cape/normal/female/cape_red' label='Red Cape' />
                <Option value='torso/back/cape/normal/female/cape_white' label='White Cape' />
                <Option value='torso/back/cape/normal/female/cape_yellow' label='Yellow Cape' />
                <Option value='torso/back/cape/tattered/female/tattercape_black' label='Black Tattered Cape' />
                <Option value='torso/back/cape/tattered/female/tattercape_blue' label='Blue Tattered Cape' />
                <Option value='torso/back/cape/tattered/female/tattercape_brown' label='Brown Tattered Cape' />
                <Option value='torso/back/cape/tattered/female/tattercape_gray' label='Grey Tattered Cape' />
                <Option value='torso/back/cape/tattered/female/tattercape_green' label='Green Tattered Cape' />
                <Option value='torso/back/cape/tattered/female/tattercape_maroon' label='Maroon Tattered Cape' />
                <Option value='torso/back/cape/tattered/female/tattercape_pink' label='Pink Tattered Cape' />
                <Option value='torso/back/cape/tattered/female/tattercape_red' label='Red Tattered Cape' />
                <Option value='torso/back/cape/tattered/female/tattercape_white' label='White Tattered Cape' />
                <Option value='torso/back/cape/tattered/female/tattercape_yellow' label='Yellow Tattered Cape' />
                <Option value='torso/back/cape/trimmed/female/trimcape_whiteblue' label='White / Blue Trim Cape' />
                <Option value='torso/back/wings/wings_no_th-sh' label='Wings' />
              </Select>
            </div>
            <div>
              <Select name='belt' label='Belt' value={values.belt} onChange={onChange}>
                <Option value='none' label='None' />
                <Option value='belt/buckles_female_no_th-sh/bronze' label='Bronze' />
                <Option value='belt/buckles_female_no_th-sh/gold' label='Gold' />
                <Option value='belt/buckles_female_no_th-sh/iron' label='Iron' />
                <Option value='belt/buckles_female_no_th-sh/silver' label='Silver' />
                <Option value='belt/cloth/female/black_female_no_th-sh' label='Black Cloth' />
                <Option value='belt/cloth/female/brown_female_no_th-sh' label='Brown Cloth' />
                <Option value='belt/cloth/female/teal2_cloth_female' label='Teal Cloth' />
                <Option value='belt/cloth/GENDER/white_cloth_GENDER' label='White Cloth' />
                <Option value='belt/leather/GENDER/leather_GENDER' label='Leather' />
              </Select>
            </div>
          </article>

          <h3>Lower</h3>
          <article>
            <div>
              <Select name='legs' label='Legs' value={values.legs} onChange={onChange}>
                <Option value='none' label='None' />
                <Option value='legs/armor/GENDER/golden_greaves_GENDER' label='Golden Greaves' />
                <Option value='legs/armor/GENDER/metal_pants_GENDER' label='Metal' />
                <Option value='legs/pants/GENDER/magenta_pants_GENDER' label='Magenta' />
                <Option value='legs/pants/GENDER/white_pants_GENDER' label='White' />
                <Option value='legs/pants/GENDER/red_pants_GENDER' label='Red' />
                <Option value='legs/pants/GENDER/teal_pants_GENDER' label='Teal' />
                <Option value='legs/skirt/male/robe_skirt_male' label='Robe / Skirt' />
                <Option value='formal/male/formal_male_no_th-sh/pants' label='Formal' />
              </Select>
            </div>

            <div>
              <Select name='shoes' label='Footwear' value={values.shoes} onChange={onChange}>
                <Option value='barefoot' label='Barefoot' />
                <Option value='feet/armor/GENDER/golden_boots_GENDER' label='Golden Boots' />
                <Option value='feet/armor/GENDER/metal_boots_GENDER' label='Metal Boots' />
                <Option value='feet/boots/female/brown_longboots_female' label='Brown Long Boots' />
                <Option value='feet/boots/female/maroon_longboots_female' label='Maroon Long Boots' />
                <Option value='feet/ghillies_female_no_th-sh' label='Ghillies' />
                <Option value='feet/shoes/GENDER/black_shoes_GENDER' label='Black Shoes' />
                <Option value='feet/shoes/GENDER/brown_shoes_GENDER' label='Brown Shoes' />
                <Option value='feet/shoes/GENDER/maroon_shoes_GENDER' label='Maroon Shoes' />
                <Option value='feet/slippers_female/black' label='Black Slippers' />
                <Option value='feet/slippers_female/brown' label='Brown Slippers' />
                <Option value='feet/slippers_female/gray' label='Grey Slippers' />
                <Option value='feet/slippers_female/white' label='White Slippers' />
              </Select>
            </div>
          </article>
        </form>
      </main>
    </Fragment>
  )
}
