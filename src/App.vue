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

  background: url(/images/AccordlandsMap.jpg);
  background-size: cover;
  background-position: bottom;
  background-attachment: fixed;
}

@font-face {
  font-family: "Vhatis Warlord Text";
  src: url(/fonts/vhatis%20warlord%20text.ttf) format("truetype");
}

@font-face {
  font-family: "Vhatis Warlord Title";
  src: url(/fonts/vhatis%20warlord%20title.ttf) format("truetype");
}
</style>
