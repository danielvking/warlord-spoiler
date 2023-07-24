// ------------------ //
// - Constant Lists - //
// ------------------ //

const textOptions = [{
    id: 1,
    value: "While in play, all of your characters are Monsters.",
    points: 30
  }, {
    id: 2,
    value: "Your Monsters have +3ATK and -5AC.",
    points: 15
  }, {
    id: 3,
    value: "Your Monsters and Lycanthropes gain the Harpy trait",
    points: 15
  }, {
    id: 4,
    value: "Your Harpies gain an extra melee strike (base +0 ATK) when they attack.",
    points: 45
  }, {
    id: 5,
    value: "Your Monsters and Lycanthropes gain the Direwolf trait.",
    points: 15
  }, {
    id: 6,
    value: "React: After your target Direwolf kills an opposing character: Once per turn per target, move your target Direwolf forward one rank.",
    points: 30
  }, {
    id: 9,
    value: "Limited Order: Spend an Avatar: Search your deck for an Air, Earth, Fire, or Water card, reveal it, and put it in your hand.",
    points: 30
  }, {
    id: 10,
    value: "Spend Order: Another target Avatar is all classes and +1 level this turn.",
    points: 30
  }, {
    id: 13,
    value: "Spend Order: Your target Construct is considered to have all of this characters items equipped this turn.",
    points: 30
  }, {
    id: 15,
    value: "[NAME] may equip Cursed items regardless of class.",
    points: 15
  }, {
    id: 16,
    value: "React: After a die roll, spend an equipped Cursed item: reroll the die.",
    points: 30
  }, {
    id: 18,
    value: "[NAME] may equip any number of Familiars and ignores class restrictions while equipping Familiars.",
    points: 30
  }, {
    id: 19,
    value: "Order: Spend an equipped Familiar: Perform a melee strike with a bonus equal to its level.",
    points: 30
  }, {
    id: 20,
    value: "Limited Order: Destroy an equipped Familiar: [NAME] may play an action card from your discard pile, then banish it.",
    points: 30
  }, {
    id: 22,
    value: "Limited Order: Spend a Hero: Move forward or backward one rank, gain any feat with +5 bonus this turn, or remove a wound from this character.",
    points: 45
  }, {
    id: 23,
    value: "You may include 3 additional copies of Brown Kratchling in your deck.",
    points: 15
  }, {
    id: 24,
    value: "Spend Order: Your Kratchlings within one rank gain +5 ATK and +5 AC this turn.",
    points: 15
  }, {
    id: 25,
    value: "Spend Order: Discard an item: Search your deck for a Djinn or Efreet and put it into play adjacent to this character.",
    points: 30
  }, {
    id: 26,
    value: "Your Mentalists gain [NAME]’s faction and class(es), and they suffer no loyalty penalty.",
    points: 30
  }, {
    id: 27,
    value: "React: After your target Mentalist dies: Each opponent discards the top card of their deck.",
    points: 30
  }, {
    id: 28,
    value: "Limited Order: Spend a Mentalist: Each opponent discards a card from their hand.",
    points: 45
  }, {
    id: 29,
    value: "Your other Monks can use Fighter items and Rogue actions.",
    points: 30
  }, {
    id: 30,
    value: "Limited React: Before your target Monk performs an attack: All strikes from the attack ignore bonuses to AC.",
    points: 15
  }, {
    id: 32,
    value: "Spend X 'Eyestalks'; Perform X +X ranged strikes.",
    points: 45
  }, {
    id: 33,
    value: "Limited Order: Search your deck for an ‘Eyestalk’ and equip it to your target Reaver.",
    points: 15
  }, {
    id: 34,
    value: "Spend Order: Ready each ‘Eyestalk’ item you control.",
    points: 30
  }, {
    id: 35,
    value: "Your Reindeer and characters named Blitzer gain the ability \"Spend React: Before putting Kristophe Kringle into play, reduce his entering rank by one and ignore loyalty penalties.",
    points: 30
  }, {
    id: 36,
    value: "Limited Order: Ready your other target Reindeer, Steed, or character named Blitzer.",
    points: 30
  }, {
    id: 37,
    value: "React: After your Reindeer or character named Blitzer dies: Each player draws two cards.",
    points: 45
  }, {
    id: 38,
    value: "[NAME] may equip two Bows and two Arrows.",
    points: 15
  }, {
    id: 39,
    value: "If this character has two Bows equipped, they gain advantage on ranged strikes from Bows.",
    points: 45
  }, {
    id: 40,
    value: "[NAME] may equip four Gauntlets and gains +5 to reflex saves.",
    points: 15
  }, {
    id: 41,
    value: "Order: Destroy an equipped Gauntlet: Inflict a wound on a lower level character within one rank.",
    points: 30
  }, {
    id: 42,
    value: "[NAME] may equip an additional Helm and gains +5 to perception checks.",
    points: 15
  }, {
    id: 43,
    value: "[NAME] ignores class restrictions when equipping Helms.",
    points: 15
  }, {
    id: 44,
    value: "[NAME] may equip an additional Shield and gains an ATK bonus equal to their Shield(s) AC bonus(es).",
    points: 15
  }, {
    id: 45,
    value: "After a melee roll targeting this character has been rolled (but before it has been determined to hit or miss) spend an equipped Shield: this character gains +3AC.",
    points: 30
  }, {
    id: 46,
    value: "May equip three Weapons and gains +1 level for equipping Weapons for each Weapon equipped.",
    points: 30
  }, {
    id: 47,
    value: "Limited Order: Stun an equipped Weapon: Destroy target item within two ranks.",
    points: 30
  }, {
    id: 48,
    value: "Characters with Daybreak may begin play in your army and suffer no loyalty penalty.",
    points: 30
  }, {
    id: 49,
    value: "React: After you win initiative: It is considered the first turn this turn.",
    points: 15
  }, {
    id: 50,
    value: "Limited React: After initiative, choose your target character’s Daybreak or Nightfall ability: This character has that ability this turn.",
    points: 30
  }, {
    id: 51,
    value: "[NAME] may equip an additional trap and equips Traps facedown (Ignore name restrictions, reveal when used).",
    points: 15
  }, {
    id: 52,
    value: "Limited React: After a character pays the cost of an action card, remove an attached Trap of equal or greater level to the action card from the game; Cancel the action.",
    points: 45
  }, {
    id: 54,
    value: "Limited React: Before playing a Tactics action, choose one: The action does not require spending as a cost; or draw a card.",
    points: 45
  }, {
    id: 55,
    value: "Spend Order: Spend a character in each rank you control. All characters coming into play enter play as if they were one level higher.",
    points: 45
  }, {
    id: 58,
    value: "React: After this character casts a spell: Target opposing character within two ranks must make a reflex save (DC 10) or become stunned.",
    points: 15
  }, {
    id: 59,
    value: "Your characters gain +1 level for equipping Treasure items and may equip Treasures regardless of class restrictions.",
    points: 30
  }, {
    id: 60,
    value: "Limited Order: Perform an attack without spending. Strikes from this attack inflict an additional wound. Kill [NAME], which may not be cancelled.",
    points: 45
  }, {
    id: 62,
    value: "[NAME] may play Air, Earth, Fire, and Water actions regardless of class restrictions.",
    points: 45
  }, {
    id: 63,
    value: "Order: Once per game, if [NAME] played a separate Air, Earth, Fire, and Water action this turn: [NAME] permanently gains +6 ATK, +6 AC, +6 Skill, and +2 HP.",
    points: 15
  }, {
    id: 65,
    value: "Limited Order: Discard a card: Search your deck for a level 3 or lower [FACTION_TRAIT], show it to the other players, and put it into your hand.",
    points: 45
  }, {
    id: 66,
    value: "Your Aquatic characters gain +2 AC and +2 Skill.",
    points: 30
  }, {
    id: 67,
    value: "You may start the game with Paladins from other factions. Your Paladins do not suffer a loyalty penalty.",
    points: 30
  }, {
    id: 68,
    value: "Your Barbarians gain the ability, “Spend Order: Move forward up to two ranks.”",
    points: 30
  }, {
    id: 69,
    value: "React: After starting armies are revealed, name a non-Warlord, non-Faction trait: Your Rangers have advantage on strike rolls against and saves from characters with the named trait.",
    points: 30
  }, {
    id: 70,
    value: "Your army ignores 'spend' requirements for bringing Totems into play. Your characters have +2 levels for equipping Totems.",
    points: 30
  }, {
    id: 71,
    value: "Limited Order: All chatacters in play have a penalty to AC and skill equal to the numbers of characters in their owner's discard pile, with a maximum of -4 (-8 if this character is a Necromancer.",
    points: 30
  }, {
    id: 72,
    value: "Spend Order: Reveal the top card of your deck (top three if this character is a summoner): You may play a character from the revealed cards if you could legally do so.",
    points: 45
  }, {
    id: 73,
    value: "Limited React: After your target character is targeted by an opposing strike or action: Switch the location of the character with another target Illusionist you control. Redirect the strike or action to the Illusionist, if possible.",
    points: 45
  }, {
    id: 74,
    value: "Limited Order: Target an action card in your discard pile with “Bard” or “Bards” in the text box: Put that card in your hand.",
    points: 45
  }, {
    id: 75,
    value: "Limited Order: Look at the top 3 cards of any deck (6 if this character is a Scout): Put them back in any order.",
    points: 15
  }, {
    id: 76,
    value: "Limited Order: Move your target Rogue forward one rank. If this character is an Assassin, perform a decree.",
    points: 45
  }, {
    id: 77,
    value: "Limited React: After your target Cantor performs a non-attack action that requires spending as a cost: Ready the target.",
    points: 45
  }, {
    id: 78,
    value: "Limited Order: Reveal the top card of each deck: Discard each card. If you control a Seer, you may have each player draw them instead.",
    points: 45
  }, {
    id: 79,
    value: "Limited Order: Discard a card and target an item within one rank (two ranks if [NAME] is a Druid): Destroy the item..",
    points: 30
  }, {
    id: 80,
    value: "Limited React: After this character succeeds with a Stealth check: Ready this character.",
    points: 45
  }, {
    id: 81,
    value: "Spend Order: Perform a melee strike with a bonus equal to your Powerattack bonus. If the strike hits, inflict a wound on each character adjacent to the target of the strike.",
    points: 15
  }, {
    id: 82,
    value: "[NAME] may use the Riding feat on any Steed within one rank and may use the Riding feat twice per turn.",
    points: 30
  }, {
    id: 83,
    value: "[NAME] may use Charisma regardless of rank, on opposing character’s die rolls, and twice per turn.",
    points: 30
  }, {
    id: 84,
    value: "Limited React: After your target character succeeds with a Defend feat check: The target gains +1 HP permanently.",
    points: 15
  }, {
    id: 85,
    value: "Limited React: After your target character succeeds with a Magic Resistance check: The target may immediately cast the canceled spell as if from your hand if they could legally do so.",
    points: 15
  }, {
    id: 86,
    value: "After [NAME] succeeds with a Marksmanship check on a strike, they may choose to target a character within 1 rank with that strike."
    points: 30
  }, {
    id: 87,
    value: "Limited React: After [NAME] succeeds with a Medicine check: The next time a character you control would suffer wounds this turn, reduce the wounds to zero.",
    points: 30
  }, {
    id: 88,
    value: "[NAME] may Riposte after being targeted and gains +4 ATK during strikes generated by Ripose checks.",
    points: 30
  }, {
    id: 89,
    value: "Scribed actions performed by [NAME] do not require spending as a cost.",
    points: 45
  }, {
    id: 90,
    value: "Limited React: After an opposing character moves without spending or stunning: Move [NAME] forward of backward one rank.”",
    points: 30
  }, {
    id: 91,
    value: "Limited Order: Remove a Charge: Move forward or backward one rank, ready an item, or draw a card and discard a card.",
    points: 45
  }, {
    id: 92,
    value: "You may have two additional Dungeons in play if none share a name with another Dungeon in play.",
    points: 15
  }, {
    id: 93,
    value: "Limited Order: Discard a card: Put one level one Rat into play (with +1/+1 ATK, 7AC, +0 Skill, 1 HP)",
    points: 15
  }, {
    id: 94,
    value: "Limited React: After a Dungeon is defeated, draw a card.",
    points: 45
  }, {
    id: 95,
    value: "Limited Order: Kill a non-monster character: All of your Evil monsters gain an additional strike per attack (base = the killed character’s level) until end of turn.",
    points: 45
  }, {
    id: 96,
    value: "Order: Once per turn per target, Remove a character in your discard pile from the game: Until the end of the turn, give target [FACTION] character an extra melee strike per attack (base +4 ATK).",
    points: 45
  }, {
    id: 97,
    value: "Limited React: Before your other target 1st through 3rd level [FACTION] is killed: If the character does not have the Planar trait, they are not killed, but are instead moved to the rank behind your last rank. Remove all wounds from the character, who permanently has -10AC, Undead, and Planar.",
    points: 30
  }, {
    id: 98,
    value: "Limited Order: Target a character: Until end of turn, after the target performs an action printed on an item he must succeed with a reflex save (DC14) or stun.",
    points: 45
  }, {
    id: 99,
    value: "Order: Discard a card: Target character within one rank must succeed with a poison save (DC 14 + 1 for each [FACTION_TRAIT] in this rank) or either suffer a wound or become spent (your choice).",
    points: 30
  }, {
    id: 100,
    value: "React: After [NAME] hits with a ranged strike: Spend the target of the ranged strike.",
    points: 15
  }, {
    id: 101,
    value: "[NAME] inflicts an additional wound when they hit with a melee strike.",
    points: 45
  }, {
    id: 102,
    value: "Limited React: After an opponent kills a character you control, put X-1 level 1 Rats into play (with +1/+1 ATK, 7AC, +0 Skill, 1 HP), where X is the dead character's level.",
    points: 45
  }, {
    id: 103,
    value: "React: After you win initiative: Look at the top 5 cards of your deck. Put any number of those cards at the bottom of your deck. Return the rest in the same order.",
    points: 45
  }, {
    id: 104,
    value: "Limited Order: All players discard their hands and then draw that many cards.",
    points: 45
  }, {
    id: 105,
    value: "Order: Discard a card from your hand: Move forward or backward one rank.",
    points: 45
  }, {
    id: 106,
    value: "[NAME] may Scribe rogue actions and their Poison actions may target an additional rank away",
    points: 30
  }, {
    id: 107,
    value: "Order: Discard a spell: Target character within two ranks must succeed with a magic save (DC 6 + [NAME]’s Skill) or stun.",
    points: 45
  }, {
    id: 109,
    value: "Spend Order: Perform a +0 ranged strike that inflicts two additional wounds if it hits.",
    points: 30
  }, {
    id: 110,
    value: "Other Dragons you control gain the Fighter class in addition to their other class(es).",
    points: 45
  }, {
    id: 111,
    value: "Limited React: After a strike targets [NAME]: Cancel the strike.",
    points: 30
  }, {
    id: 112,
    value: "Limited React: After your [FACTION] performs an order: You may perform a Decree.",
    points: 45
  }, {
    id: 113,
    value: "Limited React: After [NAME] hits target character with a melee strike: The target must succeed with a Poison save (DC 10) or the strike inflicts an additional wound.",
    points: 30
  }, {
    id: 114,
    value: "Order: Target an item in your army and discard a card: Equip the item to a different [FACTION] in your army. If you do, ready the item.",
    points: 45
  }, {
    id: 115,
    value: "React: After winning Initiative, discard up to two cards: Draw that many cards.",
    points: 45
  }, {
    id: 116,
    value: "Limited Order: Discard a card: Target character within three ranks must succeed with a magic save (DC 15) or become stunned.",
    points: 45
  }, {
    id: 117,
    value: "Limited React: After one of your [FACTION]s is targeted by an action that doesn't produce melee strikes, remove a spell scribed to [NAME] from the game: Cancel the action.",
    points: 15
  }, {
    id: 118,
    value: "After one of your [FACTION]s rolls a natural 17 or greater, the roll is a Critical Success.",
    points: 30
  }, {
    id: 119,
    value: "Limited React: Before target character rolls a die: The character rolls two dice. After the roll, you choose which die is kept.",
    points: 30
  }, {
    id: 120,
    value: "[NAME] has an ATK bonus equal to the number of character cards in your discard pile.",
    points: 30
  }, {
    id: 121,
    value: "React: After [NAME] inflicts wounds with a melee strike: if the target suffers more wounds than he has hit points, you may inflict a wound on a lower level character adjacent to the target.",
    points: 45
  }, {
    id: 122,
    value: "React: After a [FACTION] in this rank is targeted with a melee strike: Make a Defend check (DC 20). If successful, redirect the strike to [NAME].",
    points: 30
  }, {
    id: 124,
    value: "Limited Order: Remove a [FACTION] in your discard pile from the game: Perform a ranged strike (base = the removed [FACTION]’s level).",
    points: 15
  }, {
    id: 125,
    value: "React: After [NAME] is targeted by a melee or ranged strike: The character performing the strike must make a fear save (DC 8 + number of other [FACTION]s in [NAME]’s rank) or the strike is canceled.",
    points: 30
  }, {
    id: 126,
    value: "[NAME] may equip two Weapons.",
    points: 15
  }, {
    id: 127,
    value: "Adjacent [FACTION]s have the ability: “Order: Stun this character: Perform a melee strike.”",
    points: 30
  }, {
    id: 128,
    value: "Limited React: After [NAME] performs an action which reduced or removed wounds from another target [FACTION]: Ready the target.",
    points: 45
  }, {
    id: 129,
    value: "[NAME] may perform level 1 actions of any class.",
    points: 15
  }, {
    id: 130,
    value: "Order: Twice per turn, target a character within one rank: The target must succeed with a magic save (DC 15) or suffer a wound.",
    points: 45
  }, {
    id: 131,
    value: "Limited Order: Target a [FACTION] of a level less than or equal to [NAME]'s character rank: unstun the target.",
    points: 15
  }, {
    id: 132,
    value: "Limited React: After [NAME] kills an opposing character with a spell, [NAME] permanently gains +2 skill.",
    points: 15
  }, {
    id: 134,
    value: "Spend Order: If [NAME] is in the second rank, succeed with a Stealth check (DC 24) to move them to the first rank of a different formation.",
    points: 30
  }, {
    id: 135,
    value: "Limited Order: Perform a +3 ranged strike.",
    points: 15
  }, {
    id: 136,
    value: "Your level 2 characters gain Limited Order: Move this character backwards one rank.",
    points: 15
  }, {
    id: 137,
    value: "Limited React: After [NAME] suffers wounds: Ready [NAME]. ",
    points: 45
  }, {
    id: 138,
    value: "Limited Order: Choose an opposing player who must shuffle their hand into their deck and draw 4 cards.",
    points: 45
  }, {
    id: 139,
    value: "While [NAME] is ready, your [FACTION] may cast wizard spells as though they were in [NAME]’s location.",
    points: 30
  }, {
    id: 140,
    value: "Limited React: After [NAME] kills a character with a melee strike or action, that character’s controller must discard a card from their hand.",
    points: 30
  }, {
    id: 141,
    value: "Limited Order: Remove up to three cards in your discard pile from the game: Remove that many cards of your choice in another discard pile from the game.",
    points: 15
  }, {
    id: 142,
    value: "Your spent characters gain Limited React: After this character is target by a strike or action, move it to a different position within this rank.",
    points: 15
  }, {
    id: 143,
    value: "Limited Order: Put a card from your hand into play in this rank face down as a Unique Level 3 fighter named Wes with +3/+1 ATK, 8 AC, +4 Skill, 2 HP, and the Planar trait.",
    points: 30
  }, {
    id: 144,
    value: "Limited React: After your target character kills an opposing character: Remove the opposing character from the game. Ready a [FACTION] of lower level than the opposing character.",
    points: 30
  }, {
    id: 145,
    value: "Spend Order: Target all opposing characters within one rank: Each target must make two will saves (DC 5 + this character's skill), If one save is failed, the target becomes spent. If both are failed, the target becomes stunned and suffers two wounds.",
    points: 45
  }, {
    id: 146,
    value: "Adjacent lower Level [FACTION]s gain Defend +3.",
    points: 15
  }, {
    id: 147,
    value: "Limited Order: Discard a spell from your hand: Perform a +5 ranged strike.",
    points: 15
  }, {
    id: 148,
    value: "Limited Order: Kill one of your characters in this rank: Perform a ranged strike with a bonus equal to the character's level.",
    points: 30
  }, {
    id: 149,
    value: "Limited React: After this cahracter is target by action (not a strike,) the targeting character must succeed with a Fear save (DC 15) or the action is cancelled.",
    points: 30
  }, {
    id: 150,
    value: "Spend Order: Target Overlord you control gains the Warlord trait. Kill this character.",
    points: 30
  }, {
    id: 151,
    value: "[NAME]’s melee strikes inflict an additional wound against stunned characters.",
    points: 15
  }, {
    id: 152,
    value: "Dragons you control may equip items.",
    points: 45
  }, {
    id: 153,
    value: "Limited Order: Discard a card: Remove a wound from one of your other [FACTION] within 1 rank.",
    points: 15
  }, {
    id: 154,
    value: "[NAME] may play wizard spells up to 2nd level.",
    points: 45
  }, {
    id: 155,
    value: "Limited React: After target opposing character makes a melee strike roll: The target rerolls the die.",
    points: 30
  }, {
    id: 156,
    value: "Other [FACTION] in this rank add +3 to their die rolls.",
    points: 45
  }, {
    id: 157,
    value: "Spend Order: Search your deck for a dungeon, and put it into play if possible, otherwise put it into your hand.",
    points: 45
  }, {
    id: 158,
    value: "Limited Order: Until [NAME] uses this ability again, your target other Level 3 or higher [FACTION] gains +2 ATK, AC, and Skill and, while not stunned, has the ability, “[NAME] may target spells as if they were in this character’s location.”",
    points: 45
  }, {
    id: 159,
    value: "React: After an opposing character performs an action to draw a card: Perform a melee strike.",
    points: 30
  }, {
    id: 160,
    value: "Spend Order: Choose an opposing player: Perform a number of melee strikes equal to the number of cards in that player's hand.",
    points: 30
  }, {
    id: 161,
    value: "Limited Order: Retrieve a Lycanthrope Form from your deck, show it to the other players, and put it in your hand.",
    points: 45
  }, {
    id: 162,
    value: "Order: Discard a character card: Target character in your army has a bonus to ATK, AC, and Skill equal to the number of characters in your discard pile until end of turn.",
    points: 45
  }, {
    id: 163,
    value: "All your non-[FACTION_TRAIT] gain the Thrall trait.",
    points: 15
  }, {
    id: 164,
    value: "Limited React: After a character performs an action to draw a card or retrieve a card from their deck: Inflict one wound on that character.",
    points: 15
  }, {
    id: 165,
    value: "Spend Order: Perform a +5 ranged strike that does not inflict wounds. If the strike hits, stun the target.",
    points: 15
  }, {
    id: 166,
    value: "Limited React: After [NAME] casts a spell: Reveal the top card of your deck. If the revealed card is a spell, put that card in your hand and you may perform another Order after the current one.",
    points: 45
  }, {
    id: 167,
    value: "Nightfall - Order: Once per game, remove a Charge: If it is not the first turn, search your deck for a Dragon of Level 6 or lower, and put it into play adjacent to [NAME].",
    points: 45
  }, {
    id: 168,
    value: "[NAME] may use the Powerattack feat any number of times per turn.",
    points: 15
  }, {
    id: 169,
    value: "Your [FACTION_TRAIT] gain the Vampire trait",
    points: 15
  }, {
    id: 170,
    value: "Your Vampires gain “React: After this character targets with a melee strike, they may choose to inflict no wounds. If the strike hits, stun the target.”",
    points: 30
  }, {
    id: 171,
    value: "Your Giants and Trolls gain React: After this character hits with a melee strike, target another character in that rank whose ATK is less than your natural die roll: Move that character back a rank.”",
    points: 30
  }, {
    id: 172,
    value: "Your Giants and Trolls count as two additional characters for determining whether the rank behind them is illegal.",
    points: 15
  }, {
    id: 173,
    value: "Your adjacent characters gain the [FACTION_TRAIT] trait.",
    points: 15
  }, {
    id: 174,
    value: "React: After a [FACTION] in this rank is targeted with a melee strike: Make a Defend check (DC 20). If successful, redirect the strike to [NAME].",
    points: 30
  }, {
    id: 175,
    value: "Your [FACTION_TRAIT]'s gain the text  “Limited React: After this [FACTION_TRAIT] is targeted by a melee strike or ranged strike: Succeed with a perception check (DC 16) to ready.”",
    points: 45
  }, {
    id: 176,
    value: "Limited React: Before one of your other [FACTION]s equips an item: The target [FACTION] is +1 level for equipping the item. Ready the target.",
    points: 30
  }, {
    id: 177,
    value: "Limited Order: Target an opposing non-Warlord character within two ranks: The target must succeed with a will check (DC 15), or until the end of the turn, the target has Stealth +0, may not equip items, and is under your control.",
    points: 30
  }, {
    id: 178,
    value: "Your other [FACTION_TRAIT] in this rank gain Riposte +5, Powerattack +5, and Medicine +0",
    points: 45
  }, {
    id: 179,
    value: "Limited React: After an opposing character spends or stuns due to a card effect or falling forward: perform a +6 ranged strike.",
    points: 15
  }, {
    id: 180,
    value: "[NAME] is +2 Levels for equipping Bows.",
    points: 30
  }, {
    id: 181,
    value: "Your characters have Advantage on strikes against Planar.",
    points: 15
  }, {
    id: 182,
    value: "Opposing Characters have Disadvantage on Stealth checks",
    points: 15
  }, {
    id: 183,
    value: "After a Lycanthrope character in your army inflicts a wound on an opposing character, the opposing character gains the Lycanthrope trait.",
    points: 15
  }, {
    id: 184,
    value: "Your Good character's strikes gain +5 ATK and inflict an additional wound, when targeting a character with the Lycanthrope trait.",
    points: 15
  }, {
    id: 185,
    value: "Spend Order: Kill X Thralls, put a card from your hand into play in this rank face down, as a Unique Level 4 fighter named Unspeakable Horror with X +5 ATKs, 13 AC, +5 Skill, 1 HP, and the Daemon trait.",
    points: 45
  }, {
    id: 186,
    value: "After an Undead character in your army inflicts a wound on an opposing character, the opposing character gains the Undead trait.",
    points: 15
  }, {
    id: 187,
    value: "Evil Necromancers you control may not be targeted by opposing Undead characters if there is another legal target.",
    points: 15
  }, {
    id: 188,
    value: "Your Gargoyles may cast 'Gargoyle only' spells regardless of class and are +1 level for casting them.",
    points: 15
  }, {
    id: 189,
    value: "Your Stormwraiths gain Spend Order: move another non-Warlord Stormwraith forward or backward 1 rank.",
    points: 30
  }, {
    id: 190,
    value: "[NAME] gains +3 AC while spent",
    points: 15
  }, {
    id: 191,
    value: "Limited Order: Perform a Charisma check (DC 20): Until end of turn your characters gain the ability: Limited React: After this charcter rolls a critical failure, reroll the die with advantage.",
    points: 15
  }, {
    id: 192,
    value: "Limited Order: Perform a Stealth check (DC 18 + the target's skill): Spend an opposing ready charcter in this rank.",
    points: 30
  }, {
    id: 193,
    value: "Limited Order: Perform a Riding check (DC 20): Equip a steed. This charcter has +2 levels for equipping steeds until the end of the turn.",
    points: 30
  }, {
    id: 194,
    value: "Limited Order: Perform a Powerattack check (DC 20): This character gains +5 ATK",
    points: 15
  }, {
    id: 195,
    value: "Limited Order: Perform a Scribe check (DC 20): This character's spells may target an additional rank away this turn.",
    points: 30
  }, {
    id: 196,
    value: "Limited Order: Perform a Medicine check (DC 20): Until the end of the turn, the next wound inflicted on one of your characters is reduced by one.",
    points: 30
  }, {
    id: 197,
    value: "Limited Order: Perform a Riposte check (DC 20): The next time this character is targetted by a melee strike, inflict one wound on the attacker.",
    points: 30
  }, {
    id: 198,
    value: "Limited Order: Perform a Defend check (DC 20): Your characters gain +4 skill or +2 AC until the end of the turn.",
    points: 15
  }, {
    id: 199,
    value: "Limited Order: Perform a Magic Resistance check (DC 20): Wounds inflicted by opposing spells are reduced by one this turn.",
    points: 30
  }, {
    id: 200,
    value: "Limited Order: Perform a Marksmanship check (DC 20): This turn, after a ranged strike that targeted [NAME] resolves, perform two +5 ranged strikes.",
    points: 30
  }]
  
  const traitMap = {
    "Abyssal": 3,
    "Apprentice": 1,
    "Aquatic": 1,
    "Assassin": 5,
    "Avatar": 3,
    "Barbarian": 5,
    "Bard": 5,
    "Beast": 1,
    "Cantor": 5,
    "Cohort": 1,
    "Construct": 1,
    "Daemon": 3,
    "Direwolf": 3,
    "Djinn": 1,
    "Dragon": 5,
    "Druid": 5,
    "Efreet": 1,
    "Elemental": 1,
    "Fire Elemental": 1,
    "Gargoyle": 5,
    "Ghoul": 1,
    "Giant": 1,
    "Harpy": 3,
    "Henchman": 1,
    "Hero": 1,
    "Illusion": 1,
    "Illusionist": 5,
    "Kratchling": 1,
    "Lich": 5,
    "Lycanthrope": 5,
    "Mentalist": 5,
    "Monk": 5,
    "Monster": 5,
    "Necromancer": 8,
    "Nymph": 3,
    "Paladin": 5,
    "Planar": 30,
    "Ranger": 5,
    "Reaver": 5,
    "Reindeer": 3,
    "Scout": 5,
    "Seer": 5,
    "Shaman": 5,
    "Siege": 5,
    "Stormwraith": 5,
    "Summoner": 5,
    "Sutek": 3,
    "Thrall": 3,
    "Traitor": 1,
    "Troll": 1,
    "Undead": 5,
    "Vampire": 3,
    "Warlord": 0,
  }
  
  const featMap = {
    "Charisma": 10,
    "Defend": 10,
    "Magic Resistance": 15,
    "Marksmanship": 20,
    "Medicine": 15,
    "Powerattack": 15,
    "Riding": 10,
    "Riposte": 10,
    "Scribe": 10,
    "Stealth": 20
  }
  
  
  // --------------------- //
  // - Utility Functions - //
  // --------------------- //
  
  const toTable = function (arr, titleMap, dataMap) {
    titleMap = titleMap || {};
    dataMap = dataMap || {};
  
    // Gather columns
    let allKeys = {};
    Object.keys(titleMap).forEach(x => allKeys[x] = titleMap[x] !== null);
    for (let i = 0; i < arr.length; i++) {
      Object.keys(arr[i]).forEach(x => allKeys[x] = titleMap[x] !== null);
    }
  
    let html = '<table class="table table-sm table-striped table-borderless">';
  
    // Build header row
    html += "<thead>";
    html += "<tr>";
    Object.keys(allKeys).forEach(x => {
      if (!allKeys[x]) return;
      if (titleMap[x]) {
        x = titleMap[x];
      } else {
        x = x.replace(/([A-Z])/g, " $&");
        x = x.charAt(0).toUpperCase() + x.slice(1);
      }
      html += "<th>" + x + "</th>";
    });
    html += "</tr>";
    html += "</thead>";
  
    // Build data rows
    html += "<tbody>";
    for (let i = 0; i < arr.length; i++) {
      let data = arr[i];
      html += "<tr>";
      Object.keys(allKeys).forEach(x => {
        if (!allKeys[x]) return;
        if (data[x] != null) {
          let val = dataMap[x] ? dataMap[x](data[x]) : data[x];
          html += "<td>" + val + "</td>";
        } else {
          html += "<td></td>";
        }
      });
      html += "</tr>";
    }
    html += "</tbody>";
  
    return html;
  }
  
  textOptions.forEach(x => {
    // Sanitize regex
    let regex = x.value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    // These are somewhat permissive; we need the text to look mostly the same
    regex = regex.replace(/\\\[NAME\\\]/g, ".*");
    regex = regex.replace(/\\\[FACTION\\\]/g, ".*");
    regex = regex.replace(/\\\[FACTION_TRAIT\\\]/g, ".*");
  
    x.regex = new RegExp(`^${regex}$`);
  })
  
  const factionTrait = {
    "Elf": "Undead",
    "Free Kingdoms": "Lycanthrope",
    "Deverenian": "Stormwraith",
    "Dwarf": "Gargoyle",
    "Mercenary": "Monster",
    "The Chosen": "Thrall",
    "Nothrog": "Siege"
  }
  
  function orJoin(arr) {
    if (arr.length === 1) return arr[0];
    const firsts = arr.slice(0, arr.length - 1);
    const last = arr[arr.length - 1];
    return firsts.join(', ') + ' or ' + last;
  }
  
  const textMapTo = function (val, cardData) {
    return val.map((x) => {
      let text = x.value;
      text = text.replace(/\[NAME\]/g, cardData.name || "");
      text = text.replace(/\[FACTION\]/g, orJoin((cardData.faction || "").split("/")));
      text = text.replace(/\[FACTION_TRAIT\]/g, orJoin((cardData.faction || "").split("/").map(x => factionTrait[x])));
      return text;
    }).join("\r\n");
  }
  
  const textMapFrom = function (val) {
    if (!val) return [];
    let pieces = val.split("\r\n");
    let total = [];
    for (let i = 0; i < pieces.length; i++) {
      let piece = pieces[i];
      if (!piece) continue;
      let option = textOptions.filter(x => x.regex.test(piece))[0];
      if (option == null) {
        option = { id: i + "?", value: piece };
      }
      total.push(option);
    }
    return total;
  }
  
  
  // ---------------------- //
  // - Computed Constants - //
  // ---------------------- //
  
  const textDetailTable = toTable(textOptions, {
    id: "ID",
    value: "Ability Text",
    regex: null
  }, {
    value: x => {
      let hashReg = /(Limited Order:|Spend Order:|Order:|Limited React:|Spend React:|React:|Limited Spend React:|Limited Spend Order:)/gm;
      return x.replace(hashReg, "<b>$&</b>");
    }
  });
  
  const traitDescList = Object.entries(traitMap).map(x => `(${x[0]}: ${x[1]})`).join(" ");
  
  const traitDetailTable = toTable(Object.keys(traitMap).map(x => ({ trait: x, points: traitMap[x] })));
  
  const featDescList = Object.entries(featMap).map(x => `${x[0]} is ${x[1]} points, plus 3 for each level`).join("\r\n");
  
  const featDetailTable = toTable(Object.keys(featMap).map(x => ({ feat: x, basePoints: featMap[x], pointsPerLevel: 3 })));
  
  // ------------------ //
  // - Export Ruleset - //
  // ------------------ //
  
  export default {
    "general": {
      hasGuide: true,
      restrictText: true,
      disallowFlavor: true,
      pointMaximum: 150,
      genInfo: "This ruleset allows you to build your own Warlord. Every attribute of the card has a certain “point” cost, and you must keep your card within the allowable limit." +
        "\r\n " +
        "\r\nYou name not name yourself anything that would be benefitial in any way. Meaning no injection attacks, and no existing names." +
        "\r\n " +
        "\r\nFor this ruleset, in order to help reduce text box clutter, we are adding some wording rules. Please be aware of the following:" +
        "\r\nThe word “Your” in rules text refers to a card(s) that you control." +
        "\r\n“This Turn” in rules text means the effect in question lasts “Until end of turn”" +
        "\r\nIf you have “Advantage” on a roll then you roll two dice for the roll and keep the higher result." +
        "\r\nIf you have “Disadvantage” on a roll then you roll two dice for the roll and keep the lower result." +
        "\r\nIf you have Advantage on a non-spell strike roll against a Planar character, you'll keep the highest even roll (if there is one)." +
        "\r\nIf you have Disadvantage on a non-spell strike roll against a Planar character, you'll keep the lowest odd roll (if there is one)." +
        "\r\nIf you would have both “advantage” and “disadvantage” on a roll you are considered to have neither of them." +
        "\r\n“Limited” refers to something that can be preformed Once Per Turn. so “Limited Order” would be the same as saying “Order: Once per turn:”, “Limited React” would be the same as saying “React: Once Per Turn:”, etc.",
      makeDefault: true
    },
    "name": {
      validate(val) {
        if (val && val.length > 30) return "A name longer than 30 characters is not permitted in this ruleset.";
      }
    },
    "text": {
      options: textOptions,
      mapTo: textMapTo,
      mapFrom: textMapFrom,
      validate(val, cardData) {
        let options = textMapFrom(val);
        let i = cardData.class && cardData.class.includes("/") ? 1 : 0; // Multiclass
        if (options.length - i > 2) return "Only two abilities are permitted in this ruleset."
        for (; i < options.length; i++) {
          if (options[i].points == null) return "This text is not permitted in this ruleset.";
        }
      },
      pointInfo: "A card may have up to two of the predefined abilities. Each ability has an identifier and a point value. A complete list can be found on the guide page.",
      pointInfoDetail: "<p>A card may have up to two of the predefined abilities. Each ability has an identifier (to easily find it), a description, and a point value. A card may have multiple abilities, and the cost is the sum of their point values. [NAME] is replaced with the name of the card,[FACTION] is replaced with their faction(s), and [FACTION_TRAIT] is replaced with the subrace of their faction(s).</p>" +
        textDetailTable,
      computePoints(val, cardData) {
        let sum = 0;
        let options = textMapFrom(val);
        let i = cardData.class && cardData.class.includes("/") ? 1 : 0; // Multiclass
        for (; i < options.length; i++) {
          sum += options[i].points;
        }
        return sum;
      }
    },
    "type": {
      initialValue: "Character",
      validate(val) {
        if (val !== "Character") return "The card must be a character in this ruleset.";
      }
    },
    "class": {
      pointInfo: "Classless is 0 points. Any single class is 10 points. Additional classes are 40 points each." +
        "\r\nBeing both multiclass and at least level 5 costs an additional 30 points.",
      computePoints(val, cardData) {
        if (val == null) return null;
        let classes = val.split("/").filter(x => x !== "Classless");
        if (classes.length === 0) return 0;
        if (classes.length === 1) return 10;
        return (classes.length - 1) * 40 + 10 + (cardData.level >= 5 ? 30 : 0);
      }
    },
    "faction": {
      validate(val) {
        if (val == null) return null;
        let factions = val.split("/");
        if (factions.length > 2) return "More than 2 factions is not permitted in this ruleset.";
      },
      pointInfo: "The first faction is free, and a second faction is 55 points.",
      computePoints(val) {
        if (val == null) return null;
        let factions = val.split("/");
        return (factions.length - 1) * 55;
      }
    },
    "attack": {
      pointInfo: "Attack of 0 is free. Each additional value of attack is: 1 point up to 5 and 2 points beyond that." +
        "\r\nA second strike is 5 points in addition to the points for its value." +
        "\r\nA third strike strikes is 30 points in addition to the points for its value." +
        "\r\nA fouth strike strikes is 35 points in addition to the points for its value." +
        "\r\nSubsequent additional strikes are 40 points in addition to the points for their value.",
      computePoints(val) {
        if (val == null) return null;
        function numAttacksPoints(num) {
          if (num <= 1) return 0;
          if (num <= 2) return 5;
          if (num <= 3) return 35;
          if (num <= 4) return 70;
          return (num - 4) * 40 + 70;
        }
        function strikePoints(attack) {
          if (attack <= 0) return 0;
          if (attack <= 5) return attack * 1;
          return (attack - 5) * 2 + 5;
        }
  
        let attacks = val.split("/");
        let sum = numAttacksPoints(attacks.length);
        attacks.forEach(attack => {
          sum += strikePoints(attack);
        });
        return sum;
      }
    },
    "armorClass": {
      pointInfo: "AC of 8 is free. Each additional value of AC is: 2 points up to 12, 3 points up to 16, and 15 points beyond that." +
        "\r\nCards with the Planar trait may not have more than 14 AC.",
      validate(val, cardData) {
        if (val && cardData.traits) {
          if (val > 14 && cardData.traits.split("/").includes("Planar")) return "Cards with the Planar trait are not permitted to have more than 14 AC in this ruleset."
        }
      },
      computePoints(val) {
        if (val == null) return null;
        if (val <= 8) return 0;
        if (val <= 12) return (val - 8) * 2;
        if (val <= 16) return (val - 12) * 3 + 8;
        return (val - 16) * 15 + 20;
      }
    },
    "skill": {
      pointInfo: "Skill of 0 is free. Each additional value of skill is: 1 point up to 5, 3 points up to 8, 6 points up to 10, 10 points up to 15, and 15 points beyond that.",
      computePoints(val) {
        if (val == null) return null;
        if (val <= 0) return 0;
        if (val <= 5) return val * 1;
        if (val <= 8) return (val - 5) * 3 + 5;
        if (val <= 10) return (val - 8) * 6 + 14;
        if (val <= 15) return (val - 10) * 10 + 26;
        return (val - 15) * 15 + 76;
      }
    },
    "hitPoints": {
      pointInfo: "HP of 1 is free. Each additional value of HP is: 5 points up to 3, 20 points up to 4, and 40 points beyond that.",
      computePoints(val) {
        if (val == null) return null;
        if (val <= 1) return 0;
        if (val <= 3) return (val - 1) * 5;
        if (val <= 4) return (val - 3) * 20 + 20;
        return (val - 4) * 40 + 40;
      }
    },
    "level": {
      validate(val) {
        if (val > 5) return "A level greater than 5 is not permitted in this ruleset.";
      },
      pointInfo: "A level of 1 or 2 is 5 points. A level of 3 or 4 is free. Level of 5 is 10 points.",
      computePoints(val) {
        if (val == null) return null;
        if (val <= 2) return 5;
        if (val <= 4) return 0;
        return 10;
      }
    },
    "traits": {
      initialValue: "Warlord",
      validate(val) {
        let split = val && val.split("/");
        if (!val || !split.includes("Warlord")) return "Warlord is required in this ruleset.";
        for (let i = 0; i < split.length; i++) {
          let trait = split[i];
          if (traitMap[trait] == null) return `${trait} is not permitted in this ruleset.`;
        }
      },
      pointInfo: "The cost of individual traits varies. Warlord is free. Having 2 or more positive-cost traits is an additional 15 points per additional trait.\r\n" +
        traitDescList,
      pointInfoDetail: "<p>The cost of individual traits varies. Warlord is free. Having 2 or more positive-cost traits is an additional 15 points per additional trait.</p>" +
        traitDetailTable,
      computePoints(val) {
        if (val) {
          let split = val.split("/");
          let sum = 0;
          let positiveTraits = 0;
          for (let i = 0; i < split.length; i++) {
            let trait = split[i];
            let points = +traitMap[trait];
            sum += points;
            if (points > 0) positiveTraits++;
          }
          if (positiveTraits > 1) sum += (positiveTraits - 1) * 15;
          return sum;
        }
      }
    },
    "feats": {
      pointInfo: "The cost of feats are...\r\n" +
        featDescList,
      pointInfoDetail: "<p>Each feat has a base point cost, plus an additional cost for each level of the feat.</p>" +
        featDetailTable,
      computePoints(val) {
        if (val == null) return null;
        let featValues = val.split("/");
        let sum = 0;
        for (let i = 0; i < featValues.length; i++) {
          let featValue = featValues[i].split(/ (?=[-+])/);
          sum += featMap[featValue[0]] + 3 * featValue[1];
        }
        return sum;
      }
    },
    "misc": {
      pointInfo: "Having charges costs 1 point, plus 3 points per charge.",
      computePoints(val) {
        if (val == null) return null;
        let sum = 0;
        let misc = val.split("/");
        for (let i = 0; i < misc.length; i++) {
          if (/^-?\d+ Charges?$/.test(misc[i])) {
            let charges = misc[i].split(" ")[0];
            sum += 1 + charges * 3;
          }
        }
        return sum;
      }
    },
    "flavorText": {
      validate(_val, cardData) {
        // Coerce
        if (cardData.printInfos) {
          cardData.printInfos.forEach(x => {
            x.flavorText = null;
          })
        }
      }
    },
    "flavorTraits": {
      validate(_val, cardData) {
        // Coerce
        if (cardData.printInfos) {
          cardData.printInfos.forEach(x => {
            x.flavorTraits = null;
          })
        }
      }
    }
  }
