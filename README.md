This will eventually be a javascript-based version of tools and an editor, sort of like [Universal-LPC-Spritesheet-Character-Generator](http://gaurav.munjal.us/Universal-LPC-Spritesheet-Character-Generator/).

## source images

For colors, I have provided some default palettes, but you can change them to anything. I use a base-palette, then modify based on color-index.

It uses assets from [Universal-LPC-spritesheet](https://github.com/jrconway3/Universal-LPC-spritesheet). I seperated them a bit different, so everything can be mixed & matched easier. I also wanted things to be more gender-neutral, so all the characters could wear all the clothes and stuff.

I wrote scripts (that you don't need to run) in `tools/` to convert the [Universal-LPC-spritesheet](https://github.com/jrconway3/Universal-LPC-spritesheet) stuff into a bunch of full spritesheets for all the different permutations, seperated into parts, and turn palletes into JSON.

I also included generators for other things, like turning base hair into full-spritesheet of hair.

For now, this is a work-in-progress, but I hope that eventually a user can set custom skin-color, set head-shape, set stout/voluptuos, and have all accessories and stuff fit.
