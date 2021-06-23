#!/bin/bash

# https://stackoverflow.com/a/677212
if ! command -v svn &>/dev/null; then
    echo "'snv' could not be found"
    exit 1
else
    echo "'svn' command found"
fi

# https://stackoverflow.com/a/59839
echo "'sources/' folder found"
if [ ! -d "sources/" ]; then
    echo "creating 'sources/' directory"
    mkdir "sources/"
fi

echo "'sources/iTerm2-Color-Schemes__trunk__alacritty/' folder found"
if [ ! -d "sources/iTerm2-Color-Schemes__trunk__alacritty/" ]; then
    echo "creating 'sources/iTerm2-Color-Schemes__trunk__alacritty/' directory"
    mkdir "sources/iTerm2-Color-Schemes__trunk__alacritty/"
fi

echo "'tmp/' folder found"
if [ ! -d "tmp/" ]; then
    echo "creating 'tmp/' directory"
    mkdir "tmp/"
fi

echo "collecting color plates from 'https://github.com/mbadolato/iTerm2-Color-Schemes/tree/master/alacritty'"
(cd "tmp/" && svn checkout https://github.com/mbadolato/iTerm2-Color-Schemes/trunk/alacritty/)
cp -r tmp/alacritty/* sources/iTerm2-Color-Schemes__trunk__alacritty

echo "deleting tmp directory"
rm -rf tmp
