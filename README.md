Search places using Google Maps API in Vue.js

## Installation

    npm i -S vue-gmaps

And in your `main.js` ...

    // main.js
    import VueGmaps from 'vue-gmaps'
    Vue.use(VueGmaps)
    
## Basic usage

Add the directive `v-gmaps-searchbox` into your input

    <input v-model=vm.searchPlace v-gmaps-searchbox=vm>
    

## Features

### Specify property 

    <input v-gmaps-searchbox:myProperty=vm>
    
### Specify whats fields

    <input v-gmaps-searchbox:myProperty.setThisField.andThis.andThisToo=vm>

So your `vm` will set property `myProperty` like this

    {
        myProperty: {
            setThisField: <value_from_result>,
            andThis: <value_from_result>,
            andThisToo: <value_from_result>
        }
    }
    