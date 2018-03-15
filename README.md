# Vue-Gmaps
> Search address and places using Google Maps API

[Buy me a cofffe][1] please :)

https://buymeacoff.ee/ridermansb

[![Travis](https://img.shields.io/travis/Ridermansb/vue-gmaps.svg?maxAge=2592000?style=flat-square)](https://travis-ci.org/Ridermansb/vue-gmaps)
[![bitHound](https://img.shields.io/bithound/dependencies/github/ridermansb/vue-gmaps.svg?maxAge=2592000?style=flat-square)](https://www.bithound.io/github/Ridermansb/vue-gmaps) [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square)](https://github.com/semantic-release/semantic-release) [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)    

[![NPM](https://nodei.co/npm/vue-gmaps.png?downloads=true&stars=true)](https://nodei.co/npm/vue-gmaps?downloads=true&stars=true)

![Demo](https://github.com/Ridermansb/vue-gmaps/blob/master/vue-gmaps.gif)

## Installation

```bash
npm i -S vue-gmaps
```

And in your `main.js` ...

```javascript
// main.js
import VueGmaps from 'vue-gmaps'
Vue.use(VueGmaps, {
  key: '<your api here>'
})
```

Options are:

* **key** <Required!>,
* **libraries** <Default= [ 'places' ]>,
* **client**
* **version** <Default='3'>,
* **loadGoogleApi** <Default=true>


libraries: ['places'],
  version: '3'****


## Basic usage

Add the directive `v-gmaps-searchbox` into your input

```html
<input v-model=vm.searchPlace v-gmaps-searchbox=vm>
```

This will popule your `vm.place` object with details about selected place.

## Features

### Specify property

By default, `vm.place` is used, you can change this passing an argument to directive e.g `:anotherProperty`

```html
<input v-gmaps-searchbox:myProperty=vm>
```

So `vm.myProperty` will be filled with details about selected place

### Specify whats fields

All information about place is put is filled, to determinate whats fields should be use, you can specify a modifiers like this `.name.website.formatted_address.geometry`

```html
<input v-gmaps-searchbox:myProperty.name.website.formatted_address.geometry=vm>
```

So your `vm` will set property `myProperty` like this

```javascript
{
    myProperty: {
        name: <value_from_result>,
        website: <value_from_result>,
        formatted_address: <value_from_result>,
        geometry: <value_from_result>,
    }
}
```

[1]: https://buymeacoff.ee/ridermansb
