<template>
  <div>
    <div v-if="value && showSideMenus" class="side-menu-container-outer">
      <div class="side-menu-container-middle">
        <div class="side-menu-container-inner content-region">
          <div class="site-subheader">
            <b-button-close text-variant="light" class="px-1 pull-right" @click="$emit('input', false)"/>
            <h6>{{ title }}</h6>
          </div>
          <slot/>
        </div>
      </div>
    </div>
    <b-sidebar :visible="value && !showSideMenus" @change="x => $emit('input', x)" bg-variant="transparent" backdrop lazy no-header width="250px">
      <div class="side-menu-container-inner h-100 content-region">
        <div class="site-subheader">
          <b-button-close text-variant="light" class="px-1 pull-right" @click="$emit('input', false)"/>
          <h6>{{ title }}</h6>
        </div>
          <slot/>
      </div>
    </b-sidebar>
  </div>
</template>

<script>
export default {
  name: "SideMenu",
  props: {
    value: Boolean,
    title: String
  },
  computed: {
    showSideMenus() {
      return this.$store.getters.showSideMenus;
    },
  },
  watch: {
    value(newVal) {
        this.$emit("input", newVal);
    }
  }
};
</script>

<style scoped>
.side-menu-container-outer {
  width: calc(min(100vw, 256px));
}

.side-menu-container-middle {
  position: relative;
}

.side-menu-container-inner {
  position: fixed;
  display: flex;
  width: calc(min(100vw, 250px));
  margin-right: 6px;
  flex-direction: column;
  max-height: 100vh;
}

.fill-parent {
  top: 0;
  bottom: 0;
}
</style>