// ------------------ //
// - Constant Lists - //
// ------------------ //

const textOptions = [{
  id: 1,
  value: "All numerals on your other Abyssals text boxes are increased by one.",
  points: 45
}, {
  id: 10,
  value: "Spend Order: Your target Avatar is all classes and +1 level this turn.",
  points: 30
}, {
  id: 100,
  value: "React: After [NAME] hits with a ranged strike: Spend the target of the ranged strike.",
  points: 15
}, {
  id: 101,
  value: "[NAME] inflicts an additional wound when they hit with a melee strike.",
  points: 30
}, {
  id: 102,
  value: "Limited Order: Return target non-Warlord character to its owner's hand. This ability may not target opposing characters with items equipped.",
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
  value: "Limited Order: Look at the top five cards of your deck. Put one of the cards into your hand and discard the remaining cards.",
  points: 45
}, {
  id: 107,
  value: "Order: Discard a spell: Target character within two ranks must succeed with a magic save (DC 8 + [NAME]'s Skill) or stun.",
  points: 45
}, {
  id: 108,
  value: "Limited Order: Kill an opposing non-Warlord character with 4 or more Levels lower than [NAME].",
  points: 45
}, {
  id: 109,
  value: "Spend Order: Perform a +0 ranged strike that inflicts two additional wounds if it hits.",
  points: 30
}, {
  id: 11,
  value: "Your other Constructs gain +3 levels and ignore class restrictions for equipping.",
  points: 15
}, {
  id: 110,
  value: "Limited Order: Remove a wound from [NAME]: Perform a melee strike.",
  points: 30
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
  value: "Limited React: After target character pays the cost of an action to draw or retrieve card(s) from the deck: Perform a +5 ranged strike against the target.",
  points: 30
}, {
  id: 114,
  value: "Limited Order: Search your deck for a 1st level character without the Monster trait, show it to the other players, and put it in your hand.",
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
  value: "Order: Twice per turn, target an opposing character within two ranks: The target must succeed with a Magic save (DC 14) or perform a melee strike against a target of your choice.",
  points: 30
}, {
  id: 12,
  value: "Limited Order: Put target item or Construct from your discard pile into play. ",
  points: 45
}, {
  id: 120,
  value: "Spend Order: Perform a +7 ranged strike. Perform a +4 ranged strike.",
  points: 30
}, {
  id: 121,
  value: "Limited Order: Discard a card: Remove one wound from [NAME].",
  points: 30
}, {
  id: 122,
  value: "React: After a [FACTION] in this rank is targeted with a melee strike: Make a Defend check (DC 20). If successful, redirect the strike to [NAME].",
  points: 30
}, {
  id: 123,
  value: "React: After [NAME] hits with a melee strike: Target each character in the hit character's rank whose Level +8 is less than the natural die roll. Move each target backward one rank.",
  points: 45
}, {
  id: 124,
  value: "Limited Order: Remove a [FACTION] in your discard pile from the game: Perform a ranged strike (base = the removed [FACTION]’s level).",
  points: 15
}, {
  id: 125,
  value: "React: After [NAME] is targeted by a melee or ranged strike: The character performing the strike must make a fear save (DC 8 + number of other [FACTION]s in [NAME]'s rank) or the strike is canceled.",
  points: 30
}, {
  id: 126,
  value: "[NAME] may equip two Weapons.",
  points: 15
}, {
  id: 127,
  value: "Adjacent [FACTION]s have the ability: \"Order: Stun this character: Perform a melee strike.\"",
  points: 30
}, {
  id: 128,
  value: "Limited React: After [NAME] performs an action which reduced or removed wounds from a target [FACTION]: Ready the target.",
  points: 30
}, {
  id: 129,
  value: "[NAME] may perform level 1 actions of any class.",
  points: 15
}, {
  id: 13,
  value: "Spend Order: Your target Construct is considered to have all of this characters items equipped this turn.",
  points: 30
}, {
  id: 130,
  value: "Order: Twice per turn, target a character within one rank: The target must succeed with a magic save (DC 15) or suffer a wound.",
  points: 30
}, {
  id: 131,
  value: "May play 1st and 2nd level fighter actions.",
  points: 15
}, {
  id: 132,
  value: "Limited Order: Kill another character: Draw a card. [NAME] may immediately cast a spell that they are capable of casting.",
  points: 45
}, {
  id: 133,
  value: "React: After [NAME] moves to a different rank: Perform a +4 ranged strike.",
  points: 45
}, {
  id: 134,
  value: "Spend Order: If [NAME] is in the second rank, succeed with a Stealth check (DC 24) to move him to the first rank of a different formation.",
  points: 30
}, {
  id: 135,
  value: "Limited Order: Perform a +3 ranged strike.",
  points: 15
}, {
  id: 136,
  value: "Order: Kill a [FACTION_TRAIT]: This turn [NAME] gains +3 ATK and his melee strikes may target 2 ranks away.",
  points: 30
}, {
  id: 137,
  value: "Limited React: After [NAME] suffers wounds: Ready [NAME]. ",
  points: 45
}, {
  id: 138,
  value: "Your Level 1 characters do not suffer a loyalty penalty.",
  points: 45
}, {
  id: 139,
  value: "While [NAME] is ready, your [FACTION] may cast wizard spells as though they were in [NAME]'s location.",
  points: 30
}, {
  id: 14,
  value: "Your deck may contain two copies of Epic cards.",
  points: 30
}, {
  id: 140,
  value: "Limited React: After [NAME] kills a character with a melee strike or action, that character's controller must discard a card from their hand.",
  points: 30
}, {
  id: 141,
  value: "Limited Order: Remove up to three cards in your discard pile from the game: Remove that many cards of your choice in another discard pile from the game.",
  points: 15
}, {
  id: 142,
  value: "While adjacent to a cleric, [NAME] has an additional melee strike (base +2 ATK) when he attacks.",
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
  value: "Spend Order: Once per game: Perform a number of +0 ranged strikes equal to [NAME]’s Level.",
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
  value: "React: After [NAME] is targeted by an action or strike, remove a [FACTION] in your discard pile from the game: Redirect the strike or action to an adjacent [FACTION].",
  points: 45
}, {
  id: 149,
  value: "Spend Order: Search your deck for a Weapon and equip it to one of your [FACTION].",
  points: 45
}, {
  id: 15,
  value: "[NAME] may equip Cursed items regardless of class.",
  points: 15
}, {
  id: 150,
  value: "Limited Order: Target another [FACTION] in your army. Move one or more wounds from the target to another character in your army.",
  points: 30
}, {
  id: 151,
  value: "[NAME]’s melee strikes inflict an additional wound against stunned characters.",
  points: 30
}, {
  id: 152,
  value: "Limited React: After casting a spell: Perform a melee strike.",
  points: 30
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
  value: "Limited Order: Until [NAME] uses this ability again, your target other Level 3 or higher [FACTION] gains +2 ATK, AC, and Skill and, while not stunned, has the ability, \"[NAME] may target spells as if he were in this character's location.\"",
  points: 45
}, {
  id: 159,
  value: "React: After an opposing character performs an action to draw a card: Perform a melee strike.",
  points: 30
}, {
  id: 16,
  value: "React: After a die roll, spend an equipped Cursed item: reroll the die.",
  points: 30
}, {
  id: 160,
  value: "Spend Order: Until the end of the turn, [FACTION] in your army gain +3 AC and Riposte +5.",
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
  value: "Limited React: Before falling forward: Do not spend or stun before moving.",
  points: 45
}, {
  id: 164,
  value: "Order: Stun [NAME]: Perform a melee strike that may target an additional rank away.",
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
  id: 17,
  value: "Limited Order: Characters have -X ATK, AC, and Skill this turn while within two ranks of [NAME], where X is the number of Cursed items equipped to [NAME].",
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
  id: 2,
  value: "Limited Order: Perform an action card attached to your target Abyssal as if from hand.",
  points: 15
}, {
  id: 20,
  value: "Limited Order: Destroy an equipped Familiar: [ANME] may play an action card from your discard pile, then banish it.",
  points: 30
}, {
  id: 21,
  value: "Your Heroes gain +2 ATK, AC, and Skill.",
  points: 15
}, {
  id: 22,
  value: "Limited Order: Spend a Hero: Switch locations with that Hero, gain any feat with +5 bonus this turn, or remove a wound from this character.",
  points: 15
}, {
  id: 23,
  value: "Order: Kill a Kratchling: Perform a +0 melee or ranged strike.",
  points: 45
}, {
  id: 24,
  value: "Spend Order: Your Kratchlings within one rank gain +5 ATK and +5 AC this turn.",
  points: 30
}, {
  id: 25,
  value: "Spend Order: Discard an item: Search your deck for a Djinn or Efreet and put it into play adjacent to this character.",
  points: 30
}, {
  id: 26,
  value: "Your Mentalists gain [NAME]’s faction and subclass(s).",
  points: 30
}, {
  id: 27,
  value: "React: After your target Mentalist dies: Each opponent discards the top two cards of their deck.",
  points: 30
}, {
  id: 28,
  value: "Limited Order: You may spend a Mentalist: Each opponent discards a card (two if you spent a Mentalist) from their hand.",
  points: 45
}, {
  id: 29,
  value: "Your other Monks can use Fighter items and Rogue actions.",
  points: 30
}, {
  id: 3,
  value: "Your deck may contain any number of Shade Harpy. ",
  points: 30
}, {
  id: 30,
  value: "Limited React: Before your target Monk performs an attack: All strikes from the attack ignore bonuses to AC.",
  points: 15
}, {
  id: 31,
  value: "Spend Order: Move each Monk within one rank forward one rank. They gain +3 ATK this turn.",
  points: 30
}, {
  id: 32,
  value: "[NAME]’s spells gain +1 to ranged strikes and DC’s for each equipped ‘Eyestalk’.",
  points: 15
}, {
  id: 33,
  value: "Limited Order: Search your deck for an ‘Eyestalk’ and equip it to your target Reaver.",
  points: 45
}, {
  id: 34,
  value: "Spend Order: Ready each ‘Eyestalk’ you control.",
  points: 30
}, {
  id: 35,
  value: "Your Reindeer and characters named Blitzer ignore Reindeer and Unique trait restrictions.",
  points: 30
}, {
  id: 36,
  value: "Limited Order: Ready your target Reindeer, Steed, or character named Blitzer.",
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
  value: "Spend Order: Perform a number of +5 ranged strikes equal to the number Bows and Arrows equipped to [NAME].",
  points: 30
}, {
  id: 4,
  value: "Your other Harpies gain +1HP.",
  points: 30
}, {
  id: 40,
  value: "[NAME] may equip four Gauntlets and gains +5 to reflex saves.",
  points: 15
}, {
  id: 41,
  value: "Order: Spend an equipped Gauntlet: Perform a +2 melee strike.",
  points: 30
}, {
  id: 42,
  value: "[NAME] may equip two Helms and gains +5 to perception checks.",
  points: 15
}, {
  id: 43,
  value: "Limited React: Before [NAME] suffers a wound, spend an equipped Helm: Reduce the wounds by one.",
  points: 15
}, {
  id: 44,
  value: "[NAME] may equip two Shields and gains an ATK bonus equal to their Shield(s) AC bonus(es).",
  points: 30
}, {
  id: 45,
  value: "Limited Order: Spend an equipped Shield: Perform a melee strike. If it hits, move the target backward one rank.",
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
  id: 5,
  value: "Your Monsters and Lycanthropes gain the Direwolf trait.",
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
  value: "Limited React: After an opponent draws or retrieves a card from their deck, discard a Trap: Discard the card(s).",
  points: 15
}, {
  id: 53,
  value: "Your fighters gain +1 ATK for each card with the Tactics trait in your discard pile.",
  points: 15
}, {
  id: 54,
  value: "React: Before playing a Tactics action, choose one: The action does not require spending as a cost; or draw a card.",
  points: 30
}, {
  id: 55,
  value: "Your deck may include an additional copy of [NAME].",
  points: 45
}, {
  id: 56,
  value: "Your Sutek gain +2 ATK and inflict an additional wound with melee strikes against stunned characters.",
  points: 15
}, {
  id: 57,
  value: "Limited React: After your Sutek hits target opposing character with a strike: Stun the target.",
  points: 30
}, {
  id: 58,
  value: "React: After this character casts a spell: Target opposing character within two ranks must make a reflex save (DC 10) or become stunned.",
  points: 15
}, {
  id: 59,
  value: "Your characters gain +1 level for equipping Treasure items and may equip Treasures regardless of class restrictions.",
  points: 30
}, {
  id: 6,
  value: "React: After your target Direwolf kills an opposing character: Move your target Direwolf forward one rank.",
  points: 15
}, {
  id: 60,
  value: "Limited Order: Draw two cards, then discard two cards unless you discard a Treasure.",
  points: 45
}, {
  id: 61,
  value: "Limited Order: Discard an equipped Treasure: Put a character from your hand into play ignoring loyalty penalties and reduce their entering rank by one.",
  points: 15
}, {
  id: 62,
  value: "[NAME] may play Air, Earth, Fire, and Water actions regardless of class restrictions.",
  points: 45
}, {
  id: 63,
  value: "Order: Once per game, if [NAME] played a separate Air, Earth, Fire, and Water action this turn: [NAME] permanently gains +6 ATK,  +6 AC, +6 Skill, and +2 HP.",
  points: 15
}, {
  id: 64,
  value: "Limited React: After [NAME] reduces or removes a wound, target an Aquatic character in your discard pile: Put the character into your hand.",
  points: 15
}, {
  id: 65,
  value: "Limited Order: Spend an Aquatic character and target an Aquatic character you control: Remove one wound from the target, move them forward or backward one rank, and give them +4 AC and +4 Skill this turn.",
  points: 30
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
  value: "Your Barbarians gain the ability, “Spend Order: Move forward up to two ranks. This character may perform a melee strike.”",
  points: 45
}, {
  id: 69,
  value: "React: After starting armies are revealed, name a non-Warlord trait: Your Rangers have advantage on strike rolls against and saves from characters with the named trait.",
  points: 45
}, {
  id: 7,
  value: "Limited Order: Target Direwolf you control permanently gains +3 ATK and +3 AC and “This character's items are considered blank.”",
  points: 30
}, {
  id: 70,
  value: "Your Totems do not require spending to play if you control a Shaman and [NAME] has +1 level for equipping them.",
  points: 45
}, {
  id: 71,
  value: "Limited Spend Order: Discard a character: Put a character from your discard pile into your hand. Necromancers perform this action without spending.",
  points: 30
}, {
  id: 72,
  value: "Spend Order: Reveal the top card of your deck (top three if this character is a summoner): You may play a character from the revealed cards if you could legally do so.",
  points: 45
}, {
  id: 73,
  value: "Limited React: After your target character is targeted by a strike or action: Switch the location of the character with an Illusionist you control. Redirect the strike or action to the Illusionist, if possible.",
  points: 45
}, {
  id: 74,
  value: "Limited Order: Target an action card in either discard pile with \"Bard\" in the text box: Put that card in your hand.",
  points: 30
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
  value: "Limited React: After your target Cantor performs an action that requires spending as a cost: Ready the target.",
  points: 45
}, {
  id: 78,
  value: "Limited Order: Reveal the top card of each deck: Discard each card. If you control a Seer, you may have each player draw them instead.",
  points: 45
}, {
  id: 79,
  value: "Limited Order: Target an item within one rank (two ranks if [NAME] is a Druid): Destroy the item.",
  points: 30
}, {
  id: 8,
  value: "Your Avatars ignore loyalty penalty and may enter play one rank lower.",
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
  value: "[NAME] may choose two options with the Marksmanship feat.",
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
  id: 9,
  value: "Limited Order: Spend an Avatar: Search your deck for an Air, Earth, Fire, or Water card, reveal it, and put it in your hand.",
  points: 45
}, {
  id: 90,
  value: "Adjacent characters have the ability, “Limited Order: Spend and stun this character: Put a charge on each card with the Charge trait you control.”",
  points: 30
}, {
  id: 91,
  value: "Limited Order: Remove a Charge: Move forward or backward one rank, ready an item, or draw a card and discard a card.",
  points: 45
}, {
  id: 92,
  value: "You may have two additional Dungeons in play if none share a name with another Dungeon in play.",
  points: 30
}, {
  id: 93,
  value: "Limited Order: Target a Dungeon you control: Until this character uses this ability again, the targeted Dungeon gains +10 CR.",
  points: 15
}, {
  id: 94,
  value: "Limited Order: Put target character you control into your hand.",
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
  value: "Limited React: Before your target 1st through 3rd level [FACTION] is killed: If the character does not have the Planar trait, they are not killed, but are instead moved to the rank behind your last rank. Remove all wounds from the character, who permanently has -10AC, Undead, and Planar.",
  points: 30
}, {
  id: 98,
  value: "Limited Order: Look at the top five cards of your deck: You may return them to the top of the deck in the same order, or shuffle them into the deck. Draw a card.",
  points: 45
}, {
  id: 99,
  value: "Order: Discard a card: Target character within one rank must succeed with a poison save (DC 14 + 1 for each [FACTION_TRAIT] in this rank) or either suffer a wound or become spent (your choice).",
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
  "Cursed": -5,
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
  "Necromancer": 5,
  "Nymph": 3,
  "Paladin": 5,
  "Planar": 30,
  "Poison": -5,
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
  "Charisma": 5,
  "Defend": 5,
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
  Object.keys(titleMap).forEach(x => allKeys[x] = true);
  for (let i = 0; i < arr.length; i++) {
    Object.keys(arr[i]).forEach(x => allKeys[x] = true);
  }

  let html = '<table class="table table-sm table-striped table-borderless">';

  // Build header row
  html += "<thead>";
  html += "<tr>";
  Object.keys(allKeys).forEach(x => {
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

const textSplit = function (val) {
  if (!val) return [];
  let pieces = val.split("\r\n");
  let total = [];
  for (let i = 0; i < pieces.length; i++) {
    let piece = pieces[i];
    if (!piece) continue;
    let option = textOptions.filter(x => x.value === piece)[0];
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
  value: "Ability Text"
}, {
  value: x => {
    let hashReg = /(Limited Order:|Spend Order:|Order:|Limited React:|Spend React:|React:)/gm;
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
    pointMaximum: 140,
    genInfo: "This ruleset allows you to build your own Warlord. Every attribute of the card has a certain \"point\" cost, and you must keep your card within the allowable limit." +
      "\r\nFor this ruleset, in order to help reduce text box clutter, we are adding some wording rules. Please be aware of the following:" +
      "\r\nThe word \"Your\" in rules text refers to a card(s) that you control." +
      "\r\n\"This Turn\" in rules text means the effect in question lasts \"Until end of turn\"" +
      "\r\nIf you have \"advantage\" on a roll then you roll two dice for the roll and keep the higher result." +
      "\r\nIf you have \"disadvantage\" on a roll then you roll two dice for the roll and keep the lower result." +
      "\r\nIf you would have both \"advantage\" and \"disadvantage\" on a roll you are cnsidered to have neither of them." +
      "\r\n\"Limited\" refers to something that can be preformed Once Per Turn. so \"Limited Order\" would be the same as saying \"Order: Once per turn:\", \"Limited React\" would be the same as saying \"React: Once Per Turn:\", etc.",
    additionalKeywords: ["Limited Order:", "Limited React:"]
  },
  "name": {
    validate(val) {
      if (val && val.length > 30) return "A name longer than 30 characters is not permitted in this ruleset.";
    }
  },
  "text": {
    options: textOptions,
    split: textSplit,
    validate(val, cardData) {
      let options = textSplit(val);
      let i = cardData.class && cardData.class.includes("/") ? 1 : 0; // Multiclass
      if (options.length - i > 2) return "Only two abilities are permitted in this ruleset."
      for (; i < options.length; i++) {
        if (options[i].points == null) return "This text is not permitted in this ruleset.";
      }
    },
    pointInfo: "A card may have up to two of the predefined abilities. Each ability has an identifier and a point value. A complete list can be found on the guide page.",
    pointInfoDetail: "<p>A card may have up to two of the predefined abilities. Each ability has an identifier (to easily find it), a description, and a point value. A card may have multiple abilities, and the cost is the sum of their point values.</p>" +
      textDetailTable,
    computePoints(val, cardData) {
      let sum = 0;
      let options = textSplit(val);
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
    pointInfo: "Classless is -10 points. Any single class is free. Additional classes are 40 points each." +
      "\r\nBeing both multiclass and at least level 5 costs an additional 30 points.",
    computePoints(val, cardData) {
      if (val == null) return null;
      let classes = val.split("/").filter(x => x !== "Classless");
      if (classes.length === 0) return -10;
      if (classes.length === 1) return 0;
      return (classes.length - 1) * 40 + (cardData.level >= 5 ? 30 : 0);
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
      "\r\nA third strike strikes is 10 points in addition to the points for its value." +
      "\r\nA fouth strike strikes is 25 points in addition to the points for its value." +
      "\r\nSubsequent additional strikes are 30 points in addition to the points for their value.",
    computePoints(val) {
      if (val == null) return null;
      function numAttacksPoints(num) {
        if (num <= 1) return 0;
        if (num <= 2) return 5;
        if (num <= 3) return 15;
        if (num <= 4) return 40;
        return (num - 4) * 30 + 40;
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
    pointInfo: "AC of 8 is free. Each additional value of AC is: 2 points up to 12, 3 points up to 17, and 15 points beyond that." +
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
      if (val <= 17) return (val - 12) * 3 + 8;
      return (val - 17) * 15 + 23;
    }
  },
  "skill": {
    pointInfo: "Skill of 0 is free. Each additional value of skill is: 1 point up to 5, 3 points up to 10, 10 points up to 15, and 15 points beyond that.",
    computePoints(val) {
      if (val == null) return null;
      if (val <= 0) return 0;
      if (val <= 5) return val * 1;
      if (val <= 10) return (val - 5) * 3 + 5;
      if (val <= 15) return (val - 10) * 10 + 20;
      return (val - 15) * 15 + 70;
    }
  },
  "hitPoints": {
    pointInfo: "HP of 1 is free. Each additional value of HP is: 5 points up to 3, 10 points up to 4, and 25 points beyond that.",
    computePoints(val) {
      if (val == null) return null;
      if (val <= 1) return 0;
      if (val <= 3) return (val - 1) * 5;
      if (val <= 4) return (val - 3) * 10 + 10;
      return (val - 4) * 25 + 20;
    }
  },
  "level": {
    validate(val) {
      if (val > 5) return "A level greater than 5 is not permitted in this ruleset.";
    },
    pointInfo: "Level of 4 is free. Level of 5 is 10 points.",
    computePoints(val) {
      if (val == null) return null;
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
