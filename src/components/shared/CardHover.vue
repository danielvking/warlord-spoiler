<template>
  <b-popover
    v-if="targetInternal != null"
    :show="showInternal"
    custom-class="popover-wide"
    :target="targetInternal"
    boundary="viewport"
    triggers="manual"
    :placement="placement"
    @shown="handleShown"
    @hidden="handleHidden"
  >
    <img :src="image.src"
        :style="{ width: width + 'px', height: height + 'px' }"/>
  </b-popover>
</template>

<script>
export default {
  props: {
    show: Boolean,
    target: null,
    card: Object,
    placement: {
      type: String,
      default: 'bottomleft'
    }
  },
  data() {
    return {
      state: "loaded",
      targetInternal: null,
      ignoreTarget: false,
      image: null,
      width: 0,
      height: 0,
      showInternal: false,
      actuallyShowing: false,
      removalObserver: null
    }
  },
  watch: {
    state(val) {
      // Hiding - disable the popover and destroy it once it's invisible
      if (val === 'hiding') {
        if (this.actuallyShowing) {
          this.showInternal = false;
          // See handleHidden
        } else {
          this.state = 'destroying';
        }
            
      // Destroying - remove the popover from the DOM and then reload it
      } else if (val === 'destroying') {
        this.setTargetInternal(null);
        this.$nextTick(() => {
          if (this.state === 'destroying') {
            this.state = 'loading'
          }
        });

      // Loading - compute the popover image size, set it, and then load it
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

      // Loaded - show the popover, if applicable
      } else if (val === 'loaded') {
        if (!this.ignoreTarget && this.target != null && this.image != null) {
          this.setTargetInternal(this.target);
        }
        this.showInternal = this.show;
      }
    },
    target() {
      // Clear the target suppression, refresh the popover
      this.ignoreTarget = false;
      this.state = 'hiding';
    },
    card() {
      // Refresh the popover
      this.state = 'hiding';
    },
    placement() {
      // Refresh the popover
      this.state = 'hiding';
    },
    show(val) {
      // If the popover is already loaded, pass along this value
      if (this.state === 'loaded') {
        this.showInternal = val;
      }
    },
    $route() {
      // Forcibly remove popover if a route changes
      this.state = 'destroying';
    }
  },
  mounted() {
    this.state = 'loading';
    this.removalObserver = new MutationObserver(() => {
      if (this.state !== 'destroying' && !document.contains(this.targetInternal)) {
        // Target no longer exists; this would prevent a popover from initializing, but it doesn't prevent it from causing visual bugs
        // Suppress the target until it changes, and forcibly remove popover
        this.ignoreTarget = true;
        this.state = 'destroying'
      }
    });
  },
  methods: {
    setTargetInternal(target) {
      // There are a few ways the element can be provided to b-popover; we're going to extract the element
      let element;
      if (target == null) {
        element = null;
      } else if (typeof(target) === "string") {
        element = document.getElementById(target);
      } else if (typeof(target) === "function") {
        element = target();
      } else if (typeof(target) === "object") {
        if (target.$el != null) {
          element = target.$el;
        } else {
          element = target;
        }
      }

      if (element == null) {
        // Stop watching the DOM for changes, and update data
        this.removalObserver.disconnect();
        this.actuallyShowing = false;
        this.targetInternal = null;
      } else {
        // Update data and start watching the DOM for changes
        this.targetInternal = element;
        this.removalObserver.observe(document, { childList: true, subtree: true });
      }
    },
    handleShown() {
      // Note the visibility status
      this.actuallyShowing = true;
    },
    handleHidden() {
      // Note the visibility status, update hiding state if applicable
      this.actuallyShowing = false;
      if (this.state === 'hiding') {
        this.state = 'destroying'
      }
    }
  }
}
</script>