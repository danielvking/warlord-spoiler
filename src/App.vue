<template>
  <div id="app">
    <div ref="backgroundAnchor" id="backgroundAnchor"></div>
    <router-view />
  </div>
</template>

<script>
export default {
  watch: {
    '$store.state.screenHeight'() {
      this.fixBackgroundHeight();
    }
  },
  mounted() {
    this.fixBackgroundHeight()
  },
  methods: {
    fixBackgroundHeight() {
      // Because CSS doesn't play well with all the crazy of mobile viewports...
      let height = 0;
      if (this.$store.state.viewPortWidth < 576) {
        height = this.$store.state.screenHeight;
      }
      this.$refs.backgroundAnchor.style.height = `max(100vh, ${height}px)`;
    }
  }
}
</script>

<style>
@font-face {
  font-family: "Vhatis Warlord Text";
  src: url(/fonts/vhatis_warlord_text.ttf) format("truetype");
  unicode-range: U+20-22, U+27-29, U+2B-3B, U+3D, U+41-5A, U+61-7F;
  fallback: "Georgia";
}

@font-face {
  font-family: "Vhatis Warlord Title";
  src: url(/fonts/vhatis_warlord_title.ttf) format("truetype");
  unicode-range: U+20-22, U+27-29, U+2B-3B, U+3D, U+41-5A, U+61-7F;
}

body {
  display: grid;
  overflow-y: scroll;
  font-family: "Vhatis Warlord Text", "Georgia", "serif" !important;
}

body > * {
  grid-area: 1/1;
}

#backgroundAnchor {
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
  width: 100vw;
  height: 100vh;
  background-color: rgb(96, 87, 82);
  background: url(/images/AccordlandsMap.jpg);
  background-repeat: no-repeat;
  background-position: bottom center;
  background-size: cover;
}

@media (min-width: 576px) { 
  #backgroundAnchor {
    top: unset;
    bottom: 0;
  }
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.content-region {
  background-color: rgba(255, 255, 255, 0.8);
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: "Vhatis Warlord Title", "Georgia", "serif";
}

.shrink {
  white-space: nowrap;
  width: 1px;
}
</style>
