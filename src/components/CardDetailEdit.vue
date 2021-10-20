<template>
  <b-container fluid @focusout="saveChanges">
    <div class="clearfix py-1">
      <div class="float-left">
        <router-link :to="{ name: 'searchPage' }"
          ><span class="font-default">&larr;</span> Return to
          search</router-link
        >
      </div>
      <div class="float-right">
        <a
          v-if="showSidebar"
          href="#"
          @click.prevent="removeCard(card)"
          aria-label="Cancel changes"
          ><font-awesome-icon icon="minus-square" /> Cancel changes</a
        >
      </div>
    </div>
    <template v-if="cardIndex">
      <h3 class="my-2">{{ cardTemp.name }}</h3>
      <b-radio-group
        v-model="viewOption"
        :options="['Art', 'JSON']"
        class="mb-2 w-100"
        buttons
      />
      <b-row>
        <!-- Image -->
        <b-col
          v-if="viewOption === 'Art'"
          cols="12"
          md="6"
          class="d-flex justify-content-center mb-2"
        >
          <img
            v-if="imageUrl"
            :src="imageUrlOverride || imageUrl"
            class="card-image"
          />
        </b-col>

        <!-- JSON -->
        <b-col
          v-if="viewOption === 'JSON'"
          cols="12"
          md="6"
          class="d-flex flex-column mb-2"
        >
          <b-textarea
            :class="
              'text-monospace flex-fill' +
              (cardJsonWrapped ? '' : ' text-nowrap')
            "
            v-model="cardJson"
            rows="10"
            size="sm"
            @focus="cardJsonSelected = true"
            @blur="cardJsonSelected = false"
          ></b-textarea>
          <b-checkbox v-model="cardJsonWrapped">Wrap Text</b-checkbox>
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
                <b-form-select
                  v-model="cardTemp.alignment"
                  :options="alignmentList"
                >
                  <template #first>
                    <b-form-select-option
                      :value="undefined"
                    ></b-form-select-option>
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
                <v-select
                  multiple
                  v-model="cardTemp.classes"
                  :options="classList"
                />
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
                <v-select
                  multiple
                  v-model="cardTemp.factions"
                  :options="factionList"
                />
              </div>
            </div>
            <!-- Traits -->
            <div class="clearfix">
              <div class="card-stat-label"><span>Traits:</span></div>
              <div class="card-stat-value">
                <v-select
                  multiple
                  v-model="cardTemp.traits"
                  :options="traitList"
                />
              </div>
            </div>
            <!-- Feats -->
            <div class="clearfix">
              <div class="card-stat-label"><span>Feats:</span></div>
              <div class="card-stat-value">
                <b-form-row
                  v-for="i in cardTemp.selectedFeats.length +
                  Math.min(1, featList.length)"
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
                          <b-form-select-option :value="undefined"
                            >- Select Feat -</b-form-select-option
                          >
                        </template>
                      </b-select>
                    </b-col>
                  </template>
                  <template v-else>
                    <label class="col-7 col-form-label"
                      >{{ cardTemp.selectedFeats[i - 1] }}:</label
                    >
                    <b-col cols="1">
                      <a href="#" @click.prevent="deselectFeat(i - 1)"
                        ><span class="font-default">✘</span></a
                      >
                    </b-col>
                    <b-col cols="4">
                      <b-input-group>
                        <b-form-input
                          :id="'txtFeat' + i"
                          type="number"
                          v-model.number="
                            cardTemp.featValues[cardTemp.selectedFeats[i - 1]]
                          "
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
                  v-for="i in cardTemp.selectedMisc.length +
                  Math.min(1, miscList.length)"
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
                          <b-form-select-option :value="undefined"
                            >- Select Misc -</b-form-select-option
                          >
                        </template>
                      </b-select>
                    </b-col>
                  </template>
                  <template v-else>
                    <label class="col-7 col-form-label"
                      >{{ cardTemp.selectedMisc[i - 1] }}:</label
                    >
                    <b-col cols="1">
                      <a href="#" @click.prevent="deselectMisc(i - 1)"
                        ><span class="font-default">✘</span></a
                      >
                    </b-col>
                    <b-col cols="4">
                      <b-input-group>
                        <b-form-input
                          :id="'txtMisc' + i"
                          type="number"
                          v-model.number="
                            cardTemp.miscValues[cardTemp.selectedMisc[i - 1]]
                          "
                        />
                      </b-input-group>
                    </b-col>
                  </template>
                </b-form-row>
              </div>
            </div>
            <!-- Editions -->
            <div class="clearfix my-2">
              <div class="card-stat-label"><span>Formats:</span></div>
              <div class="card-stat-value">
                <v-select
                  multiple
                  v-model="cardTemp.editions"
                  :options="editionList"
                />
              </div>
            </div>
            <!-- Challenge Lord -->
            <div class="clearfix">
              <div class="card-stat-label"></div>
              <div class="card-stat-value">
                <b-checkbox v-model="cardTemp.challengeLord"
                  >Is Challenge Lord</b-checkbox
                >
              </div>
            </div>
            <!-- Text -->
            <div class="my-3">
              <b-form-textarea
                rows="4"
                v-model="cardTemp.text"
                placeholder="[Card Text]"
              />
            </div>
            <!-- Print Infos -->
            <div class="clearfix py-1">
              <div class="float-right">
                <a
                  href="#"
                  @click.prevent="addPrintInfo"
                  aria-label="Add print info"
                >
                  <font-awesome-icon icon="plus-square" /> Add print info</a
                >
              </div>
            </div>
            <div v-for="(printInfo, i) in cardTemp.printInfos" :key="i">
              <!-- Set -->
              <div class="clearfix">
                <div class="card-stat-label"><span>Set:</span></div>
                <div class="card-stat-value">
                  <b-form-row>
                    <b-col cols="1">
                      <a href="#" @click.prevent="removePrintInfo(i)"
                        ><span class="font-default">✘</span></a
                      >
                    </b-col>
                    <b-col cols="11">
                      <b-form-select
                        v-model="printInfo.set"
                        :options="setList"
                      />
                    </b-col>
                  </b-form-row>
                </div>
              </div>
              <!-- Set Number -->
              <div class="clearfix">
                <div class="card-stat-label"><span>Set Number:</span></div>
                <div class="card-stat-value">
                  <b-input type="number" v-model.number="printInfo.setNumber" />
                </div>
              </div>
              <!-- Rarity -->
              <div class="clearfix">
                <div class="card-stat-label"><span>Rarity:</span></div>
                <div class="card-stat-value">
                  <b-form-select
                    v-model="printInfo.rarity"
                    :options="rarityList"
                  >
                    <template #first>
                      <b-form-select-option
                        :value="undefined"
                      ></b-form-select-option>
                    </template>
                  </b-form-select>
                </div>
              </div>
              <!-- Flavor Traits -->
              <div class="clearfix">
                <div class="card-stat-label"><span>Flavor Traits:</span></div>
                <div class="card-stat-value">
                  <v-select
                    multiple
                    taggable
                    v-model="printInfo.flavorTraits"
                    :options="flavorTraitList"
                  />
                </div>
              </div>
              <!-- Artist -->
              <div class="clearfix">
                <div class="card-stat-label"><span>Artist:</span></div>
                <div class="card-stat-value">
                  <b-input v-model="printInfo.artist" />
                </div>
              </div>
              <!-- Image URL -->
              <div class="clearfix">
                <div class="card-stat-label"><span>Image URL:</span></div>
                <div class="card-stat-value">
                  <b-form-row>
                    <b-col cols="1" class="d-flex align-items-center">
                      <a href="#" @click.prevent="setImage(printInfo.imageUrl)"
                        ><font-awesome-icon icon="eye"
                      /></a>
                    </b-col>
                    <b-col cols="11">
                      <b-input v-model="printInfo.imageUrl" />
                    </b-col>
                  </b-form-row>
                </div>
              </div>
              <!-- Flavor Text -->
              <div class="my-2">
                <b-form-textarea
                  rows="2"
                  v-model="printInfo.flavorText"
                  placeholder="[Flavor Text]"
                />
              </div>
            </div>
          </div>
        </b-col>
      </b-row>
      <!-- Errata -->
      <div class="my-3">
        <div class="font-weight-bold"><span>Rulings:</span></div>
        <div>
          <b-form-textarea rows="4" v-model="cardTemp.errata" />
        </div>
      </div>
    </template>
  </b-container>
</template>

<script>
import Vue from "vue";
import utility from "@/utility.js";
import addRemoveCardMixin from "@/mixins/addRemoveCardMixin.js";

// Static lists for preferred property order; just to keep things organized
const cardKeyOrder = [
  "name",
  "text",
  "type",
  "alignment",
  "class",
  "faction",
  "attack",
  "armorClass",
  "skill",
  "hitPoints",
  "level",
  "traits",
  "feats",
  "misc",
  "editions",
  "errata",
  "challengeLord",
  "printInfos",
];
const printKeyOrder = [
  "set",
  "setNumber",
  "rarity",
  "flavorText",
  "flavorTraits",
  "artist",
  "imageUrl",
];

// Utility functions for data conversions
function setProp(obj, key, value, keyOrder) {
  if (value === undefined) {
    Vue.delete(obj, key);
    return;
  }
  if (obj[key] === undefined) {
    utility.insertKeyOrdered(obj, key, keyOrder, Vue.set, Vue.delete);
  }
  obj[key] = value;
}
function fromEmptyToUndefined(str) {
  if (str == null || str === "") return undefined;
  return str;
}
function fixCarriageReturns(str) {
  if (!str) return str;
  return str.replace(/\r/g, "").replace(/\n/g, "\r\n");
}
function fromSlashesToArray(str) {
  if (!str) return [];
  return str.split("/");
}
function fromArrayToSlashes(arr) {
  if (arr[0] == null) return undefined;
  return arr.join("/");
}
function fromSlashesToFeats(featStr) {
  let feats = fromSlashesToArray(featStr);
  let selectedFeats = [];
  let featValues = {};
  feats.forEach((f, i) => {
    let featValue = f.split(/ (?=[-+]\d+)/);
    selectedFeats[i] = featValue[0];
    let value = +featValue[1];
    if (!isNaN(value)) {
      featValues[featValue[0]] = value;
    }
  });
  return { selectedFeats, featValues };
}
function fromFeatsToSlashes(featArr, featValues) {
  if (featArr[0] == null) return undefined;
  return featArr
    .map((x) => {
      let value = featValues[x];
      let valueNum = +value;
      if (value == null || value === "" || isNaN(valueNum)) return x;
      if (valueNum >= 0) value = "+" + valueNum;
      return `${x} ${value}`;
    })
    .join("/");
}
function fromSlashesToMisc(miscStr) {
  let misc = fromSlashesToArray(miscStr);
  var selectedMisc = [];
  var miscValues = {};
  misc.forEach((m, i) => {
    let value;
    if (m.match(/^-?\d+ Charges?$/)) {
      let miscValue = m.split(/(?<=-?\d+) /);
      selectedMisc[i] = "Charges";
      value = +miscValue[0];
    } else if (m.match(/^-?\d+ gp$/)) {
      let miscValue = m.split(/(?<=-?\d+) /);
      selectedMisc[i] = "GP";
      value = +miscValue[0];
    } else {
      let miscValue = m.split(/ (?=-?\d+)/);
      selectedMisc[i] = miscValue[0];
      value = +miscValue[1];
    }
    if (!isNaN(value)) {
      miscValues[selectedMisc[i]] = value;
    }
  });
  return { selectedMisc, miscValues };
}
function fromMiscToSlashes(miscArr, miscValues) {
  if (miscArr[0] == null) return undefined;
  return miscArr
    .map((x) => {
      let value = miscValues[x];
      let valueNum = +value;
      if (value == null || value === "" || isNaN(valueNum)) return x;

      if (x === "Charges") {
        return `${valueNum} ${valueNum === 1 ? "Charge" : "Charges"}`;
      } else if (x === "GP") {
        return `${valueNum} gp`;
      } else {
        return `${x} ${valueNum}`;
      }
    })
    .join("/");
}

export default {
  name: "CardDetailEdit",
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
        name: "",
        text: "",
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
        challengeLord: false,
        printInfos: [],
        errata: "",
      },
    };
  },
  computed: {
    cardIndex() {
      return this.$store.state.editedCards;
    },
    cardData() {
      return this.cardIndex[this.card] || {};
    },
    showSidebar() {
      return this.$store.getters.showSidebar;
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
    alignmentList() {
      return (this.referenceLists && this.referenceLists.alignmentList) || [];
    },
    classList() {
      if (!this.referenceLists || !this.referenceLists.classList) return [];
      return this.referenceLists.classList.filter(
        (t) => !this.cardTemp.classes.includes(t)
      );
    },
    factionList() {
      if (!this.referenceLists || !this.referenceLists.factionList) return [];
      return this.referenceLists.factionList.filter(
        (t) => !this.cardTemp.factions.includes(t)
      );
    },
    traitList() {
      if (!this.referenceLists || !this.referenceLists.traitList) return [];
      return this.referenceLists.traitList.filter(
        (t) => !this.cardTemp.traits.includes(t)
      );
    },
    featList() {
      if (!this.referenceLists || !this.referenceLists.featList) return [];
      return this.referenceLists.featList.filter(
        (f) => !this.cardTemp.selectedFeats.includes(f)
      );
    },
    miscList() {
      // I admit this is inelegant
      return ["Challenge Rating", "Charges", "GP"].filter(
        (f) => !this.cardTemp.selectedMisc.includes(f)
      );
    },
    editionList() {
      return (this.referenceLists && this.referenceLists.editionList) || [];
    },
    setList() {
      return (this.referenceLists && this.referenceLists.setList) || [];
    },
    rarityList() {
      return (this.referenceLists && this.referenceLists.rarityList) || [];
    },
    flavorTraitList() {
      return (this.referenceLists && this.referenceLists.flavorTraitList) || [];
    },
  },
  watch: {
    cardData: {
      handler() {
        this.initializeTemp();
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
          this.cardIndex[this.card] = JSON.parse(this.cardJson);
        }
      } catch {
        // We honestly don't care if you want to make invalid javascript
      }
    },
    cardJsonSelected() {
      this.updateJson();
    },
    "cardTemp.name": function (newValue) {
      setProp(
        this.cardData,
        "name",
        fromEmptyToUndefined(newValue),
        cardKeyOrder
      );
    },
    "cardTemp.text": function (newValue) {
      setProp(
        this.cardData,
        "text",
        fromEmptyToUndefined(fixCarriageReturns(newValue)),
        cardKeyOrder
      );
    },
    "cardTemp.alignment": function (newValue) {
      setProp(
        this.cardData,
        "alignment",
        fromEmptyToUndefined(newValue),
        cardKeyOrder
      );
    },
    "cardTemp.type": function (newValue) {
      setProp(
        this.cardData,
        "type",
        newValue,
        cardKeyOrder
      );
    },
    "cardTemp.attack": function (newValue) {
      setProp(
        this.cardData,
        "attack",
        fromEmptyToUndefined(newValue),
        cardKeyOrder
      );
    },
    "cardTemp.armorClass": function (newValue) {
      setProp(
        this.cardData,
        "armorClass",
        fromEmptyToUndefined(newValue),
        cardKeyOrder
      );
    },
    "cardTemp.skill": function (newValue) {
      setProp(
        this.cardData,
        "skill",
        fromEmptyToUndefined(newValue),
        cardKeyOrder
      );
    },
    "cardTemp.hitPoints": function (newValue) {
      setProp(
        this.cardData,
        "hitPoints",
        fromEmptyToUndefined(newValue),
        cardKeyOrder
      );
    },
    "cardTemp.level": function (newValue) {
      setProp(
        this.cardData,
        "level",
        fromEmptyToUndefined(newValue),
        cardKeyOrder
      );
    },
    "cardTemp.classes": function (newValue) {
      setProp(
        this.cardData,
        "class",
        fromArrayToSlashes(newValue),
        cardKeyOrder
      );
    },
    "cardTemp.factions": function (newValue) {
      setProp(
        this.cardData,
        "faction",
        fromArrayToSlashes(newValue),
        cardKeyOrder
      );
    },
    "cardTemp.traits": function (newValue) {
      setProp(
        this.cardData,
        "traits",
        fromArrayToSlashes(newValue),
        cardKeyOrder
      );
    },
    "cardTemp.featValues": {
      handler(newValue) {
        setProp(
          this.cardData,
          "feats",
          fromFeatsToSlashes(this.cardTemp.selectedFeats, newValue),
          cardKeyOrder
        );
      },
      deep: true,
    },
    "cardTemp.miscValues": {
      handler(newValue) {
        setProp(
          this.cardData,
          "misc",
          fromMiscToSlashes(this.cardTemp.selectedMisc, newValue),
          cardKeyOrder
        );
      },
      deep: true,
    },
    "cardTemp.challengeLord": function (newValue) {
      setProp(this.cardData, "challengeLord", newValue || false, cardKeyOrder);
    },
    "cardTemp.printInfos": {
      handler: function (newValue) {
        this.cardData.printInfos = this.cardData.printInfos || [];

        // Modifying elements is handled externally
        if (this.cardData.printInfos.length !== this.cardTemp.printInfos.length)
          return;

        // We could probably give each of these a watcher somehow... but this is easier
        this.cardData.printInfos.forEach((x, i) => {
          let y = newValue[i];
          setProp(x, "set", y.set, printKeyOrder);
          setProp(
            x,
            "setNumber",
            fromEmptyToUndefined(y.setNumber),
            printKeyOrder
          );
          setProp(x, "rarity", y.rarity, printKeyOrder);
          setProp(
            x,
            "flavorTraits",
            fromArrayToSlashes(y.flavorTraits),
            printKeyOrder
          );
          setProp(x, "artist", fromEmptyToUndefined(y.artist), printKeyOrder);
          setProp(
            x,
            "imageUrl",
            fromEmptyToUndefined(y.imageUrl),
            printKeyOrder
          );
          setProp(
            x,
            "flavorText",
            fromEmptyToUndefined(y.flavorText),
            printKeyOrder
          );
        });
      },
      deep: true,
    },
    "cardTemp.errata": function (newValue) {
      setProp(
        this.cardData,
        "errata",
        fromEmptyToUndefined(fixCarriageReturns(newValue)),
        cardKeyOrder
      );
    },
  },
  mounted() {
    if (this.cardData) this.initializeTemp();
    this.cardJsonWrapped = this.$store.state.settings.isEditTextWrapped;
    this.viewOption = this.$store.state.settings.editViewOption;
    this.$nextTick(() => {
      // Adjust scroll
      let scrollRegion = document.getElementById("scrollRegion");
      scrollRegion.scrollTop = 0;
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
    initializeTemp() {
      this.updateJson();
      this.cardTemp.name = this.cardData.name;
      this.cardTemp.text = this.cardData.text;
      this.cardTemp.alignment = this.cardData.alignment;
      this.cardTemp.type = this.cardData.type;
      this.cardTemp.attack = this.cardData.attack;
      this.cardTemp.armorClass = this.cardData.armorClass;
      this.cardTemp.skill = this.cardData.skill;
      this.cardTemp.hitPoints = this.cardData.hitPoints;
      this.cardTemp.level = this.cardData.level;
      this.cardTemp.classes = fromSlashesToArray(this.cardData.class);
      this.cardTemp.factions = fromSlashesToArray(this.cardData.faction);
      this.cardTemp.traits = fromSlashesToArray(this.cardData.traits);
      let feats = fromSlashesToFeats(this.cardData.feats);
      this.cardTemp.selectedFeats = feats.selectedFeats;
      this.cardTemp.featValues = feats.featValues;
      let misc = fromSlashesToMisc(this.cardData.misc);
      this.cardTemp.selectedMisc = misc.selectedMisc;
      this.cardTemp.miscValues = misc.miscValues;
      this.cardTemp.challengeLord = this.cardData.challengeLord || false;
      this.cardTemp.printInfos = (this.cardData.printInfos || []).map((x) => {
        return {
          set: x.set,
          setNumber: x.setNumber,
          rarity: x.rarity,
          flavorTraits: fromSlashesToArray(x.flavorTraits),
          artist: x.artist,
          flavorText: x.flavorText,
          imageUrl: x.imageUrl,
        };
      });
      this.cardTemp.errata = this.cardData.errata;
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
    addPrintInfo() {
      this.cardTemp.printInfos.splice(0, 0, {});
      this.cardData.printInfos.splice(0, 0, {});
    },
    removePrintInfo(index) {
      this.cardTemp.printInfos.splice(index, 1);
      this.cardData.printInfos.splice(index, 1);
    },
    saveChanges() {
      this.$store.commit("saveEditedCards");
    },
  },
};
</script>

<style scoped>
.card-image {
  position: sticky;
  top: 5px;
  max-height: 400px;
  max-width: 350px;
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