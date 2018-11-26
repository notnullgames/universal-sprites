#!/usr/bin/env node

/**
 * This is the script I run to copy everything into place and run all the other scripts
 * You shouldn't need to run it yourself
 */

const { cp, cd, exec, mkdir, rm } = require('shelljs')

cd(`${__dirname}/..`)

rm('-rf', 'src/images', 'src/palettes')

mkdir('-p', 'src/palettes')
mkdir('-p', 'src/images/formal/male')
mkdir('-p', 'src/images/body/male')
mkdir('-p', 'src/images/body/female')
mkdir('-p', 'src/images/hair/female')
mkdir('-p', 'src/images/hair/male')
mkdir('-p', 'src/images/facial/female')
mkdir('-p', 'src/images/facial/male')

cp('-R', 'Universal-LPC-spritesheet/accessories', 'src/images/accessories')
cp('-R', 'Universal-LPC-spritesheet/behind_body', 'src/images/behind_body')
cp('-R', 'Universal-LPC-spritesheet/belt', 'src/images/belt')
cp('-R', 'Universal-LPC-spritesheet/feet', 'src/images/feet')
cp('-R', 'Universal-LPC-spritesheet/formal_male_no_th-sh', 'src/images/formal/male')
cp('-R', 'Universal-LPC-spritesheet/hands', 'src/images/hands')
cp('-R', 'Universal-LPC-spritesheet/head', 'src/images/head')
cp('-R', 'Universal-LPC-spritesheet/legs', 'src/images/legs')
cp('-R', 'Universal-LPC-spritesheet/torso', 'src/images/torso')
cp('-R', 'Universal-LPC-spritesheet/weapons', 'src/images/weapons')

cp('Universal-LPC-spritesheet/body/male/skeleton.png', 'src/images/body/male/skeleton.png')
cp('Universal-LPC-spritesheet/body/male/light.png', 'src/images/body/male/human.png')
cp('Universal-LPC-spritesheet/body/female/light.png', 'src/images/body/female/human.png')

cp('Universal-LPC-spritesheet/hair/male/*.png', 'src/images/hair/male')
cp('Universal-LPC-spritesheet/hair/female/*.png', 'src/images/hair/female')
cp('Universal-LPC-spritesheet/facial/male/*.png', 'src/images/facial/male')
cp('Universal-LPC-spritesheet/facial/female/*.png', 'src/images/facial/female')

rm('src⁩/images⁩/formal⁩/male⁩/⁨formal_male_no_th-sh⁩/vest_w_shirt_cutout.png')

exec('node tools/get_palettes')
exec('node tools/get_sprites')
