export default {
  "general": {
    // These are non-standard, but we are going to go ahead and include them across all rulesets
    additionalKeywords: ["Limited Spend Order:", "Limited Order:", "Limited Spend React:", "Limited React:"]
  },
  "name": {
    validate(val) {
      if (val == null) return "A name is required.";
    }
  },
  "text": {
    validate(val, cardData) {
      if (cardData.class && cardData.class.length > 1 && cardData.type === "Character") {
        // Multiclass
        let extraClasses = cardData.class.slice(1);
        let regex = new RegExp("[^.]*is[^.]*" + extraClasses.join("[^.]*"), "mi");
        if (!val || !val.match(regex)) {
          return "Multiclass must be specified in description.";
        }
      }
    }
  },
  "type": {
    validate(val, _, referenceLists) {
      if (val == null) return "A type is required.";
      if (val && referenceLists.typeList) {
        if (!referenceLists.typeList.includes(val)) return `${val} is not a valid type.`;
      }
    }
  },
  "subtype": {
    validate(val, cardData, referenceLists) {
      if (val != null) {
        let subtypes = (referenceLists.subtypeLists && referenceLists.subtypeLists[cardData.type]) || [];
        for (let i = 0; i < val.length; i++) {
          if (!subtypes.includes(val[i])) return `${val[i]} is not a valid ${cardData.type} subtype.`;
        }
      }
    }
  },
  "alignment": {
    validate(val, cardData, referenceLists) {
      if (cardData.type) {
        switch (cardData.type) {
          case "Character":
            if (val == null) return "Alignment is required for this card type.";
            break;
          case "Action":
          case "Battlefield":
          case "Dungeon":
          case "Epic Class":
          case "Item":
            if (val != null) return "Alignment is invalid for this card type.";
            break;
        }
      }
      if (val && referenceLists.alignmentList) {
        if (!referenceLists.alignmentList.includes(val)) return `${val} is not a valid alignment.`;
      }
    }
  },
  "class": {
    validate(val, _cardData, referenceLists) {
      if (val == null) return "Class is required."
      if (referenceLists.classList) {
        for (let i = 0; i < val.length; i++) {
          if (!referenceLists.classList.includes(val[i])) return `${val[i]} is not a valid class.`;
        }
      }
    }
  },
  "faction": {
    validate(val, cardData, referenceLists) {
      if (cardData.type) {
        switch (cardData.type) {
          case "Character":
            if (!val || val.length === 0) return "Faction is required for this card type.";
            break;
          case "Action":
          case "Battlefield":
          case "Dungeon":
          case "Epic Class":
          case "Item":
            if (val != null) return "Faction is invalid for this card type.";
            break;
        }
      }
      if (val && referenceLists.factionList) {
        for (let i = 0; i < val.length; i++) {
          if (!referenceLists.factionList.includes(val[i])) return `${val[i]} is not a valid faction.`;
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
            if (!val || val.length === 0) return "Attack is required for this card type.";
            break;
          case "Action":
          case "Battlefield":
          case "Dungeon":
            if (val != null) return "Attack is invalid for this card type.";
            break;
        }
      }
      if (val != null) {
        for (let i = 0; i < val.length; i++) {
          if (!/^[+-]?(\d+|\*|X)$/.test(val[i])) {
            return "Attack must be a number."
          }
        }
      }
    }
  },
  "damageType": {
    validate(val, cardData, referenceLists) {
      if (cardData.type) {
        switch (cardData.type) {
          case "Character":
            // Damage type is not totally supported yet in the card builder
            // if (val == null) return "Damage type is required for this card type.";
            break;
          case "Action":
          case "Battlefield":
          case "Dungeon":
          case "Epic Class":
          case "Item":
            if (val != null) return "Damage type is invalid for this card type.";
            break;
        }
      }
      if (val && referenceLists.damageType) {
        if (!referenceLists.damageType.includes(val)) return `${val} is not a valid damage type.`;
      }
    }
  },
  "armorClass": {
    validate(val, cardData) {
      if (cardData.type) {
        switch (cardData.type) {
          case "Character":
          case "Epic Class":
            if (val == null) return "AC is required for this card type.";
            break;
          case "Action":
          case "Battlefield":
          case "Dungeon":
            if (val != null) return "AC is invalid for this card type.";
            break;
        }
      }
      if (val != null) {
        if (!/^[+-]?(\d+|\*|X)$/.test(val)) {
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
            if (val == null) return "Skill is required for this card type.";
            break;
          case "Action":
          case "Battlefield":
          case "Dungeon":
          case "Item":
            if (val != null) return "Skill is invalid for this card type.";
            break;
        }
      }
      if (val != null) {
        if (!/^[+-]?(\d+|\*|X)$/.test(val)) {
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
            if (val == null) return "HP is required for this card type.";
            break;
          case "Action":
          case "Battlefield":
          case "Dungeon":
          case "Item":
            if (val != null) return "HP is invalid for this card type.";
            break;
        }
      }
      if (val != null) {
        if (!/^[+-]?(\d+|\*|X)$/.test(val)) {
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
            if (val == null) return "Level is required for this card type.";
            break;
          case "Battlefield":
          case "Dungeon":
            if (val != null) return "Level is invalid for this card type.";
            break;
        }
      }
      if (val != null) {
        if (!/^[+-]?(\d+|\*|X)$/.test(val)) {
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
            if (val != null) return "Traits are invalid for this card type.";
            break;
        }
      }
      if (val && referenceLists.traitList) {
        for (let i = 0; i < val.length; i++) {
          if (!referenceLists.traitList.includes(val[i])) return `${val[i]} is not a valid trait.`;
        }
      }
    }
  },
  "keywords": {
    validate(val, cardData, referenceLists) {
      if (val && referenceLists.keywordList) {
        for (let i = 0; i < val.length; i++) {
          let keywordInfo = referenceLists.keywordList.find(x => x.name === val[i].name);
          if (keywordInfo == null) return `${val[i].name} is not a valid keyword.`;
          if (keywordInfo.hasValue) {
            if (val[i].value == null) return `${val[i].name} must have a value.`;
            if (val[i].value < 0) return `${val[i].name} cannot be negative.`;
          } else {
            if (val[i].value != null) return `${val[i].name} cannot have a value.`;
          }
        }
      }
      let flattened = val && val.map(k => k.name);
      if (cardData.type) {
        if ((!flattened || !flattened.includes("Challenge Rating")) && cardData.type === "Dungeon") {
          return "Challenge Rating is required for this card type.";
        }
        if (flattened && flattened.includes("Challenge Rating") && cardData.type !== "Dungeon") {
          return "Challenge Rating is invalid for this card type.";
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
            if (val != null) return "Feats are invalid for this card type.";
            break;
        }
      }
      if (val && referenceLists.featList) {
        for (let i = 0; i < val.length; i++) {
          if (!referenceLists.featList.includes(val[i].name)) return `${val[i].name} is not a valid feat.`;
          if (val[i].value == null) return `${val[i].name} must have a value.`;
          if (val[i].value < 0) return `${val[i].name} cannot be negative.`;
        }
      }
    }
  }
}