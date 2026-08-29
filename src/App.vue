<template>
  <div id="app">
    <!-- Background -->
    <div ref="backgroundAnchor" id="backgroundAnchor"></div>

    <!-- Sidebar -->
    <b-sidebar v-model="showSidebar" id="sidebar" text-variant="light" bg-variant="dark" backdrop lazy>
      <template #title>
        <img class="site-logo pr-3" src="/images/TheAccordlands_Text_2.svg" aria-label="The Accordlands"/>
      </template>
      <div>
        <template v-for="(link, i) in computedLinks">
          <template v-if="link.isHeader">
            <hr class="m-2 border-light" :key="i + '_hr'"/>
            <h3 class="mx-3 my-0" :key="i">{{ link.display }}</h3>
          </template>
          <b-button
            v-else
            :key="i"
            class="text-left border-0 rounded-0 my-1 px-4 py-1"
            block
            variant="outline-light"
            :to="link.to"
            :href="link.href"
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
import PageNotFound from "./components/PageNotFound.vue";
import lzString from "lz-string";

export default {
  components: { PageNotFound },
  data() {
    return {
      showSidebar: false,
      links: [
        { display: "Home", to: "/" },
        { display: "Card Builder", to: "/build-card" },
        { display: "This Page", isHeader: true },
        { display: "Resources", isHeader: true },
        { display: "Warlord: Saga of the Storm", href: "https://www.warlordsots.com/" },
      ],
    };
  },
  computed: {
    computedLinks() {
      let links = this.links.slice();
      let thisPageIndex = links.findIndex(x => x.display === "This Page" && x.isHeader);
      if (this.localRoutes.length > 0) {
        links.splice(thisPageIndex + 1, 0, ...this.localRoutes);
      } else {
        links.splice(thisPageIndex, 1);
      }
      return links;
    },
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
    this.watchForHover();

    this.$router.afterEach((to, from) => {
      if (to.path !== from.path) {
        this.$store.commit("setShow404", false);
        this.$store.commit("setLocalRoutes", []);
      }
    })

    if (this.$route.query.deck) {
      this.loadDeckFromUrl();
      this.showSidebar = true;
    }
  },
  methods: {
    loadDeckFromUrl() {
      this.$store.commit("clearDeck");
      let deckString = this.$route.query.deck;
      let deck = lzString.decompressFromEncodedURIComponent(deckString);
      let parsedDeck = JSON.parse(deck);

      Object.entries(parsedDeck).forEach(([cardName, count]) => {
        while (count--) {
          this.$store.commit("incrementCardToDeck", cardName);
        }
      });

      this.$router.replace({ query: null });
    },
    fixBackgroundHeight() {
      // Because CSS doesn't play well with all the crazy of mobile viewports...
      let height = 0;
      if (this.$store.state.viewPortWidth < 576) {
        height = this.$store.state.screenHeight;
      }
      this.$refs.backgroundAnchor.style.height = `max(100vh, ${height}px)`;
    },
    watchForHover() {
      // lastTouchTime is used for ignoring emulated mousemove events
      let lastTouchTime = 0

      let enableHover = () => {
        if (new Date() - lastTouchTime < 500) return
        document.body.classList.add('hasHover')
        this.$store.commit("setHasHover", true)
      }

      let disableHover = () => {
        document.body.classList.remove('hasHover')
        this.$store.commit("setHasHover", false)
      }

      let updateLastTouchTime = () => {
        lastTouchTime = new Date()
      }

      document.addEventListener('touchstart', updateLastTouchTime, true)
      document.addEventListener('touchstart', disableHover, true)
      document.addEventListener('mousemove', enableHover, true)

      enableHover()
    }
  }
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
  background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(/images/AccordlandsMap.jpg);
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
  font-weight: bold;
  font-family: "mezz-std", "Georgia", "serif";
}

.shrink {
  white-space: nowrap;
  width: 1px;
}

.site-logo {
  max-width: 100%;
  max-height: 100%;
}
</style>
