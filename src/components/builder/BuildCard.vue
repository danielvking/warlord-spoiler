<template>
  <header-footer>
    <b-container fluid @focusout="saveChanges">
      <div class="my-2 text-center">
        <span>Welcome to the card builder!</span>
      </div>
      <template v-if="cardIndex">
        <h3 class="my-2">{{ cardTemp.name || "Untitled" }}</h3>
        <b-row>
          <b-col cols="12" md="6" class="d-flex flex-column">
            <div
              class="card-view d-flex flex-column pb-2"
              :class="viewOption === 'JSON' ? 'bound-height' : 'align-items-center'"
            >
              <b-radio-group v-model="viewOption" :options="['Art', 'JSON']" class="mb-2 w-100" buttons />

              <card-image-creator
                :card-data="cardData"
                :card-image-url="cardUserImageDataUrl"
                @input="(x) => (cardImageDataUrl = x)"
                :main-html.sync="formatText.main.text"
                :flavor-html.sync="formatText.flavor.text"
              />

              <!-- Image -->
              <template v-if="viewOption === 'Art'">
                <b-button variant="outline-primary" class="mb-2 w-100" @click="uploadImage">Upload Image</b-button>
                <img ref="imageActual" class="card-image" :src="cardImageDataUrl" />
              </template>
              <!-- JSON -->
              <template v-if="viewOption === 'JSON'">
                <b-button class="mb-2 w-100" variant="outline-primary" @click="uploadJson">Upload JSON</b-button>
                <b-textarea
                  :class="'text-monospace flex-fill' + (cardJsonWrapped ? ' editor-wrap' : ' editor')"
                  v-model="cardJson"
                  rows="10"
                  size="sm"
                  @focus="cardJsonSelected = true"
                  @blur="cardJsonSelected = false"
                ></b-textarea>
                <b-checkbox v-model="cardJsonWrapped">Wrap Text</b-checkbox>
                <b-button class="my-2 w-100" variant="outline-secondary" @click="downloadJson">Download JSON</b-button>
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
                      <b-form-select-option :value="undefined"></b-form-select-option>
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
              <!-- Class -->
              <div class="clearfix">
                <div class="card-stat-label"><span>Class:</span></div>
                <div class="card-stat-value">
                  <v-select multiple v-model="cardTemp.classes" :options="classList" placeholder="(Classless)" />
                </div>
              </div>
              <!-- Attack -->
              <div class="clearfix">
                <div class="card-stat-label"><span>Attack:</span></div>
                <div class="card-stat-value">
                  <b-form-input v-model="cardTemp.attack" />
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
                  <v-select multiple v-model="cardTemp.factions" :options="factionList" />
                </div>
              </div>
              <!-- Traits -->
              <div class="clearfix">
                <div class="card-stat-label"><span>Traits:</span></div>
                <div class="card-stat-value">
                  <v-select multiple v-model="cardTemp.traits" :options="traitList" />
                </div>
              </div>
              <!-- Feats -->
              <div class="clearfix">
                <div class="card-stat-label"><span>Feats:</span></div>
                <div class="card-stat-value">
                  <b-form-row
                    v-for="i in cardTemp.selectedFeats.length + Math.min(1, featList.length)"
                    :key="'Feat' + i"
                  >
                    <template v-if="cardTemp.selectedFeats[i - 1] == null">
                      <b-col cols="8">
                        <b-select
                          v-model="cardTemp.selectedFeats[i - 1]"
                          :options="featList"
                          @input="selectFeat(i - 1)"
                        >
                          <template v-slot:first>
                            <b-form-select-option :value="undefined">- Select Feat -</b-form-select-option>
                          </template>
                        </b-select>
                      </b-col>
                    </template>
                    <template v-else>
                      <label class="col-7 col-form-label">{{ cardTemp.selectedFeats[i - 1] }}:</label>
                      <b-col cols="1">
                        <a href="#" @click.prevent="deselectFeat(i - 1)"><span class="font-default">✘</span></a>
                      </b-col>
                      <b-col cols="4">
                        <b-input-group>
                          <b-form-input
                            :id="'txtFeat' + i"
                            type="number"
                            v-model.number="cardTemp.featValues[cardTemp.selectedFeats[i - 1]]"
                          />
                        </b-input-group>
                      </b-col>
                    </template>
                  </b-form-row>
                </div>
              </div>
              <!-- Misc -->
              <div class="clearfix">
                <div class="card-stat-label"><span>Misc:</span></div>
                <div class="card-stat-value">
                  <b-form-row
                    v-for="i in cardTemp.selectedMisc.length + Math.min(1, miscList.length)"
                    :key="'Misc' + i"
                  >
                    <template v-if="cardTemp.selectedMisc[i - 1] == null">
                      <b-col cols="8">
                        <b-select v-model="cardTemp.selectedMisc[i - 1]" :options="miscList" @input="selectMisc(i - 1)">
                          <template v-slot:first>
                            <b-form-select-option :value="undefined">- Select Misc -</b-form-select-option>
                          </template>
                        </b-select>
                      </b-col>
                    </template>
                    <template v-else>
                      <label class="col-7 col-form-label">{{ cardTemp.selectedMisc[i - 1] }}:</label>
                      <b-col cols="1">
                        <a href="#" @click.prevent="deselectMisc(i - 1)"><span class="font-default">✘</span></a>
                      </b-col>
                      <b-col cols="4">
                        <b-input-group>
                          <b-form-input
                            :id="'txtMisc' + i"
                            type="number"
                            v-model.number="cardTemp.miscValues[cardTemp.selectedMisc[i - 1]]"
                          />
                        </b-input-group>
                      </b-col>
                    </template>
                  </b-form-row>
                </div>
              </div>
              <!-- Text -->
              <div class="my-3">
                <b-form-textarea
                  rows="4"
                  :value="formatText.main.isAuto ? cardTemp.text : cardTemp.textFormat"
                  @input="updateTextEditor"
                  placeholder="[Card Text]"
                />
                <b-checkbox v-model="formatText.main.isAuto">Auto-format</b-checkbox>
              </div>
              <!-- Flavor Traits -->
              <div class="clearfix">
                <div class="card-stat-label"><span>Flavor Traits:</span></div>
                <div class="card-stat-value">
                  <v-select multiple taggable v-model="cardTemp.printInfo.flavorTraits" :options="flavorTraitList" />
                </div>
              </div>
              <!-- Flavor Text -->
              <div class="my-2">
                <b-form-textarea
                  rows="2"
                  :value="
                    formatText.flavor.isAuto ? cardTemp.printInfo.flavorText : cardTemp.printInfo.flavorTextFormat
                  "
                  @input="updateFlavorTextEditor"
                  placeholder="[Flavor Text]"
                />
                <b-checkbox v-model="formatText.flavor.isAuto">Auto-format</b-checkbox>
              </div>
            </div>
          </b-col>

          <b-col cols="12">
            <b-button variant="primary" size="lg" class="mb-2 w-100" @click="downloadImage"
              >Download Card Image</b-button
            >
          </b-col>
        </b-row>
      </template>
    </b-container>
  </header-footer>
</template>

<script>
import Vue from "vue";
import HeaderFooter from "@/components/shared/HeaderFooter.vue";
import utility from "@/utility.js";
import CardImageCreator from "@/components/builder/CardImageCreator.vue";
import { createMapper } from "@/cardMapper.js";

const mapperConfig = {
  props: {
    class: {
      initialize(vm, cardDataProp, cardMappedProp, config) {
        let { setProp, fromArrayToSlashes, cardKeyOrder } = config.utils;
        vm.$watch(cardMappedProp + ".classes", (newValue) => {
          let cardData = vm[cardDataProp];
          if (newValue.length !== 1) {
            newValue = ["Classless"].concat(newValue);
          }
          setProp(cardData, "class", fromArrayToSlashes(newValue), cardKeyOrder);
        });
      },
      sync(vm, cardDataProp, cardMappedProp, config) {
        let { fromSlashesToArray } = config.utils;
        let cardData = vm[cardDataProp],
          cardMapped = vm[cardMappedProp];
        cardMapped.classes = fromSlashesToArray(cardData.class).filter((x) => x !== "Classless");
      },
    },
    challengeLord: {},
    printInfos: {
      initialize(vm, cardDataProp, cardMappedProp, config) {
        let { setProp, fromArrayToSlashes, fromEmptyToUndefined, fixCarriageReturns, cardKeyOrder, printKeyOrder } =
          config.utils;
        vm.$watch(
          cardMappedProp + ".printInfo",
          (newValue) => {
            let cardData = vm[cardDataProp];
            if (newValue.flavorTraits[0] || newValue.flavorText) {
              let y = {};
              setProp(cardData, "printInfos", [y], cardKeyOrder);
              setProp(y, "flavorTraits", fromArrayToSlashes(newValue.flavorTraits || []), printKeyOrder);
              setProp(y, "flavorText", fromEmptyToUndefined(fixCarriageReturns(newValue.flavorText)), printKeyOrder);
              setProp(y, "flavorTextFormat", fromEmptyToUndefined(newValue.flavorTextFormat), printKeyOrder);
            } else {
              setProp(cardData, "printInfos", undefined, cardKeyOrder);
            }
          },
          { deep: true }
        );
      },
      sync(vm, cardDataProp, cardMappedProp, config) {
        let { fromSlashesToArray } = config.utils;
        let cardData = vm[cardDataProp],
          cardMapped = vm[cardMappedProp];
        cardMapped.printInfo = (cardData.printInfos || []).map((x) => {
          return {
            flavorTraits: fromSlashesToArray(x.flavorTraits),
            flavorText: x.flavorText,
            flavorTextFormat: x.flavorTextFormat,
          };
        })[0] || {
          flavorText: "",
          flavorTextFormat: "",
          flavorTraits: [],
        };
      },
    },
  },
};

function dehtml(html) {
  html = html.replace(/&nbsp;/gm, " ");
  html = html.replace(/<br>|<\/p><p>/gm, "\r\n");
  html = html.replace(/<[^<>]*>/gm, "");
  let txt = document.createElement("textarea");
  txt.innerHTML = html;
  html = txt.value; // Decode characters
  html = html.replace(/\s+/gm, " ");
  return html;
}

export default {
  name: "BuildCard",
  components: {
    HeaderFooter,
    CardImageCreator,
  },
  data() {
    return {
      viewOption: "Art",
      cardJson: "",
      cardJsonWrapped: false,
      cardJsonSelected: false,
      cardData: {},
      cardTemp: {
        name: "",
        text: "",
        textFormat: "",
        type: "",
        alignment: "",
        attack: "",
        armorClass: "",
        skill: "",
        hitPoints: "",
        level: "",
        classes: [],
        factions: [],
        traits: [],
        selectedFeats: [],
        featValues: {},
        selectedMisc: [],
        miscValues: {},
        printInfo: {
          flavorText: "",
          flavorTextFormat: "",
          flavorTraits: [],
        },
      },
      formatText: {
        main: {
          isAuto: true,
          text: "",
        },
        flavor: {
          isAuto: true,
          text: "",
        },
      },
      mapper: null,
      cardUserImageDataUrl: null,
      cardImageDataUrl: null,
    };
  },
  computed: {
    cardIndex() {
      return this.$store.state.editedCards;
    },
    referenceLists() {
      return this.$store.state.referenceLists;
    },
    typeList() {
      return ((this.referenceLists && this.referenceLists.typeList) || []).filter((x) => x === "Character");
    },
    alignmentList() {
      return (this.referenceLists && this.referenceLists.alignmentList) || [];
    },
    classList() {
      if (!this.referenceLists || !this.referenceLists.classList) return [];
      return this.referenceLists.classList.filter((t) => t !== "Classless" && !this.cardTemp.classes.includes(t));
    },
    factionList() {
      if (!this.referenceLists || !this.referenceLists.factionList) return [];
      return this.referenceLists.factionList.filter((t) => !this.cardTemp.factions.includes(t));
    },
    traitList() {
      if (!this.referenceLists || !this.referenceLists.traitList) return [];
      return this.referenceLists.traitList.filter((t) => !this.cardTemp.traits.includes(t));
    },
    featList() {
      if (!this.referenceLists || !this.referenceLists.featList) return [];
      return this.referenceLists.featList.filter((f) => !this.cardTemp.selectedFeats.includes(f));
    },
    miscList() {
      // I admit this is inelegant
      return ["Challenge Rating", "Charges", "GP"].filter((f) => !this.cardTemp.selectedMisc.includes(f));
    },
    flavorTraitList() {
      return (this.referenceLists && this.referenceLists.flavorTraitList) || [];
    },
  },
  watch: {
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
    cardJson() {
      try {
        if (this.cardJsonSelected) {
          this.cardData = JSON.parse(this.cardJson);
          this.updateTemp();
        }
      } catch {
        // We honestly don't care if you want to make invalid javascript
      }
    },
    cardJsonSelected() {
      this.updateJson();
    },

    // These all just sync formatting
    "formatText.main.isAuto"(newValue) {
      if (newValue) {
        this.formatText.main.text = "";
      }
      this.cardTemp.textFormat = this.formatText.main.text;
    },
    "formatText.main.text"() {
      if (!this.formatText.main.isAuto) {
        // Coerce
        this.formatText.main.text = this.cardTemp.textFormat;
      }
    },
    "cardTemp.text"() {
      if (!this.formatText.main.isAuto) {
        // Coerce
        this.cardTemp.text = dehtml(this.cardTemp.textFormat);
      }
    },
    "cardTemp.textFormat"(newValue) {
      if (!this.formatText.main.isAuto) {
        this.formatText.main.text = newValue;
        this.cardTemp.text = dehtml(newValue);
      }
    },
    "formatText.flavor.isAuto"(newValue) {
      if (newValue) {
        this.formatText.flavor.text = "";
      }
      this.cardTemp.printInfo.flavorTextFormat = this.formatText.flavor.text;
    },
    "formatText.flavor.text"() {
      if (!this.formatText.flavor.isAuto) {
        // Coerce
        this.formatText.flavor.text = this.cardTemp.printInfo.flavorTextFormat;
      }
    },
    "cardTemp.printInfo.flavorText"() {
      if (!this.formatText.flavor.isAuto) {
        // Coerce
        this.cardTemp.printInfo.flavorText = dehtml(this.cardTemp.printInfo.flavorTextFormat);
      }
    },
    "cardTemp.printInfo.flavorTextFormat"(newValue) {
      if (!this.formatText.flavor.isAuto) {
        this.formatText.flavor.text = newValue;
        this.cardTemp.printInfo.flavorText = dehtml(newValue);
      }
    },
  },
  mounted() {
    this.$store.dispatch("loadCardData");
    this.mapper = createMapper(this, "cardData", "cardTemp", mapperConfig);
    this.loadSaved();
    this.updateJson();
    this.updateTemp();
  },
  methods: {
    // ------------------- //
    // - Card Editing UI - //
    // ------------------- //

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
    selectFeat(index) {
      Vue.set(this.cardTemp.featValues, this.cardTemp.selectedFeats[index], 0);
    },
    deselectFeat(index) {
      this.cardTemp.featValues[this.cardTemp.selectedFeats[index]] = 0; // Force update
      Vue.delete(this.cardTemp.featValues, this.cardTemp.selectedFeats[index]);
      this.cardTemp.selectedFeats.splice(index, 1);
    },
    selectMisc(index) {
      Vue.set(this.cardTemp.miscValues, this.cardTemp.selectedMisc[index], 0);
    },
    deselectMisc(index) {
      this.cardTemp.miscValues[this.cardTemp.selectedMisc[index]] = 0; // Force update
      Vue.delete(this.cardTemp.miscValues, this.cardTemp.selectedMisc[index]);
      this.cardTemp.selectedMisc.splice(index, 1);
    },
    updateTextEditor(newValue) {
      if (this.formatText.main.isAuto) {
        this.cardTemp.text = newValue;
        this.cardTemp.textFormat = "";
      } else {
        this.cardTemp.textFormat = newValue;
      }
    },
    updateFlavorTextEditor(newValue) {
      if (this.formatText.flavor.isAuto) {
        this.cardTemp.printInfo.flavorText = newValue;
        this.cardTemp.printInfo.flavorTextFormat = "";
      } else {
        this.cardTemp.printInfo.flavorTextFormat = newValue;
      }
    },

    // ------------------- //
    // - Card Management - //
    // ------------------- //

    loadSaved() {
      let settings = localStorage.getItem("cardBuilderSettings");
      if (settings) {
        let parsed = JSON.parse(settings);
        this.cardData = parsed.cardData;
        this.cardUserImageDataUrl = parsed.cardUserImageDataUrl;
      }
    },
    saveChanges() {
      localStorage.setItem(
        "cardBuilderSettings",
        JSON.stringify({
          cardData: this.cardData,
          cardUserImageDataUrl: this.cardUserImageDataUrl,
        })
      );
    },
    uploadImage() {
      utility.readImage().then((response) => {
        this.cardUserImageDataUrl = response;
      });
    },
    downloadImage() {
      let filename = (this.cardData.name || "Untitled").replace(/[^a-z0-9]/gi, "_") + ".png";
      utility.saveImage(this.cardImageDataUrl, filename);
    },
    uploadJson() {
      utility.readText().then((response) => {
        try {
          this.cardData = JSON.parse(response);
          this.mapper.sync();
        } catch (error) {
          alert("An error occurred reading the card data: " + error);
        }
      });
    },
    downloadJson() {
      let filename = (this.cardData.name || "Untitled").replace(/[^a-z0-9]/gi, "_") + ".json";
      utility.saveText(this.cardJson, filename);
    },
  },
};
</script>

<style scoped>
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