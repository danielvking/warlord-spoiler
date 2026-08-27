<template>
  <b-container fluid @focusout="saveChanges">
    <div class="clearfix py-1">
      <div class="float-start">
        <router-link :to="{ name: 'searchPage' }"
          ><span class="font-default">&larr;</span> Return to search</router-link
        >
      </div>
      <div class="float-end">
        <a href="#" @click.prevent="removeCard(card)" aria-label="Cancel changes"
          ><font-awesome-icon icon="minus-square" /> Cancel changes</a
        >
      </div>
    </div>
    <template v-if="cardIndex">
      <h3 class="my-0">{{ cardTemp.name }}</h3>
      <b-row>
        <b-col cols="12" md="6" class="d-flex flex-column">
          <div
            class="card-view d-flex flex-column pb-2"
            :class="viewOption === 'JSON' ? 'bound-height' : 'align-items-center'"
          >
            <b-form-radio-group v-model="viewOption" :options="['Art', 'JSON']" class="mb-2 w-100 view-switch" buttons />
            <!-- Image -->
            <template v-if="viewOption === 'Art'">
              <img v-if="imageUrl" :src="imageUrlOverride || imageUrl" class="card-image" />
            </template>
            <!-- JSON -->
            <template v-if="viewOption === 'JSON'">
              <b-form-textarea
                :class="'font-monospace flex-fill' + (cardJsonWrapped ? ' editor-wrap' : ' editor')"
                v-model="cardJson"
                rows="10"
                size="sm"
                @focus="cardJsonSelected = true"
                @blur="cardJsonSelected = false"
              ></b-form-textarea>
              <b-form-checkbox v-model="cardJsonWrapped">Wrap Text</b-form-checkbox>
            </template>
          </div>
        </b-col>

        <b-col cols="12" md="6">
          <div class="p-1">
            <!-- Name -->
            <div class="clearfix">
              <div class="card-stat-label"><span>Card Name:</span></div>
              <div class="card-stat-value">
                <b-form-input v-model="cardTemp.name" />
              </div>
            </div>
            <!-- Level -->
            <div class="clearfix">
              <div class="card-stat-label"><span>Level:</span></div>
              <div class="card-stat-value">
                <b-form-input v-model="cardTemp.level" />
              </div>
            </div>
            <!-- Alignment -->
            <div class="clearfix">
              <div class="card-stat-label"><span>Alignment:</span></div>
              <div class="card-stat-value">
                <b-form-select v-model="cardTemp.alignment" :options="alignmentList">
                  <template #first>
                    <b-form-select-option :value="null"></b-form-select-option>
                  </template>
                </b-form-select>
              </div>
            </div>
            <!-- Type -->
            <div class="clearfix">
              <div class="card-stat-label"><span>Type:</span></div>
              <div class="card-stat-value">
                <b-form-select v-model="cardTemp.type" :options="typeList" />
              </div>
            </div>
            <!-- Subtype -->
            <div class="clearfix">
              <div class="card-stat-label"><span>Subtype:</span></div>
              <div class="card-stat-value">
                <option-tags v-model="cardTemp.subtype" :options="subtypeList" />
              </div>
            </div>
            <!-- Class -->
            <div class="clearfix">
              <div class="card-stat-label"><span>Class:</span></div>
              <div class="card-stat-value">
                <option-tags v-model="cardTemp.class" :options="classList" />
              </div>
            </div>
            <!-- Attack -->
            <div class="clearfix">
              <div class="card-stat-label"><span>Attack:</span></div>
              <div class="card-stat-value">
                <b-form-input v-model="cardTemp.attack" />
              </div>
            </div>
            <!-- Damage Type -->
            <div class="clearfix">
              <div class="card-stat-label"><span>Damage Type:</span></div>
              <div class="card-stat-value">
                <b-form-select v-model="cardTemp.damageType" :options="damageTypeList">
                  <template #first>
                    <b-form-select-option :value="null"></b-form-select-option>
                  </template>
                </b-form-select>
              </div>
            </div>
            <!-- Armor Class -->
            <div class="clearfix">
              <div class="card-stat-label"><span>Armor Class:</span></div>
              <div class="card-stat-value">
                <b-form-input v-model="cardTemp.armorClass" />
              </div>
            </div>
            <!-- Skill -->
            <div class="clearfix">
              <div class="card-stat-label"><span>Skill:</span></div>
              <div class="card-stat-value">
                <b-form-input v-model="cardTemp.skill" />
              </div>
            </div>
            <!-- Hit Points -->
            <div class="clearfix">
              <div class="card-stat-label">
                <span>Hit Points:</span>
              </div>
              <div class="card-stat-value">
                <b-form-input v-model="cardTemp.hitPoints" />
              </div>
            </div>
            <!-- Faction -->
            <div class="clearfix">
              <div class="card-stat-label"><span>Faction:</span></div>
              <div class="card-stat-value">
                <option-tags v-model="cardTemp.faction" :options="factionList" />
              </div>
            </div>
            <!-- Traits -->
            <div class="clearfix">
              <div class="card-stat-label"><span>Traits:</span></div>
              <div class="card-stat-value">
                <option-tags v-model="cardTemp.traits" :options="traitList" />
              </div>
            </div>
            <!-- Keywords -->
            <div class="clearfix">
              <div class="card-stat-label"><span>Keywords:</span></div>
              <div class="card-stat-value">
                <div class="row row-tight" v-for="i in cardTemp.keywords.length + Math.min(1, keywordList.length)" :key="'Keyword' + i">
                  <template v-if="i - 1 >= cardTemp.keywords.length">
                    <b-col cols="12">
                      <b-form-select :model-value="null" :options="keywordList" @update:model-value="x => selectKeyword(x, i - 1)">
                        <template v-slot:first>
                          <b-form-select-option :value="null">- Select Keyword -</b-form-select-option>
                        </template>
                      </b-form-select>
                    </b-col>
                  </template>
                  <template v-else>
                    <label class="col-7 col-form-label">{{ cardTemp.keywords[i - 1].name }}{{ keywordHasValueSet[cardTemp.keywords[i - 1].name] ? ":" : "" }}</label>
                    <b-col cols="1">
                      <a href="#" @click.prevent="deselectKeyword(i - 1)"><span class="font-default">✘</span></a>
                    </b-col>
                    <b-col v-if="keywordHasValueSet[cardTemp.keywords[i - 1].name]" cols="4">
                      <b-input-group>
                        <b-form-input
                          :id="'txtKeyword' + i"
                          type="number"
                          v-model.number="cardTemp.keywords[i - 1].value"
                        />
                      </b-input-group>
                    </b-col>
                  </template>
                </div>
              </div>
            </div>
            <!-- Feats -->
            <div class="clearfix">
              <div class="card-stat-label"><span>Feats:</span></div>
              <div class="card-stat-value">
                <div class="row row-tight" v-for="i in cardTemp.feats.length + Math.min(1, featList.length)" :key="'Feat' + i">
                  <template v-if="i - 1 >= cardTemp.feats.length">
                    <b-col cols="12">
                      <b-form-select :model-value="null" :options="featList" @update:model-value="x => selectFeat(x, i - 1)">
                        <template v-slot:first>
                          <b-form-select-option :value="null">- Select Feat -</b-form-select-option>
                        </template>
                      </b-form-select>
                    </b-col>
                  </template>
                  <template v-else>
                    <label class="col-7 col-form-label">{{ cardTemp.feats[i - 1].name }}:</label>
                    <b-col cols="1">
                      <a href="#" @click.prevent="deselectFeat(i - 1)"><span class="font-default">✘</span></a>
                    </b-col>
                    <b-col cols="4">
                      <b-input-group>
                        <b-form-input
                          :id="'txtFeat' + i"
                          type="number"
                          v-model.number="cardTemp.feats[i - 1].value"
                        />
                      </b-input-group>
                    </b-col>
                  </template>
                </div>
              </div>
            </div>
            <!-- Editions -->
            <div class="clearfix my-2">
              <div class="card-stat-label"><span>Formats:</span></div>
              <div class="card-stat-value">
                <option-tags v-model="cardTemp.editions" :options="editionList" />
              </div>
            </div>
            <!-- Exclusive Promo -->
            <div class="clearfix">
              <div class="card-stat-label"></div>
              <div class="card-stat-value">
                <b-form-checkbox v-model="cardTemp.exclusivePromo">Is Exclusive Promo</b-form-checkbox>
              </div>
            </div>
            <!-- Text -->
            <div class="my-3">
              <b-form-textarea rows="4" v-model="cardTemp.text" placeholder="[Card Text]" />
            </div>
            <!-- Print Infos -->
            <div class="clearfix py-1">
              <div class="float-end">
                <a href="#" @click.prevent="addPrintInfo" aria-label="Add print info">
                  <font-awesome-icon icon="plus-square" /> Add print info</a
                >
              </div>
            </div>
            <div v-for="(printInfo, i) in cardTemp.printInfos" :key="i">
              <!-- Set -->
              <div class="clearfix">
                <div class="card-stat-label"><span>Set:</span></div>
                <div class="card-stat-value">
                  <div class="row row-tight">
                    <b-col cols="1">
                      <a href="#" @click.prevent="removePrintInfo(i)"><span class="font-default">✘</span></a>
                    </b-col>
                    <b-col cols="11">
                      <b-form-select v-model="printInfo.set" :options="setList" />
                    </b-col>
                  </div>
                </div>
              </div>
              <!-- Set Number -->
              <div class="clearfix">
                <div class="card-stat-label"><span>Set Number:</span></div>
                <div class="card-stat-value">
                  <b-form-input v-model="printInfo.setNumber" />
                </div>
              </div>
              <!-- Rarity -->
              <div class="clearfix">
                <div class="card-stat-label"><span>Rarity:</span></div>
                <div class="card-stat-value">
                  <b-form-select v-model="printInfo.rarity" :options="rarityList">
                    <template #first>
                      <b-form-select-option :value="null"></b-form-select-option>
                    </template>
                  </b-form-select>
                </div>
              </div>
              <!-- Artist -->
              <div class="clearfix">
                <div class="card-stat-label"><span>Artist:</span></div>
                <div class="card-stat-value">
                  <b-form-input v-model="printInfo.artist" />
                </div>
              </div>
              <!-- Image URL -->
              <div class="clearfix">
                <div class="card-stat-label"><span>Image URL:</span></div>
                <div class="card-stat-value">
                  <div class="row row-tight">
                    <b-col cols="1" class="d-flex align-items-center">
                      <a href="#" @click.prevent="setImage(printInfo.imageUrl)"><font-awesome-icon icon="eye" /></a>
                    </b-col>
                    <b-col cols="11">
                      <b-form-input v-model="printInfo.imageUrl" />
                    </b-col>
                  </div>
                </div>
              </div>
              <!-- Flavor Text -->
              <div class="my-2">
                <b-form-textarea rows="2" v-model="printInfo.flavorText" placeholder="[Flavor Text]" />
              </div>
            </div>
          </div>
        </b-col>
      </b-row>
      <!-- Errata -->
      <div class="my-3">
        <div class="fw-bold"><span>Rulings:</span></div>
        <div>
          <b-form-textarea rows="4" v-model="cardTemp.errata" />
        </div>
      </div>
    </template>
  </b-container>
</template>

<script>
import addRemoveCardMixin from "../../mixins/addRemoveCardMixin";
import { createMapper } from "../../scripts/cardMapper";
import OptionTags from "../shared/OptionTags.vue";

export default {
  name: "CardDetailEdit",
  components: { OptionTags },
  mixins: [addRemoveCardMixin],
  props: {
    card: String,
  },
  data() {
    return {
      viewOption: "Art",
      cardJson: "",
      cardJsonWrapped: false,
      cardJsonSelected: false,
      imageUrlOverride: null,
      cardTemp: {
        keywords: [], // Defaulting this for the UI
        feats: [] // Defaulting this for the UI
      },
      mapper: null,
    };
  },
  computed: {
    cardIndex() {
      return this.$store.state.editedCards;
    },
    cardData() {
      return this.cardIndex[this.card] || {};
    },
    imageUrl() {
      if (!this.cardData) return null;
      if (!this.cardData.printInfos) return null;
      let printInfos = this.cardData.printInfos.filter((x) => x.imageUrl);
      if (!printInfos[0]) return null;
      return printInfos[0].imageUrl;
    },

    referenceLists() {
      return this.$store.state.referenceLists;
    },
    typeList() {
      return (this.referenceLists && this.referenceLists.typeList) || [];
    },
    subtypeList() {
      let subtypeList = (this.referenceLists && this.referenceLists.subtypeLists && this.referenceLists.subtypeLists[this.cardTemp.type]) || [];
      if (this.cardTemp.subtype) {
        subtypeList = subtypeList.filter(s => !this.cardTemp.subtype.includes(s));
      }
      return subtypeList;
    },
    alignmentList() {
      return (this.referenceLists && this.referenceLists.alignmentList) || [];
    },
    classList() {
      if (!this.referenceLists || !this.referenceLists.classList) return [];
      return this.referenceLists.classList.filter((t) => !this.cardTemp.class || !this.cardTemp.class.includes(t));
    },
    factionList() {
      if (!this.referenceLists || !this.referenceLists.factionList) return [];
      return this.referenceLists.factionList.filter((t) => !this.cardTemp.faction || !this.cardTemp.faction.includes(t));
    },
    damageTypeList() {
      return (this.referenceLists && this.referenceLists.damageTypeList) || [];
    },
    traitList() {
      if (!this.referenceLists || !this.referenceLists.traitList) return [];
      return this.referenceLists.traitList.filter((t) => !this.cardTemp.traits || !this.cardTemp.traits.includes(t));
    },
    keywordList() {
      if (!this.referenceLists || !this.referenceLists.keywordList) return [];
      return this.referenceLists.keywordList.map((k) => k.name).filter((k) => !this.cardTemp.keywords || !this.cardTemp.keywords.map(x => x.name).includes(k));
    },
    keywordHasValueSet() {
      if (!this.referenceLists || !this.referenceLists.keywordList) return [];
      let keywordHasValue = {}
      this.referenceLists.keywordList.forEach((k) => {
        if (k.hasValue) keywordHasValue[k.name] = true;
      });
      return keywordHasValue;
    },
    featList() {
      if (!this.referenceLists || !this.referenceLists.featList) return [];
      return this.referenceLists.featList.filter((f) => !this.cardTemp.feats.map(x => x && x.name).includes(f));
    },
    editionList() {
      return (this.referenceLists && this.referenceLists.editionList) || [];
    },
    setList() {
      return (this.referenceLists && this.referenceLists.setList) || [];
    },
    rarityList() {
      return (this.referenceLists && this.referenceLists.rarityList) || [];
    }
  },
  watch: {
    card() {
      this.imageUrlOverride = null;
      this.$nextTick(() => {
        this.updateTemp();
      });
    },
    cardData: {
      handler() {
        this.updateJson();
      },
      deep: true,
    },
    cardJsonWrapped(newValue) {
      this.$store.commit("saveSettings", { isEditTextWrapped: newValue });
    },
    viewOption(newValue) {
      this.$store.commit("saveSettings", { editViewOption: newValue });
    },
    cardJson(newValue) {
      try {
        if (this.cardJsonSelected) {
          let data = JSON.parse(newValue);
          data.index = this.card;
          this.cardIndex[this.card] = data;
          this.updateTemp();
        }
      } catch {
        // We honestly don't care if you want to make invalid javascript
      }
    },
    cardJsonSelected() {
      this.updateJson();
    },
  },
  mounted() {
    this.mapper = createMapper(this, "cardData", "cardTemp");
    if (this.cardData) {
      this.updateJson();
      this.updateTemp();
    }
    this.cardJsonWrapped = this.$store.state.settings.isEditTextWrapped;
    this.viewOption = this.$store.state.settings.editViewOption;
    this.$store.dispatch("loadCardData").then(() => {
      if (!this.cardIndex[this.card]) {
        this.$store.commit("setShow404", true);
      }
    });
  },
  methods: {
    setImage(imageUrl) {
      if (!imageUrl) return;
      this.viewOption = "Art";
      this.imageUrlOverride = imageUrl;
    },
    updateJson() {
      if (this.cardJsonSelected) return;
      this.cardJson = JSON.stringify(
        this.cardData,
        (key, value) => {
          if (key !== "index") return value;
        },
        2
      );
    },
    updateTemp() {
      this.mapper.sync();
    },
    selectKeyword(val, index) {
      this.cardTemp.keywords[index] = { name: val };
    },
    deselectKeyword(index) {
      this.cardTemp.keywords.splice(index, 1);
    },
    selectFeat(val, index) {
      this.cardTemp.feats[index] = { name: val };
    },
    deselectFeat(index) {
      this.cardTemp.feats.splice(index, 1);
    },
    addPrintInfo() {
      this.cardTemp.printInfos.splice(0, 0, { });
    },
    removePrintInfo(index) {
      this.cardTemp.printInfos.splice(index, 1);
    },
    saveChanges() {
      this.$store.commit("saveEditedCards");
    },
  },
};
</script>

<style scoped>
.view-switch >>> * {
  flex: 1;
}

.editor {
  white-space: pre;
}

.editor-wrap {
  white-space: pre-wrap;
}

.card-image {
  max-height: 400px;
  max-width: 350px;
}

.card-view {
  position: sticky;
  top: 0px;
}

.bound-height {
  height: min(100%, 100vh);
}

.card-stat-label {
  float: left;
  font-weight: bold;
  text-align: left;
  width: 35%;
  line-height: 24px;
}

.card-stat-value {
  float: right;
  width: 64%;
}
</style>