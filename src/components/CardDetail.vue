<template>
  <b-container fluid>
    <router-link :to="{ name: 'searchPage' }"><span class="font-default">&larr;</span> Return to search</router-link>
    <template v-if="cardIndex">
      <h3 class="my-2">{{ cardData.name }}</h3>
      <b-row>
        <b-col cols="12" md="6" class="d-flex justify-content-center mb-2">
          <img v-if="imageUrl" :src="imageUrlOverride || imageUrl" class="card-image"/>
        </b-col>

        <b-col cols="12" md="6">
          <div class="p-1">
            <div class="clearfix">
              <div class="card-stat-label">Card Name:</div>
              <div class="card-stat-value">{{ cardData.name }}</div>
            </div>
            <div v-if="cardData.level" class="clearfix">
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
            <div class="clearfix my-2">
              <div class="card-stat-label">Formats:</div>
              <div v-if="cardData.editions && cardData.editions[0]" class="card-stat-value" >
                <span v-for="edition in cardData.editions" :key="edition">{{ edition }} </span>
              </div>
              <div v-else class="card-stat-value">Open</div>
            </div>
            <div class="my-3" v-html="$options.filters.formatCardText(cardData.text)"></div>
            <div v-for="(printInfo, i) in cardData.printInfos" :key="i">
              <div class="card-print-link" @click="setImage(printInfo.imageUrl)">{{ printInfo | formatSetName }}</div>
              <div class="mx-2">
                <div v-if="printInfo.rarity" class="clearfix">
                  <div class="card-stat-label">Rarity:</div>
                  <div class="card-stat-value">{{ printInfo.rarity }}</div>
                </div>
                <div v-if="printInfo.flavorTraits" class="clearfix">
                  <div class="card-stat-label">Flavor Traits:</div>
                  <div class="card-stat-value">{{ printInfo.flavorTraits }}</div>
                </div>
                <div v-if="printInfo.artist" class="clearfix">
                  <div class="card-stat-label">Artist:</div>
                  <div class="card-stat-value">{{ printInfo.artist }}</div>
                </div>
                <div class="my-2">
                  <i>{{ printInfo.flavorText }}</i>
                </div>
              </div>
            </div>
          </div>
        </b-col>
      </b-row>
      <div v-if="cardData.errata" class="my-3">
        <div class="font-weight-bold">Rulings:</div>
        <div class="card-errata">{{ cardData.errata }}</div>
      </div>
    </template>
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
      cardIndex: null,
      imageUrlOverride: null
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
      hashReg = /\r\n/gm
      value = value.replace(hashReg, '<br>')
      return value;
    },
    slashToLineBreak(value) {
      if (!value) return value;
      let hashReg = /\//gm;
      value = value.replace(hashReg, "\r\n");
      return value;
    },
    formatSetName(value) {
      let display = value.set;
      if (value.setNumber != null) display += ` (${value.setNumber})`;
      return display;
    }
  },
  mounted() {
    // Get cards from main page
    this.$nextTick(() => {
      this.$parent.$parent.cardPromise.then(result => {
        this.cardIndex = result.cardIndex
      })
    })
  },
  methods: {
    setImage(imageUrl) {
      if (!imageUrl) return
      this.imageUrlOverride = imageUrl
    }
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
  width: 35%;
}

.card-stat-value {
  float: right;
  white-space: pre-wrap;
  width: 64%;
}

.card-print-link {
  text-decoration: underline;
  cursor: pointer;
}
  .card-print-link:hover {
    text-decoration: none;
  }

.card-errata {
  white-space: pre-wrap;
}
</style>