<template>
  <b-container class="min-vh-100 d-flex flex-column">
    <b-row class="site-header">
      <h1>The Accordlands</h1>
    </b-row>
    <b-row class="flex-grow-1 content-region">
      <div class="w-100">
        <slot/>
      </div>
    </b-row>
    <b-row class="site-footer">
      <a class="my-1 mx-3 text-muted" href="https://github.com/danielvking/warlord-spoiler">View on GitHub</a>
    </b-row>
  </b-container>
</template>

<style scoped>
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