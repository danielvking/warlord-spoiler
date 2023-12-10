<template>
  <div class="card-body d-flex">
    <div style="min-width: 80px">
      <b-img-lazy v-if="!hideImages" :class="{ 'visible': loaded && !hidden }" :src="defaultImage" @load.native="handleLoad"/>
    </div>
    <div class="flex-grow-1">
      <span class="font-weight-bold">{{ card.name }}</span>
      <br />
      <span>{{ card.text }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardCompact",
  props: {
    card: Object,
    hideImages: Boolean
  },
  data() {
    return {
      loaded: false,
      hidden: this.hideImages
    }
  },
  computed: {
    defaultImage() {
      let printInfos = this.card.printInfos.filter((x) => x.imageUrl);
      if (!printInfos[0]) return null;
      return printInfos[0].imageUrl;
    },
  },
  watch: {
    defaultImage() {
      this.loaded = false;
    },
    hideImages(val) {
      if (val) {
        this.hidden = val;
      } else {
        this.$nextTick(() => {
          this.hidden = val;
        });
      }
    }
  },
  methods: {
    handleLoad(e) {
      let src = e.target.src;
      if (src === this.defaultImage) {
        this.$nextTick(() => {
          this.loaded = true;
        });
      }
    }
  }
};
</script>

<style scoped>
.card-body {
  width: 100%;
  min-height: 100px;
  padding: 0;
}
.card-body img {
  max-height: 100px;
  max-width: 75px;
  opacity: 0;
  transition: opacity 100ms ease-in;
}
.card-body img.visible {
  opacity: 1;
}
</style>
