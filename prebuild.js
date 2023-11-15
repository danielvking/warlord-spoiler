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

    cards.forEach(card => {
        if (card.type) typeSet[card.type] = true;
        if (card.alignment) alignmentSet[card.alignment] = true;
        if (card.class) {
            card.class.forEach(c => classSet[c] = true);
        }
        if (card.faction) {
            card.faction.forEach(f => factionSet[f] = true);
        }
        if (card.traits) {
            card.traits.forEach(t => traitSet[t] = true);
        }
        if (card.feats) {
            card.feats.forEach(f => featSet[f.name] = true)
        }
        if (card.editions) {
            card.editions.forEach(e => editionSet[e] = true);
        }
        if (card.printInfos) {
            card.printInfos.forEach(printInfo => {
                if (printInfo.set) setSet[printInfo.set] = true;
                if (printInfo.rarity) raritySet[printInfo.rarity] = true;
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
        rarityList: Object.keys(raritySet).sort()
    });
}

fs.writeFileSync('./public/resources/referenceLists.json', createStaticLists(fs.readFileSync('./public/resources/cards.json')))