import baseRuleset from "./baseRuleset";
import tournamentRuleset from "./tournamentRuleset_1_0";
import tournamentRuleset2 from "./tournamentRuleset_1_1";
import tournamentRuleset3 from "./tournamentRuleset_1_1_1";

function setFallback(ruleset, fallback) {
  // Merge each property config
  Object.keys(fallback).forEach(p => {
    // If the property config does not exist on the target, create it
    if (!ruleset[p]) ruleset[p] = {};
    // Enumerate config settings
    const fConfig = fallback[p];
    const rConfig = ruleset[p];
    Object.keys(fConfig).forEach(x => {
      const fConfigSetting = fConfig[x];
      const rConfigSetting = rConfig[x];
      // If the properties are functions, merge them (return truthy results from the source before executing the target)
      if (typeof fConfigSetting === "function" && typeof rConfigSetting === "function") {
        rConfig[x] = function (...args) {
          let result = rConfigSetting.apply(null, args);
          if (result) return result;
          return fConfigSetting.apply(null, args);
        }
      } else if (rConfigSetting == null) {
        // Inherit non-function settings
        rConfig[x] = fConfigSetting;
      }
    })
  })

  return ruleset;
}

function withBase(ruleset) {
  let clone = setFallback({}, ruleset);
  return setFallback(clone, baseRuleset);
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
    description: "Tournament 1.0",
    ruleset: withBase(tournamentRuleset)
  },
  {
    description: "Tournament 1.1",
    ruleset: withBase(tournamentRuleset2)
  }
  {
    description: "Tournament 2.0",
    ruleset: withBase(tournamentRuleset3)
  }
]//.filter(x => x.description === "No Ruleset")

deepFreeze(rulesets);

export default rulesets;