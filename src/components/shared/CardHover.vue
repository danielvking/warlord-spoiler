<template>
  <b-popover v-if="targetInternal != null"
              :show="showInternal"
              custom-class="popover-wide"
              :target="targetInternal"
              boundary="window"
              triggers="manual"
              placement="bottomleft"
              @shown="handleShown"
              @hidden="handleHidden">
    <img :src="image.src"
        :style="{ width: width + 'px', height: height + 'px' }"/>
  </b-popover>
</template>

<script>
export default {
  props: {
    show: Boolean,
    target: null,
    card: Object
  },
  data() {
    return {
      state: "loaded",
      targetInternal: null,
      image: null,
      width: 0,
      height: 0,
      showInternal: false,
      actuallyShowing: false,
    }
  },
  watch: {
    state(val) {
      if (val === 'hiding') {
        if (this.actuallyShowing) {
          this.showInternal = false;
        } else {
          this.state = 'destroying';
        }
            
      } else if (val === 'destroying') {
        this.targetInternal = null;
        this.$nextTick(() => {
          if (this.state === 'destroying') {
            this.state = 'loading'
          }
        });

      } else if (val === 'loading') {
        if (this.target != null) {
          let imageUrls = this.card && this.card.printInfos && this.card.printInfos.map(x => x.imageUrl).filter(x => x != null);
          let imageUrl = imageUrls && imageUrls[0];
          if (imageUrl != null) {
            let img = new Image();
            this.image = img;
            img.onload = () => {
              if (this.state === 'loading') {
                if (img.naturalWidth < img.naturalHeight) {
                  this.height = 400;
                  this.width = Math.floor(400 * img.naturalWidth / img.naturalHeight);
                } else {
                  this.width = 400;
                  this.height =  Math.floor(400 * img.naturalHeight / img.naturalWidth);
                }
                this.state = 'loaded';
              }
            }
            img.src = imageUrl;
            return;
          }
        }
        this.image = null;
        this.width = this.height = 0;
        this.state = 'loaded';

      } else if (val === 'loaded') {
        if (this.target != null && this.image != null) {
          this.targetInternal = this.target;
          this.showInternal = this.show;
        }
      }
    },
    target() {
      this.state = 'hiding';
    },
    card() {
      this.state = 'hiding';
    },
    show(val) {
      if (this.state === 'loaded') {
        this.showInternal = val;
      }
    }
  },
  mounted() {
    this.state = 'loading';
  },
  methods: {
    handleShown() {
      this.actuallyShowing = true;
    },
    handleHidden() {
      this.actuallyShowing = false;
      if (this.state === 'hiding') {
        this.state = 'destroying'
      }
    }
  }
}
</script>