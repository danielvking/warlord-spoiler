const schemaV1 = "https://theaccordlands.com/schemas/v1/card"
const schemaV2 = "https://theaccordlands.com/schemas/v2/card"
const latest = schemaV2

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
  newData.faction = split(cardData.faction)
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
  newData.exclusiveLordCard = cardData.ehallengeLord
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

  // etc...

  // Check if the final schema is the current schema
  if (cardSchema !== latest) throw "Unrecognized card schema"

  return cardData
}