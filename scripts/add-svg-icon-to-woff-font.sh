#!/usr/bin/python

# Add icon from svg file to woff font

# Prerequisites (Ubuntu 18):
#     sudo apt install -y fontforge python-fontforge
# 
# Possible command to execute (with installed fontforge using WSL):
# fontforge -lang=py -script ./add-svg-icon-to-woff-font.sh
# 
# Fontforge docs:
#     https://fontforge.org/docs/scripting/python/fontforge.html#glyph

import fontforge
import os.path
from shutil import copyfile

newSVG1 = './_E010-new-icon.svg' # Path to new svg icon

woff       = '../public/static/fonts/iconsfont.woff'
woffOrig   = './iconsfont-orig.woff' # Remove this file before adding each new icon if need to add several icons
resultWoff = woff


if not os.path.isfile(woffOrig):
    copyfile(woff, woffOrig)

font = fontforge.open(woffOrig) # open original

glyph1 = font.createChar(0xE010, 'new-icon') # create (or find existing) character at unicode codepoint (and name it). Rename and increment code to add new, or use existing code to replace/rename icon
glyph1.importOutlines(newSVG1) # new icon file

font.generate(resultWoff, flags=['glyph-map-file']) # save result woff

# Save also test fonts for manual check using ../public/static/fonts/icon-font-extra/icons-reference.html
#font.generate('../test/fonts/untitled-font-1.svg')
#font.generate('../test/fonts/untitled-font-1.eot')
#font.generate('../test/fonts/untitled-font-1.ttf')
#font.generate('../test/fonts/untitled-font-1.woff')
print('Done')
# Also manually add new icon descriptions/codes/names to files:
# ../src/styles/_icons.scss
# ../test/fonts/styles.css (for testing)
# ../test/fonts/icons-reference.html (for testing, in 2 places here)
