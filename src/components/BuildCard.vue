<template>
  <header-footer>
    <b-container fluid>
      <div class="my-2 text-center">
        <span>Welcome to the card builder!</span>
      </div>
      <template v-if="cardIndex">
        <h3 class="my-2">{{ cardTemp.name || "Untitled" }}</h3>
        <b-row>
          <b-col cols="12" md="6" class="d-flex flex-column">
            <div
              class="card-view d-flex flex-column pb-2"
              :class="
                viewOption === 'JSON' ? 'bound-height' : 'align-items-center'
              "
            >
              <b-radio-group
                v-model="viewOption"
                :options="['Art', 'JSON']"
                class="mb-2 w-100"
                buttons
              />
              <!-- Image -->
              <template v-if="viewOption === 'Art'">
                <img
                  ref="imageActual"
                  class="card-image"
                  :src="cardImageDataUrl"
                />
                <div class="image-holder">
                  <div ref="imageHolder">
                    <img class="user-image" src="/images/VanGogh.jpg" />
                    <template v-if="cardTemplateUrl">
                      <img :src="cardTemplateUrl" @load="refreshImage()" />
                      <div class="image-name card-title">
                        {{ cardData.name }}
                      </div>
                      <div class="image-atk card-title">
                        {{ cardData.attack }}
                      </div>
                      <div class="image-ac card-title">
                        {{ cardData.armorClass }}
                      </div>
                      <div
                        class="image-lvl card-title"
                        :class="
                          cardData.alignment === 'Evil' ? 'text-white' : ''
                        "
                      >
                        {{ cardData.level }}
                      </div>
                      <div class="image-sk card-title">
                        {{ cardData.skill }}
                      </div>
                      <div class="image-hp card-title">
                        {{ cardData.hitPoints }}
                      </div>
                      <div class="image-text card-text">
                        <div ref="imageTextWrapper" class="image-text-wrapper">
                          <div class="image-text-edge float-left"></div>
                          <div class="image-text-edge float-right"></div>
                          <div class="image-text-corner-top float-left"></div>
                          <div class="image-text-corner-top float-right"></div>
                          <div
                            class="image-text-corner-bottom float-left"
                          ></div>
                          <div
                            class="image-text-corner-bottom float-right"
                          ></div>
                          <span
                            ref="imageTextSpan"
                            v-html="formattedCardText"
                          ></span>
                        </div>
                      </div>
                    </template>
                    <!--<img
                      v-else
                      src="/images/No_Template.png"
                      @load="refreshImage()"
                    />-->
                  </div>
                </div>
              </template>
              <!-- JSON -->
              <template v-if="viewOption === 'JSON'">
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
              <!-- Text -->
              <div class="my-3">
                <b-form-textarea
                  rows="4"
                  v-model="cardTemp.text"
                  placeholder="[Card Text]"
                />
              </div>
              <!-- Flavor Traits -->
              <div class="clearfix">
                <div class="card-stat-label"><span>Flavor Traits:</span></div>
                <div class="card-stat-value">
                  <v-select
                    multiple
                    taggable
                    v-model="cardTemp.printInfo.flavorTraits"
                    :options="flavorTraitList"
                  />
                </div>
              </div>
              <!-- Flavor Text -->
              <div class="my-2">
                <b-form-textarea
                  rows="2"
                  v-model="cardTemp.printInfo.flavorText"
                  placeholder="[Flavor Text]"
                />
              </div>
            </div>
          </b-col>
        </b-row>
      </template>
    </b-container>
  </header-footer>
</template>

<script>
import Vue from "vue";
import HeaderFooter from "@/components/HeaderFooter.vue";
import utility from "@/utility.js";
import addRemoveCardMixin from "@/mixins/addRemoveCardMixin.js";
import domtoimage from "dom-to-image";

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
  "printInfos",
];
const printKeyOrder = ["flavorText", "flavorTraits"];

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
      let miscValue = m.split(" ");
      selectedMisc[i] = "Charges";
      value = +miscValue[0];
    } else if (m.match(/^-?\d+ gp$/)) {
      let miscValue = m.split(" ");
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
function emptyPrintInfo() {
  return {
    flavorText: "",
    flavorTraits: [],
  };
}

// DOM manipulation for images
function rectifyScale(selector) {
  let element = document.querySelector(selector);
  if (!element) return;
  if (
    element.scrollWidth > element.clientWidth ||
    element.scrollHeight > element.scrollHeight
  ) {
    let shiftX = (element.clientWidth - element.scrollWidth) / 2;
    let shiftY = (element.clientHeight - element.scrollHeight) / 2;
    let scaleX = element.clientWidth / element.scrollWidth;
    let scaleY = element.clientHeight / element.scrollHeight;
    let scale = scaleX < scaleY ? scaleX : scaleY;
    element.style.transform = `scale(${scale}) translate(${shiftX}px, ${shiftY}px)`;
  } else {
    element.style.transform = null;
  }
}

export default {
  name: "BuildCard",
  components: {
    HeaderFooter,
  },
  mixins: [addRemoveCardMixin],
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
        printInfo: emptyPrintInfo(),
      },
      formattedCardText: "",
      cardImageCancelToken: { cancel: false },
      cardImageDataUrl: null,
    };
  },
  computed: {
    cardIndex() {
      return this.$store.state.editedCards;
    },
    cardTemplateUrl() {
      let type = this.cardData.type || "";
      let _class = this.cardData.class || "";
      let faction = this.cardData.faction || "";
      let alignment = this.cardData.alignment || "";

      if (_class.includes("/")) _class = "Classless";

      let key = type + "|" + _class;
      if (type === "Character") {
        if (faction.includes("/")) faction = faction.split("/")[0];
        key += "|" + alignment;
        key += "|" + faction;
      }

      switch (key) {
        case "Character|Classless|Evil|Deverenian":
          return "https://drive.google.com/uc?export=view&id=1w92lEQobIu6g9x_45UGL8lo7Wgfod2QK";
        case "Character|Classless|Evil|Dwarf":
          return "https://drive.google.com/uc?export=view&id=17FKleyNyaYeKwFVV4aA7xo81PjehXXCl";
        case "Character|Classless|Evil|Elf":
          return "https://drive.google.com/uc?export=view&id=11R3xcjBuUn7lPPJWsHi8ZOLA4q32irxZ";
        case "Character|Classless|Evil|Free Kingdoms":
          return "https://drive.google.com/uc?export=view&id=1a7OuGh5_ja0F91T3YXJ8ITwKGrLK6DFG";
        case "Character|Classless|Evil|Mercenary":
          return "https://drive.google.com/uc?export=view&id=1itOop-i9gEu0RPdyiDm5Y8GXCpdWFJ_q";
        case "Character|Classless|Evil|Nothrog":
          return "https://drive.google.com/uc?export=view&id=1PwvVYC3gPppwsUtVghM5nux2lzZttagV";
        case "Character|Classless|Evil|The Chosen":
          return "https://drive.google.com/uc?export=view&id=183frgPSB5UhTTYVbu_woA1Va8ZJsmLTw";
        case "Character|Classless|Good|Deverenian":
          return "https://drive.google.com/uc?export=view&id=115i71o3NlAiSpwbCAFXN_xJpiXH4IZ3-";
        case "Character|Classless|Good|Dwarf":
          return "https://drive.google.com/uc?export=view&id=1D7C4bxFoLANSYIXdwcSEl-Q5_N2J40YZ";
        case "Character|Classless|Good|Elf":
          return "https://drive.google.com/uc?export=view&id=1Ab1vPNB2WDFjHrwOwUwfqE558pABkfmM";
        case "Character|Classless|Good|Free Kingdoms":
          return "https://drive.google.com/uc?export=view&id=1UVXQO17xKQkEnx1lBP6CCspw6_5NqeEj";
        case "Character|Classless|Good|Mercenary":
          return "https://drive.google.com/uc?export=view&id=1nxiFupFKerp6TA52D0lYBwpFtoFcMYXD";
        case "Character|Classless|Good|Nothrog":
          return "https://drive.google.com/uc?export=view&id=1VlABgZA1cOuMeB7yFFJVe6qp4MeDc82N";
        case "Character|Classless|Good|The Chosen":
          return "https://drive.google.com/uc?export=view&id=1eIfjJj-0D6twU5ST5snwY7Awa4O00chS";
        case "Character|Cleric|Evil|Deverenian":
          return "https://drive.google.com/uc?export=view&id=1iiGk_Mtcj_igxIakga4d9swHjALn6Rsn";
        case "Character|Cleric|Evil|Dwarf":
          return "https://drive.google.com/uc?export=view&id=1-xYPEcs9p8IY91ox4LYthFrH_5qlYK3_";
        case "Character|Cleric|Evil|Elf":
          return "https://drive.google.com/uc?export=view&id=1tP-iYvxGEJUwXZ7JHxbPuh6rhjQBcnJG";
        case "Character|Cleric|Evil|Free Kingdoms":
          return "https://drive.google.com/uc?export=view&id=1w4_vgQdFjlwQMlNpjeL_L4q0-Nfolrng";
        case "Character|Cleric|Evil|Mercenary":
          return "https://drive.google.com/uc?export=view&id=1uwJsOBqVtxlp-VoPSMw-tJDZE_EN6WZM";
        case "Character|Cleric|Evil|Nothrog":
          return "https://drive.google.com/uc?export=view&id=14mNcXvTDaFngVBDcwiaYXVV88wxja4Xc";
        case "Character|Cleric|Evil|The Chosen":
          return "https://drive.google.com/uc?export=view&id=1LuSTMcAW27hTmGuBzLDhvBfYY7q6FA87";
        case "Character|Cleric|Good|Deverenian":
          return "https://drive.google.com/uc?export=view&id=1K7terOMtVvbMPBeS5eUbAjGd-SScyAK4";
        case "Character|Cleric|Good|Dwarf":
          return "https://drive.google.com/uc?export=view&id=1PSD_gwl-6bqNGOpum1_Ktuif6SNMJdnN";
        case "Character|Cleric|Good|Elf":
          return "https://drive.google.com/uc?export=view&id=1y4xR-1WfQ1IbYNksd02u8i6PqpPRAs0A";
        case "Character|Cleric|Good|Free Kingdoms":
          return "https://drive.google.com/uc?export=view&id=1rw1w22xCslh8aE2dVd3pKfoS7wsiwbm0";
        case "Character|Cleric|Good|Mercenary":
          return "https://drive.google.com/uc?export=view&id=1QADQjDQAhVFp3iklC1Ac3ivajexq1GIc";
        case "Character|Cleric|Good|Nothrog":
          return "https://drive.google.com/uc?export=view&id=1LTnR89j1cWdLSc5iowyWDEmYSGY_NYoP";
        case "Character|Cleric|Good|The Chosen":
          return "https://drive.google.com/uc?export=view&id=18jQDXRB1kg-lS8PZUtn4X6LCHZrfQXgg";
        case "Character|Fighter|Evil|Deverenian":
          return "https://drive.google.com/uc?export=view&id=1mdXQizXbIWke_QLIYgRWsQMQmVIB_1p5";
        case "Character|Fighter|Evil|Dwarf":
          return "https://drive.google.com/uc?export=view&id=1vlV28WLU-_ZXCDjVKB8BcavqCpAoimSo";
        case "Character|Fighter|Evil|Elf":
          return "https://drive.google.com/uc?export=view&id=1X53PpZdtwig7UDUoEzZUV6TEZJXA8qXu";
        case "Character|Fighter|Evil|Free Kingdoms":
          return "https://drive.google.com/uc?export=view&id=1bhN8rAEmXpLww7_u0erU9FD2lLqvRfth";
        case "Character|Fighter|Evil|Mercenary":
          return "https://drive.google.com/uc?export=view&id=1rTBZl5kwh203NbdKtdn6DkFIyqY2AUUG";
        case "Character|Fighter|Evil|Nothrog":
          return "https://drive.google.com/uc?export=view&id=1BsBLu3v1ReVw5jcUOkqAakTIjkO53xse";
        case "Character|Fighter|Evil|The Chosen":
          return "https://drive.google.com/uc?export=view&id=1KryfTW9JDpOXio2HTFTL0mz8kfpWeh2D";
        case "Character|Fighter|Good|Deverenian":
          return "https://drive.google.com/uc?export=view&id=1L68dGqoDkDEjLlCxxo-14aX15R4xxvHl";
        case "Character|Fighter|Good|Dwarf":
          return "https://drive.google.com/uc?export=view&id=1OM3RHyrXSneeeJCsBdhOzrspYWfsf0Pu";
        case "Character|Fighter|Good|Elf":
          return "https://drive.google.com/uc?export=view&id=1FWqyGn9qDPLjjspwEnisDM1ePORC4Z1M";
        case "Character|Fighter|Good|Free Kingdoms":
          return "https://drive.google.com/uc?export=view&id=1GgilRmw5f0JN6sHBfG4MrSINIDajHp9-";
        case "Character|Fighter|Good|Mercenary":
          return "https://drive.google.com/uc?export=view&id=1AwvgeqzKK6---X9Vl6Ciru6kz1be359-";
        case "Character|Fighter|Good|Nothrog":
          return "https://drive.google.com/uc?export=view&id=1kEvP0zv_Dl3j5_1gAN7L1AxTpUsmNiTP";
        case "Character|Fighter|Good|The Chosen":
          return "https://drive.google.com/uc?export=view&id=1SkhShkIt4ll63cWFchPihw8sIx3RgILO";
        case "Character|Rogue|Evil|Deverenian":
          return "https://drive.google.com/uc?export=view&id=1VDwv4TGMPlpCVZsK8HEYIFetCdrrQwS8";
        case "Character|Rogue|Evil|Dwarf":
          return "https://drive.google.com/uc?export=view&id=1JkvVWu5yYjBWxSq32IvYP8CiFKiGK24Z";
        case "Character|Rogue|Evil|Elf":
          return "https://drive.google.com/uc?export=view&id=1oiJC90LRiC4nBrumrEvOgXxZFQNVnkeX";
        case "Character|Rogue|Evil|Free Kingdoms":
          return "https://drive.google.com/uc?export=view&id=17oPG--Cr57R9qyC40zZg5xcWDoZdXsJC";
        case "Character|Rogue|Evil|Mercenary":
          return "https://drive.google.com/uc?export=view&id=1CdTlX53_Z0CF_bpwIqixjpDE94nDUhUb";
        case "Character|Rogue|Evil|Nothrog":
          return "https://drive.google.com/uc?export=view&id=1xoyFg9G145lf1Ad1b_jPfWu1wXya514_";
        case "Character|Rogue|Evil|The Chosen":
          return "https://drive.google.com/uc?export=view&id=1kkdilQZhP8EzK19dNtzRA7RKm0BTE4Br";
        case "Character|Rogue|Good|Deverenian":
          return "https://drive.google.com/uc?export=view&id=1wThRSg9X2p4OyuhTHOsO5TbpDs2du5QQ";
        case "Character|Rogue|Good|Dwarf":
          return "https://drive.google.com/uc?export=view&id=19quefPvw0R53x4974VjWLkJs1umySUC4";
        case "Character|Rogue|Good|Elf":
          return "https://drive.google.com/uc?export=view&id=1Mtw4dM6BhskOgMIESvPrfORvStaHtlPp";
        case "Character|Rogue|Good|Free Kingdoms":
          return "https://drive.google.com/uc?export=view&id=1X7S8nQDYDi0RYZVNRSBPTtaPWmiN7KoY";
        case "Character|Rogue|Good|Mercenary":
          return "https://drive.google.com/uc?export=view&id=1f8n2CjmX7R1EjMiE7iVPi-zJQmZ6lFCM";
        case "Character|Rogue|Good|Nothrog":
          return "https://drive.google.com/uc?export=view&id=1cSA77c6Ju9SOWjLnoM4oJ6eHKHutZmhI";
        case "Character|Rogue|Good|The Chosen":
          return "https://drive.google.com/uc?export=view&id=14Gt1gzeX8aEQTJJOFJFZ5MFBFUWFOKZL";
        case "Character|Wizard|Evil|Deverenian":
          return "https://drive.google.com/uc?export=view&id=1_OjfGMIMdVgknQHyinXvxI8h1ncElfnx";
        case "Character|Wizard|Evil|Dwarf":
          return "https://drive.google.com/uc?export=view&id=1jfeBlTJ-4mlulx8Z2pTKtLsJda9-kyjc";
        case "Character|Wizard|Evil|Elf":
          return "https://drive.google.com/uc?export=view&id=16wv-cSSg20B-WXzBvFlXSNu0vdRbll7Y";
        case "Character|Wizard|Evil|Free Kingdoms":
          return "https://drive.google.com/uc?export=view&id=1yZWShxpBC4vu7AOE2_Td_sO2SSwSLC-i";
        case "Character|Wizard|Evil|Mercenary":
          return "https://drive.google.com/uc?export=view&id=17NYEz-gpeGk9pBXYiKLTGX3dzP9csK2t";
        case "Character|Wizard|Evil|Nothrog":
          return "https://drive.google.com/uc?export=view&id=17OrmMhUlliWPRLwy8bXRYusJidKTqg0p";
        case "Character|Wizard|Evil|The Chosen":
          return "https://drive.google.com/uc?export=view&id=1jifSIfUyubxnnd-z-2SyAKsKBPTn3UXs";
        case "Character|Wizard|Good|Deverenian":
          return "https://drive.google.com/uc?export=view&id=15ZIhcGESio-28V8Plg0mZmaKYkfFBzJX";
        case "Character|Wizard|Good|Dwarf":
          return "https://drive.google.com/uc?export=view&id=1_u_i7dnUoWiFRnZAJPebmY95uLDVd5X4";
        case "Character|Wizard|Good|Elf":
          return "https://drive.google.com/uc?export=view&id=1b3PLBj8mdVcMByYrCw1CF-JltRiKxOPM";
        case "Character|Wizard|Good|Free Kingdoms":
          return "https://drive.google.com/uc?export=view&id=1neNK4kExrwPn7ZjxoD_WT3kYkaYyGhi2";
        case "Character|Wizard|Good|Mercenary":
          return "https://drive.google.com/uc?export=view&id=1mDl69auRGtXpUG0gE7ZWQkBDpalu7Zfb";
        case "Character|Wizard|Good|Nothrog":
          return "https://drive.google.com/uc?export=view&id=12ns7HbLl3u8Blq7fdq3KitzAlJphtw7-";
        case "Character|Wizard|Good|The Chosen":
          return "https://drive.google.com/uc?export=view&id=1hDgwG6-GKcw2cRSxHzfTd9m0EdMpmr6_";
        //case "Character|Classless|Evil|Deverenian":
        //  return "/images/Dev E Class Half.png";
        //case "Character|Classless|Evil|Dwarf":
        //  return "/images/Dw E Class Half.png";
        //case "Character|Classless|Evil|Elf":
        //  return "/images/Elv E Class Half.png";
        //case "Character|Classless|Evil|Free Kingdoms":
        //  return "/images/Freek E Class Half.png";
        //case "Character|Classless|Evil|Mercenary":
        //  return "/images/Merc E Class Half.png";
        //case "Character|Classless|Evil|Nothrog":
        //  return "/images/Ntg E Class Half.png";
        //case "Character|Classless|Evil|The Chosen":
        //  return "/images/Cho E Class.png";
        //case "Character|Classless|Good|Deverenian":
        //  return "/images/Dev G Class Half.png";
        //case "Character|Classless|Good|Dwarf":
        //  return "/images/Dw G Class Half.png";
        //case "Character|Classless|Good|Elf":
        //  return "/images/Elv G Class Half.png";
        //case "Character|Classless|Good|Free Kingdoms":
        //  return "/images/Freek G Class Half.png";
        //case "Character|Classless|Good|Mercenary":
        //  return "/images/Merc G Class Half.png";
        //case "Character|Classless|Good|Nothrog":
        //  return "/images/Ntg G Class Half.png";
        //case "Character|Classless|Good|The Chosen":
        //  return "/images/Cho G Class.png";
        //case "Character|Cleric|Evil|Deverenian":
        //  return "/images/Dev E Cleric Half.png";
        //case "Character|Cleric|Evil|Dwarf":
        //  return "/images/Dw E Cleric Half.png";
        //case "Character|Cleric|Evil|Elf":
        //  return "/images/Elv E Cleric Half.png";
        //case "Character|Cleric|Evil|Free Kingdoms":
        //  return "/images/Freek E Cleric Half.png";
        //case "Character|Cleric|Evil|Mercenary":
        //  return "/images/Merc E Cleric Half.png";
        //case "Character|Cleric|Evil|Nothrog":
        //  return "/images/Ntg E Cleric Half.png";
        //case "Character|Cleric|Evil|The Chosen":
        //  return "/images/Cho E Cleric.png";
        //case "Character|Cleric|Good|Deverenian":
        //  return "/images/Dev G Cleric Half.png";
        //case "Character|Cleric|Good|Dwarf":
        //  return "/images/Dw G Cleric Half.png";
        //case "Character|Cleric|Good|Elf":
        //  return "/images/Elv G Cleric Half.png";
        //case "Character|Cleric|Good|Free Kingdoms":
        //  return "/images/Freek G Cleric Half.png";
        //case "Character|Cleric|Good|Mercenary":
        //  return "/images/Merc G Cleric Half.png";
        //case "Character|Cleric|Good|Nothrog":
        //  return "/images/Ntg G Cleric Half.png";
        //case "Character|Cleric|Good|The Chosen":
        //  return "/images/Cho G Cleric.png";
        //case "Character|Fighter|Evil|Deverenian":
        //  return "/images/Dev E Fight Half.png";
        //case "Character|Fighter|Evil|Dwarf":
        //  return "/images/Dw E Fight Half.png";
        //case "Character|Fighter|Evil|Elf":
        //  return "/images/Elv E Fight Half.png";
        //case "Character|Fighter|Evil|Free Kingdoms":
        //  return "/images/Freek E Fight Half.png";
        //case "Character|Fighter|Evil|Mercenary":
        //  return "/images/Merc E Fight Half.png";
        //case "Character|Fighter|Evil|Nothrog":
        //  return "/images/Ntg E Fight Half.png";
        //case "Character|Fighter|Evil|The Chosen":
        //  return "/images/Cho E Fight.png";
        //case "Character|Fighter|Good|Deverenian":
        //  return "/images/Dev G Fight Half.png";
        //case "Character|Fighter|Good|Dwarf":
        //  return "/images/Dw G Fight Half.png";
        //case "Character|Fighter|Good|Elf":
        //  return "/images/Elv G Fight Half.png";
        //case "Character|Fighter|Good|Free Kingdoms":
        //  return "/images/Freek G Fight Half.png";
        //case "Character|Fighter|Good|Mercenary":
        //  return "/images/Merc G Fight Half.png";
        //case "Character|Fighter|Good|Nothrog":
        //  return "/images/Ntg G Fight Half.png";
        //case "Character|Fighter|Good|The Chosen":
        //  return "/images/Cho G Fight.png";
        //case "Character|Rogue|Evil|Deverenian":
        //  return "/images/Dev E Rogue Half.png";
        //case "Character|Rogue|Evil|Dwarf":
        //  return "/images/Dw E Rogue Half.png";
        //case "Character|Rogue|Evil|Elf":
        //  return "/images/Elv E Rogue Half.png";
        //case "Character|Rogue|Evil|Free Kingdoms":
        //  return "/images/Freek E Rogue Half.png";
        //case "Character|Rogue|Evil|Mercenary":
        //  return "/images/Merc E Rogue Half.png";
        //case "Character|Rogue|Evil|Nothrog":
        //  return "/images/Ntg E Rogue Half.png";
        //case "Character|Rogue|Evil|The Chosen":
        //  return "/images/Cho E Rogue.png";
        //case "Character|Rogue|Good|Deverenian":
        //  return "/images/Dev G Rogue Half.png";
        //case "Character|Rogue|Good|Dwarf":
        //  return "/images/Dw G Rogue Half.png";
        //case "Character|Rogue|Good|Elf":
        //  return "/images/Elv G Rogue Half.png";
        //case "Character|Rogue|Good|Free Kingdoms":
        //  return "/images/Freek G Rogue Half.png";
        //case "Character|Rogue|Good|Mercenary":
        //  return "/images/Merc G Rogue Half.png";
        //case "Character|Rogue|Good|Nothrog":
        //  return "/images/Ntg G Rogue Half.png";
        //case "Character|Rogue|Good|The Chosen":
        //  return "/images/Cho G Rogue.png";
        //case "Character|Wizard|Evil|Deverenian":
        //  return "/images/Dev E Wiz Half.png";
        //case "Character|Wizard|Evil|Dwarf":
        //  return "/images/Dw E Wiz Half.png";
        //case "Character|Wizard|Evil|Elf":
        //  return "/images/Elv E Wiz Half.png";
        //case "Character|Wizard|Evil|Free Kingdoms":
        //  return "/images/Freek E Wiz Half.png";
        //case "Character|Wizard|Evil|Mercenary":
        //  return "/images/Merc E Wiz Half.png";
        //case "Character|Wizard|Evil|Nothrog":
        //  return "/images/Ntg E Wiz Half.png";
        //case "Character|Wizard|Evil|The Chosen":
        //  return "/images/Cho E Wiz.png";
        //case "Character|Wizard|Good|Deverenian":
        //  return "/images/Dev G Wiz Half.png";
        //case "Character|Wizard|Good|Dwarf":
        //  return "/images/Dw G Wiz Half.png";
        //case "Character|Wizard|Good|Elf":
        //  return "/images/Elv G Wiz Half.png";
        //case "Character|Wizard|Good|Free Kingdoms":
        //  return "/images/Freek G Wiz Half.png";
        //case "Character|Wizard|Good|Mercenary":
        //  return "/images/Merc G Wiz Half.png";
        //case "Character|Wizard|Good|Nothrog":
        //  return "/images/Ntg G Wiz Half.png";
        //case "Character|Wizard|Good|The Chosen":
        //  return "/images/Cho G Wiz.png";
        default:
          return null;
      }
    },
    referenceLists() {
      return this.$store.state.referenceLists;
    },
    typeList() {
      return (
        (this.referenceLists && this.referenceLists.typeList) ||
        []
      ).filter((x) => x === "Character");
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
          this.cardData = JSON.parse(this.cardJson);
        } else {
          this.refreshImage();
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
      setProp(this.cardData, "type", newValue, cardKeyOrder);
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
    "cardTemp.printInfo": {
      handler: function (newValue) {
        let hasData = newValue.flavorTraits[0] || newValue.flavorText;

        // Remove or add print info
        if (!this.cardData.printInfos) {
          if (hasData) {
            Vue.set(this.cardData, "printInfos", []);
            this.cardData.printInfos.splice(0, 0, {});
          }
        } else {
          if (hasData) {
            if (this.cardData.printInfos.length > 1) {
              this.cardData.printInfos.splice(
                1,
                this.cardData.printInfos.length - 1
              );
            }
          } else {
            Vue.delete(this.cardData, "printInfos");
          }
        }

        if (hasData) {
          setProp(
            this.cardData.printInfos[0],
            "flavorTraits",
            fromArrayToSlashes(newValue.flavorTraits),
            printKeyOrder
          );
          setProp(
            this.cardData.printInfos[0],
            "flavorText",
            fromEmptyToUndefined(newValue.flavorText),
            printKeyOrder
          );
        }
      },
      deep: true,
    },
  },
  mounted() {
    this.$store.dispatch("loadCardData");
    this.updateJson();
  },
  methods: {
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
      this.cardTemp.printInfo =
        (this.cardData.printInfos || []).map((x) => {
          return {
            flavorTraits: fromSlashesToArray(x.flavorTraits),
            flavorText: x.flavorText,
          };
        })[0] || emptyPrintInfo();
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
    formatCardText() {
      let text = "";

      function sanitize(html) {
        html = html.replace(/&/gm, "&amp;");
        html = html.replace(/</gm, "&lt;");
        html = html.replace(/>/gm, "&rt;");
        return html;
      }

      function bulletSplit(str, isBold) {
        let temp = str.replace(/ /gm, "&nbsp;").split("/");
        if (isBold) temp = temp.map((x) => "<b>" + x + "</b>");
        return temp.join(" • ");
      }

      // Header
      if (this.cardData.faction) {
        text += bulletSplit(sanitize(this.cardData.faction), true);
      }
      if (this.cardData.traits) {
        if (text) text += " • ";
        text += bulletSplit(sanitize(this.cardData.traits), true);
      }
      if (this.cardData.feats) {
        if (text) text += " • ";
        text += bulletSplit(sanitize(this.cardData.feats), true);
      }
      if (this.cardData.misc) {
        if (text) text += " • ";
        text += bulletSplit(sanitize(this.cardData.misc), true);
      }
      if (
        this.cardData.printInfos &&
        this.cardData.printInfos[0] &&
        this.cardData.printInfos[0].flavorTraits
      ) {
        if (text) text += " • ";
        text += bulletSplit(
          sanitize(this.cardData.printInfos[0].flavorTraits),
          false
        );
      }

      // Main text
      if (this.cardData.text) {
        if (text) text += "\r\n";
        let value = this.cardData.text;
        let hashReg = /(Spend Order:|Order:|Spend React:|React:)/gm;
        value = value.replace(hashReg, "<b>$&</b>");
        hashReg = /\r\n/gm;
        value = value.replace(hashReg, "\r\n");
        text += value;
      }

      // Flavor text
      if (
        this.cardData.printInfos &&
        this.cardData.printInfos[0] &&
        this.cardData.printInfos[0].flavorText
      ) {
        if (text) text += "\r\n";
        let value = this.cardData.printInfos[0].flavorText;
        value = value.replace(/(- )/gm, "-&nbsp;");
        text += "<i>" + value + "</i>";
      }

      // Paragraph wrap things
      text = "<p>" + text.replace(/\r\n/gm, "</p><p>") + "</p>";

      this.formattedCardText = text;
    },
    verticallyAlign(element, token) {
      return new Promise((resolve) => {
        if (!element) {
          resolve(true);
          return;
        }

        let scale = 100;
        let prevScale = 100;
        element.style.height = "100%";
        let reduce = () => {
          setTimeout(() => {
            if (token.cancel) {
              resolve(false);
              return;
            }

            if (element.clientHeight >= element.scrollHeight) {
              prevScale = scale;
              scale -= 5;
              element.style.height = `${scale}%`;
              reduce();
            } else {
              element.style.height = `${prevScale}%`;
              resolve(true);
            }
          }, 0);
        };
        reduce();
      });
    },
    scaleDownFont(element, token) {
      return new Promise((resolve) => {
        if (!element) {
          resolve(true);
          return;
        }

        let scale = 1;
        element.style.fontSize = "1em";
        let reduce = () => {
          setTimeout(() => {
            if (token.cancel) {
              resolve(false);
              return;
            }

            if (element.clientHeight < element.scrollHeight) {
              scale -= 0.05;
              element.style.fontSize = `${scale}em`;
              reduce();
            } else {
              resolve(true);
            }
          }, 0);
        };
        reduce();
      });
    },
    removeLeadingTrailingBullets(token) {
      return new Promise((resolve) => {
        let span = this.$refs.imageTextSpan;
        if (span == null) {
          resolve(true);
          return;
        }

        let splitStr = this.formattedCardText.split(/ • /gm);
        let aggr = splitStr[0];
        this.formattedCardText = aggr;

        let doNext = (i) => {
          if (i >= splitStr.length) {
            resolve(true);
            return;
          }

          setTimeout(() => {
            if (token.cancel) {
              resolve(false);
              return;
            }

            let spanHeight = span.getBoundingClientRect().height;
            let partial = splitStr[i].split(/<\/p>/gm)[0];
            this.formattedCardText += " • " + partial + "</p>";

            setTimeout(() => {
              if (token.cancel) {
                resolve(false);
                return;
              }

              let newSpanHeight = span.getBoundingClientRect().height;
              if (newSpanHeight > spanHeight) {
                aggr += "<br>" + splitStr[i];
              } else {
                aggr += " • " + splitStr[i];
              }
              this.formattedCardText = aggr;
              doNext(i + 1);
            }, 0);
          }, 0);
        };

        doNext(1);
      });
    },
    refreshImage: utility.debounce(function () {
      this.cardImageCancelToken.cancel = true;
      let token = { cancel: false };
      this.cardImageCancelToken = token;

      // Need to allow the DOM to refresh before recomputing sizes
      setTimeout(async () => {
        rectifyScale(".image-holder .image-name");
        rectifyScale(".image-holder .image-atk");
        rectifyScale(".image-holder .image-ac");
        rectifyScale(".image-holder .image-lvl");
        rectifyScale(".image-holder .image-sk");
        rectifyScale(".image-holder .image-hp");
        this.formatCardText();
        let wrapper = this.$refs.imageTextWrapper;
        if (wrapper) {
          wrapper.style.fontSize = null;
          wrapper.style.height = null;
        }
        if (!(await this.verticallyAlign(wrapper, token))) return;
        if (!(await this.scaleDownFont(wrapper, token))) return;
        if (!(await this.removeLeadingTrailingBullets(token))) return;

        let holder = this.$refs.imageHolder;
        if (holder) {
          try {
            this.cardImageDataUrl = await domtoimage.toPng(holder);
          } catch {
            // Not sure why this would happen, or what to do if it does
          }
        }
      }, 0);
    }),
  },
};
</script>

<style scoped>
.image-holder {
  position: fixed;
  left: -9999px;
}

.image-holder > div {
  width: 375px;
  height: 525px;
}

.image-holder > div > * {
  position: absolute;
}

.image-holder > div > div {
  text-align: center;
}

.user-image {
  left: 48px;
  top: 74px;
  width: 279px;
  height: 230px;
  line-height: 230px;
  object-fit: cover;
}

.image-name {
  left: 101px;
  top: 33px;
  width: 200px;
  height: 36px;
  line-height: 38px;
  font-size: 20pt;
  white-space: nowrap;
}

.image-atk {
  left: 26px;
  top: 32px;
  width: 66px;
  height: 32px;
  line-height: 34px;
  font-size: 20pt;
  white-space: nowrap;
}

.image-ac {
  left: 304px;
  top: 32px;
  width: 40px;
  height: 32px;
  line-height: 34px;
  font-size: 20pt;
  white-space: nowrap;
}

.image-lvl {
  left: 42px;
  top: 283px;
  width: 19px;
  height: 36px;
  line-height: 38px;
  font-size: 18pt;
  white-space: nowrap;
}

.image-sk {
  left: 41px;
  top: 446px;
  width: 30px;
  height: 41px;
  line-height: 43px;
  font-size: 16pt;
  white-space: nowrap;
  color: white;
}

.image-hp {
  left: 310px;
  top: 451px;
  width: 22px;
  height: 37px;
  line-height: 39px;
  font-size: 16pt;
  white-space: nowrap;
  color: white;
  text-shadow: 2px 1px 1px #ba4224;
}

.image-text {
  left: 57px;
  top: 328px;
  width: 261px;
  height: 140px;
  font-size: 12.5pt;
  display: flex;
  align-items: center;
}

.image-text >>> p {
  margin: 0.4em 0px 0px 0px;
}

.image-text-wrapper {
  line-height: 110%;
  width: 100%;
  height: 100%;
}

.image-text-corner-top {
  width: 28px;
  height: calc(14px + (100% - 140px) / 2);
}

.image-text-edge {
  content: "";
  height: calc(118px + (100% - 140px) / 2);
}

.image-text-corner-bottom {
  width: 23px;
  height: calc(22px + (100% - 140px) / 2);
}

.image-text-corner-bottom.float-left {
  clear: left;
}

.image-text-corner-bottom.float-right {
  clear: right;
}

.card-title {
  font-family: "Vhatis Warlord Title";
}

.card-text {
  font-family: "Vhatis Warlord Text";
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