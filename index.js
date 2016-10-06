var loadGoogleMapsAPI = require('load-google-maps-api')

function plugin (Vue, {
  libraries = [ 'places' ]
  , key
  , client
  , version = '3.26'
} = {}) {

  if (plugin.installed) {
    return
  }

  Vue.directive('gmaps-searchbox', {
    inserted: function (el, binding) {
      let propertyToSet = binding.arg ? binding.arg : 'place'
      ensureGoogleMaps(() => {
        var searchBox = new Vue.gmaps.places.SearchBox(el)
        searchBox.addListener('places_changed', function () {
          var places = searchBox.getPlaces()
          if (places.length == 0) {
            return
          }

          let place = {}
          let originalPlace = places[0]
          var keys = Object.keys(binding.modifiers)
          if (keys.length > 0) {
            keys.forEach(function (key) {
              place[key] = originalPlace[key]
            })
          } else {
            place = originalPlace
          }

          Vue.set(binding.value, propertyToSet, place)
        })
      })
    }
  })

  function ensureGoogleMaps (fn) {
    if (Vue.gmaps) {
      fn.apply(this, Array.prototype.slice.call(arguments, 1))
    } else {
      /*
       var mapLoader = require('google-maps-api')
       mapLoader(key, libraries, function (maps) {
       console.log('map loaded', maps)
       //the google.maps object will now have the places api (google.maps.places)
       Vue.gmaps = maps
       Object.defineProperties(Vue.prototype, {
       $gmaps: {
       get() {
       console.log('get. ', this)
       return Vue.gmaps
       }
       }
       })
       fn.apply(this, Array.prototype.slice.call(arguments, 1))
       })
       */

      loadGoogleMapsAPI({
        key: key, client: client, libraries: libraries, v: version
      }).then(google => {
        Vue.gmaps = google
        Object.defineProperties(Vue.prototype, {
          $gmaps: {
            get() {
              console.log('get. ', this)
              return Vue.gmaps
            }
          }
        })
        fn.apply(this, Array.prototype.slice.call(arguments, 1))
      })
    }
  }
}

plugin.version = '0.0.1'

export default plugin

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin)
}
