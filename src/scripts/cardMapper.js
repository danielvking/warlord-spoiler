import Vue from "vue";
import utility from "./utility";


// --------------------------------------------- //
// - Static lists for preferred property order - //
// --------------------------------------------- //

const keyOrder = [
  // Card properties
  "name",
  "text",
  "textFormat",
  "type",
  "subtype",
  "alignment",
  "class",
  "faction",
  "attack",
  "damageType",
  "armorClass",
  "skill",
  "hitPoints",
  "level",
  "traits",
  "keywords",
  "feats",
  "editions",
  "errata",
  "exclusivePromo",
  "printInfos",
  // Print info properties
  "set",
  "setNumber",
  "rarity",
  "flavorText",
  "flavorTextFormat",
  "artist",
  "imageUrl"
];


// ------------------------------------------ //
// - Utility functions for data conversions - //
// ------------------------------------------ //

/**
 * Deeply sets a reactive property, skipping key-values that are already equal
 * @param {object} obj 
 * @param {string} key 
 * @param {*} value 
 */
function setProp(obj, key, value) {
  // Value is undefined: delete it, stop
  if (value === undefined) {
    Vue.delete(obj, key);
    return;
  }
  // Key is undefined: add it in an ordered manner
  if (obj[key] === undefined) {
    utility.insertKeyOrdered(obj, key, keyOrder, Vue.set, Vue.delete);
  }
  if (typeof (value) === 'object' && value !== null) {
    if (typeof (obj[key]) === 'object' && obj[key] !== null) {
      // Source and destination are objects: copy and delete properties recursively from one to the other, stop
      deepCopy(value, obj[key], setProp, true);
      return;
    }
  }
  // If the properties are not equal: set destination from source
  if (obj[key] !== value) {
    if (typeof (value) === 'object' && value !== null) {
      Vue.set(obj, key, deepCopy(value));
    } else {
      Vue.set(obj, key, value);
    }
  }
}

/**
 * Deeply copies objFrom into an optional objTo, returning the result
 * @param {object} objFrom Object to copy properties from
 * @param {object} [objTo] Object to copy properties into
 * @param {(obj: Object, key: string, value: *) => void} [setFunc] Optionally override the logic for setting properties
 * @param {boolean} [deleteAbsent] Optionally delete properties from objTo that are absent in objFrom
 * @returns {object} The result of the copy
 */
function deepCopy(objFrom, objTo, setFunc, deleteAbsent) {
  // By default, delete undefined, set everything else
  if (setFunc == null) {
    setFunc = (obj, key, value) => {
      if (value === undefined) {
        delete obj[key];
      } else {
        obj[key] = value;
      }
    }
  }

  // Makes the objTo parameter optional
  if (objTo == null) {
    objTo = Array.isArray(objFrom) ? [] : {};
  }

  // Removes the missing keys from the destination object
  if (deleteAbsent) {
    if (Array.isArray(objTo)) {
      // There are probably some gross edge cases that could happen here... but let's just handle normal arrays
      for (let k = objTo.length - 1; k >= 0; k--) {
        if (!(k in objFrom)) {
          setFunc(objTo, k, undefined);
        }
      }
    }
    Object.keys(objTo).map(x => x).forEach(k => {
      if (!(k in objFrom)) {
        setFunc(objTo, k, undefined);
      }
    });
  }

  // Copies the source object key-values into the destination object, recursively
  Object.keys(objFrom).forEach(k => {
    let val = objFrom[k];
    if (typeof (val) === 'object' && val != null) {
      let destVal = objTo[k];
      if (typeof (destVal) === 'object' && destVal != null) {
        deepCopy(val, destVal, setFunc, deleteAbsent);
      } else {
        setFunc(objTo, k, deepCopy(val, null, setFunc, deleteAbsent));
      }
    } else {
      setFunc(objTo, k, val);
    }
  });

  return objTo;
}

/**
 * @param {string} str 
 * @returns {string}
 */
function fixCarriageReturns(str) {
  if (!str) return str;
  return str.replace(/\r/g, "").replace(/\n/g, "\r\n");
}

/**
 * @param {string} str 
 * @returns {string}
 */
function fromEmptyStringToUndefined(str) {
  if (str == null || str === "") return undefined;
  return str;
}

/**
 * @param {Array} arr 
 * @returns {Array}
 */
function fromEmptyArrayToUndefined(arr) {
  if (!arr || !arr[0]) return undefined;
  return arr;
}

/**
 * @param {string} val 
 * @returns {integer}
 */
function fromStringToInteger(val) {
  if (val == null || val === "") return undefined;
  let str = String(val);
  if (/^[+-]?\d+$/.test(str)) {
    return +str;
  } else if (str.startsWith("+")) {
    str = str.substring(1);
  }
  return str;
}


// -------------------------- //
// - Stardard configuration - //
// -------------------------- //

/**
 * @typedef {object} CardPropertyMap
 * @property {(vm: object, cardDataProp: string, cardMappedProp: string) => void} [initialize]
 * @property {(vm: object, cardDataProp: string, cardMappedProp: string) => void} [sync]
 */

/**
 * @param {string} dataProp 
 * @param {(value: *) => *} transformToData 
 * @param {string} mapProp 
 * @param {(value: *) => *} transformToMap 
 * @returns {CardPropertyMap}
 */
function standardMap(dataProp, transformToData, mapProp, transformToMap) {
  mapProp = mapProp || dataProp;
  transformToMap = transformToMap || (x => x);
  return {
    initialize(vm, cardDataProp, cardMappedProp) {
      vm.$watch(cardMappedProp + "." + mapProp, newValue => {
        let cardData = vm[cardDataProp];
        setProp(cardData, dataProp, transformToData(newValue));
      }, { deep: true });
    },
    sync(vm, cardDataProp, cardMappedProp) {
      let cardData = vm[cardDataProp], cardMapped = vm[cardMappedProp];
      setProp(cardMapped, mapProp, transformToMap(cardData[dataProp]));
    }
  }
}

/**
 * @typedef {object} CardMapperConfig
 * @property {object.<string, CardPropertyMap>} props
 */

/**
 * @typedef {object} CardMapperConfig
 * @property {object} utils
 * @property {(dataProp: string, transformToData: (value: *) => *, mapProp: string, transformToMap: (value: *) => *) => CardPropertyMap} utils.standardMap
 * @property {(obj: object, key: string, value: *) => void} utils.setProp
 * @property {(str: string) => string} utils.fixCarriageReturns
 * @property {(str: string) => string} utils.fromEmptyStringToUndefined
 * @property {(str: Array) => Array} utils.fromEmptyArrayToUndefined
 * @property {(str: string) => integer} utils.fromStringToInteger
 * @property {object.<string, CardPropertyMap>} props
 */

/**
 * @typedef {CardMapperConfig & CardMapperUtil} CardMapperUtilConfig
 */

/**
 * @type {CardMapperUtilConfig}
 */
const standardConfig = {
  utils: {
    fixCarriageReturns,
    fromEmptyStringToUndefined,
    fromEmptyArrayToUndefined,
    fromStringToInteger,
    standardMap,
    setProp
  },
  props: {
    "name": standardMap("name", fromEmptyStringToUndefined),
    "text": standardMap("text", x => fromEmptyStringToUndefined(fixCarriageReturns(x))),
    "textFormat": standardMap("textFormat", fromEmptyStringToUndefined),
    "type": standardMap("type", fromEmptyStringToUndefined),
    "subtype": standardMap("subtype", fromEmptyArrayToUndefined, null, x => x || []),
    "alignment": standardMap("alignment", fromEmptyStringToUndefined),
    "class": standardMap("class", fromEmptyArrayToUndefined, null, x => x || []),
    "faction": standardMap("faction", fromEmptyArrayToUndefined, null, x => x || []),
    "attack": standardMap("attack", x => {
      if (x == null || x === "") return undefined;
      let values = String(x).split("/").filter(x => x !== "");
      for (let i = 0; i < values.length; i++) {
        values[i] = fromStringToInteger(values[i]);
      }
      return values;
    }, null, x => {
      if (!Array.isArray(x)) return x;
      return x.join("/");
    }),
    "damageType": standardMap("damageType", fromEmptyStringToUndefined),
    "armorClass": standardMap("armorClass", fromStringToInteger),
    "skill": standardMap("skill", fromStringToInteger),
    "hitPoints": standardMap("hitPoints", fromStringToInteger),
    "level": standardMap("level", fromStringToInteger),
    "traits": standardMap("traits", fromEmptyArrayToUndefined, null, x => x || []),
    "keywords": standardMap("keywords", x => {
      if (!Array.isArray(x) || x[0] == null) return undefined;
      return x.map(y => {
        return {
          name: y.name,
          value: fromStringToInteger(y.value)
        };
      });
    }, null, x => x || []),
    "feats": standardMap("feats", x => {
      if (!Array.isArray(x) || x[0] == null) return undefined;
      return x.map(y => {
        return {
          name: y.name,
          value: fromStringToInteger(y.value)
        };
      });
    }, null, x => x || []),
    "editions": standardMap("editions", fromEmptyStringToUndefined),
    "errata": standardMap("errata", x => fromEmptyStringToUndefined(fixCarriageReturns(x))),
    "exclusivePromo": standardMap("exclusivePromo", x => !x ? undefined : x),
    "printInfos": standardMap("printInfos", x => {
      if (!Array.isArray(x) || x[0] == null) return undefined;
      return x.map(y => {
        return {
          set: y.set,
          setNumber: fromEmptyStringToUndefined(y.setNumber),
          rarity: y.rarity,
          flavorText: fromEmptyStringToUndefined(fixCarriageReturns(y.flavorText)),
          flavorTextFormat: fromEmptyStringToUndefined(y.flavorTextFormat),
          artist: fromEmptyStringToUndefined(y.artist),
          imageUrl: fromEmptyStringToUndefined(y.imageUrl)
        };
      });
    }, null, x => x || [])
  }
}


// ---------------- //
// - Final export - //
// ---------------- //


/**
 * @param {(config: CardMapperConfig) => void} configtransform
 * @returns {CardMapperConfig}
 */
export function buildConfig(configtransform) {
  let config = deepCopy(standardConfig);
  configtransform(config)
  return config;
}

/**
 * @param {object} vm 
 * @param {string} cardDataProp 
 * @param {string} cardMappedProp 
 * @param {CardMapperConfig} [config]
 * @returns {() => void}
 */
export function createMapper(vm, cardDataProp, cardMappedProp, config) {
  config = config || standardConfig;

  Object.keys(config.props).forEach(x => {
    let initialize = config.props[x].initialize;
    if (initialize) initialize(vm, cardDataProp, cardMappedProp, config);
  });

  return {
    sync() {
      Object.keys(config.props).forEach(x => {
        let sync = config.props[x].sync;
        if (sync) sync(vm, cardDataProp, cardMappedProp, config);
      });
    }
  }
}