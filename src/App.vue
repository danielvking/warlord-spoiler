<template>
  <div id="app">
    <!-- Background -->
    <div ref="backgroundAnchor" id="backgroundAnchor"></div>

    <!-- Sidebar -->
    <b-sidebar v-model="showSidebar" id="sidebar" text-variant="light" bg-variant="dark" backdrop lazy>
      <template #title>
        <h3 class="m-0">The Accordlands</h3>
      </template>
      <div>
        <b-button
          v-for="link in links"
          :key="link.display"
          class="text-left border-0 rounded-0 my-1 px-4 py-1"
          block
          variant="outline-light"
          :to="link.to"
          @click="showSidebar = false"
          >{{ link.display }}</b-button
        >

        <template v-if="localRoutes[0]">
          <hr class="m-2 border-light" />
          <h4 class="mx-3 my-1">This Page</h4>

          <b-button
            v-for="link in localRoutes"
            :key="link.display"
            class="text-left border-0 rounded-0 my-1 px-4 py-1"
            block
            variant="outline-light"
            :to="link.to"
            @click="showSidebar = false"
            >{{ link.display }}</b-button
          >
        </template>
      </div>
    </b-sidebar>
    
    <!-- 404 -->
    <page-not-found v-if="show404"/>

    <!-- View -->
    <router-view v-else/>
  </div>
</template>

<script>
import PageNotFound from "@/components/PageNotFound.vue";

export default {
  components: { PageNotFound },
  data() {
    return {
      showSidebar: false,
      links: [
        { display: "Home", to: "/" },
        { display: "Card Builder", to: "/build-card" },
      ],
    };
  },
  computed: {
    show404() {
      return this.$store.state.show404;
    },
    localRoutes() {
      return this.$store.state.localRoutes;
    },
  },
  watch: {
    "$store.state.screenHeight"() {
      this.fixBackgroundHeight();
    },
  },
  mounted() {
    this.fixBackgroundHeight();

    this.$router.afterEach((to, from) => {
      if (to.path !== from.path) {
        this.$store.commit("setShow404", false);
        this.$store.commit("setLocalRoutes", []);
      }
    })
  },
  methods: {
    fixBackgroundHeight() {
      // Because CSS doesn't play well with all the crazy of mobile viewports...
      let height = 0;
      if (this.$store.state.viewPortWidth < 576) {
        height = this.$store.state.screenHeight;
      }
      this.$refs.backgroundAnchor.style.height = `max(100vh, ${height}px)`;
    },
  },
};
</script>

<style>
@font-face {
  font-family: "Vhatis Warlord Text";
  src: url(/fonts/vhatis_warlord_text.ttf) format("truetype");
  unicode-range: U+20-22, U+27-29, U+2B-3B, U+3D, U+3F, U+41-5A, U+61-7A, U+AD, U+2019, U+201C-201D, U+2022;
  fallback: "Georgia";
}

@font-face {
  font-family: "Vhatis Warlord Title";
  src: url(/fonts/vhatis_warlord_title.ttf) format("truetype");
  unicode-range: U+20-22, U+27-29, U+2B-3B, U+3D, U+41-5A, U+61-7A, U+AD, U+2018-2019, U+201C-201D;
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
  max-width: 100vw;
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
