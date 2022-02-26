<template>
  <b-container class="site-container">
    <b-row class="site-header d-flex" :class="$store.state.localRoutes[0] ? 'position-sticky' : ''">
      <div class="site-header-margin">
        <div class="p-2 h-100">
          <b-button variant="outline-light" class="h-100 border-0 px-2" v-b-toggle.sidebar>
            <font-awesome-icon icon="bars" />
          </b-button>
        </div>
      </div>
      <h1>The Accordlands</h1>
      <div class="site-header-margin"></div>
    </b-row>
    <b-row class="flex-grow-1 content-region">
      <div class="w-100">
        <slot />
      </div>
    </b-row>
    <b-row class="site-footer">
      <a class="my-1 mx-3 text-muted" href="https://github.com/danielvking/warlord-spoiler" target="_blank"
        >View on GitHub</a
      >
    </b-row>
  </b-container>
</template>

<style>
.site-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  max-width: 768px;
}

.site-header,
.site-footer,
.site-subheader {
  background-color: #191919;
}

.site-header,
.site-subheader {
  color: white;
}

.site-header {
  text-align: center;
}

.position-sticky {
  position: sticky;
  top: 0;
}

.site-header h1 {
  margin: 5px;
  display: inline;
}

.site-header .site-header-margin {
  flex-basis: 0;
  flex-grow: 1;
  text-align: left;
}

.site-subheader h6 {
  width: 100%;
  margin: 3px;
  text-align: center;
}
</style>