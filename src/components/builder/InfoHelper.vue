<template>
  <div @focusout="(e) => $emit('focusout', e)">
    <b-form-group :state="infoCache.validationState[property]" :invalid-feedback="infoCache.validationText[property]">
      <template v-slot:description v-if="infoCache.points[property] != null">
        <span>Points: {{ infoCache.points[property] }} / {{ infoCache.pointTotal }}</span>
        <b-btn v-if="infoCache.pointInfo[property]" ref="showPointInfo" class="show-point-info" variant="link">
          <font-awesome-icon icon="info-circle" />
        </b-btn>
        <b-popover placement="bottomleft" :target="() => $refs.showPointInfo" triggers="click blur">
          <span class="info-popper">{{ infoCache.pointInfo[property] }}</span>
        </b-popover>
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
