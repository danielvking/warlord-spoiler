const props = {
  "attack": function(value) {
    if (!Array.isArray(value)) return value
    return value.map(x => {
      if (x == null) return ""
      let val = String(x)
      if (/^\d+$/.test(val)) {
        return "+" + val
      }
      return val
    }).join("/")
  },
  "armorClass": function(value, cardData) {
    if (value == null) return ""
    let val = String(value)
    if (/^\d+$/.test(val) && cardData.type !== "Character") {
      return "+" + val
    } else if (/^\+.*$/.test(val) && cardData.type === "Character") {
      return val.substring(1)
    }
    return val
  },
  "skill": function(value) {
    if (value == null) return ""
    let val = String(value)
    if (/^\d+$/.test(val)) {
      return "+" + val
    }
    return val
  },
  "hitPoints": function(value, cardData) {
    if (value == null) return ""
    let val = String(value)
    if (/^\d+$/.test(val) && cardData.type !== "Character") {
      return "+" + val
    } else if (/^\+.*$/.test(val) && cardData.type === "Character") {
      return val.substring(1)
    }
    return val
  },
  "level": function(value, cardData) {
    if (value == null) return ""
    let val = String(value)
    if (/^\d+$/.test(val) && cardData.type === "Epic Class") {
      return "+" + val
    } else if (/^\+.*$/.test(val) && cardData.type !== "Epic Class") {
      return val.substring(1)
    }
    return val
  },
  "keyword": function(value) {
    if (value.value == null) return value.name
    if (value.name === "Charges") {
      let name = value.name
      if (value.value == 1) name = "Charge"
      return `${value.value} ${name}`
    }
    return value.name + " " + value.value
  },
  "feat": function(value) {
    if (value.value == null) return value.name
    let val = String(value.value)
    if (/^\d+$/.test(val)) {
      val = "+" + val
    }
    return value.name + " " + val
  },
  "setNumber": function(value) {
    return String(value).padStart(3, '0')
  }
}

export function formatCardProperty(prop, value, cardData) {
  let func = props[prop]
  if (func == null) {
    throw `No format is defined for the specified property: ${prop}`
  }
  return func(value, cardData)
}