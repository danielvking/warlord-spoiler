<template>
  <div class="card-body d-flex">
    <div style="min-width: 80px">
      <b-img-lazy :src="defaultImage" :key="defaultImage" />
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
  },
  computed: {
    defaultImage() {
      let printInfos = this.card.printInfos.filter((x) => x.imageUrl);
      if (!printInfos[0]) return null;
      return printInfos[0].imageUrl;
    },
  },
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
}
</style>
