import baseRuleset from "@/scripts/rulesets/baseRuleset.js";
import tournamentRuleset from "@/scripts/rulesets/tournamentRuleset.js";

function combineRuleset(source, target) {
  // Merge each property config
  Object.keys(source).forEach(p => {
    // If the property config does not exist on the target, create it
    if (!target[p]) target[p] = {};
    // Enumerate config settings
    const sConfig = source[p];
    const tConfig = target[p];
    Object.keys(sConfig).forEach(x => {
      const sConfigSetting = sConfig[x];
      const tConfigSetting = tConfig[x];
      // If the properties are functions, merge them (return truthy results from the target before executing the source)
      if (typeof sConfigSetting === "function" && typeof tConfigSetting === "function") {
        tConfig[x] = function (...args) {
          let result = tConfigSetting.appy(null, args);
          if (result) return result;
          return sConfigSetting.appy(null, args);
        }
      } else {
        // Override non-function settings
        tConfig[x] = sConfigSetting;
      }
    })
  })
  return target;
}

function withBase(ruleset) {
  let base = combineRuleset(baseRuleset, {});
  return combineRuleset(ruleset, base);
}

function deepFreeze(object) {
  const propNames = Object.getOwnPropertyNames(object);
  for (const name of propNames) {
    const value = object[name];
    if (value && typeof value === "object") {
      deepFreeze(value);
    }
  }
  return Object.freeze(object);
}

// A static list of all rulesets
const rulesets = [
  {
    description: "No Ruleset",
    ruleset: baseRuleset
  },
  {
    description: "Tournament",
    ruleset: withBase(tournamentRuleset)
  }
].filter(x => x.description === "No Ruleset")

deepFreeze(rulesets);

export default rulesets;