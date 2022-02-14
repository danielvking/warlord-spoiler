<template>
  <div @focusout="e => $emit('focusout', e)">
    <b-form-group :state="infoCache.validationState[property]" :invalid-feedback="infoCache.validationText[property]">
      <template v-slot:description v-if="infoCache.points[property] != null">
        <span>Points: {{ infoCache.points[property] }}</span>
        <a
          class="float-right"
          href="#"
          @click.prevent
          v-b-popover.click.blur.bottomleft="infoCache.pointInfo[property]"
        >
          <font-awesome-icon icon="info-circle" />
        </a>
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
  }
};
</script>
