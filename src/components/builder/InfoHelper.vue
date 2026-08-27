<template>
  <div @focusout="(e) => $emit('focusout', e)">
    <b-form-group :state="infoCache.validationState[property]" :invalid-feedback="infoCache.validationText[property]">
      <template #description>
        <template v-if="infoCache.points[property] != null">
          <span>Points: {{ infoCache.points[property] }} / {{ infoCache.pointMaximum || infoCache.pointTotal }}</span>
          <template v-if="infoCache.pointInfo[property]">
            <b-button ref="showPointInfo" class="show-point-info" variant="link" @click.prevent>
              <font-awesome-icon icon="info-circle" />
            </b-button>
            <!-- Left to itself the popover sits in the DOM from page load,
                 pinned at the document origin until Floating UI places it, so
                 a tap takes focus and the browser scrolls to the top of the
                 page to reveal it. lazy and unmount-lazy keep it out of the
                 DOM except while it is open. -->
            <b-popover
              placement="bottom-start"
              :target="() => $refs.showPointInfo"
              click
              lazy
              unmount-lazy
              no-hide
              strategy="fixed"
              teleport-to="body"
            >
              <span class="info-popper">{{ infoCache.pointInfo[property] }}</span>
            </b-popover>
          </template>
        </template>
      </template>
      <slot></slot>
    </b-form-group>
  </div>
</template>

<script>
export default {
  props: {
    infoCache: Object,
    property: String,
  },
};
</script>

<style scoped>
.show-point-info {
  font-size: inherit;
  padding: 0px;
  float: right;
}
.info-popper {
  white-space: pre-wrap;
}
</style>
