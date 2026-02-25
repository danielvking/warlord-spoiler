function escape(str) {
  return `"${str.replaceAll('"', '""')}"`
}

function unescape(str) {
  return str.slice(1, -1).replaceAll('""', '"')
}

function fromArray(value, mapFunc) {
  mapFunc = mapFunc || (x => x)
  return (value || []).map(x => mapFunc(x)).join("/")
}

function toArray(value, mapFunc) {
  if (!value) return value
  mapFunc = mapFunc || (x => x)
  return value.split(/[/,]/).map(x => mapFunc(x))
}

function fromWhatever(value) {
  return value == null ? "" : String(value)
}

function toMaybeNumber(value) {
  if (!value) return value
  let num = +value
  if (!isNaN(num)) return num
  return value
}

function toTrue(value) {
  if (!value) return value
  if (value === "true") return true
  return null
}

function fromNameValue(value) {
  if (value.value == null) {
    return value.name
  }
  return `${value.value} ${value.name}`
}

function toNameValue(value) {
  if (!value) return value
  let splitIndex = value.indexOf(" ")
  if (splitIndex >= 0) {
    return { name: value.slice(splitIndex + 1), value: Number(value.slice(0, splitIndex)) }
  }
  return { name: value }
}

const header = [
  "Index",
  "Name",
  "Text",
  "Type",
  "Subtype",
  "Alignment",
  "Class",
  "Faction",
  "Attack",
  "Damage Type",
  "Armor Class",
  "Skill",
  "Hit Points",
  "Level",
  "Traits",
  "Keywords",
  "Feats",
  "Editions",
  "Errata",
  "Exclusive Promo",
  "Set",
  "Set Number",
  "Rarity",
  "Flavor Text",
  "Artist",
  "Image URL"
].map(x => escape(x)).join(",")

function cardToCsvLines(card) {
  let lines = []

  let printInfos = card.printInfos || []
  printInfos.forEach(p => {
    let cols = []

    cols.push(fromWhatever(card.index))
    cols.push(fromWhatever(card.name))
    cols.push(fromWhatever(card.text))
    cols.push(fromWhatever(card.type))
    cols.push(fromArray(card.subtype, fromWhatever))
    cols.push(fromWhatever(card.alignment))
    cols.push(fromArray(card.class, fromWhatever))
    cols.push(fromArray(card.faction, fromWhatever))
    cols.push(fromArray(card.attack, fromWhatever))
    cols.push(fromWhatever(card.damageType))
    cols.push(fromWhatever(card.armorClass))
    cols.push(fromWhatever(card.skill))
    cols.push(fromWhatever(card.hitPoints))
    cols.push(fromWhatever(card.level))
    cols.push(fromArray(card.traits, fromWhatever))
    cols.push(fromArray(card.keywords, fromNameValue))
    cols.push(fromArray(card.feats, fromNameValue))
    cols.push(fromArray(card.editions, fromWhatever))
    cols.push(fromWhatever(card.errata))
    cols.push(fromWhatever(card.exclusivePromo))
    cols.push(fromWhatever(p.set))
    cols.push(fromWhatever(p.setNumber))
    cols.push(fromWhatever(p.rarity))
    cols.push(fromWhatever(p.flavorText))
    cols.push(fromWhatever(p.artist))
    cols.push(fromWhatever(p.imageUrl))

    lines.push(cols.map(x => escape(x)).join(","))
  })

  return lines
}

function csvTextToArrays(text) {
  let arrays = []

  // Normalize line endings
  text = text.replaceAll(/\r?\n/g, '\r\n')

  // Basically, break up the string on commas
  // If the substring looks like a properly escaped sequence, treat it as such, otherwise, treat it as literal
  let matchIt = text.matchAll(/(^|\r?\n|,)(?:("[^"]*(?:""[^"]*)*")|([^\r\n,]*))(?=$|\r?\n|,)/g)
  let arr, match
  while(!(match = matchIt.next()).done) {
    if (match.value[1] !== ',') {
      if (arr != null) arrays.push(arr)
      arr = []
    }
    let escapedValue = match.value[2]
    let literalValue = match.value[3]
    arr.push(escapedValue != null ? unescape(escapedValue) : literalValue)
  }

  return arrays
}

function csvArraysToCards(arrays) {
  let cards = []

  let headers = arrays[0]
  let cardMap = {}

  let hasIndex = headers.includes("Index")

  arrays.forEach((arr, i) => {
    if (i === 0 || arr.length === 0) return;
    let obj = {}

    // Fill out the object from the array
    // Properties defined on the header but missing in the array will be null
    // Properties missing from the header will be undefined
    headers.forEach((val, j) => {
      obj[val] = arr[j] || undefined
    })

    let key = hasIndex ? obj["Index"] : obj["Name"]
    let card = cardMap[key]

    // Create the card, if necessary, from the first instance of it in the CSV
    if (card == null) {
      card = {
        index: obj["Index"],
        name: obj["Name"],
        text: obj["Text"],
        type: obj["Type"],
        subtype: toArray(obj["Subtype"]),
        alignment: obj["Alignment"],
        class: toArray(obj["Class"]),
        faction: toArray(obj["Faction"]),
        attack: toArray(obj["Attack"], toMaybeNumber),
        damageType: obj["Damage Type"],
        armorClass: toMaybeNumber(obj["Armor Class"]),
        skill: toMaybeNumber(obj["Skill"]),
        hitPoints: toMaybeNumber(obj["Hit Points"]),
        level: toMaybeNumber(obj["Level"]),
        traits: toArray(obj["Traits"]),
        keywords: toArray(obj["Keywords"], toNameValue),
        feats: toArray(obj["Feats"], toNameValue),
        editions: toArray(obj["Editions"]),
        errata: obj["Errata"],
        exclusivePromo: toTrue(obj["Exclusive Promo"])
      }
      
      // Replace undefined with unset; replace null with undefined
      Object.keys(card).forEach(x => {
        if (card[x] === undefined) delete card[x]
        if (card[x] === null) card[x] = undefined
      })

      cardMap[key] = card
      cards.push(card)
    }

    // Add the print info, if any
    let printInfo = {
      set: obj["Set"],
      setNumber: obj["Set Number"],
      rarity: obj["Rarity"],
      flavorText: obj["Flavor Text"],
      artist: obj["Artist"],
      imageUrl: obj["Image URL"]
    }

    // Replace undefined with unset; replace null with undefined
    Object.keys(printInfo).forEach(x => {
      if (printInfo[x] === undefined) delete printInfo[x]
      if (printInfo[x] === null) printInfo[x] = undefined
    })

    if (Object.keys(printInfo).filter(x => printInfo[x] != null).length > 1) {
      if (card.printInfos == null) {
        card.printInfos = []
      }
      card.printInfos.push(printInfo)
    }
  })

  return cards
}

export function toCsv(cards) {
  return [header].concat(cards.flatMap(x => cardToCsvLines(x))).join("\r\n")
}

export function fromCsv(text) {
  return csvArraysToCards(csvTextToArrays(text))
}