const fs = require('fs')

const createStaticLists = function (content) {
    let cards = JSON.parse(content);

    let typeSet = {};
    let alignmentSet = {};
    let classSet = {};
    let factionSet = {};
    let traitSet = {};
    let featSet = {};
    let editionSet = {};
    let setSet = {};
    let raritySet = {};
    let flavorTraitSet = {};

    cards.forEach(card => {
        if (card.type) typeSet[card.type] = true;
        if (card.alignment) alignmentSet[card.alignment] = true;
        if (card.class) {
            let classes = card.class.split("/");
            classes.forEach(c => classSet[c] = true);
        }
        if (card.faction) {
            let factions = card.faction.split("/");
            factions.forEach(f => factionSet[f] = true);
        }
        if (card.traits) {
            let traits = card.traits.split("/");
            traits.forEach(t => traitSet[t] = true);
        }
        if (card.feats) {
            let feats = card.feats.split("/");
            feats.forEach(f => {
                featSet[f.split(" +")[0]] = true;
            })
        }
        if (card.editions) {
            card.editions.forEach(e => editionSet[e] = true);
        }
        if (card.printInfos) {
            card.printInfos.forEach(printInfo => {
                if (printInfo.set) setSet[printInfo.set] = true;
                if (printInfo.rarity) raritySet[printInfo.rarity] = true;
                if (printInfo.flavorTraits) {
                    let flavorTraits = printInfo.flavorTraits.split("/");
                    flavorTraits.forEach(f => flavorTraitSet[f] = true);
                }
            });
        }
    });

    return JSON.stringify({
        typeList: Object.keys(typeSet).sort(),
        alignmentList: Object.keys(alignmentSet).sort(),
        classList: Object.keys(classSet).sort(),
        factionList: Object.keys(factionSet).sort(),
        traitList: Object.keys(traitSet).sort(),
        featList: Object.keys(featSet).sort(),
        editionList: Object.keys(editionSet).sort(),
        setList: Object.keys(setSet).sort(),
        rarityList: Object.keys(raritySet).sort(),
        flavorTraitList: Object.keys(flavorTraitSet).sort()
    });
}

fs.writeFileSync('./public/resources/referenceLists.json', createStaticLists(fs.readFileSync('./public/resources/cards.json')))