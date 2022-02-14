export default {
  "name": {
    validate(val) {
      if (!val) return "A name is required.";
    }
  },
  "text": {
    validate(val, cardData) {
      if (cardData.class && cardData.class.includes("/")) {
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
    validate(val, cardData) {
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
            if (val) return "Alignment is invalid for this card type."
            break;
        }
      }
    }
  },
  "faction": {
    validate(val, cardData) {
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
            if (val) return "Faction is invalid for this card type."
            break;
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
            if (val) return "Attack is invalid for this card type."
            break;
        }
      }
      if (val) {
        let attacks = val.split("/");
        for (let i = 0; i < attacks.length; i++) {
          if (!/^([+-]\d+|[+-]?\*|[+-]?X)$/.test(attacks[i])) return "Attack must be a slash-separated signed number."
        }
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
            if (val) return "AC is invalid for this card type."
            break;
        }
      }
      if (val) {
        if (!/^[+-]?(\d+|\*|X)$/.test(val)) return "AC must be a number."
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
            if (val) return "Skill is invalid for this card type."
            break;
        }
      }
      if (val) {
        if (!/^[+-](\d+|\*|X)$/.test(val)) return "Skill must be a signed number."
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
            if (val) return "HP is invalid for this card type."
            break;
        }
      }
      if (val) {
        if (!/^[+-]?(\d+|\*|X)$/.test(val)) return "HP must be a number."
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
            if (val) return "Level is invalid for this card type."
            break;
        }
      }
      if (val) {
        if (!/^[+-]?(\d+|\*|X)$/.test(val)) return "Level must be a number."
      }
    }
  },
  "traits": {
    validate(val, cardData) {
      if (cardData.type) {
        switch (cardData.type) {
          case "Battlefield":
          case "Dungeon":
            if (val) return "Traits are invalid for this card type."
            break;
        }
      }
    }
  },
  "feats": {
    validate(val, cardData) {
      if (cardData.type) {
        switch (cardData.type) {
          case "Action":
          case "Battlefield":
          case "Dungeon":
          case "Item":
            if (val) return "Feats are invalid for this card type."
            break;
        }
      }
    }
  },
  "misc": {
    validate(val, cardData) {
      if (cardData.type) {
        if ((!val || !val.includes("Challenge Rating")) && cardData.type === "Dungeon") {
          return "Challenge Rating is required for this card type."
        }
        if (val && val.includes("Challenge Rating") && cardData.type !== "Dungeon") {
          return "Challenge Rating is invalid for this card type."
        }
        if (val && val.includes("GP") && cardData.type !== "Item") {
          return "GP is invalid for this card type."
        }
      }
    }
  },
  "flavorTraits": {
    validate(val, _cardData, referenceLists) {
      if (val) {
        let fTraits = val.split("/");
        for (let i = 0; i < fTraits.length; i++) {
          if (referenceLists.traitList.includes(fTraits[i])) {
            return "Flavor traits must not be real traits."
          }
        }
      }
    }
  },
}