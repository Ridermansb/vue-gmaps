var loadGoogleMapsAPI = require('load-google-maps-api')

function plugin (Vue, options) {

  if (plugin.installed) {
    return
  }

  var libraries = options && options.libraries ? options.libraries : [ 'places' ]
  var key = options && options.key ? options.key :  ''
  var client = options && options.client ? options.client :  ''
  var version = options && options.version ? options.version :  '3.26'

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

plugin.version = '0.0.3'

export default plugin

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin)
}
