<template>
  <div id="app">
    <div>
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

#app > div {
  overflow-y: scroll;
  height: 100%;
}

@font-face {
  font-family: "Vhatis Warlord Text";
  src: url(/fonts/vhatis_warlord_text.ttf) format("truetype");
}

@font-face {
  font-family: "Vhatis Warlord Title";
  src: url(/fonts/vhatis_warlord_title.ttf) format("truetype");
}

#app {
  font-family: "Vhatis Warlord Text";
}

h1, h2, h3, h4, h5, h6 {
  font-family: "Vhatis Warlord Title";
}
</style>
