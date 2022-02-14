<template>
  <header-footer>
    <b-container fluid @focusout="saveChanges">
      <div class="my-2 text-center">
        <p>Welcome to the card builder!<br />Select a ruleset to get started. The page will save your changes.</p>
      </div>
      <b-row>
        <b-col cols="12">
          <b-select v-model="selectedRulesetOption" :options="rulesetOptions"></b-select>
        </b-col>
      </b-row>
      <template v-if="cardsLoaded">
        <h3 class="my-2">{{ cardTemp.name || "Untitled" }}</h3>
        <b-row>
          <b-col cols="12" md="6" class="d-flex flex-column">
            <div
              class="card-view d-flex flex-column pb-2"
              :class="viewOption === 'JSON' ? 'bound-height' : 'align-items-center'"
            >
              <b-radio-group v-model="viewOption" :options="['Art', 'JSON']" class="mb-2 w-100 view-switch" buttons />

              <card-image-creator
                :card-data="cardData"
                :card-image-url="cardUserImageDataUrl"
                @input="(x) => (cardImageDataUrl = x)"
                :main-html.sync="formatText.main.text"
                :flavor-html.sync="formatText.flavor.text"
              />

              <!-- Image -->
              <template v-if="viewOption === 'Art'">
                <b-button class="mb-2" variant="outline-primary" block @click="uploadImage">Upload Image</b-button>
                <img ref="imageActual" class="card-image" :src="cardImageDataUrl" />
              </template>
              <!-- JSON -->
              <template v-if="viewOption === 'JSON'">
                <b-row>
                  <b-col cols="6">
                    <b-button class="mb-2" block variant="outline-primary" @click="uploadJson">Upload JSON</b-button>
                  </b-col>
                  <b-col cols="6">
                    <b-button class="mb-2" block variant="outline-primary" @click="downloadJson"
                      >Download JSON</b-button
                    >
                  </b-col>
                </b-row>
                <b-textarea
                  :class="'text-monospace flex-fill' + (cardJsonWrapped ? ' editor-wrap' : ' editor')"
                  v-model="cardJson"
                  rows="10"
                  size="sm"
                  @focus="cardJsonSelected = true"
                  @blur="cardJsonSelected = false"
                ></b-textarea>
                <b-checkbox v-model="cardJsonWrapped">Wrap Text</b-checkbox>
              </template>
            </div>
          </b-col>

          <b-col cols="12" md="6">
            <!-- Reset -->
            <b-btn class="mb-2" block variant="outline-secondary" @click="reset">Reset</b-btn>

            <div class="p-1">
              <!-- Name -->
              <div class="clearfix">
                <div class="card-stat-label"><span>Card Name:</span></div>
                <div class="card-stat-value" @focusout="refreshCache('name')">
                  <b-form-group
                    :state="infoCache.validationState['name']"
                    :invalid-feedback="infoCache.validationText['name']"
                  >
                    <b-form-input v-model="cardTemp.name" @input="refreshCache('name')" />
                  </b-form-group>
                </div>
              </div>
              <!-- Level -->
              <div class="clearfix">
                <div class="card-stat-label"><span>Level:</span></div>
                <div class="card-stat-value" @focusout="refreshCache('level')">
                  <b-form-group
                    :state="infoCache.validationState['level']"
                    :invalid-feedback="infoCache.validationText['level']"
                  >
                    <b-form-input v-model="cardTemp.level" @input="refreshCache('level')" />
                  </b-form-group>
                </div>
              </div>
              <!-- Alignment -->
              <div class="clearfix">
                <div class="card-stat-label"><span>Alignment:</span></div>
                <div class="card-stat-value" @focusout="refreshCache('alignment')">
                  <b-form-group
                    :state="infoCache.validationState['alignment']"
                    :invalid-feedback="infoCache.validationText['alignment']"
                  >
                    <b-form-select
                      v-model="cardTemp.alignment"
                      :options="alignmentList"
                      @input="refreshCache('alignment')"
                    >
                      <template #first>
                        <b-form-select-option :value="undefined"></b-form-select-option>
                      </template>
                    </b-form-select>
                  </b-form-group>
                </div>
              </div>
              <!-- Type -->
              <div class="clearfix">
                <div class="card-stat-label"><span>Type:</span></div>
                <div class="card-stat-value" @focusout="refreshCache('type')">
                  <b-form-group
                    :state="infoCache.validationState['type']"
                    :invalid-feedback="infoCache.validationText['type']"
                  >
                    <b-form-select v-model="cardTemp.type" :options="typeList" @input="refreshCache('type')" />
                  </b-form-group>
                </div>
              </div>
              <!-- Class -->
              <div class="clearfix">
                <div class="card-stat-label"><span>Class:</span></div>
                <div class="card-stat-value" @focusout="refreshCache('class')">
                  <b-form-group
                    :state="infoCache.validationState['class']"
                    :invalid-feedback="infoCache.validationText['class']"
                  >
                    <v-select
                      multiple
                      v-model="cardTemp.classes"
                      :options="classList"
                      placeholder="(Classless)"
                      @input="refreshCache('class')"
                    />
                  </b-form-group>
                </div>
              </div>
              <!-- Attack -->
              <div class="clearfix">
                <div class="card-stat-label"><span>Attack:</span></div>
                <div class="card-stat-value" @focusout="refreshCache('attack')">
                  <b-form-group
                    :state="infoCache.validationState['attack']"
                    :invalid-feedback="infoCache.validationText['attack']"
                  >
                    <b-form-input v-model="cardTemp.attack" @input="refreshCache('attack')" />
                  </b-form-group>
                </div>
              </div>
              <!-- Armor Class -->
              <div class="clearfix">
                <div class="card-stat-label"><span>Armor Class:</span></div>
                <div class="card-stat-value" @focusout="refreshCache('armorClass')">
                  <b-form-group
                    :state="infoCache.validationState['armorClass']"
                    :invalid-feedback="infoCache.validationText['armorClass']"
                  >
                    <b-form-input v-model="cardTemp.armorClass" @input="refreshCache('armorClass')" />
                  </b-form-group>
                </div>
              </div>
              <!-- Skill -->
              <div class="clearfix">
                <div class="card-stat-label"><span>Skill:</span></div>
                <div class="card-stat-value" @focusout="refreshCache('skill')">
                  <b-form-group
                    :state="infoCache.validationState['skill']"
                    :invalid-feedback="infoCache.validationText['skill']"
                  >
                    <b-form-input v-model="cardTemp.skill" @input="refreshCache('skill')" />
                  </b-form-group>
                </div>
              </div>
              <!-- Hit Points -->
              <div class="clearfix">
                <div class="card-stat-label">
                  <span>Hit Points:</span>
                </div>
                <div class="card-stat-value" @focusout="refreshCache('hitPoints')">
                  <b-form-group
                    :state="infoCache.validationState['hitPoints']"
                    :invalid-feedback="infoCache.validationText['hitPoints']"
                  >
                    <b-form-input v-model="cardTemp.hitPoints" @input="refreshCache('hitPoints')" />
                  </b-form-group>
                </div>
              </div>
              <!-- Faction -->
              <div class="clearfix">
                <div class="card-stat-label"><span>Faction:</span></div>
                <div class="card-stat-value" @focusout="refreshCache('faction')">
                  <b-form-group
                    :state="infoCache.validationState['faction']"
                    :invalid-feedback="infoCache.validationText['faction']"
                  >
                    <v-select
                      multiple
                      v-model="cardTemp.factions"
                      :options="factionList"
                      @input="refreshCache('faction')"
                    />
                  </b-form-group>
                </div>
              </div>
              <!-- Traits -->
              <div class="clearfix">
                <div class="card-stat-label"><span>Traits:</span></div>
                <div class="card-stat-value" @focusout="refreshCache('traits')">
                  <b-form-group
                    :state="infoCache.validationState['traits']"
                    :invalid-feedback="infoCache.validationText['traits']"
                  >
                    <v-select multiple v-model="cardTemp.traits" :options="traitList" @input="refreshCache('traits')" />
                  </b-form-group>
                </div>
              </div>
              <!-- Feats -->
              <div class="clearfix">
                <div class="card-stat-label"><span>Feats:</span></div>
                <div class="card-stat-value" @focusout="refreshCache('feats')">
                  <b-form-group
                    :state="infoCache.validationState['feats']"
                    :invalid-feedback="infoCache.validationText['feats']"
                  >
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
                              @input="refreshCache('feats')"
                            />
                          </b-input-group>
                        </b-col>
                      </template>
                    </b-form-row>
                  </b-form-group>
                </div>
              </div>
              <!-- Misc -->
              <div class="clearfix">
                <div class="card-stat-label"><span>Misc:</span></div>
                <div class="card-stat-value" @focusout="refreshCache('misc')">
                  <b-form-group
                    :state="infoCache.validationState['misc']"
                    :invalid-feedback="infoCache.validationText['misc']"
                  >
                    <b-form-row
                      v-for="i in cardTemp.selectedMisc.length + Math.min(1, miscList.length)"
                      :key="'Misc' + i"
                    >
                      <template v-if="cardTemp.selectedMisc[i - 1] == null">
                        <b-col cols="8">
                          <b-select
                            v-model="cardTemp.selectedMisc[i - 1]"
                            :options="miscList"
                            @input="selectMisc(i - 1)"
                          >
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
                              @input="refreshCache('misc')"
                            />
                          </b-input-group>
                        </b-col>
                      </template>
                    </b-form-row>
                  </b-form-group>
                </div>
              </div>
              <!-- Text -->
              <div class="my-3" @focusout="refreshCache('text')">
                <b-form-group
                  :state="infoCache.validationState['text']"
                  :invalid-feedback="infoCache.validationText['text']"
                >
                  <b-form-textarea
                    rows="4"
                    :value="formatText.main.isAuto ? cardTemp.text : cardTemp.textFormat"
                    @input="updateTextEditor"
                    placeholder="[Card Text]"
                  />
                  <b-checkbox v-model="formatText.main.isAuto">Auto-format</b-checkbox>
                </b-form-group>
              </div>
              <!-- Flavor Traits -->
              <div class="clearfix">
                <div class="card-stat-label"><span>Flavor Traits:</span></div>
                <div
                  class="card-stat-value"
                  @focusout="refreshCache('flavorTraits', cardTemp.printInfo.flavorTraits.join('/'))"
                >
                  <b-form-group
                    :state="infoCache.validationState['flavorTraits']"
                    :invalid-feedback="infoCache.validationText['flavorTraits']"
                  >
                    <v-select
                      multiple
                      taggable
                      v-model="cardTemp.printInfo.flavorTraits"
                      :options="flavorTraitList"
                      @input="refreshCache('flavorTraits', cardTemp.printInfo.flavorTraits.join('/'))"
                    />
                  </b-form-group>
                </div>
              </div>
              <!-- Flavor Text -->
              <div class="my-2" @focusout="refreshCache('flavorText', cardTemp.printInfo.flavorText)">
                <b-form-group
                  :state="infoCache.validationState['flavorText']"
                  :invalid-feedback="infoCache.validationText['flavorText']"
                >
                  <b-form-textarea
                    rows="2"
                    :value="
                      formatText.flavor.isAuto ? cardTemp.printInfo.flavorText : cardTemp.printInfo.flavorTextFormat
                    "
                    @input="updateFlavorTextEditor"
                    placeholder="[Flavor Text]"
                  />
                  <b-checkbox v-model="formatText.flavor.isAuto">Auto-format</b-checkbox>
                </b-form-group>
              </div>
            </div>
          </b-col>

          <b-col cols="12">
            <b-button class="mb-2" block variant="primary" size="lg" @click="downloadImage"
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
import utility from "@/scripts/utility.js";
import rulesets from "@/scripts/rulesets/cardRules.js";
import CardImageCreator from "@/components/builder/CardImageCreator.vue";
import { createMapper } from "@/scripts/cardMapper.js";

const rulesetMap = {};
rulesets.forEach((x) => {
  rulesetMap[x.description] = x.ruleset;
});

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

function defaultInfoCache() {
  return {
    validationText: {},
    validationState: {},
    points: {},
    pointInfo: {},
  };
}

export default {
  name: "BuildCard",
  components: {
    HeaderFooter,
    CardImageCreator,
  },
  data() {
    return {
      rulesetOptions: rulesets.map((x) => x.description),
      selectedRulesetOption: rulesets[0].description,
      infoCache: defaultInfoCache(),
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
    selectedRuleset() {
      return rulesetMap[this.selectedRulesetOption];
    },
    hasValidationErrors() {
      return Object.values(this.infoCache.validationText).some((x) => x);
    },
    cardsLoaded() {
      return this.$store.state.cardsLoaded;
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
    selectedRulesetOption() {
      this.infoCache = defaultInfoCache();
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
      this.refreshCacheAll();
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
      this.refreshCache("feats");
    },
    deselectFeat(index) {
      this.cardTemp.featValues[this.cardTemp.selectedFeats[index]] = 0; // Force update
      Vue.delete(this.cardTemp.featValues, this.cardTemp.selectedFeats[index]);
      this.cardTemp.selectedFeats.splice(index, 1);
      this.refreshCache("feats");
    },
    selectMisc(index) {
      Vue.set(this.cardTemp.miscValues, this.cardTemp.selectedMisc[index], 0);
      this.refreshCache("misc");
    },
    deselectMisc(index) {
      this.cardTemp.miscValues[this.cardTemp.selectedMisc[index]] = 0; // Force update
      Vue.delete(this.cardTemp.miscValues, this.cardTemp.selectedMisc[index]);
      this.cardTemp.selectedMisc.splice(index, 1);
      this.refreshCache("misc");
    },
    updateTextEditor(newValue) {
      if (this.formatText.main.isAuto) {
        this.cardTemp.text = newValue;
        this.cardTemp.textFormat = "";
      } else {
        this.cardTemp.textFormat = newValue;
      }
      this.refreshCache("text");
    },
    updateFlavorTextEditor(newValue) {
      if (this.formatText.flavor.isAuto) {
        this.cardTemp.printInfo.flavorText = newValue;
        this.cardTemp.printInfo.flavorTextFormat = "";
      } else {
        this.cardTemp.printInfo.flavorTextFormat = newValue;
      }
      this.refreshCache("flavorText", this.cardTemp.printInfo.flavorText);
    },

    // -------------- //
    // - Info Cache - //
    // -------------- //

    refreshCache(prop, val) {
      this.$nextTick(() => {
        let propConfig = this.selectedRuleset && this.selectedRuleset[prop];
        let validationText =
          propConfig &&
          propConfig.validate &&
          propConfig.validate(val || this.cardData[prop], this.cardData, this.referenceLists);
        Vue.set(this.infoCache.validationText, prop, validationText);
        Vue.set(this.infoCache.validationState, prop, validationText ? false : null);
        if (!validationText) {
          let points =
            propConfig &&
            propConfig.computePoints &&
            propConfig.computePoints(val || this.cardData[prop], this.cardData, this.referenceLists);
          let pointInfo = propConfig && propConfig.pointInfo;
          Vue.set(this.infoCache.points, prop, points);
          Vue.set(this.infoCache.pointInfo, prop, pointInfo);
        }
      });
    },
    refreshCacheAll() {
      this.refreshCache("name");
      this.refreshCache("text");
      this.refreshCache("type");
      this.refreshCache("alignment");
      this.refreshCache("class");
      this.refreshCache("faction");
      this.refreshCache("attack");
      this.refreshCache("armorClass");
      this.refreshCache("skill");
      this.refreshCache("hitPoints");
      this.refreshCache("level");
      this.refreshCache("traits");
      this.refreshCache("feats");
      this.refreshCache("misc");
      this.refreshCache("editions");
      this.refreshCache("errata");
      this.refreshCache("challengeLord");
      this.refreshCache("printInfos");
      this.refreshCache("flavorText", this.cardTemp.printInfo.flavorText);
      this.refreshCache("flavorTraits", this.cardTemp.printInfo.flavorTraits.join("/"));
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
        if (parsed.selectedRulesetOption && rulesetMap[parsed.selectedRulesetOption]) {
          this.selectedRulesetOption = parsed.selectedRulesetOption;
        }
      }
    },
    saveChanges() {
      localStorage.setItem(
        "cardBuilderSettings",
        JSON.stringify({
          cardData: this.cardData,
          cardUserImageDataUrl: this.cardUserImageDataUrl,
          selectedRulesetOption: this.selectedRulesetOption,
        })
      );
    },
    uploadImage() {
      utility.readImage().then((response) => {
        this.cardUserImageDataUrl = response;
      });
    },
    downloadImage() {
      this.refreshCacheAll();
      this.$nextTick(() =>
        this.$nextTick(() => {
          if (this.hasValidationErrors) {
            alert("Whoops! Looks like this card isn't valid.");
            return;
          }
          let filename = (this.cardData.name || "Untitled").replace(/[^a-z0-9]/gi, "_") + ".png";
          utility.saveImage(this.cardImageDataUrl, filename);
        })
      );
    },
    uploadJson() {
      utility.readText().then((response) => {
        try {
          this.cardData = JSON.parse(response);
          this.mapper.sync();
          this.refreshCacheAll();
        } catch (error) {
          alert("An error occurred reading the card data: " + error);
        }
      });
    },
    downloadJson() {
      let filename = (this.cardData.name || "Untitled").replace(/[^a-z0-9]/gi, "_") + ".json";
      utility.saveText(this.cardJson, filename);
    },
    reset() {
      if (confirm("Are you sure you want to reset everything?")) {
        this.cardData = {};
        this.cardUserImageDataUrl = null;
        this.mapper.sync();
      }
      // Clear validation (validation occurs next tick)
      this.$nextTick(() => this.$nextTick(() => (this.infoCache = defaultInfoCache())));
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