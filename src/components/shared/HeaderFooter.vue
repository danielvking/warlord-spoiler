<template>
  <b-container class="site-container">
    <div class="site-header d-flex" :class="$store.state.localRoutes[0] ? 'position-sticky' : ''">
      <div class="site-header-margin">
        <div class="p-2 h-100">
          <b-button variant="outline-light" class="h-100 border-0 px-2" v-b-toggle.sidebar>
            <font-awesome-icon icon="bars" />
          </b-button>
        </div>
      </div>
      <div class="site-header-middle">
        <router-link to="/">
          <img class="site-logo" src="/images/TheAccordlands_Text_2.svg" aria-label="The Accordlands"/>
        </router-link>
      </div>
      <div class="site-header-margin">
        <div class="site-header-margin-fixed p-2">
          <slot name="fixedToolbar"/>
        </div>
      </div>
    </div>
    <div class="flex-grow-1 content-region">
      <div class="w-100">
        <slot />
      </div>
    </div>
    <div class="site-footer d-block">
      <div class="my-1 text-muted text-center">© Kingswood Games {{ new Date().getFullYear() }}</div>
    </div>
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

/* These span the full container width, cancelling its horizontal padding.
   Scoped to this component's own children, because .content-region is also
   used by panels that sit outside the container and have no padding to
   cancel. */
.site-container > .site-header,
.site-container > .site-footer,
.site-container > .content-region {
  margin-left: -15px;
  margin-right: -15px;
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
  padding: .75rem;
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

/* The close button reads as centred only when its gap is equal on all four
   sides, so the header pads it rather than the button padding itself. */
.site-subheader {
  padding-right: 5px;
}
</style>