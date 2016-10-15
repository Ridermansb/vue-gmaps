<template xmlns:v-gmaps-searchbox="http://www.w3.org/1999/xhtml">
    <div id="app">
        <img src="./assets/logo.png">
        <h1>{{ msg }}</h1>
        <input v-model=vm.searchPlace v-gmaps-searchbox:location=vm>
        <pre>{{ vm | json }}</pre>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                msg: 'Hello Vue Maps!',
                vm: {
                    searchPlace: '',
                    location: {}

                }
            }
        },

    }
</script>

<style>
    body {
        font-family: Helvetica, sans-serif;
    }
</style>
