const schemaV1 = "https://theaccordlands.com/schemas/v1/card"
const schemaV2 = "https://theaccordlands.com/schemas/v2/card"
const schemaV3 = "https://theaccordlands.com/schemas/v3/card"
const schemaV4 = "https://theaccordlands.com/schemas/v4/card"
const latest = schemaV4

function upgradeV1ToV2(cardData) {
  let newData = {}

  function split(str) {
    return (str || undefined) && str.split('/')
  }
  function parseInt(str) {
    if (!str) return undefined
    return +str
  }
  function parseStat(str) {
    if (!str) return undefined
    let val = +str
    if (!isNaN(val)) {
      return val
    }
    return "X"
  }
  function parseFeat(str) {
    var split = str.replace(" +", "|").split('|')
    return { name: split[0], value: +split[1] }
  }
  function parseMisc(str) {
    let key = str.replace(/[-+\d]/, "").trim()
    var value = +str.replace(/[^-+\d]/, "").trim()
    if (key == "Charge") key = "Charges"
    return { name: key, value: value }
  }

  // Map factions
  let factions = split(cardData.faction)

  if (factions != null)
  {
      var factionReplace = {
        "Deverenian": "Deverenian Empire",
        "Elf": "Elven Branches",
        "Dwarf": "Dwarven Forges",
        "Mercenary": "Mercenary Guilds",
        "Nothrog": "Nothrog Legions"
      }
      factions = factions.map(faction => factionReplace[faction] || faction)
  }

  let keywords = []

  let misc = cardData.misc && split(cardData.Misc).map(x => parseMisc(x)) || []
  let traits = cardData.traits && split(cardData.traits) || []

  // Map to keywords
  if (traits.includes("Epic")) {
    keywords.push({ name: "Epic" })
  }
  if (traits.includes("Astral") || traits.includes("Ethereal") || traits.includes("Planar")) {
    keywords.push({ name: "Planar" })
  }
  if (traits.includes("Unique")) {
    keywords.push({ name: "Unique" })
  }
  if (traits.includes("Cursed")) {
    keywords.push({ name: "Cursed" })
  }
  let search = misc.find(x => x.name == "Challenge Rating")
  if (search) keywords.push(search)
  search = misc.find(x => x.name == "Charges")
  if (search) keywords.push(search)

  // Map to subtype
  let subtype = undefined
  if (traits.includes("Warlord")) {
    newData.subtype = "Warlord"
  }
  if (traits.includes("Overlord")) {
    newData.subtype = "Overlord"
  }
  if (traits.includes("Dragon Lord")) {
    newData.subtype = "Dragon Lord"
  }
  if (traits.includes("Medusan Lord")) {
    newData.subtype = "Medusan Lord"
  }

  // There are a lot of trait and flavor trait changes, but we are just going to ignore most of them
  let notTraits = ["Epic", "Astral", "Ethereal", "Planar", "Unique", "Cursed", "Warlord", "Medusan Lord", "Dragon Lord", "Overlord"]
  let newTraits = traits.filter(x => !notTraits.includes(x))
  newTraits = [...new Set(newTraits)]

  newData.name = cardData.name
  newData.text = cardData.text
  newData.type = cardData.type
  newData.subtype = subtype
  newData.alignment = cardData.alignment
  newData.class = split(cardData.class)
  newData.faction = faction
  newData.attack = cardData.attack && split(cardData.attack).map(x => parseStat(x))
  newData.damageType = cardData.Type === "Character" ? "Physical" : undefined
  newData.armorClass = parseStat(cardData.armorClass)
  newData.skill = parseStat(cardData.skill)
  newData.hitPoints = parseStat(cardData.hitPoints)
  newData.level = parseStat(cardData.level)
  newData.traits = newTraits.length > 0 ? newTraits : undefined
  newData.keywords = keywords.length > 0 ? keywords : undefined
  newData.feats = cardData.feats && split(cardData.feats).map(x => parseFeat(x)) || undefined
  newData.editions = cardData.editions
  newData.errata = cardData.errata || undefined
  newData.exclusivePromo = cardData.ehallengeLord
  newData.printInfos = cardData.printInfos && cardData.printInfos.map(p => {
    return {
      set: p.set,
      setNumber: parseInt(p.setNumber),
      rarity: p.rarity,
      flavorText: p.flavorText || undefined,
      artist: p.artist || undefined,
      imageUrl: p.imageUrl || undefined
    }
  }) || undefined

  function deleteUndefined(obj) {
    Object.keys(obj).forEach(k => {
      let val = obj[k]
      if (val === undefined) delete obj[k]
      if (val != null && typeof(val) === "object") {
        deleteUndefined(val)
      }
    })
  }
  deleteUndefined(newData)

  return newData
}

function upgradeV2ToV3(cardData) {
  if (cardData.subtype != null) {
    cardData.subtype = [cardData.subtype]
  }
  return cardData
}

const setPadding = {
    "10th Anniversary Set (10A)": 3,
    "4th Edition (4E)": 3,
    "Ancient Lore (AL)": 2,
    "Assassin's Strike (AS)": 3,
    "Battle Box #2 (BB2)": 3,
    "Betrayal (BET)": 3,
    "Black Knives (BK)": 3,
    "Call to Arms (CTA)": 3,
    "Campaign Edition (CE)": 3,
    "Champions (CHP)": 3,
    "City of Gold (CoG)": 3,
    "Counter Attack (CA)": 3,
    "Crimson Coast (CC)": 3,
    "Death's Bargain (DB)": 3,
    "Dominance (DOM)": 3,
    "Dragon's Fury (DF)": 3,
    "Epic Edition (EE)": 3,
    "Eye of the Storm (EoS)": 3,
    "Good and Evil (GE)": 3,
    "Hero's Gambit (HG)": 3,
    "Into the Accordlands (ITA)": 3,
    "Learn to Play (L2P)": 3,
    "Light and Shadow (LS)": 3,
    "Nest of Vipers (NoV)": 3,
    "Plane of Secrets (PS)": 3,
    "Saga of the Storm (SS)": 3,
    "Sands of Oblivion (SoO)": 3,
    "Shattered Empires (SE)": 3,
    "Siege (SG)": 3,
    "Sneak Attack (SA)": 3,
    "Southern Kingdoms (SK)": 3,
    "Stolen Destiny (SD)": 2,
    "Temple of Lore (ToL)": 3,
    "Tooth and Claw (TaC)": 3,
    "Treasure Chest (TCH)": 2
}

function upgradeV3ToV4(cardData) {
  cardData.printInfos.forEach(p => {
    if (p.setNumber != null) {
      p.setNumber = p.setNumber.toString()
      let padding = setPadding[p.set]
      if (padding > 0) {
        p.setNumber = p.setNumber.padStart(padding, "0")
      }
    }
  })
  return cardData
}

export const currentCardSchema = latest

/**
 * @param {object} cardData The card data
 * @param {string} [cardSchema] The card schema, defaults to the earliest version
 * @returns {object} The upgraded card data in the latest schema
 */
export function upgradeCard(cardData, cardSchema) {
  // Default to v1
  cardSchema = cardSchema || schemaV1

  // Upgrade v1 to v2
  if (cardSchema === schemaV1) {
    cardData = upgradeV1ToV2(cardData)
    cardSchema = schemaV2
  }

  // Upgrade v2 to v3
  if (cardSchema === schemaV2) {
    cardData = upgradeV2ToV3(cardData)
    cardSchema = schemaV3
  }

  // Upgrade v3 to v4
  if (cardSchema === schemaV3) {
    cardData = upgradeV3ToV4(cardData)
    cardSchema = schemaV4
  }

  // etc...

  // Check if the final schema is the current schema
  if (cardSchema !== latest) throw "Unrecognized card schema"

  return cardData
}