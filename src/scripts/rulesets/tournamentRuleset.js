const traitMap = {
  "Abyssal": 3,
  "Apprentice": 1,
  "Aquatic": 1,
  "Assassin": 5,
  "Avatar": 3,
  "Barbarian": 5,
  "Bard": 5,
  "Beast": 1,
  "Cantor": 5,
  "Construct": 1,
  "Cursed ": -5,
  "Daemon": 3,
  "Djinn": 1,
  "Dragon": 5,
  "Druid": 5,
  "Elemental": 1,
  "Fire Elemental": 1,
  "Gargoyle": 5,
  "Ghoul": 1,
  "Hero": 1,
  "Illusionist": 5,
  "Kratchling": 1,
  "Lich": 5,
  "Lycanthrope": 5,
  "Mentalist": 5,
  "Monk": 5,
  "Monster": 5,
  "Necromancer": 5,
  "Paladin": 5,
  "Planar": 30,
  "Ranger": 5,
  "Reaver": 5,
  "Reindeer": 3,
  "Scout": 5,
  "Seer": 5,
  "Shaman": 5,
  "Siege": 5,
  "Stormwraith": 5,
  "Summoner": 5,
  "Thrall": 3,
  "Traitor": 1,
  "Troll": 1,
  "Undead": 5,
  "Warlord": 0,
}

const traitDesc = "The cost of individual traits varies. Having 3 or more traits (including Warlord) costs an additional 5 points per trait.\r\n" +
  Object.entries(traitMap).map(x => `(${x[0]}: ${x[1]})`).join(" ");

const featMap = {
  "Charisma": 5,
  "Defend": 5,
  "Magic Resistance": 15,
  "Marksmanship": 20,
  "Medicine": 15,
  "Powerattack": 15,
  "Riding": 10,
  "Riposte": 10,
  "Scribe": 10,
  "Stealth": 20
}

const featDesc = ["The cost of feats are..."]
  .concat(Object.entries(featMap).map(x => `${x[0]} is ${x[1]} points, plus 3 for each level`))
  .join("\r\n");

export default {
  "text": {}, // TODO
  "type": {
    validate(val) {
      if (val !== "Character") return "The card must be a character in this ruleset.";
    }
  },
  "class": {
    pointInfo: "Classless is -10 points, any single class is free. Additional classes are 40 points each.",
    computePoints(val) {
      if (val == null) return null;
      let classes = val.split("/").filter(x => x !== "Classless");
      if (classes.length === 0) return -10;
      return (classes.length - 1) * 40;
    }
  },
  "faction": {
    validate(val) {
      let factions = val.split("/");
      if (factions.length > 2) return "More than 2 factions is not permitted in this ruleset.";
    },
    pointInfo: "The first faction is free, and a second faction is 55 points.",
    computePoints(val) {
      if (val == null) return null;
      let factions = val.split("/");
      return (factions.length - 1) * 55;
    }
  },
  "attack": {
    pointInfo: "Attack of 0 is free. Each additional value of attack is: 1 point up to 5 and 2 points beyond that." +
      "\r\nA second strike is 5 points in addition to the points for its value." +
      "\r\nSubsequent additional strikes are 10 points in addition to the points for their value.",
    computePoints(val) {
      if (val == null) return null;
      function numAttacksPoints(num) {
        if (num <= 1) return 0;
        if (num <= 2) return 5;
        return (num - 2) * 10 + 5;
      }
      function strikePoints(attack) {
        if (attack <= 0) return 0;
        if (attack <= 5) return attack * 1;
        return (attack - 5) * 2 + 5;
      }

      let attacks = val.split("/");
      let sum = numAttacksPoints(attacks.length);
      attacks.forEach(attack => {
        sum += strikePoints(attack);
      });
      return sum;
    }
  },
  "armorClass": {
    pointInfo: "AC of 8 is free. Each additional value of AC is: 2 points up to 12, 3 points up to 17, and 10 points beyond that.",
    computePoints(val) {
      if (val == null) return null;
      if (val <= 8) return 0;
      if (val <= 12) return (val - 8) * 2;
      if (val <= 17) return (val - 12) * 3 + 8;
      return (val - 17) * 10 + 23;
    }
  },
  "skill": {
    pointInfo: "Skill of 0 is free. Each additional value of skill is: 1 points up to 5, 2 points up to 10, and 5 points beyond that.",
    computePoints(val) {
      if (val == null) return null;
      if (val <= 0) return 0;
      if (val <= 5) return val * 1;
      if (val <= 10) return (val - 5) * 2 + 5;
      return (val - 10) * 5 + 15;
    }
  },
  "hitPoints": {
    pointInfo: "HP of 1 is free. Each additional value of HP is: 5 points up to 3, 10 points up to 4, and 15 points beyond that.",
    computePoints(val) {
      if (val == null) return null;
      if (val <= 1) return 0;
      if (val <= 3) return (val - 1) * 5;
      if (val <= 4) return (val - 3) * 10 + 10;
      return (val - 4) * 15 + 20;
    }
  },
  "level": {
    validate(val) {
      if (val > 5) return "A level greater than 5 is not permitted in this ruleset.";
    },
    pointInfo: "Level of 4 is free. Level of 5 is 10 points.",
    computePoints(val) {
      if (val == null) return null;
      if (val <= 4) return 0;
      return 10;
    }
  },
  "traits": {
    validate(val) {
      let split = val && val.split("/");
      if (!val || !split.includes("Warlord")) return "Warlord is required in this ruleset.";
      for (let i = 0; i < split.length; i++) {
        let trait = split[i];
        if (traitMap[trait] == null) return `${trait} is not permitted in this ruleset.`;
      }
    },
    pointInfo: traitDesc,
    computePoints(val) {
      if (val) {
        let split = val.split("/");
        let sum = 0;
        for (let i = 0; i < split.length; i++) {
          let trait = split[i];
          sum += +traitMap[trait];
        }
        if (split.length > 2) sum += (split.length - 2) * 5;
        return sum;
      }
    }
  },
  "feats": {
    pointInfo: featDesc,
    computePoints(val) {
      if (val == null) return null;
      let featValues = val.split("/");
      let sum = 0;
      for (let i = 0; i < featValues.length; i++) {
        let featValue = featValues[i].split(/ (?=[-+])/);
        sum += featMap[featValue[0]] + 3 * featValue[1];
      }
      return sum;
    }
  },
  "misc": {
    printInfo: "Having charges costs 1 point, plus 3 points per charge.",
    computePoints(val) {
      if (val == null) return null;
      let sum = 0;
      let misc = val.split("/");
      for (let i = 0; i < misc.length; i++) {
        if (/^-?\d+ Charges?$/.test(misc[i])) {
          let charges = misc[i].split(" ")[0];
          sum += 1 + charges * 3;
        }
      }
      return sum;
    }
  },
}