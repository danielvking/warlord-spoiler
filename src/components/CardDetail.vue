<template>
  <b-container fluid>
    <router-link :to="{ name: 'searchPage' }"><span class="font-default">&larr;</span> Return to search</router-link>
    <template v-if="cardIndex">
      <h3 class="my-2">{{ cardData.name }}</h3>
      <b-row>
        <b-col cols="12" md="6" class="d-flex justify-content-center mb-2">
          <img v-if="imageUrl" :src="imageUrl" class="card-image"/>
        </b-col>

        <b-col cols="12" md="6">
          <div class="p-1">
            <div class="clearfix">
              <div class="card-stat-label">Card Name:</div>
              <div class="card-stat-value">{{ cardData.name }}</div>
            </div>
            <div class="clearfix">
              <div class="card-stat-label">Level:</div>
              <div class="card-stat-value">{{ cardData.level }}</div>
            </div>
            <div v-if="cardData.alignment" class="clearfix">
              <div class="card-stat-label">Alignment:</div>
              <div class="card-stat-value">{{ cardData.alignment }}</div>
            </div>
            <div v-if="cardData.type" class="clearfix">
              <div class="card-stat-label">Type:</div>
              <div class="card-stat-value">{{ cardData.type }}</div>
            </div>
            <div v-if="cardData.class" class="clearfix">
              <div class="card-stat-label">Class:</div>
              <div class="card-stat-value">{{ cardData.class }}</div>
            </div>
            <div v-if="cardData.attack" class="clearfix">
              <div class="card-stat-label">Attack:</div>
              <div class="card-stat-value">{{ cardData.attack }}</div>
            </div>
            <div v-if="cardData.armorClass" class="clearfix">
              <div class="card-stat-label">Armor Class:</div>
              <div class="card-stat-value">{{ cardData.armorClass }}</div>
            </div>
            <div v-if="cardData.skill" class="clearfix">
              <div class="card-stat-label">Skill:</div>
              <div class="card-stat-value">{{ cardData.skill }}</div>
            </div>
            <div v-if="cardData.hitPoints" class="clearfix">
              <div class="card-stat-label">Hit Points:</div>
              <div class="card-stat-value">{{ cardData.hitPoints }}</div>
            </div>
            <div v-if="cardData.faction" class="clearfix">
              <div class="card-stat-label">Faction:</div>
              <div class="card-stat-value">{{ cardData.faction | slashToLineBreak }}</div>
            </div>
            <div v-if="cardData.traits" class="clearfix">
              <div class="card-stat-label">Traits:</div>
              <div class="card-stat-value">{{ cardData.traits | slashToLineBreak }}</div>
            </div>
            <div v-if="cardData.feats" class="clearfix">
              <div class="card-stat-label">Feats:</div>
              <div class="card-stat-value">{{ cardData.feats | slashToLineBreak }}</div>
            </div>
            <div class="my-3" v-html="$options.filters.formatCardText(cardData.text)"></div>
          </div>
        </b-col>
      </b-row>
      <pre style="overflow-y:hidden">{{ cardData }}</pre>
    </template>>
  </b-container>
</template>

<script>
export default {
  name: 'CardDetail',
  props: {
    card: String
  },
  data() {
    return {
      cardIndex: null
    }
  },
  computed: {
    cardData() {
      return this.cardIndex[this.card]
    },
    imageUrl() {
      if (!this.cardData) return null
      let printInfos = this.cardData.printInfos.filter(x => x.imageUrl)
      if (!printInfos[0]) return null
      return printInfos[0].imageUrl
    }
  },
  filters: {
    formatCardText(value) {
      if (!value) return value;
      let hashReg = /(Spend Order:|Order:|Spend React:|React:)/gm;
      value = value.replace(hashReg, "<b>$&</b>");
      return value;
    },
    slashToLineBreak(value) {
      if (!value) return value;
      let hashReg = /\//gm;
      value = value.replace(hashReg, "\r\n");
      return value;
    }
  },
  mounted() {
    // Get cards from main page
    this.$nextTick(() => {
      this.$parent.$parent.cardPromise.then(result => {
        this.cardIndex = result.cardIndex
      })
    })
  }
};
</script>

<style scoped>
.card-image {
  max-height: 400px;
}

.card-stat-label {
  float: left;
  font-weight: bold;
  text-align: left;
  width: 32%;
}

.card-stat-value {
  float: right;
  white-space: pre-wrap;
  width: 67%;
}
</style>