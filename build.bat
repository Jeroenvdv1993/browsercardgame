tsc -p ts/tsconfig.json && browserify ts/home.js -o js/home.js && minify js/home.js > js/home.min.js