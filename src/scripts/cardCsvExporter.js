function escape(value) {
    let str = value == null ? "" : String(value)
    return `"${str.replaceAll('"', '""')}"`
}

const header = [
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

        cols.push(card.name)
        cols.push(card.text)
        cols.push(card.type)
        cols.push((card.subtype || []).join("/"))
        cols.push(card.alignment)
        cols.push(card.class)
        cols.push(card.faction)
        cols.push(card.attack)
        cols.push(card.damageType)
        cols.push(card.armorClass)
        cols.push(card.skill)
        cols.push(card.hitPoints)
        cols.push(card.level)
        cols.push((card.traits || []).join("/"))
        cols.push((card.keywords || []).map(x => x.value != null ? `${x.value} ${x.name}` : x.name).join("/"))
        cols.push((card.feats || []).map(x => `${x.value} ${x.name}`).join("/"))
        cols.push((card.editions || []).join("/"))
        cols.push(card.errata)
        cols.push(p.set)
        cols.push(p.setNumber)
        cols.push(p.rarity)
        cols.push(p.flavorText)
        cols.push(p.artist)
        cols.push(p.imageUrl)

        lines.push(cols.map(x => escape(x)).join(","))
    })

    return lines
}

export function toCsv(cards) {
    return [header].concat(cards.flatMap(x => cardToCsvLines(x))).join("\r\n")
}