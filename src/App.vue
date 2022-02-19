<template>
  <div id="app">
    <div id="scrollRegion">
      <router-view />
    </div>
  </div>
</template>

<style>
#app {
  height: 100vh;

  background-color: rgb(96, 87, 82);
  background: url(/images/AccordlandsMap.jpg);
  background-repeat: no-repeat;
  background-position: bottom center;
  background-size: cover;
  background-attachment: fixed;
}

#scrollRegion {
  overflow-y: scroll;
  height: 100%;
}

@font-face {
  font-family: "Vhatis Warlord Text";
  src: url(/fonts/vhatis_warlord_text.ttf) format("truetype");
  unicode-range: U+20-22,U+27-29,U+2B-3B,U+3D,U+41-5A,U+61-7F;
  fallback: "Georgia";
}

@font-face {
  font-family: "Vhatis Warlord Title";
  src: url(/fonts/vhatis_warlord_title.ttf) format("truetype");
  unicode-range: U+20-22,U+27-29,U+2B-3B,U+3D,U+41-5A,U+61-7F;
}

#app {
  font-family: "Vhatis Warlord Text", "Georgia", "serif";
}

h1, h2, h3, h4, h5, h6 {
  font-family: "Vhatis Warlord Title", "Georgia", "serif";
}

.shrink {
  white-space: nowrap;
  width: 1px;
}
</style>
