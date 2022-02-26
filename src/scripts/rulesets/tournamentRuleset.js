const textOptions = [{
  id: 1,
  value: "Order: Once per turn, remove an Elf in your discard pile from the game: Perform a ranged strike equal to the removed Elf's level.",
  points: 43
},{
  id: 2,
  value: "Order: Once per turn, look at the top five cards of your deck. You may return them to the top of the deck in the same order, or shuffle them into the deck. Draw a card.",
  points: 56
},{
  id: 3,
  value: "Order: Once per turn, discard a card: The next Spend Order spell Ceihallus casts does not require spending as a cost.",
  points: 39
},{
  id: 4,
  value: "Valhala Abyssbane is both a fighter and a cleric.",
  points: 17
},{
  id: 5,
  value: "Order: Once per turn: Target lower Level Free Kingdoms has an additional melee strike (base +0 ATK) the next time he attacks this turn.",
  points: 45
},{
  id: 6,
  value: "Order: Once per turn, kill a Thrall: Move target Daemon forward one rank.",
  points: 25
},{
  id: 7,
  value: "Ranged strikes by your other Free Kingdoms characters gain +3 to the roll.",
  points: 25
},{
  id: 8,
  value: "You may have other copies of this Warlord in your deck.",
  points: 19
},{
  id: 9,
  value: "Order: Once per turn, move forward or backward one rank.",
  points: 19
},{
  id: 10,
  value: "Dallen is both a cleric and a fighter.",
  points: 13
},{
  id: 11,
  value: "Gahid rolls two dice for initiative, keeping either one.",
  points: 19
},{
  id: 12,
  value: "React: Once per turn, before another Deverenian you control makes a die roll: The die roll is a 10.",
  points: 33
},{
  id: 13,
  value: "React: Once per turn, after Taisia performs a melee strike that hit target character: The target must succeed with a poison save (DC 18) or become spent and may not perform action cards until end of turn.",
  points: 68
},{
  id: 14,
  value: "Gethseme inflicts an additional wound with melee and ranged strikes against Monsters.",
  points: 29
},{
  id: 15,
  value: "Order: Once per turn, target a Level 3 or higher Deverenian you control. The target permanently gains the Stormwraith and Planar traits and suffers -6 AC.",
  points: 52
},{
  id: 16,
  value: "Order: Once per turn: Move forward or backward one rank.",
  points: 19
},{
  id: 17,
  value: "React: Once per turn, after Priam performs an action which reduced or removed wounds from a target Dwarf: Ready the target.",
  points: 41
},{
  id: 18,
  value: "React: Once per turn, after a Free Kingdoms in your army kills an equal or higher Level opposing character: That Free Kingdoms permanently gains +1 Level, +3 ATK, +3 AC, +2 Skill, and +1 HP.",
  points: 64
},{
  id: 19,
  value: "Your Gargoyles within one rank gain +3 ATK and Powerattack +5.",
  points: 21
},{
  id: 20,
  value: "Nightfall - Order: Once per game, remove a Charge: If it is not the first turn, search your deck for a Dragon of Level 6 or lower, and put it into play adjacent to Bran.",
  points: 57
},{
  id: 21,
  value: "React: After an opposing character kills a Deverenian in your army: Put a number of Charges on Cardinal Creigh equal to the killed Deverenian's Level.",
  points: 50
},{
  id: 22,
  value: "Spend React: After you roll Initiative: Ranged strikes against target character add +5 to the roll until end of turn.",
  points: 39
},{
  id: 23,
  value: "Order: Once per turn, kill one of your Elves: Reveal the top 5 cards of your deck. You may put a revealed spell into your hand.",
  points: 43
},{
  id: 24,
  value: "May equip two Traps.",
  points: 7
},{
  id: 25,
  value: "Varson may use the Scribe feat with Rogue actions.",
  points: 17
},{
  id: 26,
  value: "Order: Spend an equipped item: Put a Charge on Rockhome.",
  points: 19
},{
  id: 27,
  value: "Dmitir gains +1 to his Initiative rolls for each Seer you control.",
  points: 22
},{
  id: 28,
  value: "May equip fighter Weapons.",
  points: 9
},{
  id: 29,
  value: "Adjacent lower Level Deverenians gain Defend +3.",
  points: 16
},{
  id: 30,
  value: "May start the game with rogues from other factions in play.",
  points: 20
},{
  id: 31,
  value: "Spend Order: Until the end of the turn, Dwarves in your army gain +3 AC and Riposte +5.",
  points: 29
},{
  id: 32,
  value: "Spend Order: Perform a +4 ranged strike.",
  points: 14
},{
  id: 33,
  value: "May not equip Armor or Helm.",
  points: 10
},{
  id: 34,
  value: "React: Once per turn, after an opposing character becomes stunned: Move a character in your army forward or backward one rank.",
  points: 42
},{
  id: 35,
  value: "React: After a Dwarf in this rank is targeted with a melee strike: Make a Defend check (DC 20). If successful, redirect the strike to Duty.",
  points: 47
},{
  id: 36,
  value: "Order: Twice per turn, target another Free Kingdoms within one rank: The target has a bonus to ATK and AC equal to Samuel's Level until end of turn.",
  points: 50
},{
  id: 37,
  value: "Spells cast by Sanga-Kish gain +2 DC and +2 to ranged strikes for each wound on him.",
  points: 28
},{
  id: 38,
  value: "After one of your Free Kingdoms rolls a natural 17 or greater, the roll is a Critical Success.",
  points: 32
},{
  id: 39,
  value: "React: Once per turn after spending to cast a Level X wizard spell, spend a Level X or higher Gargoyle: Ready Aialla.",
  points: 39
},{
  id: 40,
  value: "Dhamir gains +1 ATK for each spell in your discard pile.",
  points: 19
},{
  id: 41,
  value: "Your rogues do not suffer loyalty penalty.",
  points: 14
},{
  id: 42,
  value: "Order: Spend one of your Dwarf wizards: Ready an item equipped to Sigrida.",
  points: 25
},{
  id: 43,
  value: "Your Thralls gain +1 ATK and AC.",
  points: 11
},{
  id: 44,
  value: "Ruash-Shan is a cleric and a wizard.",
  points: 12
},{
  id: 45,
  value: "React: After one of your Nothrog is hit by a melee strike, kill that Nothrog: The character performing the strike must succeed with a magic save (DC 13) or suffer a wound.",
  points: 57
},{
  id: 46,
  value: "Rabinus is both a cleric and a rogue.",
  points: 13
},{
  id: 47,
  value: "Rhawn may cast spells as if he were a 2nd level cleric.",
  points: 19
},{
  id: 48,
  value: "Fighters joining this army suffer no loyalty penalty.",
  points: 18
},{
  id: 49,
  value: "Order: Once per turn: Perform a +3 ranged strike.",
  points: 17
},{
  id: 50,
  value: "React: Once per turn, after Brymin kills a character with a melee strike, draw a card.",
  points: 29
},{
  id: 51,
  value: "If any opposing Warlord is spent, your Siege characters' ranged strikes may target an additional rank away.",
  points: 36
},{
  id: 52,
  value: "React: Once per turn, ignore the loyalty penalty when bringing an evil character into play.",
  points: 31
},{
  id: 53,
  value: "Broken Earth is a cleric and a fighter.",
  points: 13
},{
  id: 54,
  value: "Your Stormwraiths have Riposte +5.",
  points: 12
},{
  id: 55,
  value: "Dwarves in your army are +1 level for equipping items.",
  points: 18
},{
  id: 56,
  value: "Order: Once per turn, put a card from your hand into play face down as an Insect Swarm, an evil Level 1 rogue with +3 ATK, 10 AC, +1 Skill, 1 HP, and the ability, \"Insect Swarm's melee strikes do not inflict wounds. If it hits with a melee strike, the target becomes spent or, if already spent, stunned.\"",
  points: 102
},{
  id: 57,
  value: "React: After Mnettaor is targeted by a melee or ranged strike: The character performing the strike must make a fear save (DC 8 + number of other Deverenians in Mnettaor's rank) or the strike is cancelled.",
  points: 68
},{
  id: 58,
  value: "React: After an opposing character enters play: Put a character into play. If you put a Lycanthrope into play, it may maneuver.",
  points: 43
},{
  id: 59,
  value: "React: After the initiative phase: Until end of turn, other Monsters in the same rank as Vash-Arrosh gain +3 ATK, -3 AC, and inflict an additional wound against equal or lower Level characters with melee strikes.",
  points: 71
},{
  id: 60,
  value: "Spend Order: Once per turn, target an opposing non-Warlord character: Until the end of the turn, the target's text box is considered blank.",
  points: 47
},{
  id: 61,
  value: "You may bring Free Kingdoms characters higher than 3rd level into play as if they were 1 level lower.",
  points: 34
},{
  id: 62,
  value: "Order: Twice per turn: Until end of turn, target adjacent Free Kingdoms has an additional melee strike (base = target's primary ATK) when he attacks. If Sir Robert is in the first rank the target may perform an order.",
  points: 73
},{
  id: 63,
  value: "React: Once per turn, after performing a melee strike that wounded the target: Remove one wound from Life.",
  points: 36
},{
  id: 64,
  value: "Your characters with +8 or greater ATK inflict an additional wound with melee strikes.",
  points: 29
},{
  id: 65,
  value: "Your Deverenians have the ability \"React: Once per turn, after a melee or ranged strike targets this Deverenian, the acting character must succeed with a perception check (DC 12) or the strike is a Critical Failure and Adonis gains +2 Skill until end of turn.\"",
  points: 88
},{
  id: 66,
  value: "Spend Order: Once per game: Perform a number of +0 ranged strikes equal to Biana's Level.",
  points: 30
},{
  id: 67,
  value: "Donar inflicts an additional wound when he hits with a melee strike.",
  points: 23
},{
  id: 68,
  value: "React: After a Nothrog performs a ranged strike with a printed bonus greater than the Level of the target: Spend the target of the strike.",
  points: 46
},{
  id: 69,
  value: "May not Attack.",
  points: 5
},{
  id: 70,
  value: "React: After a character enters play, discard a card: The character permanently gains the Monster trait. Do not discard a card if the character is yours.",
  points: 51
},{
  id: 71,
  value: "React: Once per turn, after another character enters play and performs a React printed on himself: Chyre performs the same React.",
  points: 43
},{
  id: 72,
  value: "Spend React: After target character performs a melee strike that missed: The target suffers one wound.",
  points: 34
},{
  id: 73,
  value: "Your Dwarves gain +1 Level for equipping Armor.",
  points: 16
},{
  id: 74,
  value: "Order: Once per turn, put a card from your hand into play in this rank face down, as a Unique Level 3 fighter named Lorand with +3/+1 ATK, 8 AC, +4 Skill, 2 HP, and the Ethereal trait.",
  points: 62
},{
  id: 75,
  value: "Order: Once per turn, kill any number of ready Thralls: Search your deck for a Daemon whose Level is equal to or lower than twice the combined Levels of the killed Thralls and put it in your hand.",
  points: 66
},{
  id: 76,
  value: "Order: Once per turn, kill another character in your army: Ready Slayer the Unkind.",
  points: 28
},{
  id: 77,
  value: "Order: Discard a card from your hand: Move forward or backward one rank.",
  points: 24
},{
  id: 78,
  value: "After starting armies are revealed, search your deck for a Helm, Armor or Shield card of Level 8 or lower and put it in your hand.",
  points: 44
},{
  id: 79,
  value: "Your Nothrogs gain +5 ATK while they have one or more wounds.",
  points: 21
},{
  id: 80,
  value: "React: After Karkos is targeted by an action or strike, remove a Deverenian in your discard pile from the game: Redirect the strike or action to an adjacent Deverenian.",
  points: 56
},{
  id: 81,
  value: "All Warlords have the ability \"React: After you roll Initiative: Discard any number of cards.\"",
  points: 32
},{
  id: 82,
  value: "React: Before Kassia targets a spell, kill one of your Deverenians within one rank: This spell either has +4 DC or may target characters one additional rank away.",
  points: 54
},{
  id: 83,
  value: "If Tavis is evil, opposing characters suffer -3 to all die rolls.",
  points: 22
},{
  id: 84,
  value: "Each of your ranks with at least one character in front of it may contain an additional character before becoming illegal.",
  points: 41
},{
  id: 85,
  value: "Marcus can use the Charisma feat with any character in your army, regardless of rank.",
  points: 29
},{
  id: 86,
  value: "React: When a wound is removed from Soren, he gains +2 ATK permanently.",
  points: 24
},{
  id: 87,
  value: "Order: Once per turn: Ready an item equipped by Ichaerus.",
  points: 19
},{
  id: 88,
  value: "You may have up to 5 copies of Zartoch in your deck.",
  points: 18
},{
  id: 89,
  value: "React: After another character misses with a melee strike, discard a card: Perform a melee strike.",
  points: 33
},{
  id: 90,
  value: "Order: Put a lower level character into play without a loyalty penalty.",
  points: 24
},{
  id: 91,
  value: "Order: Once per turn, target an opposing character within two ranks: The target must succeed with a magic save (DC 15) or move backward one rank and become spent.",
  points: 54
},{
  id: 92,
  value: "Spend Order: Target a Free Kingdoms you control within 2 ranks: Move the target adjacent to Niobe.",
  points: 33
},{
  id: 93,
  value: "Albrecht is a cleric, a fighter, and a rogue.",
  points: 15
},{
  id: 94,
  value: "Order: Kill a Level X Thrall: Inflict 1 wound on target Level X or lower stunned character within 1 rank.",
  points: 35
},{
  id: 95,
  value: "React: After target non-Warlord character three or more Levels lower than Baron Bastein performs a melee strike that wounded Baron Bastein: Kill the target.",
  points: 52
},{
  id: 96,
  value: "Dhamir is both a fighter and a wizard.",
  points: 13
},{
  id: 97,
  value: "Averisk's ranged strikes may target characters in an adjacent rank.",
  points: 23
},{
  id: 98,
  value: "Mak and Makob enter play as a 5th level character.",
  points: 17
},{
  id: 99,
  value: "Talin may perform the Riposte feat twice per turn.",
  points: 17
},{
  id: 100,
  value: "Order: Once per turn, discard a card: Remove a wound from one of your other Free Kingdoms within 1 rank.",
  points: 35
},{
  id: 101,
  value: "React: Once per turn, after spending as part of the cost of a Fire spell: Ready Yavlo. (The cost is still considered paid.)",
  points: 41
},{
  id: 102,
  value: "Order: Discard a spell: Target character within two ranks must succeed with a magic save (DC 8 + Kalten's Skill) or stun.",
  points: 41
},{
  id: 103,
  value: "Spend Order: Until the end of the turn, all characters are +1 or -1 level (your choice) for casting spells.",
  points: 36
},{
  id: 104,
  value: "Adjacent Dwarves have the ability: \"Order: Stun this character: Perform a melee strike.\"",
  points: 30
},{
  id: 105,
  value: "Aialla is a cleric and a wizard.",
  points: 11
},{
  id: 106,
  value: "Order: Once per turn: Remove a wound from Krenthor.",
  points: 17
},{
  id: 107,
  value: "React: Once per turn, after target opposing character makes a melee strike roll: The target rerolls the die.",
  points: 36
},{
  id: 108,
  value: "React: After winning initiative, discard up to two cards: Draw that many cards.",
  points: 27
},{
  id: 109,
  value: "Kalten the Bleak has +1 Skill for each spell in your discard pile.",
  points: 22
},{
  id: 110,
  value: "Other good characters gain +2 AC while in the same rank as Terak.",
  points: 22
},{
  id: 111,
  value: "Adoramus Te enters play as if he were level 5.",
  points: 16
},{
  id: 112,
  value: "Order: Once per turn, kill an Undead in your army: Your next melee strike is a Critical Success.",
  points: 32
},{
  id: 113,
  value: "Wounds taken by Lord Winter may not be reduced or removed.",
  points: 20
},{
  id: 114,
  value: "Other Elves in this rank add +3 to their die rolls.",
  points: 17
},{
  id: 115,
  value: "React: Once per turn, after an attack in which one of your Dwarves kills an opposing character: One of your Barbarians performs an attack (spending as normal).",
  points: 53
},{
  id: 116,
  value: "Order: Once per turn, discard a card: Put a Forest of Bone from your collection into play in an opposing front rank.",
  points: 39
},{
  id: 117,
  value: "Order: Once per turn: Perform a +3 ranged strike.",
  points: 17
},{
  id: 118,
  value: "Your Dwarves may equip and use items while stunned, and may equip fighter Weapons regardless of class.",
  points: 34
},{
  id: 119,
  value: "Serolia Calix is a wizard and a cleric.",
  points: 13
},{
  id: 120,
  value: "If Tavis is good, your characters gain +3 to all die rolls.",
  points: 20
},{
  id: 121,
  value: "Order: Remove 4 Charges: The next spell Rockhome casts this turn does not require spending as a cost.",
  points: 34
},{
  id: 122,
  value: "If Sakar is your Warlord, your good characters suffer no loyalty penalty and your evil characters enter play as if they were one level higher.",
  points: 48
},{
  id: 123,
  value: "Other Gargoyles in your army gain +2 ATK.",
  points: 14
},{
  id: 124,
  value: "Order: Once per game: Attach a lower Level wizard spell from your hand to Ter-Soth. While attached, Ter-Soth may perform the spell once per turn, as if from your hand.",
  points: 56
},{
  id: 125,
  value: "Nightfall - If it is not the first turn, your Monsters have a bonus to ATK equal to half the printed CR of the dungeon in play (Rounded Down).",
  points: 48
},{
  id: 126,
  value: "Order: Once per turn, take up to two cards from the top of your deck and attach them face down to Kolivan as Pets.",
  points: 38
},{
  id: 127,
  value: "Order: Once per turn, target a character with negative ATK or Skill: The target suffers one wound.",
  points: 33
},{
  id: 128,
  value: "React: After one or more wounds are removed from Gethseme: Perform a +5 melee strike.",
  points: 29
},{
  id: 129,
  value: "Order: Once per turn, discard two item cards from your hand: If Parak is in the front rank, ready him.",
  points: 34
},{
  id: 130,
  value: "Your Dwarf clerics have the ability \"Spend React: Before a Dwarf suffers wounds, discard a cleric or rogue action card from your hand: Reduce the wounds by one, or unstun a Dwarf.\"",
  points: 61
},{
  id: 131,
  value: "Order: Remove a character in your discard pile from the game: Until the end of the turn, give a Free Kingdoms character an extra melee strike per attack at +4 ATK. This can only target a character once per turn.",
  points: 71
},{
  id: 132,
  value: "Spend Order: Search your deck for a dungeon, and put it into play if possible, otherwise put it into your hand.",
  points: 37
},{
  id: 133,
  value: "Soren can cast 1st and 2nd level cleric spells.",
  points: 16
},{
  id: 134,
  value: "Vronish Kez gains +2 ATK, +2 AC, and +2 Skill for each faction other than Free Kingdoms in his army.",
  points: 34
},{
  id: 135,
  value: "All opposing Warlords have the ability: \"Order: Discard all cards from your hand.\"",
  points: 28
},{
  id: 136,
  value: "Varson is both a cleric and a rogue, and enters play as if he were level 5.",
  points: 25
},{
  id: 137,
  value: "Order: Once per turn, discard a card from your hand: Remove one wound from Dallen.",
  points: 28
},{
  id: 138,
  value: "Yedraw's Weapons may not be discarded by opposing players' actions.",
  points: 23
},{
  id: 139,
  value: "Order: Once per turn, remove a bold trait other than \"Warlord\" from an opposing character for the rest of the turn.",
  points: 39
},{
  id: 140,
  value: "Daybreak - If it is the first turn your Elves have the ability \"Order: Once per turn: Succeed with a Skill check (DC 20) to inflict a wound on a character within one rank.\"",
  points: 58
},{
  id: 141,
  value: "Your entering characters may cause illegal formations if you already have at least one character in the rank.",
  points: 37
},{
  id: 142,
  value: "Order: Once per turn per target, spend Jourdain or a Stormwraith: Target character suffers -X ATK, AC, and Skill until end of turn, where X is the spent character's Level.",
  points: 57
},{
  id: 143,
  value: "Gethseme is a fighter and a rogue.",
  points: 12
},{
  id: 144,
  value: "While Raziel is in play your characters may not perform actions to draw cards.",
  points: 26
},{
  id: 145,
  value: "Order: Once per turn: Retrieve a Lycanthrope Form from your deck, show it to the other players, and put it in your hand.",
  points: 40
},{
  id: 146,
  value: "Order: Once per turn: Ready target non-stunned Thrall you control.",
  points: 22
},{
  id: 147,
  value: "While Rhawn is in the 1st rank, characters in the other players' 1st rank must succeed with a fear save (DC 9) to ready.",
  points: 40
},{
  id: 148,
  value: "Terak may cast level 1 and 2 cleric spells.",
  points: 15
},{
  id: 149,
  value: "Eiael is both a fighter and a rogue.",
  points: 12
},{
  id: 150,
  value: "React: Once per turn before one of your other Dwarves equips an item: The target Dwarf is +1 level for equipping the item. Ready the target.",
  points: 47
},{
  id: 151,
  value: "While Rostukk is ready, adjacent Siege may target strikes an additional rank away.",
  points: 28
},{
  id: 152,
  value: "React: Once per turn, after Winter suffers wounds: Ready Winter. If the wounds were inflicted by an opposing character then this action may be performed while stunned.",
  points: 56
},{
  id: 153,
  value: "Other Free Kingdoms characters in this rank have Riposte +5 and +2 AC.",
  points: 24
},{
  id: 154,
  value: "At the start of the game, pick a faction. Your characters of that faction enter play without loyalty penalty.",
  points: 37
},{
  id: 155,
  value: "Your Deverenian Paladins gain +2 ATK, AC, and Skill while they have a Steed equipped.",
  points: 29
},{
  id: 156,
  value: "Opposing card effects cannot change Parak's Level if there is another Dwarf in this rank.",
  points: 30
},{
  id: 157,
  value: "Dhamir's actions that produce melee strikes are Fire actions and ignore the Planar trait.",
  points: 30
},{
  id: 158,
  value: "You have +1 hand size for each spell scribed to Ceihallus, up to +3.",
  points: 23
},{
  id: 159,
  value: "Spend Order: Once per turn, target up to two lower level spent (not stunned) Mercenary characters. Ready the target character(s).",
  points: 43
},{
  id: 160,
  value: "Order: Move forward one rank.",
  points: 10
},{
  id: 161,
  value: "If Gris is your Warlord, other good characters in your army have the ability: \"Melee strikes and ranged strikes by this character ignore the effects of the Astral trait.\"",
  points: 58
},{
  id: 162,
  value: "Varson may have Lycanthropes from other factions in his starting army.",
  points: 24
},{
  id: 163,
  value: "React: When Lord Winter takes a wound, ready him.",
  points: 17
},{
  id: 164,
  value: "Spend Order: Choose an opposing player: Perform a number of melee strikes equal to the number of cards in that player's hand.",
  points: 42
},{
  id: 165,
  value: "Sakar may begin the game with any one rogue item of level 8 or less equipped.",
  points: 26
},{
  id: 166,
  value: "Order: Twice per turn, target an opposing character within two ranks: The target must succeed with a Magic save (DC 14) or perform a melee strike against a target of your choice.",
  points: 60
},{
  id: 167,
  value: "Order: Put a Level 3 or lower character into play from your hand, ignoring loyalty penalties.",
  points: 31
},{
  id: 168,
  value: "Order: Kill one of your characters in this rank: Perform a ranged strike with a bonus equal to the character's level.",
  points: 39
},{
  id: 169,
  value: "All Elves in this army can cast level 1 wizard spells.",
  points: 18
},{
  id: 170,
  value: "Rostukk is a fighter and a cleric.",
  points: 12
},{
  id: 171,
  value: "Order: Once per turn, spend Ja'leeque or stun one of your Shamans in this rank to select a rank up to 3 ranks away. Until the end of the turn, characters become stunned immediately after moving out of the selected rank.",
  points: 73
},{
  id: 172,
  value: "Order: Up to twice per turn, target a character within one rank: The target must succeed with a magic save (DC 15) or suffer a wound.",
  points: 45
},{
  id: 173,
  value: "While you control a Dragon, Brom's actions gain +3 to DC saves.",
  points: 21
},{
  id: 174,
  value: "React: Up to three times per turn, after Talin performs a strike: Move forward or backward one rank.",
  points: 34
},{
  id: 175,
  value: "React: Twice per turn, after a melee strike roll against Mad Mel: If he succeeds with a dexterity check (DC 5 + the roll's result), the strike is a Critical Failure.",
  points: 55
},{
  id: 176,
  value: "React: Once per turn, after a character enters play: Move forward or backward one rank or perform a +4 ranged strike.",
  points: 39
},{
  id: 177,
  value: "Your hand size is reduced by 4.",
  points: 11
},{
  id: 178,
  value: "Sceth inflicts an additional wound whenever he hits with a melee strike.",
  points: 24
},{
  id: 179,
  value: "Acanothropis may Scribe rogue actions and his Poison actions may target an additional rank away.",
  points: 32
},{
  id: 180,
  value: "Your Sutek may perform Level 3 or lower rogue action cards, regardless of class restrictions.",
  points: 31
},{
  id: 181,
  value: "Order: Once per target per turn, Discard a card: Until end of turn target character within 2 ranks has -2 ATK, AC, and Skill, and one of your other Elves has +2 ATK, AC, and Skill.",
  points: 60
},{
  id: 182,
  value: "Your characters may perform printed Reacts to an opposing character killing your Thrall as if the Thrall were killed as part of an action's payment or by a character you control.",
  points: 60
},{
  id: 183,
  value: "Order: Once per turn: Perform a +4 ranged strike.",
  points: 17
},{
  id: 184,
  value: "May start the game with a level 3 Nothrog single-class fighter in rank two instead of one of your level 2 characters.",
  points: 39
},{
  id: 185,
  value: "React: After a character rolls a Critical Success on a melee strike: Stun the target of the strike.",
  points: 33
},{
  id: 186,
  value: "Your Level four or higher Deverenian Paladins may cast Level 1 and 2 cleric spells.",
  points: 28
},{
  id: 187,
  value: "Your Level 1 characters do not suffer a loyalty penalty.",
  points: 19
},{
  id: 188,
  value: "Sorceress Ygraine is both a fighter and a wizard.",
  points: 17
},{
  id: 189,
  value: "Spend Order: Once per turn target another non-stunned Nothrog you control: Move the target forward one rank or the target performs a melee strike. This is a Tactics action.",
  points: 58
},{
  id: 190,
  value: "Order: Discard a card: Until end of turn, opposing characters within one rank of The Lady suffer -2 ATK, AC, and Skill.",
  points: 40
},{
  id: 191,
  value: "Your Daemons do not suffer a loyalty penalty.",
  points: 15
},{
  id: 192,
  value: "Daybreak - If it is the first turn, DerRist's ranged strikes may target an additional rank away.",
  points: 32
},{
  id: 193,
  value: "Grantuk may equip two Weapons.",
  points: 10
},{
  id: 194,
  value: "Order: Remove up to 5 Charges: Target character has -1 ATK and -1 AC for each Charge removed until end of turn.",
  points: 37
},{
  id: 195,
  value: "React: Once per turn, before fixing your second rank when it is illegal, remove a character in your discard pile from the game: Put an opposing Level 1 or 2 character in a discard pile into play, ready, in your first rank under your control.",
  points: 81
},{
  id: 196,
  value: "Spend React: Before you put a Dragon into play: Reduce the Dragon's entering rank by one.",
  points: 30
},{
  id: 197,
  value: "React: After you win initiative: Look at the top 5 cards of your deck. Put any number of those cards at the bottom of your deck. Return the rest in the same order.",
  points: 55
},{
  id: 198,
  value: "React: Once per turn, after one of your characters kills an opposing character: Remove the opposing character from the game. Ready a Nothrog of lower level than the opposing character.",
  points: 62
},{
  id: 199,
  value: "React: Twice per turn, before a strike roll targeting Pavaxtag, kill target adjacent character: The strike is a Critical Failure.",
  points: 43
},{
  id: 200,
  value: "Spend Order: Target all opposing spent characters in an adjacent rank. Each character must pass a magic save (DC 13, DC 20 if stunned) or suffer a wound.",
  points: 51
},{
  id: 201,
  value: "Stonefist Gargoyle is a cleric and a fighter and inflicts an additional wound with melee strikes.",
  points: 33
},{
  id: 202,
  value: "Mak and Makob may equip two Armor, Shield, Helm, and Weapon items, if one of each is a fighter item and the other is a cleric item.",
  points: 44
},{
  id: 203,
  value: "Opposing characters with the Poison trait suffer -2 ATK and Skill.",
  points: 22
},{
  id: 204,
  value: "Order: Once per turn, kill a Thrall: Galam-Reth or target non-stunned Daemon you control performs a melee strike.",
  points: 38
},{
  id: 205,
  value: "Order: Spend another Gargoyle in your army within one rank: Perform a +6 melee strike.",
  points: 29
},{
  id: 206,
  value: "Order: Once per turn, target a character within two ranks: Succeed with a Medicine check (DC 20) to inflict or remove one wound on the target.",
  points: 48
},{
  id: 207,
  value: "Order: Once per turn, target a character in your army. That character has Powerattack +5 until the end of the turn.",
  points: 39
},{
  id: 208,
  value: "Spend React: After a character targets Chyre with a melee strike: Move Chyre back one rank. The strike is cancelled.",
  points: 39
},{
  id: 209,
  value: "Wounds inflicted by Winter may not be reduced.",
  points: 16
},{
  id: 210,
  value: "Order: Once per turn, reveal and shuffle a character from your hand into your deck: Search your deck for a character with Level equal to or less that the shuffled character's, reveal it, and put it into play.",
  points: 70
},{
  id: 211,
  value: "Daybreak - Order: Inflict a wound on Madriga: If it is the first turn, your characters have +3 ATK until end of turn.",
  points: 39
},{
  id: 212,
  value: "After Initiative is rolled each turn: Roll 2 d20's and place them on Ginerva of the Moon. Remove them at end of turn.",
  points: 39
},{
  id: 213,
  value: "Constructs you control gain +1 ATK for each item equipped to Loki.",
  points: 22
},{
  id: 214,
  value: "Nightfall - Order: Once per turn: If is is not the first turn: Reveal the top 10 cards of your deck. Each of your Nothrog may equip one revealed Weapon that they may legally equip. Discard all remaining revealed cards.",
  points: 73
},{
  id: 215,
  value: "Adarymy can equip fighter and rogue items.",
  points: 14
},{
  id: 216,
  value: "Your Lycanthropes have +2 ATK, AC, and Skill.",
  points: 15
},{
  id: 217,
  value: "Gris can cast 1st and 2nd level cleric spells.",
  points: 16
},{
  id: 218,
  value: "Averisk Glyn is a rogue and wizard.",
  points: 12
},{
  id: 219,
  value: "Spend Order: Move all of your non-Nothrog characters forward one rank.",
  points: 24
},{
  id: 220,
  value: "May only start the game with good Deverenians and Mercenaries.",
  points: 21
},{
  id: 221,
  value: "Rabinus enters play as if he were level 5.",
  points: 14
},{
  id: 222,
  value: "React: Once per turn, after target Nothrog suffers wounds: The target has +1 HP until end of turn.",
  points: 33
},{
  id: 223,
  value: "Spend Order: Perform a +5 ranged strike.",
  points: 14
},{
  id: 224,
  value: "After starting armies are revealed: Put a lower Level non-multiclass character from your deck into play ready in rank 3. It permanently gains the Warlord trait, +1 HP, and the ability \"Order: Reveal Jautya Syne from your hand and shuffle him into your deck: Ready this character.\" Shuffle Jautya Syne into your deck.",
  points: 106
},{
  id: 225,
  value: "Your Paladins have Riding +5.",
  points: 10
},{
  id: 226,
  value: "Spend Order: Perform a +6 ranged strike, then a +1 ranged strike. These may target characters closer than 2 ranks away. If Faiza is in the first rank, she may play one React per ranged strike as if it were a melee strike, and items and Reacts that increase Faiza's ATK add to these ranged strikes.",
  points: 99
},{
  id: 227,
  value: "All of your action cards are considered spells.",
  points: 16
},{
  id: 228,
  value: "Other good Free Kingdoms in this rank gain +1 to die rolls.",
  points: 20
},{
  id: 229,
  value: "React: After Shah'syss kills an opposing character: Move a Monster you control forward one rank.",
  points: 32
},{
  id: 230,
  value: "Anton Everchanging is a rogue and a wizard.",
  points: 15
},{
  id: 231,
  value: "React: Once per turn, after target character targets Dhamir with a melee strike: The target must succeed with a reflex save (DC 18) or suffer a wound. This is a Fire action.",
  points: 58
},{
  id: 232,
  value: "React: Once per turn, before a Free Kingdoms character rolls a die: Add Windson's Skill to the roll.",
  points: 34
},{
  id: 233,
  value: "React: After an Order (not a melee strike) targets Erebus, cancel the Order.",
  points: 26
},{
  id: 234,
  value: "React: Twice per turn, before Rostukk suffers wounds, inflict 1 wound on target adjacent Siege: Reduce the wounds by 1. The target inflicts an additional wound with its next melee strike this turn.",
  points: 66
},{
  id: 235,
  value: "React: After you pass: Permanently change Tavis' alignment.",
  points: 20
},{
  id: 236,
  value: "Taoth adds +4 to her ranged strike rolls.",
  points: 14
},{
  id: 237,
  value: "React: Before Volda dies: Target Free Kingdoms you control permanently has +1 Level, and the Druid, Ranger, and Warlord traits. (You do not lose the game.)",
  points: 52
},{
  id: 238,
  value: "You may start with characters from other factions in your starting army.",
  points: 24
},{
  id: 239,
  value: "React: Once per turn, after one of your Deverenians performs an action that redirected a melee strike or action, kill one of your Deverenians: Draw a card.",
  points: 52
},{
  id: 240,
  value: "Your Barbarian Dwarves have Powerattack +10.",
  points: 15
},{
  id: 241,
  value: "Order: Once per turn, discard a card from your hand to perform an attack without spending. These strikes may only target stunned characters.",
  points: 47
},{
  id: 242,
  value: "React: After Fasolt hits with a melee strike: Target each character in the struck character's rank whose Level +8 is less than the natural die roll. Move each target backward one rank.",
  points: 62
},{
  id: 243,
  value: "Order: Once per turn: Ablung permanently gains +4 ATK, +4 AC, +6 Skill, +1 HP, +1 Level, or any feat with a +1 bonus.",
  points: 39
},{
  id: 244,
  value: "After starting armies are revealed, Sir Lucian may swap positions with another of your characters.",
  points: 33
},{
  id: 245,
  value: "Order: Once per turn Discard a Deverenian card from your hand: Remove a wound from Baron Bastein.",
  points: 33
},{
  id: 246,
  value: "Order: Once per turn: Search your deck for a lower level character with the Monster trait, show it to the other players, then put the Monster on top of your deck.",
  points: 54
},{
  id: 247,
  value: "Opposing stunned characters suffer -3 AC.",
  points: 14
},{
  id: 248,
  value: "Spend Order: Discard a card from your hand to search your deck for a card with the Gargoyle trait, show it to the other players, then add it to your hand.",
  points: 52
},{
  id: 249,
  value: "React: After one of Frost's melee strikes rolls results in a natural 18, 19, or 20 or a Critical Success, inflict 1 wound on all characters adjacent to the target if Frost is your Warlord.",
  points: 63
},{
  id: 250,
  value: "Order: Reveal a card from your hand: Perform a Scribe check (DC 20). If successful, attach the card to Osud, face-down. You may detach and play the card at any time as if from your hand. If unsuccessful, discard it.",
  points: 72
},{
  id: 251,
  value: "Mak and Makob are both a fighter and a cleric.",
  points: 16
},{
  id: 252,
  value: "Graphiel is a fighter and a wizard.",
  points: 12
},{
  id: 253,
  value: "Order: Once per turn, inflict a wound on Sanga-Kish or kill a Thrall: Look at the top 7 cards of your deck. You may choose a wizard spell and attach it to Sanga-Kish, as if it had been successfully scribed. Shuffle your deck.",
  points: 75
},{
  id: 254,
  value: "If Rallen is your Warlord, your Deverenians have the ability \"Spend Order: Perform a ranged strike with a bonus equal to this character's level. This ranged strike may not receive any bonus to the roll.\"",
  points: 69
},{
  id: 255,
  value: "Order: Once per turn: Perform a +7 melee strike that does not inflict wounds. If the strike hits, spend the target.",
  points: 39
},{
  id: 256,
  value: "Characters in your army may not use card effects to draw cards or retrieve cards from your deck.",
  points: 32
},{
  id: 257,
  value: "Krun inflicts an additional wound whenever he hits with a melee strike.",
  points: 24
},{
  id: 258,
  value: "Graphiel's spells gain +1 to strike rolls and DC saves for each Undead in this rank.",
  points: 28
},{
  id: 259,
  value: "React: Once per turn, after Thekem Netheryn kills target opposing character: Remove the target from the game and put a Level 4 or lower Elf from your discard pile into play in the same location, army, and orientation as the target. The Elf permanently gains the Undead trait.",
  points: 92
},{
  id: 260,
  value: "Grilt's melee strikes inflict an additional wound against stunned characters.",
  points: 26
},{
  id: 261,
  value: "Your Siege gain +2 to all strike rolls.",
  points: 13
},{
  id: 262,
  value: "May use the Powerattack feat any number of times per turn.",
  points: 20
},{
  id: 263,
  value: "Ablung is a cleric, a fighter, a rogue, and a wizard.",
  points: 18
},{
  id: 264,
  value: "React: After the player to your left performs an Order, draw a card if the player has one or more cards in his hand and Rreg'jen is your Warlord.",
  points: 49
},{
  id: 265,
  value: "Order: Once per turn, target a lower Level opposing character within 3 ranks: The target must succeed with a magic save (DC 14 + Menhetiri's Level) or permanently lose one Level and Menhetiri permanently gains one Level.",
  points: 74
},{
  id: 266,
  value: "May cast level 1 cleric spells.",
  points: 11
},{
  id: 267,
  value: "Adoramus Te is both a cleric and a wizard.",
  points: 14
},{
  id: 268,
  value: "While Niobe is spent, she and adjacent Free Kingdoms gain +2 AC and Riposte +5.",
  points: 27
},{
  id: 269,
  value: "React: Before making an initiative roll, kill any number of target Thralls or spend any number of target non-Thralls: Gain +3 to the roll for each target.",
  points: 52
},{
  id: 270,
  value: "Order: Spend a Weapon in your army: The character it was equipped to gains an additional strike (Equal to his highest base ATK) when he attacks until end of turn.",
  points: 54
},{
  id: 271,
  value: "Spend Order: Perform a +4 ranged strike which may target an additional rank away.",
  points: 27
},{
  id: 272,
  value: "May play 1st and 2nd level fighter actions.",
  points: 15
},{
  id: 273,
  value: "Daybreak - Order: Once per game, remove a Charge: If it is the first turn move forward one rank and gain +2 ATK, AC, and HP permanently.",
  points: 46
},{
  id: 274,
  value: "Spend Order: If Trespass is in the second rank, succeed with a Stealth check (DC 24) to move him to the first rank of a different formation.",
  points: 47
},{
  id: 275,
  value: "Other Free Kingdoms in this rank gain Riposte +4 and have the ability, \"React: Before this character is killed by an opposing character: Perform a melee strike.\"",
  points: 55
},{
  id: 276,
  value: "Grace Hearthpride is a cleric and a rogue.",
  points: 14
},{
  id: 277,
  value: "React: After a wound is removed from Ophinuchus, discard a card: Inflict a wound on a character within one rank.",
  points: 38
},{
  id: 278,
  value: "React: Once per turn, after a Dwarf you control within one rank is killed and before fixing illegal Ranks: Put a Dwarf of equal or lower Level than the killed character into play from your hand in the killed character's former location with the same orientation.",
  points: 88
},{
  id: 279,
  value: "Volda is a cleric and a fighter.",
  points: 11
},{
  id: 280,
  value: "May start the game with clerics from other factions.",
  points: 18
},{
  id: 281,
  value: "Order: Once per turn: Move a Nothrog in your army forward or backward one rank.",
  points: 27
},{
  id: 282,
  value: "Order: Once per turn: Move another Lycanthrope in your army forward one rank.",
  points: 26
},{
  id: 283,
  value: "Rustiq may cast level 1 and 2 wizard spells.",
  points: 15
},{
  id: 284,
  value: "Rathra Dak is a fighter and rogue and her melee strikes inflict an additional wound against spent characters.",
  points: 37
},{
  id: 285,
  value: "Spend Order: Perform a +6 ranged strike that targets a character two ore three ranks away. The distance of this ranged strike may not be increased or reduced in any way.",
  points: 57
},{
  id: 286,
  value: "React: After an action in which one of your Stormwraiths is wounded: One of your Deverenians performs an Order.",
  points: 37
},{
  id: 287,
  value: "Winter may perform Water actions regardless of class.",
  points: 18
},{
  id: 288,
  value: "React: After one of your Elves targets an opposing character with a DC save or ranged strike, discard a card: Add +5 to the DC or ranged strike roll.",
  points: 50
},{
  id: 289,
  value: "Arkon is a fighter and a rogue.",
  points: 11
},{
  id: 290,
  value: "May equip two Weapons. If Drac is your Warlord, all of your other Deverenian fighters within one rank of Drac have +2 ATK and +1 AC.",
  points: 44
},{
  id: 291,
  value: "React: After a melee or ranged strike roll, remove a d20 from Ginerva: Change the die roll to the value on the removed d20.",
  points: 41
},{
  id: 292,
  value: "React: After Atu suffers one or more wounds, spend a Monster in your army: Inflict one wound on the Monster instead.",
  points: 39
},{
  id: 293,
  value: "Order: Once per turn, discard any number of cards: Search your deck for a spell with level equal to the number of cards discarded. Caitlyn may immediately cast the spell.",
  points: 57
},{
  id: 294,
  value: "Your other Gargoyles have the ability \"Spend React: Before Broken Earth dies, kill this Gargoyle: Broken Earth does not die, destroy all his equipped items, remove all wounds from him, ready him and move him to this Gargoyle's former location.",
  points: 82
},{
  id: 295,
  value: "Your hand size is increased by one.",
  points: 12
},{
  id: 296,
  value: "Order: Once per game attach a lower Level fighter action card to Qor-Teth Firefist. While attached Qor-Teth Firefist may perform it once per turn and is +1 Level for performing it.",
  points: 60
},{
  id: 297,
  value: "Valhala Abyssbane may target any Dwarf fighter in your army with Medicine, regardless of rank.",
  points: 32
},{
  id: 298,
  value: "Your Stormwraiths have the ability, \"Spend Order: If this character is in the front rank, move him into another front rank.\"",
  points: 42
},{
  id: 299,
  value: "May not equip items with traits, except for Weapons.",
  points: 18
},{
  id: 300,
  value: "React: After Averisk Glyn performs a scribed action: Perform a +4 ranged strike against a target of that action.",
  points: 38
},{
  id: 301,
  value: "During the draw phase you have +1 hand size if you kept any cards when discarding.",
  points: 28
},{
  id: 302,
  value: "React: After one of your Free Kingdoms characters enters play, discard a card: Move the character forward or backward one rank.",
  points: 43
},{
  id: 303,
  value: "Order: Once per game: Target character must target this character with melee or ranged strikes whenever possible. (This effect doesn't end at end of turn.)",
  points: 52
},{
  id: 304,
  value: "Anton Everchanging may perform actions printed on Lycanthropes in play (paying costs as normal). Each action may only be performed once per turn, regardless of how many Lycanthropes have it or any usage restrictions, and its duration is \"until end of turn\" if it is normally longer.",
  points: 95
},{
  id: 305,
  value: "Scyrax is a rogue and a wizard.",
  points: 11
},{
  id: 306,
  value: "React: Once per turn, after one of your Lycanthropes suffers a wound from target opposing character: The target must succeed with a magic save (DC 18) or stun.",
  points: 53
},{
  id: 307,
  value: "Nightfall - Order: Once per turn, remove a wound from Madriga: If it is not the first turn target another Deverenian who gets +1 HP permanently.",
  points: 48
},{
  id: 308,
  value: "Order: Twice per turn, kill a Level X Thrall: Reveal the top 7 cards of your deck. You may put a Level X+1 or lower Daemon or Monster into play into the former location of the Thrall and with the same orientation.",
  points: 71
},{
  id: 309,
  value: "Order: Once per turn: Give another Deverenian in play one of the following until Kestrel uses this ability again: +5 ATK, +5 AC, +1 HP, or +5 Skill.",
  points: 50
},{
  id: 310,
  value: "React: Once per turn, after target Gargoyle you control is killed: Reveal the top 10 cards of your deck. You may put a revealed Gargoyle of equal or lower Level than the target into play ready in target's former location in any formation. Shuffle the remaining cards into your deck.",
  points: 94
},{
  id: 311,
  value: "React: After Jon moves to a different rank: Perform a +4 ranged strike.",
  points: 24
},{
  id: 312,
  value: "React: Once per target per turn, after casting a Level X cleric spell: Ready a non-stunned Level X or lower Gargoyle.",
  points: 39
},{
  id: 313,
  value: "Your Level 4 or higher Siege gain +1 HP.",
  points: 14
},{
  id: 314,
  value: "Order: Spend a Nothrog wizard: Move a Siege you control of equal or lower Level than the spent wizard forward one rank.",
  points: 40
},{
  id: 315,
  value: "Ichaerus is a fighter, a cleric, and a wizard.",
  points: 16
},{
  id: 316,
  value: "Spend React: Perform before equipping a wizard in your army with an item. The wizard is +2 levels for equipping this item.",
  points: 41
},{
  id: 317,
  value: "After starting armies have been presented, you may search your deck for Dythanus' Essence and equip it.",
  points: 35
},{
  id: 318,
  value: "Modred gains +1 ATK and +1 AC for each Astral Deverenian character in your army.",
  points: 27
},{
  id: 319,
  value: "Opposing characters have -1 Level for each wound on them.",
  points: 19
},{
  id: 320,
  value: "Spend Order: Remove the top 6 cards of your deck from the game: This turn is considered the first turn.",
  points: 35
},{
  id: 321,
  value: "React: Once per turn, after an opposing character targets one of your Deverenians with a melee strike or action: Redirect the strike or action to another legal target.",
  points: 56
},{
  id: 322,
  value: "React: Once per turn after target Nothrog moves into or enters play in a front rank: Either discard the top card of any deck or the target performs a +2 ranged strike.",
  points: 56
},{
  id: 323,
  value: "Sjonegaard may not equip Armor, Shield or Helm items.",
  points: 18
},{
  id: 324,
  value: "Karkos is a fighter and a wizard.",
  points: 11
},{
  id: 325,
  value: "Norn is -1 level for equipping items.",
  points: 13
},{
  id: 326,
  value: "Order: Once per turn: Choose an opposing player who must shuffle his hand into his deck and draw 4 cards.",
  points: 35
},{
  id: 327,
  value: "React: Once per turn, after performing a 'Bard only' Spend Order: Ready Jaqueline Windson.",
  points: 30
},{
  id: 328,
  value: "Raylor may play wizard spells up to 2nd level.",
  points: 16
},{
  id: 329,
  value: "Spend Order: Perform two consecutive +3 ranged strikes.",
  points: 19
},{
  id: 330,
  value: "Order: Discard a card and target a player: Discard a random card from the target's hand.",
  points: 30
},{
  id: 331,
  value: "Dwarves in Soren's army are evil.",
  points: 11
},{
  id: 332,
  value: "Order: Spend a Druid in your army: Move target character in any first rank backward one rank.",
  points: 31
},{
  id: 333,
  value: "React: Once per turn, after Biana performs an action that killed an opposing character: Biana gains +1 Level permanently.",
  points: 41
},{
  id: 334,
  value: "React: Before rolling Initiative, spend any number of your Deverenians: Add +3 to this roll for each Deverenian spent.",
  points: 40
},{
  id: 335,
  value: "React: Once per turn, before target character you control suffers wounds, inflict a wound on a different character: Reduce the target's wounds by 1.",
  points: 50
},{
  id: 336,
  value: "Order: Once per turn: return target non-Warlord character to its owner's hand. This ability may not target opposing characters with items equipped.",
  points: 49
},{
  id: 337,
  value: "Order: Three times per turn: Parak has +2 ATK and +2 AC until end of turn.",
  points: 25
},{
  id: 338,
  value: "Spend Order: Search your deck for a Weapon, and equip it to one of your Dwarves.",
  points: 27
},{
  id: 339,
  value: "Adela Ghenis is a fighter and a rogue.",
  points: 13
},{
  id: 340,
  value: "Nitesh Imaran may perform level 1 actions of any class.",
  points: 19
},{
  id: 341,
  value: "Order: Once per turn: Target a lower level unstunned non-Warlord Dwarf within two ranks and make a Charisma check (DC 18). If successful, spend or ready the Dwarf.",
  points: 55
},{
  id: 342,
  value: "Other Elf wizards in this rank are +1 level for casting spells.",
  points: 21
},{
  id: 343,
  value: "Kara Wadreth may equip two Weapons.",
  points: 12
},{
  id: 344,
  value: "Spend Order: Search your deck for a Siege character, show it to the other players, then shuffle your deck and put the character on top of the deck.",
  points: 49
},{
  id: 345,
  value: "Yvaalis gains +1 to ranged strikes and Marksmanship checks for each Charge on her.",
  points: 28
},{
  id: 346,
  value: "React: After Zartoch is killed while he is your Warlord: Target another Zartoch in your army who becomes your Warlord instead.",
  points: 42
},{
  id: 347,
  value: "May only equip items with \"Eyestalk\" in the title. After the Terror suffers a wound, it must discard a random item with \"Eyestalk\" in the title.",
  points: 50
},{
  id: 348,
  value: "Order: Once per turn, target an opposing non-Warlord character within two ranks. The target must succeed with a will check (DC 15), or until the end of the turn the target has Stealth +0, may not equip items, and is under your control.",
  points: 79
},{
  id: 349,
  value: "Order: Discard a card from your hand to give Adoramus Te +1 level until the end of the turn.",
  points: 31
},{
  id: 350,
  value: "Your characters that are not Daemons or Monsters gain the Thrall trait.",
  points: 24
},{
  id: 351,
  value: "React: Once per turn, after Admiral Veso kills an opposing character: He performs a Tactics action without spending.",
  points: 39
},{
  id: 352,
  value: "React: After winning Initiative, discard up to two cards: Draw that many cards.",
  points: 27
},{
  id: 353,
  value: "Spend Order: Bow for a +7 ranged strike.",
  points: 14
},{
  id: 354,
  value: "React: Once per turn, after Edric performs a melee strike that killed the target: Draw a card, or shuffle two cards from your discard pile into your deck.",
  points: 52
},{
  id: 355,
  value: "May use level 1, 2, and 3 fighter actions.",
  points: 14
},{
  id: 356,
  value: "All Gargoyles in play have the ability: \"Spend Order: Target another Gargoyle who gains a bonus to its ATK and AC until the end of the turn equal to this character's ATK.\"",
  points: 58
},{
  id: 357,
  value: "May not equip Steeds.",
  points: 7
},{
  id: 358,
  value: "1st level characters in your army gain +2 ATK and +2 AC.",
  points: 19
},{
  id: 359,
  value: "React: Once per turn, before targeting a melee strike: If Grilt is in the front rank of your formation, the strike may target an additional rank away.",
  points: 50
},{
  id: 360,
  value: "Order: Once per turn, remove a dungeon card in your hand from the game: Succeed with a perception check (DC 15) to search your deck for an item Kaimi can legally equip, and equip it to him.",
  points: 63
},{
  id: 361,
  value: "Spend Order: Perform a +6 ranged strike. Perform a +1 ranged strike.",
  points: 23
},{
  id: 362,
  value: "Order: Discard a Level X card: Target up to X (X + 2 if a character was discarded) characters within 2 ranks who gain the Poison trait until end of turn.",
  points: 51
},{
  id: 363,
  value: "Order: Kill a Siege: Until end of turn, Sceth gains +3 ATK and his melee strikes may target 2 ranks away.",
  points: 35
},{
  id: 364,
  value: "Order: Once per turn: Discard a Lycanthrope Form equipped by Yscar.",
  points: 23
},{
  id: 365,
  value: "React: Once per turn, discard a cleric spell from your hand after casting a wizard spell (or vice versa) to ready Cassandra.",
  points: 42
},{
  id: 366,
  value: "Your other Free Kingdoms in the same rank as Robert gain +2 ATK.",
  points: 22
},{
  id: 367,
  value: "Yavlo adds +3 to strike rolls and DCs from Fire spells.",
  points: 19
},{
  id: 368,
  value: "Other Undead characters in Rustiq Umbala's army have +2 ATK.",
  points: 20
},{
  id: 369,
  value: "Order: Spend target Level 3 or higher Stormwraith: Switch locations with the target, regardless of formation.",
  points: 37
},{
  id: 370,
  value: "May start the game with wizards from other factions.",
  points: 18
},{
  id: 371,
  value: "React: Once per turn, before a Thrall you control is killed as part of an action's payment: Target Thrall gains +1 HP until end of turn.",
  points: 46
},{
  id: 372,
  value: "While Naram-Sin has 10 or more Charges, he gains the fighter class, +5 ATK, +5 AC, and +1 HP, and has two additional melee strikes (base +0 ATK) when he attacks.",
  points: 54
},{
  id: 373,
  value: "React: After target character rolls a magic save that failed by 10 or more, or was a Critical Failure: Inflict a wound on the target.",
  points: 45
},{
  id: 374,
  value: "Spend Order: Perform a +3 ranged strike.",
  points: 14
},{
  id: 375,
  value: "Order: Once per turn: Until Kestrel uses this ability again, target other Level 3 or higher Deverenian you control gains +2 ATK, AC, and Skill and, while not stunned, has the ability, \"Kestrel may target spells as if he were in this character's loccation.\"",
  points: 86
},{
  id: 376,
  value: "Your other Free Kingdoms Rangers and Scouts have Stealth +5.",
  points: 20
},{
  id: 377,
  value: "Order: Once per turn, search your deck for an item of level 5 or less, show it to the other players, then add it to your hand.",
  points: 42
},{
  id: 378,
  value: "Qor-Teth Firefist may cast one wizard spell per turn.",
  points: 18
},{
  id: 379,
  value: "Zul'Tan's ranged strikes from spells may target characters in an adjacent rank.",
  points: 27
},{
  id: 380,
  value: "Order: Once per turn, search your deck for a 1st level character without the Monster trait, show it to the other players, and put it in your hand.",
  points: 49
},{
  id: 381,
  value: "Your other Monsters gain +2 ATK.",
  points: 11
},{
  id: 382,
  value: "Evil characters within one rank suffer -2 ATK, AC, and Skill.",
  points: 21
},{
  id: 383,
  value: "React: After an opposing character performs an action to draw a card: Perform a melee strike.",
  points: 31
},{
  id: 384,
  value: "React: Once per turn, after Cear targets a ready character with a melee strike: The target must succeed with a fear save (DC 16) or become spent.",
  points: 49
},{
  id: 385,
  value: "React: Once per turn, after Brom casts an Earth spell: Until end of turn, target Dwarf gains +3 ATK and AC.",
  points: 36
},{
  id: 386,
  value: "Your Nothrog have +3 ATK for each wound on any opposing character.",
  points: 22
},{
  id: 387,
  value: "Spend Order: Put up to three Gargoyles into play from your hand following the normal rules for putting characters into play.",
  points: 42
},{
  id: 388,
  value: "Order:Once per turn: Kill an opposing non-Warlord character with 4 or more Levels lower than The Nemesis.",
  points: 35
},{
  id: 389,
  value: "Order: Discard a card: Target character within one rank must succeed with a poison save (DC 14 + 1 for each Undead in this rank) or either suffer a wound or become spent (your choice).",
  points: 62
},{
  id: 390,
  value: "Loki gains +1 Level for equipping items, but suffers -1 Level for casting spells.",
  points: 27
},{
  id: 391,
  value: "Alaric gains +2 ATK and Skill for each adjacent Dwarf.",
  points: 18
},{
  id: 392,
  value: "React: Once per turn, after Yvaalis kills an opposing character with a ranged strike: Put a Charge on her.",
  points: 36
},{
  id: 393,
  value: "Thalaasa's spells are Water actions.",
  points: 12
},{
  id: 394,
  value: "For each wound on Brikta she has +3 ATK, and an additional melee strike with a base of +3 ATK.",
  points: 32
},{
  id: 395,
  value: "If Raylor is your Warlord, your Critical Failures are considered Critical Successes and all of your other Free Kingdoms characters have +4 Skill.",
  points: 49
},{
  id: 396,
  value: "Edric D'Ilchant has +1 Level for equipping Steeds and may not receive penalties or bonuses to his stats from action cards.",
  points: 41
},{
  id: 397,
  value: "Ranged strikes and save DCs from actions performed by Loki from items gain +2.",
  points: 26
},{
  id: 398,
  value: "Your Nothrog's melee strikes may target an additional rank away while they have one or more wounds on them.",
  points: 36
},{
  id: 399,
  value: "Once per turn Set'rokh may perform a Tactics action without spending.",
  points: 23
},{
  id: 400,
  value: "Order: Once per turn, target a character without the Poison trait within two ranks: Attach a card from your dicard pile face down to the target. While attached, the target gains the Poison trait and the text \"After the ready phase: Succeed with a poison save (DC 12) or suffer a wound after spending until end of turn.\"",
  points: 107
},{
  id: 401,
  value: "Order: While in the first rank, spend a Pet attached to Kolivan, to have that Pet attack as a level 1 classless character with a +0 ATK, 6 AC, 1 hit point, and +0 skill.",
  points: 57
},{
  id: 402,
  value: "Your Dwarves have the ability \"React: After this character is targeted by a melee or ranged strike, spend target Dwarf within one rank: Gain a bonus to AC for the strike equal to the target's ATK. If the strike misses perform a melee strike.\"",
  points: 82
},{
  id: 403,
  value: "Cassandra is both a cleric and a wizard.",
  points: 14
},{
  id: 404,
  value: "Order: Twice per turn, equip a card from your hand face down to a Dwarf you control as War Axe, a Level 2 classless item with +3 ATK, the Weapon trait, and the ability \"Spend Order: Perform a melee strike that inflict an additional wound.\"",
  points: 81
},{
  id: 405,
  value: "Wizards joining your army suffer no loyalty penalty.",
  points: 18
},{
  id: 406,
  value: "Order: Once per turn, ready target non-stunned Siege.",
  points: 18
},{
  id: 407,
  value: "Spend Order: Perform a +7 ranged strike. Perform a +4 ranged strike.",
  points: 23
},{
  id: 408,
  value: "Order: Once per turn, kill a Thrall: Target non-Daemon The Chosen that has not gained any permanent bonuses gains +2 (+3 if the Thrall was Level 3 or higher) ATK, AC, and Skill permanently.",
  points: 63
},{
  id: 409,
  value: "React: Once per turn, before another target Elf plays an action card, discard a card: Until the end of the turn, the Elf gains a number of levels for using action cards equal to Bronwen's current rank.",
  points: 67
},{
  id: 410,
  value: "React: Once per turn after Gudleifur suffers two or more wounds: Reduce the wounds by 1.",
  points: 30
},{
  id: 411,
  value: "Order: Target and spend one of your Rangers or Scouts in the same rank as an opponent's Warlord. Choose and discard one card from the opponent's hand.",
  points: 50
},{
  id: 412,
  value: "Dwarf clerics you control may equip one fighter item.",
  points: 18
},{
  id: 413,
  value: "React: Once per turn, after Brom casts a Water spell: Ready target lower Level non-stunned Dwarf.",
  points: 33
},{
  id: 414,
  value: "May start the game with fighters from other factions.",
  points: 18
},{
  id: 415,
  value: "Feyd is a cleric, a rogue, and a wizard.",
  points: 14
},{
  id: 416,
  value: "Order: Once per turn, kill target Elf or Undead: Either perform a melee strike or remove a wound from Graphiel. If the target was Level 4 or higher, you may do both.",
  points: 55
},{
  id: 417,
  value: "Order: Until the end of the turn, Rac gains +4 ATK and his melee strikes inflict an additional wound. Rac suffers one wound. This ability is usable only once per turn.",
  points: 56
},{
  id: 418,
  value: "Ferris Bachman enters play in rank 3 with the Warlord trait.",
  points: 20
},{
  id: 419,
  value: "Spend React: After the decree phase, remove up to four spells in your discard pile from the game, target all opposing characters within three ranks: Each target must succeed with a stamina save (DC 9 + 2 per removed spell) or suffer a wound and may not ready during the next ready phase. This is a Water action.",
  points: 104
},{
  id: 420,
  value: "React: After Rathra Dak performs a melee or ranged strike that killed the target: Look at the top 5 cards of any deck. Remove one of them from the game. Return the rest in any order.",
  points: 61
},{
  id: 421,
  value: "Your non-Thrall The Chosen have the ability \"Order: Kill target Thrall: Until end of turn, this character gains +1 Level and the target's classes.\"",
  points: 50
},{
  id: 422,
  value: "Order: Once per turn, move another Undead Elf forward or backward one rank.",
  points: 25
},{
  id: 423,
  value: "Spend React: Before Bhaine is killed by an opposing character: Perform an attack without spending.",
  points: 33
},{
  id: 424,
  value: "Magic saves from Taoth's spells have +3 DC.",
  points: 15
},{
  id: 425,
  value: "Norn is a rogue and a wizard.",
  points: 10
},{
  id: 426,
  value: "Order: Once per turn, kill a Level X Thrall: Put X Charges on Naram-Sin.",
  points: 24
},{
  id: 427,
  value: "Clerics joining your army suffer no loyalty penalty",
  points: 17
},{
  id: 428,
  value: "Order: Once per turn: Ready a spent (not stunned) character with the Siege trait.",
  points: 27
},{
  id: 429,
  value: "Rabinus is a cleric and a rogue and gains +1 Level for performing Water actions.",
  points: 27
},{
  id: 430,
  value: "React: After Cathel hits with a ranged strike: Spend the target of the ranged strike.",
  points: 29
},{
  id: 431,
  value: "Good characters gain +3 ATK while adjacent to Terak.",
  points: 18
},{
  id: 432,
  value: "Galam-Reth and your Daemons gain an ATK bonus equal to the Level of the highest Level Daemon in your discard pile.",
  points: 38
},{
  id: 433,
  value: "Spend Order: Your Monsters have +3 ATK until the end of the turn.",
  points: 22
},{
  id: 434,
  value: "Mekk'iah is both a fighter and a wizard.",
  points: 14
},{
  id: 435,
  value: "Spend Order: Play Cyldragen from your hand, spent, into play in rank four. He gains Jin Valford's wounds and the Warlord trait. Remove Jin Valford from the game.",
  points: 54
},{
  id: 436,
  value: "React: Once per turn, after an opposing Level 0 character is killed: Retrieve a character from your discard pile and put it into play.",
  points: 45
},{
  id: 437,
  value: "Uriel inflicts two additional wounds whenever he hits with a melee strike.",
  points: 25
},{
  id: 438,
  value: "React: Once per turn, after Brymin performs a melee strike that killed its target: Reveal the top 10 cards of your deck. You may put one revealed fighter action card into your hand. Shuffle the remaining cards into your deck.",
  points: 75
},{
  id: 439,
  value: "Order: Once per turn, look at the top five cards of your deck. Put one of the cards into your hand and discard the remaining cards.",
  points: 44
},{
  id: 440,
  value: "Kerebrus is a fighter and a cleric.",
  points: 12
},{
  id: 441,
  value: "React: Once per turn, after casting a spell: Perform a melee strike.",
  points: 23
},{
  id: 442,
  value: "Order: If Havellin Tansiq is your Warlord, kill an Elf in your army to give an Elf in your army +1 HP permanently.",
  points: 38
},{
  id: 443,
  value: "If Sav'rukk is your Warlord, all Nothrogs in this army have the ability: \"Spend React: When this character is targeted with a melee strike or action, move forward or backward one rank to cancel it.\"",
  points: 67
},{
  id: 444,
  value: "Dorath Sa'dul is a cleric and a wizard.",
  points: 13
},{
  id: 445,
  value: "Varson has +1 level for equipping items.",
  points: 14
},{
  id: 446,
  value: "React: Up to twice per turn, before a Free Kingdoms makes a die roll: Add 3 to the die roll's result.",
  points: 34
},{
  id: 447,
  value: "React: After target character targets one of your Dwarves within one rank with a strike: The target must succeed with a reflex save (DC 14) or suffer a wound, the strike is canceled, and this react may not be used again until end of turn. This is a Trap.",
  points: 85
},{
  id: 448,
  value: "Order: Once per turn: Kill one of your characters and remove all wounds from The Nemesis.",
  points: 30
},{
  id: 449,
  value: "The Lady of Mercy is a Cleric and a Rogue.",
  points: 14
},{
  id: 450,
  value: "Order: Once per turn, discard a spell from your hand: Perform a +5 ranged strike.",
  points: 27
},{
  id: 451,
  value: "Spend Order: Perform a +5 ranged strike.",
  points: 14
},{
  id: 452,
  value: "React: Once per turn, after target character is targeted by a spell by Zul'Tan: The target must succeed with a magic save (DC 15) or suffer a wound.",
  points: 50
},{
  id: 453,
  value: "Bhaine gains Powerattack +5 while she has a Weapon equipped.",
  points: 20
},{
  id: 454,
  value: "Life may equip fighter items and suffers -1 level for casting spells.",
  points: 23
},{
  id: 455,
  value: "Adjacent Dwarf characters gain the Gargoyle trait.",
  points: 17
},{
  id: 456,
  value: "Your Gargoyles have Defend +7 and the ability, \"React: Once per turn, after this Gargoyle is targeted by a melee strike or ranged strike: Succeed with a perception check (DC 16) to ready.\"",
  points: 64
},{
  id: 457,
  value: "Your Lycanthrope characters suffer no loyalty penalty.",
  points: 18
},{
  id: 458,
  value: "Order: Spend all Zartochs in your army: Search your deck for a Zartoch, and put him in your hand.",
  points: 33
},{
  id: 459,
  value: "Laurena may play Level 1 and 2 wizard spells.",
  points: 15
},{
  id: 460,
  value: "Spend Order: Target a rank within two ranks of Isil Loth. Until the end of the turn, all characters have -5 AC while in that rank.",
  points: 44
},{
  id: 461,
  value: "Ghed Mnettaor may cast level 1 cleric spells.",
  points: 15
},{
  id: 462,
  value: "React: Once per turn, after a 1st through 3rd level Deverenian in your army is killed, if the character does not have the Ethereal trait he or she is not killed, but is instead moved to the rank behind your last rank. Remove all wounds from the character, who permanently gains the Undead and Ethereal (odd strikes miss) traits and -10 AC.",
  points: 113
},{
  id: 463,
  value: "Your Siege characters' melee strikes inflict an additional wound.",
  points: 22
},{
  id: 464,
  value: "Your Rangers may equip two Weapons.",
  points: 12
},{
  id: 465,
  value: "Order: Once per turn: All players discard their hands and then draw that many cards.",
  points: 28
},{
  id: 466,
  value: "Wounds inflicted by Ophinuchus may not be reduced.",
  points: 17
},{
  id: 467,
  value: "Spend order: Perform 2 consecutive +3 ranged strikes.",
  points: 18
},{
  id: 468,
  value: "Order: Target an item in your army and discard a card: Equip the item to a different Dwarf in your army. If you do, ready the item.",
  points: 44
},{
  id: 469,
  value: "React: After you win initiative: Target Paladin performs an attack, spending as normal.",
  points: 29
},{
  id: 470,
  value: "Cassandra enters play as if she were level 5.",
  points: 15
},{
  id: 471,
  value: "Order: Once per turn: Target another Dwarf in your army. Move one or more wounds from the target to another character in your army.",
  points: 44
},{
  id: 472,
  value: "Order: Once per turn: Ready a non-stunned Level 5 or lower Trap.",
  points: 22
}]

const textSplit = function(val) {
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

const traitDesc = "The cost of individual traits varies. Warlord is free. Having 2 or more positive-cost traits is an additional 5 points per additional trait.\r\n" +
  Object.entries(traitMap).map(x => `(${x[0]}: ${x[1]})`).join(" ");

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

const featDesc = ["The cost of feats are..."]
  .concat(Object.entries(featMap).map(x => `${x[0]} is ${x[1]} points, plus 3 for each level`))
  .join("\r\n");


// ------------------ //
// - Export Ruleset - //
// ------------------ //

export default {
  "general": {
    hasGuide: true,
    restrictText: true,
    pointMaximum: 140
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
      let i = cardData.class && cardData.class.includes("/") ? 1 : 0;
      for (; i < options.length; i++) {
        if (options[i].points == null) return "This text is not permitted in this ruleset.";
      }
    },
    pointInfo: "Each ability has an identifier and a point value. A complete list can be found on the guide page.",
    computePoints(val, cardData) {
      let sum = 0;
      let options = textSplit(val);
      let i = cardData.class && cardData.class.includes("/") ? 1 : 0;
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
    pointInfo: "Classless is -10 points, any single class is free. Additional classes are 40 points each.",
    computePoints(val) {
      if (val == null) return null;
      let classes = val.split("/").filter(x => x !== "Classless");
      if (classes.length === 0) return -10;
      return (classes.length - 1) * 40;
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
      "\r\nSubsequent additional strikes are 10 points in addition to the points for their value.",
    computePoints(val) {
      if (val == null) return null;
      function numAttacksPoints(num) {
        if (num <= 1) return 0;
        if (num <= 2) return 5;
        return (num - 2) * 10 + 5;
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
    pointInfo: "AC of 8 is free. Each additional value of AC is: 2 points up to 12, 3 points up to 17, and 10 points beyond that.",
    computePoints(val) {
      if (val == null) return null;
      if (val <= 8) return 0;
      if (val <= 12) return (val - 8) * 2;
      if (val <= 17) return (val - 12) * 3 + 8;
      return (val - 17) * 10 + 23;
    }
  },
  "skill": {
    pointInfo: "Skill of 0 is free. Each additional value of skill is: 1 points up to 5, 2 points up to 10, and 5 points beyond that.",
    computePoints(val) {
      if (val == null) return null;
      if (val <= 0) return 0;
      if (val <= 5) return val * 1;
      if (val <= 10) return (val - 5) * 2 + 5;
      return (val - 10) * 5 + 15;
    }
  },
  "hitPoints": {
    pointInfo: "HP of 1 is free. Each additional value of HP is: 5 points up to 3, 10 points up to 4, and 15 points beyond that.",
    computePoints(val) {
      if (val == null) return null;
      if (val <= 1) return 0;
      if (val <= 3) return (val - 1) * 5;
      if (val <= 4) return (val - 3) * 10 + 10;
      return (val - 4) * 15 + 20;
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
    pointInfo: traitDesc,
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
        if (positiveTraits > 1) sum += (positiveTraits - 1) * 5;
        return sum;
      }
    }
  },
  "feats": {
    pointInfo: featDesc,
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
}