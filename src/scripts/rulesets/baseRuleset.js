export default {
  "general": {
    // These are non-standard, but we are going to go ahead and include them across all rulesets
    additionalKeywords: ["Limited Spend Order:", "Limited Order:", "Limited Spend React:", "Limited React:"]
  },
  "name": {
    validate(val) {
      if (!val) return "A name is required.";
    }
  },
  "text": {
    validate(val, cardData) {
      if (cardData.class && cardData.class.includes("/") && cardData.type === "Character") {
        // Multiclass
        let extraClasses = cardData.class.split("/").slice(1);
        let regex = new RegExp("[^.]*is[^.]*" + extraClasses.join("[^.]*"), "mi");
        if (!val || !val.match(regex)) {
          return "Multiclass must be specified in description.";
        }
      }
    }
  },
  "type": {
    validate(val) {
      if (!val) return "A type is required.";
    }
  },
  "alignment": {
    validate(val, cardData, referenceLists) {
      if (cardData.type) {
        switch (cardData.type) {
          case "Character":
            if (!val) return "Alignment is required for this card type.";
            break;
          case "Action":
          case "Battlefield":
          case "Dungeon":
          case "Epic Class":
          case "Item":
            if (val) return "Alignment is invalid for this card type.";
            break;
        }
      }
      if (val && referenceLists.alignmentList) {
        let split = val.split("/");
        for (let i = 0; i < split.length; i++) {
          if (!referenceLists.alignmentList.includes(split[i])) return `${split[i]} is not a valid alignment.`;
        }
      }
    }
  },
  "class": {
    validate(val, _cardData, referenceLists) {
      if (!val) return "Class is required."
      if (referenceLists.classList) {
        let split = val.split("/");
        for (let i = 0; i < split.length; i++) {
          if (!referenceLists.classList.includes(split[i])) return `${split[i]} is not a valid class.`;
        }
      }
    }
  },
  "faction": {
    validate(val, cardData, referenceLists) {
      if (cardData.type) {
        switch (cardData.type) {
          case "Character":
            if (!val) return "Faction is required for this card type.";
            break;
          case "Action":
          case "Battlefield":
          case "Dungeon":
          case "Epic Class":
          case "Item":
            if (val) return "Faction is invalid for this card type.";
            break;
        }
      }
      if (val && referenceLists.factionList) {
        let split = val.split("/");
        for (let i = 0; i < split.length; i++) {
          if (!referenceLists.factionList.includes(split[i])) return `${split[i]} is not a valid faction.`;
        }
      }
    }
  },
  "attack": {
    validate(val, cardData) {
      if (cardData.type) {
        switch (cardData.type) {
          case "Character":
          case "Epic Class":
            if (!val) return "Attack is required for this card type.";
            break;
          case "Action":
          case "Battlefield":
          case "Dungeon":
            if (val) return "Attack is invalid for this card type.";
            break;
        }
      }
      if (val) {
        let attacks = val.split("/");
        let coerce = false;
        let notNumeric = false;
        for (let i = 0; i < attacks.length; i++) {
          if (/^[+-]?(\d+|\*|X)$/.test(attacks[i])) {
            // Always signed
            if (/^\d+$/.test(attacks[i])) {
              coerce = true;
              attacks[i] = "+" + attacks[i]; // coerce
            }
          } else {
            notNumeric = true;
          }
        }
        if (coerce) cardData.attack = attacks.join("/");
        if (notNumeric) return "Attack must be a number.";
      }
    }
  },
  "armorClass": {
    validate(val, cardData) {
      if (cardData.type) {
        switch (cardData.type) {
          case "Character":
          case "Epic Class":
            if (!val) return "AC is required for this card type.";
            break;
          case "Action":
          case "Battlefield":
          case "Dungeon":
            if (val) return "AC is invalid for this card type.";
            break;
        }
      }
      if (val) {
        if (/^[+-]?(\d+|\*|X)$/.test(val)) {
          // Signed for non-characters
          if (/^\d+$/.test(val) && cardData.type !== "Character") {
            cardData.armorClass = "+" + val; // coerce
          } else if (/^\+.*$/.test(val) && cardData.type === "Character") {
            cardData.armorClass = val.substring(1); // coerce
          }
        } else {
          return "AC must be a number.";
        }
      }
    }
  },
  "skill": {
    validate(val, cardData) {
      if (cardData.type) {
        switch (cardData.type) {
          case "Character":
          case "Epic Class":
            if (!val) return "Skill is required for this card type.";
            break;
          case "Action":
          case "Battlefield":
          case "Dungeon":
          case "Item":
            if (val) return "Skill is invalid for this card type.";
            break;
        }
      }
      if (val) {
        if (/^[+-]?(\d+|\*|X)$/.test(val)) {
          // Always signed
          if (/^\d+$/.test(val)) {
            cardData.skill = "+" + val; // coerce
          }
        } else {
          return "Skill must be a number.";
        }
      }
    }
  },
  "hitPoints": {
    validate(val, cardData) {
      if (cardData.type) {
        switch (cardData.type) {
          case "Character":
          case "Epic Class":
            if (!val) return "HP is required for this card type.";
            break;
          case "Action":
          case "Battlefield":
          case "Dungeon":
          case "Item":
            if (val) return "HP is invalid for this card type.";
            break;
        }
      }
      if (val) {
        if (/^[+-]?(\d+|\*|X)$/.test(val)) {
          // Signed for non-characters
          if (/^\d+$/.test(val) && cardData.type !== "Character") {
            cardData.hitPoints = "+" + val; // coerce
          } else if (/^\+.*$/.test(val) && cardData.type === "Character") {
            cardData.hitPoints = val.substring(1); // coerce
          }
        } else {
          return "HP must be a number.";
        }
      }
    }
  },
  "level": {
    validate(val, cardData) {
      if (cardData.type) {
        switch (cardData.type) {
          case "Action":
          case "Character":
          case "Epic Class":
          case "Item":
            if (!val) return "Level is required for this card type.";
            break;
          case "Battlefield":
          case "Dungeon":
            if (val) return "Level is invalid for this card type.";
            break;
        }
      }
      if (val) {
        if (/^[+-]?(\d+|\*|X)$/.test(val)) {
          // Unsigned for non-epic-classes
          if (/^\d+$/.test(val) && cardData.type === "Epic Class") {
            cardData.level = "+" + val; // coerce
          } else if (/^\+.*$/.test(val) && cardData.type !== "Epic Class") {
            cardData.level = val.substring(1); // coerce
          }
        } else {
          return "Level must be a number.";
        }
        if (val < 1) return "Level must be positive.";
      }
    }
  },
  "traits": {
    validate(val, cardData, referenceLists) {
      if (cardData.type) {
        switch (cardData.type) {
          case "Battlefield":
          case "Dungeon":
            if (val) return "Traits are invalid for this card type.";
            break;
        }
      }
      if (val && referenceLists.traitList) {
        let split = val.split("/");
        for (let i = 0; i < split.length; i++) {
          if (!referenceLists.traitList.includes(split[i])) return `${split[i]} is not a valid trait.`;
        }
      }
    }
  },
  "feats": {
    validate(val, cardData, referenceLists) {
      if (cardData.type) {
        switch (cardData.type) {
          case "Action":
          case "Battlefield":
          case "Dungeon":
            if (val) return "Feats are invalid for this card type.";
            break;
        }
      }
      if (val && referenceLists.featList) {
        let featValues = val.split("/");
        for (let i = 0; i < featValues.length; i++) {
          let featValue = featValues[i].split(/ (?=[-+])/);
          if (!referenceLists.featList.includes(featValue[0])) return `${featValue[0]} is not a valid feat.`;
          if (!/^[+-](\d+|\*|X)$/.test(featValue[1])) return `${featValue[0]} must be a signed number.`;
          if (featValue[1] < 0) return `${featValue[0]} cannot be negative.`;
        }
      }
    }
  },
  "misc": {
    validate(val, cardData) {
      if (cardData.type) {
        if ((!val || !val.includes("Challenge Rating")) && cardData.type === "Dungeon") {
          return "Challenge Rating is required for this card type.";
        }
        if (val && val.includes("Challenge Rating") && cardData.type !== "Dungeon") {
          return "Challenge Rating is invalid for this card type.";
        }
        if (val && val.includes("gp") && cardData.type !== "Item") {
          return "GP is invalid for this card type.";
        }
      }
    }
  },
  "flavorTraits": {
    validate(val, _cardData, referenceLists) {
      if (val && referenceLists.traitList) {
        let fTraits = val.split("/");
        for (let i = 0; i < fTraits.length; i++) {
          if (referenceLists.traitList.includes(fTraits[i])) {
            return "Flavor traits must not be real traits.";
          }
        }
      }
    }
  },
}