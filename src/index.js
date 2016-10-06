import loadGoogleMapsAPI from 'load-google-maps-api'

function plugin (Vue, {
  libraries = [ 'places' ],
  key,
  client,
  version = '3.26'
} = {}) {
  if (plugin.installed) {
    return
  }

  Vue.directive('gmaps-searchbox', {
    inserted: function (el, binding) {
      const propertyToSet = binding.arg ? binding.arg : 'place'
      ensureGoogleMaps(() => {
        var searchBox = new Vue.gmaps.places.SearchBox(el)
        searchBox.addListener('places_changed', function () {
          var places = searchBox.getPlaces()
          if (places.length === 0) {
            return
          }

          let place = {}
          let originalPlace = places[ 0 ]
          var keys = Object.keys(binding.modifiers)
          if (keys.length > 0) {
            keys.forEach(function (key) {
              place[ key ] = originalPlace[ key ]
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
            get () {
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

plugin.version = '0.0.4'

export default plugin

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin)
}
