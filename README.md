# Vue-Gmaps
> Search address and places using Google Maps API

[![Travis](https://img.shields.io/travis/Ridermansb/vue-gmaps.svg?maxAge=2592000?style=flat-square)](https://travis-ci.org/Ridermansb/vue-gmaps) [![npm](https://img.shields.io/npm/v/vue-gmaps.svg?maxAge=2592000?style=flat-square)](https://www.npmjs.com/package/vue-gmaps)
[![npm](https://img.shields.io/npm/dm/vue-gmaps.svg?maxAge=2592000?style=flat-square)](https://www.npmjs.com/package/vue-gmaps)
[![bitHound](https://img.shields.io/bithound/dependencies/github/ridermansb/vue-gmaps.svg?maxAge=2592000?style=flat-square)](https://www.bithound.io/github/Ridermansb/vue-gmaps) [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square)](https://github.com/semantic-release/semantic-release) [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)    

[![NPM](https://nodei.co/npm/vue-gmaps.png?downloads=true&compact=true)](https://nodei.co/npm/vue-gmaps/)

## Installation

```bash
npm i -S vue-gmaps
```

And in your `main.js` ...

```javascript
// main.js
import VueGmaps from 'vue-gmaps'
Vue.use(VueGmaps)
```
## Basic usage

Add the directive `v-gmaps-searchbox` into your input

```html
<input v-model=vm.searchPlace v-gmaps-searchbox=vm>
```

## Features

### Specify property

```html
<input v-gmaps-searchbox:myProperty=vm>
```

### Specify whats fields

```html
<input v-gmaps-searchbox:myProperty.setThisField.andThis.andThisToo=vm>
```

So your `vm` will set property `myProperty` like this

```json
{
    myProperty: {
        setThisField: <value_from_result>,
        andThis: <value_from_result>,
        andThisToo: <value_from_result>
    }
}
```
