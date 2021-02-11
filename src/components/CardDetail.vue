<template>
  <b-container fluid>
    <div class="clearfix py-1">
      <div class="float-left">
        <router-link :to="{ name: 'searchPage' }"
          ><span class="font-default">&larr;</span> Return to
          search</router-link
        >
      </div>
      <div class="float-right">
        <a
          v-if="showDeck"
          href="#"
          @click.prevent="$store.commit('incrementCardToDeck', card)"
          aria-label="Add to build"
        >
          <font-awesome-icon icon="plus-square" /> Add to build</a
        >
      </div>
    </div>
    <template v-if="cardIndex">
      <h3 class="my-2">{{ cardData.name }}</h3>
      <b-row>
        <b-col cols="12" md="6" class="d-flex justify-content-center mb-2">
          <img
            v-if="imageUrl"
            :src="imageUrlOverride || imageUrl"
            class="card-image"
          />
        </b-col>

        <b-col cols="12" md="6">
          <div class="p-1">
            <div class="clearfix">
              <div class="card-stat-label"><span>Card Name:</span></div>
              <div class="card-stat-value">
                <span>{{ cardData.name }}</span>
              </div>
            </div>
            <div v-if="cardData.level" class="clearfix">
              <div class="card-stat-label"><span>Level:</span></div>
              <div class="card-stat-value">
                <span>{{ cardData.level }}</span>
              </div>
            </div>
            <div v-if="cardData.alignment" class="clearfix">
              <div class="card-stat-label"><span>Alignment:</span></div>
              <div class="card-stat-value">
                <span>{{ cardData.alignment }}</span>
              </div>
            </div>
            <div v-if="cardData.type" class="clearfix">
              <div class="card-stat-label"><span>Type:</span></div>
              <div class="card-stat-value">
                <span>{{ cardData.type }}</span>
              </div>
            </div>
            <div v-if="cardData.class" class="clearfix">
              <div class="card-stat-label"><span>Class:</span></div>
              <div class="card-stat-value">
                <span>{{ cardData.class }}</span>
              </div>
            </div>
            <div v-if="cardData.attack" class="clearfix">
              <div class="card-stat-label"><span>Attack:</span></div>
              <div class="card-stat-value">
                <span>{{ cardData.attack }}</span>
              </div>
            </div>
            <div v-if="cardData.armorClass" class="clearfix">
              <div class="card-stat-label"><span>Armor Class:</span></div>
              <div class="card-stat-value">
                <span>{{ cardData.armorClass }}</span>
              </div>
            </div>
            <div v-if="cardData.skill" class="clearfix">
              <div class="card-stat-label"><span>Skill:</span></div>
              <div class="card-stat-value">
                <span>{{ cardData.skill }}</span>
              </div>
            </div>
            <div v-if="cardData.hitPoints" class="clearfix">
              <div class="card-stat-label">
                <span>Hit Points:</span>
              </div>
              <div class="card-stat-value">
                <span>{{ cardData.hitPoints }}</span>
              </div>
            </div>
            <div v-if="cardData.faction" class="clearfix">
              <div class="card-stat-label"><span>Faction:</span></div>
              <div class="card-stat-value">
                <span>{{ cardData.faction | slashToLineBreak }}</span>
              </div>
            </div>
            <div v-if="cardData.traits" class="clearfix">
              <div class="card-stat-label"><span>Traits:</span></div>
              <div class="card-stat-value">
                <span>{{ cardData.traits | slashToLineBreak }}</span>
              </div>
            </div>
            <div v-if="cardData.feats" class="clearfix">
              <div class="card-stat-label"><span>Feats:</span></div>
              <div class="card-stat-value">
                <span>{{ cardData.feats | slashToLineBreak }}</span>
              </div>
            </div>
            <div v-if="cardData.misc" class="clearfix">
              <div class="card-stat-label"><span>Misc:</span></div>
              <div class="card-stat-value">
                <span>{{ cardData.misc | slashToLineBreak }}</span>
              </div>
            </div>
            <div class="clearfix my-2">
              <div class="card-stat-label"><span>Formats:</span></div>
              <div
                v-if="cardData.editions && cardData.editions[0]"
                class="card-stat-value"
              >
                <span v-for="edition in cardData.editions" :key="edition">{{
                  edition + " "
                }}</span>
              </div>
              <div v-else class="card-stat-value"><span>Open</span></div>
            </div>
            <div
              class="my-3"
              v-html="$options.filters.formatCardText(cardData.text)"
            ></div>
            <div v-for="(printInfo, i) in cardData.printInfos" :key="i">
              <div
                class="card-print-link"
                @click="setImage(printInfo.imageUrl)"
              >
                <span>{{ printInfo | formatSetName }}</span>
              </div>
              <div class="mx-2">
                <div v-if="printInfo.rarity" class="clearfix">
                  <div class="card-stat-label"><span>Rarity:</span></div>
                  <div class="card-stat-value">
                    <span>{{ printInfo.rarity }}</span>
                  </div>
                </div>
                <div v-if="printInfo.flavorTraits" class="clearfix">
                  <div class="card-stat-label"><span>Flavor Traits:</span></div>
                  <div class="card-stat-value">
                    <span>{{ printInfo.flavorTraits }}</span>
                  </div>
                </div>
                <div v-if="printInfo.artist" class="clearfix">
                  <div class="card-stat-label"><span>Artist:</span></div>
                  <div class="card-stat-value">
                    <span>{{ printInfo.artist }}</span>
                  </div>
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
        <div class="font-weight-bold"><span>Rulings:</span></div>
        <div class="card-errata">
          <span>{{ cardData.errata }}</span>
        </div>
      </div>
    </template>
  </b-container>
</template>

<script>
export default {
  name: "CardDetail",
  props: {
    card: String,
  },
  data() {
    return {
      imageUrlOverride: null,
    };
  },
  computed: {
    cardIndex() {
      return this.$store.state.cardIndex;
    },
    cardData() {
      return this.cardIndex[this.card] || {};
    },
    showDeck() {
      return this.$store.getters.showDeck;
    },
    imageUrl() {
      if (!this.cardData) return null;
      if (!this.cardData.printInfos) return null;
      let printInfos = this.cardData.printInfos.filter((x) => x.imageUrl);
      if (!printInfos[0]) return null;
      return printInfos[0].imageUrl;
    },
  },
  filters: {
    formatCardText(value) {
      if (!value) return value;
      let hashReg = /(Spend Order:|Order:|Spend React:|React:)/gm;
      value = value.replace(hashReg, "<b>$&</b>");
      hashReg = /\r\n/gm;
      value = value.replace(hashReg, "<br>");
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
    },
  },
  mounted() {
    this.$nextTick(() => {
      // Adjust scroll
      let scrollRegion = document.getElementById("scrollRegion");
      scrollRegion.scrollTop = 0;
    });
  },
  methods: {
    setImage(imageUrl) {
      if (!imageUrl) return;
      this.imageUrlOverride = imageUrl;
    },
  },
};
</script>

<style scoped>
.card-image {
  max-height: 400px;
  max-width: 350px;
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