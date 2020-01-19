<template>
  <div id="app">
    <CardSpoiler/>
  </div>
</template>

<script>
import CardSpoiler from './components/CardSpoiler.vue'

export default {
  name: 'app',
  components: {
    CardSpoiler
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100vw;
  height: 100vh;
}
</style>
