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
      <div class="site-header-middle">
        <router-link to="/">
          <img class="site-logo" src="/images/TheAccordlands_Text_2.svg" aria-label="The Accordlands" />
        </router-link>
      </div>
      <div class="site-header-margin">
        <div class="site-header-margin-fixed p-2">
          <slot name="fixedToolbar" />
        </div>
      </div>
    </b-row>
    <b-row class="flex-grow-1 content-region">
      <div class="w-100">
        <slot />
      </div>
    </b-row>
    <b-row class="site-footer d-block">
      <div class="my-1 text-muted text-center">
        © Kingswood Games {{ new Date().getFullYear() }}
      </div>
      <div class="my-1 text-muted text-center">
        <a class="text-muted" href="/static/privacy_policy.html" target="_blank">Privacy Policy</a> •
        <a class="text-muted" href="/static/cookie_policy.html" target="_blank">Cookie Policy</a> 
      </div>
    </b-row>
  </b-container>
</template>

<style>
.site-container {
  flex: 1;
  display: flex;
  flex-direction: column;
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
  height: 50px;
}

.position-sticky {
  position: sticky;
  top: 0;
}

.site-header .site-header-middle {
  flex-basis: 0;
  flex-grow: 1;
  height: 100%;
  padding: 0.75rem;
}

.site-header .site-header-margin {
  flex-basis: 50px;
  flex-grow: 0;
  text-align: center;
}

.site-header .site-header-margin .site-header-margin-fixed {
  top: 0;
  position: fixed;
  height: 50px;
  width: 50px;
  z-index: 1000;
}

.site-subheader h3 {
  width: 100%;
  margin: 0;
  text-align: center;
}
</style>