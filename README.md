# Cartridge Sass
[![Build Status](https://img.shields.io/travis/cartridge/cartridge-sass.svg?branch=master&style=flat-square)](https://travis-ci.org/cartridge/cartridge-sass)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=flat-square)](http://commitizen.github.io/cz-cli/)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square)](https://github.com/semantic-release/semantic-release)

[![Dependency Status](https://david-dm.org/cartridge/cartridge-sass.svg?style=flat-square)](https://david-dm.org/cartridge/cartridge-sass/caribou)
[![devDependency Status](https://david-dm.org/cartridge/cartridge-sass/dev-status.svg?style=flat-square)](https://david-dm.org/cartridge/cartridge-sass/caribou#info=devDependencies)

**If you are using this module on windows, it is recommend to use the [cartridge-sass-legacy](https://github.com/cartridge/cartridge-sass-legacy) module instead to maximise comptability.**

> Sass expansion pack for [Cartridge](https://github.com/cartridge/cartridge)

To use this module, you will need [cartridge-cli](https://github.com/cartridge/cartridge-cli) installed and have a cartridge project setup.

```sh
npm install cartridge-sass --save-dev
```

This module adds the following to a project:

* Sass compilation using [gulp-sass](https://github.com/dlmanning/gulp-sass)
* Source map generation using [gulp-sourcemaps](https://github.com/floridoo/gulp-sourcemaps) (`local only`)
* Sass import file creation using [gulp-sass-generate-contents](https://github.com/andrewbrandwood/gulp-sass-generate-contents)
* CSS manipulation using [gulp-postcss](https://github.com/postcss/gulp-postcss)
* Automatic CSS vender prefixes using [autoprefixer](https://github.com/postcss/autoprefixer)
* Media query merging using [css-mqpacker](https://github.com/hail2u/node-css-mqpacker)
* CSS minification using [cssnano](https://github.com/ben-eb/cssnano) (`prod only`)
* Conversion of pixels to rems using [postcss-pxtorem](https://github.com/cuth/postcss-pxtorem)

## Config

Once installed, the config file `task.sass.js` is created and stored in the `_config` directory in the root of your cartridge project.

## Usage

The [FrontEnd CSS guidelines](https://github.com/code-computerlove/frontend-guidelines/blob/master/FE-guidelines-CSS.md) are a good place to start when beginning your project

* * *

## Development
### Commit message standards
Try and adhere as closely as possible to the [Angular commit messages guidelines](https://github.com/angular/angular.js/blob/master/CONTRIBUTING.md#-git-commit-guidelines).

[Commitizen](https://github.com/commitizen/cz-cli) is a command line tool which can help with this:
```sh
npm install -g commitizen
```
Now, simply use `git cz` instead of `git commit` when committing.
