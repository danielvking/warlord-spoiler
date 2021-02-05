<template>
  <b-container class="site-container">
    <b-row class="site-header">
      <h1>The Accordlands</h1>
    </b-row>
    <b-row class="flex-grow-1 content-region">
      <div class="w-100">
        <slot/>
      </div>
    </b-row>
    <b-row class="site-footer">
      <a class="my-1 mx-3 text-muted" href="https://github.com/danielvking/warlord-spoiler" target="_blank">View on GitHub</a>
    </b-row>
  </b-container>
</template>

<style scoped>
.site-container {
  display: flex;
  flex-direction: column;
  max-width: 768px;
  min-height: 100vh;
}

.site-header, .site-footer {
  background-color: #191919;
}

.site-header {
  color: white;
}

.site-header h1 {
  width: 100%;
  margin: 5px;
  text-align: center;
}

.content-region {
  background-color: rgba(255, 255, 255, 0.8);
}
</style>