<template>
  <div>
    <div v-if="modelValue && showSideMenus" class="side-menu-container-outer">
      <div class="side-menu-container-middle">
        <div class="side-menu-container-inner content-region">
          <div class="site-subheader d-flex align-items-center">
            <h3>{{ title }}</h3>
            <b-close-button @click="$emit('update:modelValue', false)"/>
          </div>
          <slot/>
        </div>
      </div>
    </div>
    <b-offcanvas
      :model-value="modelValue && !showSideMenus"
      @update:model-value="x => $emit('update:modelValue', x)"
      class="bg-transparent"
      width="250px"
      backdrop
      lazy
      no-header
    >
      <div class="side-menu-container-inner h-100 content-region">
        <div class="site-subheader d-flex align-items-center">
          <h3>{{ title }}</h3>
          <b-close-button @click="$emit('update:modelValue', false)"/>
        </div>
          <slot/>
      </div>
    </b-offcanvas>
  </div>
</template>

<script>
export default {
  name: "SideMenu",
  props: {
    modelValue: Boolean,
    title: String
  },
  emits: ["update:modelValue"],
  computed: {
    showSideMenus() {
      return this.$store.getters.showSideMenus;
    },
  },
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