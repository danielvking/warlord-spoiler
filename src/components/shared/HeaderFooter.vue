<template>
  <b-container class="site-container">
    <b-row class="site-header d-flex">
      <div class="site-header-margin">
        <div class="p-2 h-100">
          <b-dropdown variant="outline-light" class="h-100" toggle-class="border-0 px-2" no-caret>
            <template #button-content>
              <font-awesome-icon icon="bars" />
            </template>
            <b-dropdown-item to="/">Home</b-dropdown-item>
            <b-dropdown-item to="/build-card">Card Builder</b-dropdown-item>
          </b-dropdown>
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