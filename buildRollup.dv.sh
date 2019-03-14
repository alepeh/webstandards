#!/bin/sh
rm -rf dist
mkdir dist
cp src/*.html dist/
cp src/*.css dist/
echo "{
    \"apikey\":\"102b21cf9053fdb257271d6e890117653adcf08ed1663f18f400d39b94f76a64\",
     \"apiurl\":\"https://api.alexanderpehm.at/api/v2\"
}" > dist/config
rollup -c -w