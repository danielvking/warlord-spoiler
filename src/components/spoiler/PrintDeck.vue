<template>
  <div class="print-background content-region">
    <p class="pt-2 text-center dont-print">
      In Firefox you may need to set the page to landscape and/or open up the print preview manually.
    </p>
    <div v-for="group in groupedCardIndices" :key="'G' + group[0]" class="outer-group">
      <div class="inner-group clearfix">
        <div v-for="i in group" :key="i" class="image-container">
          <img :id="'img' + i" :src="cardImages[i].image" @load="cardLoaded(i)" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PrintDeck",
  data() {
    return {
      cardImages: [],
    };
  },
  computed: {
    imagesLoaded() {
      return this.cardImages.length > 0 && this.cardImages.reduce((a, x) => a && x.loaded, true);
    },
    groupedCardIndices() {
      let ret = [];
      let len = this.cardImages.length;
      for (let i = 0; i < Math.trunc((len + 7) / 8); i++) {
        let group = [];
        let start = i * 8;
        let end = start + 8;
        if (len < end) end = len;
        for (let j = start; j < end; j++) {
          group.push(j);
        }
        ret.push(group);
      }
      return ret;
    },
  },
  methods: {
    initializeCardImages() {
      let cardImages = [];
      if (this.$store.state.cardsLoaded) {
        let cardIndex = this.$store.state.cardIndex;
        let deck = this.$store.state.deck;
        Object.keys(deck).forEach((x) => {
          let printInfos = cardIndex[x].printInfos.filter((x) => x.imageUrl);
          if (!printInfos[0]) return;
          let imageUrl = printInfos[0].imageUrl;

          if (imageUrl) {
            for (let i = 0; i < deck[x]; i++) {
              cardImages.push({ image: imageUrl, loaded: false });
            }
          }
        });
      }
      this.cardImages = cardImages;
    },
    cardLoaded(index) {
      let imgElem = document.getElementById("img" + index);
      if (imgElem.width > imgElem.height) {
        imgElem.classList.add("img-rotate");
      } else {
        imgElem.classList.remove("img-rotate");
      }
      this.cardImages[index].loaded = true;
    },
  },
  mounted() {
    this.$store.dispatch("loadCardData").then(this.initializeCardImages);
  },
  watch: {
    imagesLoaded(newVal) {
      if (newVal) window.print();
    },
  },
};
</script>

<style>
.print-background {
  width: 11in;
  margin: auto;
  min-height: 100%;
}

.image-container {
  display: flex;
  width: 2.5in;
  height: 3.5in;
  justify-content: center;
  align-items: center;
  float: left;
}

.image-container > img {
  max-width: 2.5in;
  max-height: 3.5in;
}

.image-container > img.img-rotate {
  transform: rotate(-90deg);
  max-width: 3.5in;
  max-height: 2.5in;
}

.outer-group {
  width: 11in;
  display: flex;
  justify-content: center;
  align-items: center;
}

.outer-group:not(:first-of-type) {
  page-break-before: always;
}

.inner-group {
  width: 10in;
}

@page {
  size: 11in 8.5in;
  margin: 0in;
}

@media print {
  #app {
    height: auto;
  }

  #backgroundAnchor {
    background: none;
  }

  .outer-group {
    height: 8.5in;
  }

  .inner-group {
    height: 7in;
  }

  .dont-print {
    display: none;
  }
}
</style>