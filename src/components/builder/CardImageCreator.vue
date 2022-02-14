<template>
  <div class="image-holder">
    <div ref="imageHolder">
      <img v-if="cardImageUrl" class="user-image" :src="cardImageUrl" @load="refreshImage()" />
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
        <div class="image-lvl card-title" :class="cardData.alignment === 'Evil' ? 'text-white' : ''">
          {{ cardData.level }}
        </div>
        <div class="image-sk card-title text-white">
          {{ cardData.skill }}
        </div>
        <div class="image-hp card-title text-white">
          {{ cardData.hitPoints }}
        </div>
        <div class="image-text card-text">
          <div ref="imageTextWrapper" class="image-text-wrapper">
            <div class="image-text-edge float-left"></div>
            <div class="image-text-edge float-right"></div>
            <div class="image-text-corner-top float-left"></div>
            <div class="image-text-corner-top float-right"></div>
            <div class="image-text-corner-bottom float-left"></div>
            <div class="image-text-corner-bottom float-right"></div>
            <span ref="imageTextSpan" v-html="formattedCardText"></span>
          </div>
        </div>
      </template>
      <img v-else :src="noTemplateUrl" @load="refreshImage()" />
    </div>
  </div>
</template>

<script>
import utility from "@/scripts/utility.js";
import cardTemplates from "@/scripts/cardTemplates.js";
import domtoimage from "dom-to-image";

// Visually transforms elements to fit
function rectifyScale(selector) {
  let element = document.querySelector(selector);
  if (!element) return;
  if (element.scrollWidth > element.clientWidth || element.scrollHeight > element.scrollHeight) {
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

// Sanitized HTML
function sanitizeHtml(html) {
  html = html.replace(/&/gm, "&amp;");
  html = html.replace(/</gm, "&lt;");
  html = html.replace(/>/gm, "&gt;");
  return html;
}

// Checks for shady tags
function legalHtml(html) {
  return !html.match(/<(?!\/?(p|b|i|br)>)/m) && !html.replace(/<[^<>]*>/gm).match(/[<>]/m);
}

export default {
  props: {
    cardData: Object,
    cardImageUrl: String,
    headerHtml: String,
    mainHtml: String,
    flavorHtml: String,
  },
  data() {
    return {
      formattedCardText: "",
      cancelToken: { cancel: false },
    };
  },
  computed: {
    keywordRegex() {
      return this.$store.getters.keywordRegex;
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

      return cardTemplates[key];
    },
    noTemplateUrl() {
      return cardTemplates["no_template"];
    },

    formattedHeaderText() {
      function bulletSplit(str, isBold) {
        let temp = str.replace(/ /gm, "&nbsp;").split("/");
        if (isBold) temp = temp.map((x) => "<b>" + x + "</b>");
        return temp.join(" • ");
      }

      let headerText = "";
      if (this.cardData.faction) {
        headerText += bulletSplit(sanitizeHtml(this.cardData.faction), true);
      }
      if (this.cardData.traits) {
        if (headerText) headerText += " • ";
        headerText += bulletSplit(sanitizeHtml(this.cardData.traits), true);
      }
      if (this.cardData.feats) {
        if (headerText) headerText += " • ";
        headerText += bulletSplit(sanitizeHtml(this.cardData.feats), true);
      }
      if (this.cardData.misc) {
        if (headerText) headerText += " • ";
        headerText += bulletSplit(sanitizeHtml(this.cardData.misc), true);
      }
      if (this.cardData.printInfos && this.cardData.printInfos[0] && this.cardData.printInfos[0].flavorTraits) {
        if (headerText) headerText += " • ";
        headerText += bulletSplit(sanitizeHtml(this.cardData.printInfos[0].flavorTraits), false);
      }
      if (headerText) headerText = "<p>" + headerText + "</p>";

      this.$emit("update:headerHtml", headerText);
      return headerText;
    },
    formattedMainText() {
      let mainText = "";
      if (this.cardData.text) {
        mainText = sanitizeHtml(this.cardData.text);
        mainText = mainText.replace(this.keywordRegex, "<b>$&</b>"); // Bold keywords
        mainText = mainText.replace(/\r\n/gm, "</p><p>"); // Line breaks separate paragraphs
        mainText = "<p>" + mainText + "</p>";
      }

      this.$emit("update:mainHtml", mainText);
      return mainText;
    },
    formattedFlavorText() {
      let flavorText = "";
      if (this.cardData.printInfos && this.cardData.printInfos[0] && this.cardData.printInfos[0].flavorText) {
        flavorText = sanitizeHtml(this.cardData.printInfos[0].flavorText);
        flavorText = flavorText.replace(/(- )/gm, "-&nbsp;"); // Don't break the space after a dash
        flavorText = flavorText.replace(/\r\n/gm, "<br>"); // Line breaks same paragraph
        flavorText = "<i>" + flavorText + "</i>";
        flavorText = "<p>" + flavorText + "</p>";
      }

      this.$emit("update:flavorHtml", flavorText);
      return flavorText;
    },
  },
  watch: {
    cardData: {
      handler() {
        this.refreshImage();
      },
      deep: true,
    },
    cardImageUrl() {
      this.refreshImage();
    },
    headerHtml() {
      if (!this.headerHtml) {
        this.$emit("update:headerHtml", this.formattedHeaderText);
      }
      this.refreshImage();
    },
    mainHtml() {
      if (!this.mainHtml) {
        this.$emit("update:mainHtml", this.formattedMainText);
      }
      this.refreshImage();
    },
    flavorHtml() {
      if (!this.flavorHtml) {
        this.$emit("update:flavorHtml", this.formattedFlavorText);
      }
      this.refreshImage();
    },
  },
  methods: {
    computeFormattedCardText() {
      let header = this.formattedHeaderText;
      if (this.headerHtml && legalHtml(this.headerHtml)) {
        header = this.headerHtml;
      }

      let main = this.formattedMainText;
      if (this.mainHtml && legalHtml(this.mainHtml)) {
        main = this.mainHtml;
      }

      let flavor = this.formattedFlavorText;
      if (this.flavorHtml && legalHtml(this.flavorHtml)) {
        flavor = this.flavorHtml;
      }

      return header + main + flavor;
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

            if (element.scrollHeight && element.clientHeight >= element.scrollHeight) {
              prevScale = scale;
              scale -= 1;
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
              scale -= 0.01;
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
      this.cancelToken.cancel = true;
      let token = { cancel: false };
      this.cancelToken = token;

      this.formattedCardText = this.computeFormattedCardText();

      // Need to allow the DOM to refresh before recomputing sizes
      setTimeout(async () => {
        if (token.cancel) return;

        rectifyScale(".image-holder .image-name");
        rectifyScale(".image-holder .image-atk");
        rectifyScale(".image-holder .image-ac");
        rectifyScale(".image-holder .image-lvl");
        rectifyScale(".image-holder .image-sk");
        rectifyScale(".image-holder .image-hp");

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
            this.$emit("input", await domtoimage.toPng(holder));
          } catch (error) {
            alert("An error occurred rendering the card image");
            throw error;
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
}

.image-hp {
  left: 310px;
  top: 451px;
  width: 22px;
  height: 37px;
  line-height: 39px;
  font-size: 16pt;
  white-space: nowrap;
  text-shadow: 2px 1px 1px #ba4224;
}

.image-text {
  left: 53px;
  top: 324px;
  width: 269px;
  height: 148px;
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
  width: 32px;
  height: calc(18px + (100% - 148px) / 2);
}

.image-text-edge {
  content: "";
  height: calc(122px + (100% - 148px) / 2);
}

.image-text-corner-bottom {
  width: 27px;
  height: calc(26px + (100% - 148px) / 2);
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

/* Horrible dark mode hack */
.card-title:not(.text-white),
.card-text:not(.text-white) {
  filter: brightness(0);
}

</style>