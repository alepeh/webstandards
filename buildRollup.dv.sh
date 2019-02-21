#!/bin/sh
rm -rf dist
mkdir dist
cp src/*.html dist/
cp src/*.css dist/
rollup -c -w