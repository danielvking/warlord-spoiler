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
            <div class="card-view d-flex flex-column pb-2 align-items-center">
              <card-image-creator
                :card-data="cardData"
                :card-image-url="cardUserImageDataUrl"
                :points="infoCache.pointTotal"
                @input="(x) => (cardImageDataUrl = x)"
                :main-html.sync="formatText.main.text"
                :flavor-html.sync="formatText.flavor.text"
              />

              <!-- Image -->
              <b-button class="mb-2" variant="outline-primary" block @click="uploadImage">Upload Image</b-button>
              <img ref="imageActual" class="card-image" :src="cardImageDataUrl" />
              <div class="w-100 mt-2">
                <b-row>
                  <b-col cols="6">
                    <b-button variant="outline-primary" block @click="importCard">Import Card</b-button>
                  </b-col>
                  <b-col cols="6">
                    <b-button variant="outline-primary" block @click="exportCard">Export Card</b-button>
                  </b-col>
                </b-row>
                <!-- Points Desktop -->
                <div v-if="infoCache.pointTotal" class="point-display d-none d-md-block border-secondary mt-2">
                  <h3 class="my-0 text-center">{{ infoCache.pointTotal }} Points</h3>
                </div>
              </div>
            </div>
          </b-col>

          <b-col cols="12" md="6">
            <!-- Points Mobile -->
            <div v-if="infoCache.pointTotal" class="point-display d-block d-md-none border-secondary mb-2">
              <h3 class="my-0 text-center">{{ infoCache.pointTotal }} Points</h3>
            </div>

            <!-- Reset -->
            <b-btn class="mb-2" block variant="outline-secondary" @click="reset">Reset</b-btn>

            <div class="p-1">
              <!-- Name -->
              <div class="clearfix">
                <div class="card-stat-label"><span>Card Name:</span></div>
                <div class="card-stat-value">
                  <info-helper :info-cache="infoCache" property="name" @focusout="refreshCache('name')">
                    <b-form-input v-model="cardTemp.name" @input="refreshCache('name')" />
                  </info-helper>
                </div>
              </div>
              <!-- Level -->
              <div class="clearfix">
                <div class="card-stat-label"><span>Level:</span></div>
                <div class="card-stat-value">
                  <info-helper :info-cache="infoCache" property="level" @focusout="refreshCache('level')">
                    <b-form-input v-model="cardTemp.level" @input="refreshCache('level')" />
                  </info-helper>
                </div>
              </div>
              <!-- Alignment -->
              <div class="clearfix">
                <div class="card-stat-label"><span>Alignment:</span></div>
                <div class="card-stat-value">
                  <info-helper :info-cache="infoCache" property="alignment" @focusout="refreshCache('alignment')">
                    <b-form-select
                      v-model="cardTemp.alignment"
                      :options="alignmentList"
                      @input="refreshCache('alignment')"
                    >
                      <template #first>
                        <b-form-select-option :value="undefined"></b-form-select-option>
                      </template>
                    </b-form-select>
                  </info-helper>
                </div>
              </div>
              <!-- Type -->
              <div class="clearfix">
                <div class="card-stat-label"><span>Type:</span></div>
                <div class="card-stat-value">
                  <info-helper :info-cache="infoCache" property="type" @focusout="refreshCache('type')">
                    <b-form-select v-model="cardTemp.type" :options="typeList" @input="refreshCache('type')" />
                  </info-helper>
                </div>
              </div>
              <!-- Class -->
              <div class="clearfix">
                <div class="card-stat-label"><span>Class:</span></div>
                <div class="card-stat-value">
                  <info-helper :info-cache="infoCache" property="class" @focusout="refreshCache('class')">
                    <v-select
                      multiple
                      v-model="cardTemp.classes"
                      :options="classList"
                      placeholder="(Classless)"
                      @input="refreshCache('class')"
                    />
                  </info-helper>
                </div>
              </div>
              <!-- Attack -->
              <div class="clearfix">
                <div class="card-stat-label"><span>Attack:</span></div>
                <div class="card-stat-value">
                  <info-helper :info-cache="infoCache" property="attack" @focusout="refreshCache('attack')">
                    <b-form-input v-model="cardTemp.attack" @input="refreshCache('attack')" />
                  </info-helper>
                </div>
              </div>
              <!-- Armor Class -->
              <div class="clearfix">
                <div class="card-stat-label"><span>Armor Class:</span></div>
                <div class="card-stat-value">
                  <info-helper :info-cache="infoCache" property="armorClass" @focusout="refreshCache('armorClass')">
                    <b-form-input v-model="cardTemp.armorClass" @input="refreshCache('armorClass')" />
                  </info-helper>
                </div>
              </div>
              <!-- Skill -->
              <div class="clearfix">
                <div class="card-stat-label"><span>Skill:</span></div>
                <div class="card-stat-value">
                  <info-helper :info-cache="infoCache" property="skill" @focusout="refreshCache('skill')">
                    <b-form-input v-model="cardTemp.skill" @input="refreshCache('skill')" />
                  </info-helper>
                </div>
              </div>
              <!-- Hit Points -->
              <div class="clearfix">
                <div class="card-stat-label">
                  <span>Hit Points:</span>
                </div>
                <div class="card-stat-value">
                  <info-helper :info-cache="infoCache" property="hitPoints" @focusout="refreshCache('hitPoints')">
                    <b-form-input v-model="cardTemp.hitPoints" @input="refreshCache('hitPoints')" />
                  </info-helper>
                </div>
              </div>
              <!-- Faction -->
              <div class="clearfix">
                <div class="card-stat-label"><span>Faction:</span></div>
                <div class="card-stat-value">
                  <info-helper :info-cache="infoCache" property="faction" @focusout="refreshCache('faction')">
                    <v-select
                      multiple
                      v-model="cardTemp.factions"
                      :options="factionList"
                      @input="refreshCache('faction')"
                    />
                  </info-helper>
                </div>
              </div>
              <!-- Traits -->
              <div class="clearfix">
                <div class="card-stat-label"><span>Traits:</span></div>
                <div class="card-stat-value">
                  <info-helper :info-cache="infoCache" property="traits" @focusout="refreshCache('traits')">
                    <v-select multiple v-model="cardTemp.traits" :options="traitList" @input="refreshCache('traits')" />
                  </info-helper>
                </div>
              </div>
              <!-- Feats -->
              <div class="clearfix">
                <div class="card-stat-label"><span>Feats:</span></div>
                <div class="card-stat-value">
                  <info-helper :info-cache="infoCache" property="feats" @focusout="refreshCache('feats')">
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
                  </info-helper>
                </div>
              </div>
              <!-- Misc -->
              <div class="clearfix">
                <div class="card-stat-label"><span>Misc:</span></div>
                <div class="card-stat-value">
                  <info-helper :info-cache="infoCache" property="misc" @focusout="refreshCache('misc')">
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
                  </info-helper>
                </div>
              </div>
              <!-- Text -->
              <div class="my-3">
                <info-helper :info-cache="infoCache" property="text" @focusout="refreshCache('text')">
                  <b-form-textarea
                    rows="4"
                    :value="formatText.main.isAuto ? cardTemp.text : cardTemp.textFormat"
                    @input="updateTextEditor"
                    placeholder="[Card Text]"
                  />
                  <b-checkbox v-model="formatText.main.isAuto">Auto-format</b-checkbox>
                </info-helper>
              </div>
              <!-- Flavor Traits -->
              <div class="clearfix">
                <div class="card-stat-label"><span>Flavor Traits:</span></div>
                <div class="card-stat-value">
                  <info-helper
                    :info-cache="infoCache"
                    property="flavorTraits"
                    @focusout="refreshCache('flavorTraits', cardTemp.printInfo.flavorTraits.join('/'))"
                  >
                    <v-select
                      multiple
                      taggable
                      v-model="cardTemp.printInfo.flavorTraits"
                      :options="flavorTraitList"
                      @input="refreshCache('flavorTraits', cardTemp.printInfo.flavorTraits.join('/'))"
                    />
                  </info-helper>
                </div>
              </div>
              <!-- Flavor Text -->
              <div class="my-2">
                <info-helper :info-cache="infoCache" property="flavorText" @focusout="refreshCache('flavorText')">
                  <b-form-textarea
                    rows="2"
                    :value="
                      formatText.flavor.isAuto ? cardTemp.printInfo.flavorText : cardTemp.printInfo.flavorTextFormat
                    "
                    @input="updateFlavorTextEditor"
                    placeholder="[Flavor Text]"
                  />
                  <b-checkbox v-model="formatText.flavor.isAuto">Auto-format</b-checkbox>
                </info-helper>
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
import InfoHelper from "@/components/builder/InfoHelper.vue";
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
    pointTotal: 0,
  };
}

export default {
  name: "BuildCard",
  components: {
    HeaderFooter,
    CardImageCreator,
    InfoHelper,
  },
  data() {
    return {
      rulesetOptions: rulesets.map((x) => x.description),
      selectedRulesetOption: rulesets[0].description,
      infoCache: defaultInfoCache(),
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
    pointTotal() {
      return Object.values(this.infoCache.points).reduce((x, y) => x + (y || 0), 0);
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
      this.refreshCacheAll();
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
    this.refreshCacheAll();
    this.updateTemp();
  },
  methods: {
    // ------------------- //
    // - Card Editing UI - //
    // ------------------- //

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
        } else {
          Vue.set(this.infoCache.points, prop, null);
          Vue.set(this.infoCache.pointInfo, prop, null);
        }
        this.infoCache.pointTotal = Object.values(this.infoCache.points).reduce((x, y) => x + (y || 0), 0);
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
      utility
        .readImage()
        .then((response) => {
          this.cardUserImageDataUrl = response;
        })
        .catch((error) => {
          alert(error);
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
    importCard() {
      utility.readText().then((response) => {
        try {
          let allCard = JSON.parse(response);
          this.cardUserImageDataUrl = allCard.image;
          this.cardData = allCard.cardData;
          this.updateTemp();
          this.refreshCacheAll();
        } catch (error) {
          alert("An error occurred reading the card data: " + error);
        }
      });
    },
    exportCard() {
      let filename = (this.cardData.name || "Untitled").replace(/[^a-z0-9]/gi, "_") + ".card";
      let allCard = {
        cardData: this.cardData,
        image: this.cardUserImageDataUrl,
      };
      utility.saveText(JSON.stringify(allCard), filename);
    },
    reset() {
      if (confirm("Are you sure you want to reset everything?")) {
        this.cardData = {};
        this.cardUserImageDataUrl = null;
        this.updateTemp();
      }
      // Clear validation (validation occurs next tick)
      this.$nextTick(() => this.$nextTick(() => (this.infoCache = defaultInfoCache())));
    },
  },
};
</script>

<style scoped>
.card-image {
  max-height: 400px;
  max-width: 350px;
}

.card-view {
  position: sticky;
  top: 0px;
}

.point-display {
  position: sticky;
  top: 0;
  z-index: 1;
  border-width: 1px 0px;
  border-style: solid;
  background-color: white;
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
