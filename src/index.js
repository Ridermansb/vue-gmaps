import loadGoogleMapsAPI from 'load-google-maps-api'

function plugin (Vue, {
  libraries = [ 'places' ],
  key,
  client,
  version = '3',
  loadGoogleApi = true
} = {}) {
  if (plugin.installed) {
    return
  }

  Vue.directive('gmaps-searchbox', {
    inserted: function (el, binding) {
      const propertyToSet = binding.arg ? binding.arg : 'place'
      ensureGoogleMaps((google) => {
        var searchBox = new google.places.SearchBox(el)
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
    if (!loadGoogleApi) {
      fn(window.google.maps ? window.google.maps : window.google)
    } else if (Vue.google) {
      fn(Vue.google)
    } else {
      loadGoogleMapsAPI({
        key: key, client: client, libraries: libraries, v: version
      }).then(google => {
        Vue.google = google
        Vue.prototype.$google = google
        fn(google)
      })
    }
  }
}

plugin.version = '0.0.9'

export default plugin

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin)
}
