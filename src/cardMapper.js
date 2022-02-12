import Vue from "vue";
import utility from "@/utility";


// --------------------------------------------- //
// - Static lists for preferred property order - //
// --------------------------------------------- //

const cardKeyOrder = [
  "name",
  "text",
  "textFormat",
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
  "flavorTextFormat",
  "flavorTraits",
  "artist",
  "imageUrl",
];


// ------------------------------------------ //
// - Utility functions for data conversions - //
// ------------------------------------------ //

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
function fromArrayToArray(arr) {
  if (!arr || !arr[0]) return undefined;
  return arr.map(x => x);
}

function deepCopy(objFrom, objTo) {
  Object.keys(objFrom).forEach(k => {
    let val = objFrom[k];
    if (typeof (val) === 'object' && val != null) {
      let destVal = objTo[k];
      if (typeof (destVal) === 'object' && destVal != null) {
        deepCopy(val, destVal);
        return;
      }
    }
    objTo[k] = val;
  });
  return objTo;
}


// -------------------------- //
// - Stardard configuration - //
// -------------------------- //

function standardMap(prop, transform, otherProp, otherTransform) {
  otherProp = otherProp || prop;
  otherTransform = otherTransform || (x => x);
  return {
    initialize(vm, cardDataProp, cardMappedProp) {
      vm.$watch(cardMappedProp + "." + otherProp, newValue => {
        let cardData = vm[cardDataProp];
        setProp(cardData, prop, transform(newValue), cardKeyOrder);
      });
    },
    sync(vm, cardDataProp, cardMappedProp) {
      let cardData = vm[cardDataProp], cardMapped = vm[cardMappedProp];
      cardMapped[otherProp] = otherTransform(cardData[prop]);
    }
  }
}

const standardConfig = {
  utils: {
    fixCarriageReturns,
    fromArrayToArray,
    fromArrayToSlashes,
    fromEmptyToUndefined,
    fromFeatsToSlashes,
    fromMiscToSlashes,
    fromSlashesToArray,
    fromSlashesToFeats,
    fromSlashesToMisc,
    setProp,
    cardKeyOrder,
    printKeyOrder
  },
  props: {
    "name": standardMap("name", fromEmptyToUndefined),
    "text": standardMap("text", x => fromEmptyToUndefined(fixCarriageReturns(x))),
    "textFormat": standardMap("textFormat", fromEmptyToUndefined),
    "type": standardMap("type", fromEmptyToUndefined),
    "alignment": standardMap("alignment", fromEmptyToUndefined),
    "class": standardMap("class", fromArrayToSlashes, "classes", fromSlashesToArray),
    "faction": standardMap("faction", fromArrayToSlashes, "factions", fromSlashesToArray),
    "attack": standardMap("attack", fromEmptyToUndefined),
    "armorClass": standardMap("armorClass", fromEmptyToUndefined),
    "skill": standardMap("skill", fromEmptyToUndefined),
    "hitPoints": standardMap("hitPoints", fromEmptyToUndefined),
    "level": standardMap("level", fromEmptyToUndefined),
    "traits": standardMap("traits", fromArrayToSlashes, null, fromSlashesToArray),
    "feats": {
      initialize(vm, cardDataProp, cardMappedProp) {
        vm.$watch(cardMappedProp + ".featValues", newValue => {
          let cardData = vm[cardDataProp], cardMapped = vm[cardMappedProp];
          setProp(cardData, "feats", fromFeatsToSlashes(cardMapped.selectedFeats, newValue), cardKeyOrder);
        }, { deep: true });
      },
      sync(vm, cardDataProp, cardMappedProp) {
        let cardData = vm[cardDataProp], cardMapped = vm[cardMappedProp];
        let feats = fromSlashesToFeats(cardData.feats);
        cardMapped.selectedFeats = feats.selectedFeats;
        cardMapped.featValues = feats.featValues;
      }
    },
    "misc": {
      initialize(vm, cardDataProp, cardMappedProp) {
        vm.$watch(cardMappedProp + ".miscValues", newValue => {
          let cardData = vm[cardDataProp], cardMapped = vm[cardMappedProp];
          setProp(cardData, "misc", fromMiscToSlashes(cardMapped.selectedMisc, newValue), cardKeyOrder);
        }, { deep: true });
      },
      sync(vm, cardDataProp, cardMappedProp) {
        let cardData = vm[cardDataProp], cardMapped = vm[cardMappedProp];
        let misc = fromSlashesToMisc(cardData.misc);
        cardMapped.selectedMisc = misc.selectedMisc;
        cardMapped.miscValues = misc.miscValues;
      }
    },
    "editions": {
      initialize(vm, cardDataProp, cardMappedProp) {
        vm.$watch(cardMappedProp + ".editions", newValue => {
          let cardData = vm[cardDataProp], cardMapped = vm[cardMappedProp];
          if (newValue && cardData.editions && newValue.length === cardData.editions.length) {
            if (newValue.every((x, i) => x === cardData.editions[i])) {
              return;
            }
          }
          setProp(cardData, "editions", fromArrayToArray(cardMapped.editions, newValue), cardKeyOrder);
        });
      },
      sync(vm, cardDataProp, cardMappedProp) {
        let cardData = vm[cardDataProp], cardMapped = vm[cardMappedProp];
        cardMapped.editions = fromArrayToArray(cardData.editions) || [];
      }
    },
    "errata": standardMap("errata", x => fromEmptyToUndefined(fixCarriageReturns(x))),
    "challengeLord": standardMap("challengeLord", x => x || false),
    "printInfos": {
      initialize(vm, cardDataProp, cardMappedProp) {
        vm.$watch(cardMappedProp + ".printInfos", newValue => {
          let cardData = vm[cardDataProp];
          if (newValue != null && newValue.length > 0) {
            cardData.printInfos = [];
            newValue.forEach(x => {
              let y = {};
              cardData.printInfos.push(y);
              setProp(y, "set", x.set, printKeyOrder);
              setProp(y, "setNumber", fromEmptyToUndefined(x.setNumber), printKeyOrder);
              setProp(y, "rarity", x.rarity, printKeyOrder);
              setProp(y, "flavorTraits", fromArrayToSlashes(x.flavorTraits || []), printKeyOrder);
              setProp(y, "artist", fromEmptyToUndefined(x.artist), printKeyOrder);
              setProp(y, "imageUrl", fromEmptyToUndefined(x.imageUrl), printKeyOrder);
              setProp(y, "flavorText", fromEmptyToUndefined(fixCarriageReturns(x.flavorText)), printKeyOrder);
              setProp(y, "flavorTextFormat", fromEmptyToUndefined(x.flavorTextFormat), printKeyOrder);
            });
          } else {
            setProp(cardData, "printInfos", undefined, cardKeyOrder);
          }
        }, { deep: true });
      },
      sync(vm, cardDataProp, cardMappedProp) {
        let cardData = vm[cardDataProp], cardMapped = vm[cardMappedProp];
        cardMapped.printInfos = (cardData.printInfos || []).map(x => {
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
      }
    }
  }
}


// ---------------- //
// - Final export - //
// ---------------- //

export function createMapper(vm, cardDataProp, cardMappedProp, config) {
  let mergedConfig = {};
  deepCopy(standardConfig, mergedConfig);
  if (config) deepCopy(config, mergedConfig);

  Object.keys(mergedConfig.props).forEach(x => {
    let initialize = mergedConfig.props[x].initialize;
    if (initialize) initialize(vm, cardDataProp, cardMappedProp, mergedConfig);
  });

  return {
    sync() {
      Object.keys(mergedConfig.props).forEach(x => {
        let sync = mergedConfig.props[x].sync;
        if (sync) sync(vm, cardDataProp, cardMappedProp, mergedConfig);
      });
    }
  }
}